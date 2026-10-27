import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createPixelCanvas, BLOCK_PALETTE } from '../utils/minecraftTextures';
import { calculateBlockStatistics } from '../utils/schematicData';
import { Layers, Eye, RotateCw, ZoomIn, Box, Check, Sparkles, Filter } from 'lucide-react';
import { playMinecraftClick } from '../utils/minecraftAudio';

export default function SchematicViewer3D({ schematic }) {
  const containerRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState(100);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [highlightedBlock, setHighlightedBlock] = useState(null);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    spherical: { radius: 36, theta: Math.PI / 4, phi: Math.PI / 3 },
    target: new THREE.Vector3(0, 5, 0)
  });
  const blockMeshesRef = useRef([]);

  const stats = calculateBlockStatistics(schematic?.blocks || []);
  const maxY = schematic?.blocks ? Math.max(...schematic.blocks.map(b => b.y), 1) : 16;

  useEffect(() => {
    if (!containerRef.current || !schematic) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d14); // modern studio background
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf8fafc, 1.3);
    dirLight1.position.set(25, 40, 20);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.5);
    dirLight2.position.set(-20, -10, -20);
    scene.add(dirLight2);

    buildVoxelMeshes(scene, schematic.blocks, activeLayer, wireframe, highlightedBlock);

    const cx = (schematic.dimensions?.width || 16) / 2;
    const cy = (schematic.dimensions?.height || 16) / 3;
    const cz = (schematic.dimensions?.length || 16) / 2;
    controlsRef.current.target.set(cx, cy, cz);
    updateCamera();

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (autoRotate && !controlsRef.current.isDragging) {
        controlsRef.current.spherical.theta += 0.005;
        updateCamera();
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [schematic]);

  useEffect(() => {
    if (sceneRef.current && schematic?.blocks) {
      buildVoxelMeshes(sceneRef.current, schematic.blocks, activeLayer, wireframe, highlightedBlock);
    }
  }, [activeLayer, wireframe, highlightedBlock]);

  function buildVoxelMeshes(scene, blocks, layerLimit, isWireframe, highlightType) {
    blockMeshesRef.current.forEach(m => scene.remove(m));
    blockMeshesRef.current = [];

    const groups = {};
    blocks.forEach(b => {
      if (b.y > layerLimit) return;
      const t = b.type || 'stone';
      if (!groups[t]) groups[t] = [];
      groups[t].push(b);
    });

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const dummy = new THREE.Object3D();

    Object.keys(groups).forEach(type => {
      const bList = groups[type];
      const isDimmed = highlightType && highlightType !== type;

      const canvas = createPixelCanvas(type, 16);
      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;

      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        wireframe: isWireframe,
        transparent: isDimmed || type === 'glass',
        opacity: isDimmed ? 0.2 : (type === 'glass' ? 0.45 : 1.0),
        roughness: 0.6,
        metalness: type.includes('diamond') || type.includes('iron') ? 0.25 : 0.05
      });

      const instancedMesh = new THREE.InstancedMesh(boxGeo, mat, bList.length);
      instancedMesh.castShadow = true;
      instancedMesh.receiveShadow = true;

      bList.forEach((b, idx) => {
        dummy.position.set(b.x, b.y, b.z);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(idx, dummy.matrix);
      });

      instancedMesh.instanceMatrix.needsUpdate = true;
      scene.add(instancedMesh);
      blockMeshesRef.current.push(instancedMesh);
    });

    const w = schematic.dimensions?.width || 16;
    const l = schematic.dimensions?.length || 16;
    const grid = new THREE.GridHelper(Math.max(w, l) * 1.5, Math.max(w, l) * 1.5, 0x1e293b, 0x0f172a);
    grid.position.set(w / 2, -0.5, l / 2);
    scene.add(grid);
    blockMeshesRef.current.push(grid);
  }

  function updateCamera() {
    if (!cameraRef.current) return;
    const { spherical, target } = controlsRef.current;
    const phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, spherical.phi));
    const radius = Math.max(8, Math.min(100, spherical.radius));

    const x = target.x + radius * Math.sin(phi) * Math.sin(spherical.theta);
    const y = target.y + radius * Math.cos(phi);
    const z = target.z + radius * Math.sin(phi) * Math.cos(spherical.theta);

    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(target);
  }

  const handleMouseDown = (e) => {
    controlsRef.current.isDragging = true;
    controlsRef.current.prevX = e.clientX;
    controlsRef.current.prevY = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!controlsRef.current.isDragging) return;
    const dx = e.clientX - controlsRef.current.prevX;
    const dy = e.clientY - controlsRef.current.prevY;
    controlsRef.current.prevX = e.clientX;
    controlsRef.current.prevY = e.clientY;

    controlsRef.current.spherical.theta -= dx * 0.01;
    controlsRef.current.spherical.phi -= dy * 0.01;
    updateCamera();
  };

  const handleMouseUp = () => {
    controlsRef.current.isDragging = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    controlsRef.current.spherical.radius += e.deltaY * 0.04;
    updateCamera();
  };

  const resetCamera = () => {
    playMinecraftClick();
    controlsRef.current.spherical = { radius: 36, theta: Math.PI / 4, phi: Math.PI / 3 };
    const cx = (schematic.dimensions?.width || 16) / 2;
    const cy = (schematic.dimensions?.height || 16) / 3;
    const cz = (schematic.dimensions?.length || 16) / 2;
    controlsRef.current.target.set(cx, cy, cz);
    updateCamera();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* 3D Viewport Box */}
      <div className="flex-1 flex flex-col glass-panel rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Viewport Top Bar */}
        <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white text-sm tracking-tight">
              {schematic.title}
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium">
              {stats.total.toLocaleString()} BLOCKS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { playMinecraftClick(); setWireframe(!wireframe); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                wireframe
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Eye size={13} className="inline mr-1.5" />
              {wireframe ? 'Textured' : 'Wireframe'}
            </button>

            <button
              onClick={() => { playMinecraftClick(); setAutoRotate(!autoRotate); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                autoRotate
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <RotateCw size={13} className={`inline mr-1.5 ${autoRotate ? 'animate-spin' : ''}`} />
              Auto-Rotate
            </button>

            <button
              onClick={resetCamera}
              className="px-3 py-1.5 rounded-lg border bg-slate-800/60 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium"
            >
              <ZoomIn size={13} className="inline mr-1.5" />
              Reset View
            </button>
          </div>
        </div>

        {/* 3D Canvas Canvas */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-[480px] cursor-grab active:cursor-grabbing relative"
        >
          <div className="absolute bottom-4 left-4 pointer-events-none bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-mono">
            🖱️ Left Drag: Rotate • Scroll: Zoom • Right Drag: Pan
          </div>

          {highlightedBlock && (
            <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
              <span className="font-semibold">Isolating: {highlightedBlock.replace(/_/g, ' ').toUpperCase()}</span>
              <button
                onClick={() => setHighlightedBlock(null)}
                className="underline hover:text-white text-[11px] ml-1"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Layer Slider (Y Slicer) */}
        <div className="bg-slate-900/80 px-4 py-3 border-t border-slate-800/80 flex items-center gap-4 text-xs">
          <Layers size={16} className="text-emerald-400 shrink-0" />
          <span className="text-slate-300 font-medium shrink-0">
            Layer Cutoff (Y: {activeLayer > maxY ? 'ALL' : activeLayer}):
          </span>
          <input
            type="range"
            min="0"
            max={maxY + 1}
            value={activeLayer > maxY ? maxY + 1 : activeLayer}
            onChange={(e) => setActiveLayer(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <button
            onClick={() => setActiveLayer(maxY + 1)}
            className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 shrink-0 font-medium"
          >
            Show All
          </button>
        </div>
      </div>

      {/* Materials & Block Breakdown Sidebar */}
      <div className="w-full lg:w-80 glass-panel rounded-2xl p-5 flex flex-col shadow-2xl">
        <div className="border-b border-slate-800 pb-3 mb-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Box size={18} className="text-emerald-400" />
            Materials & Blocks
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Exact block count needed to build this structure in-game.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center font-mono">
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Total Blocks</div>
            <div className="text-emerald-400 font-bold text-base mt-0.5">{stats.total.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Unique Types</div>
            <div className="text-cyan-400 font-bold text-base mt-0.5">{stats.list.length}</div>
          </div>
        </div>

        {/* Scrollable Block Types List */}
        <div className="flex-1 max-h-[340px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {stats.list.map((item) => {
            const isSelected = highlightedBlock === item.type;
            return (
              <div
                key={item.type}
                onClick={() => {
                  playMinecraftClick();
                  setHighlightedBlock(isSelected ? null : item.type);
                }}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs font-mono ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded border border-black/40 shadow-inner shrink-0"
                    style={{
                      backgroundColor: BLOCK_PALETTE[item.type]?.[0] || '#777',
                      imageRendering: 'pixelated'
                    }}
                  />
                  <span className="capitalize font-medium">
                    {item.type.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-white mr-1.5">{item.count}</span>
                  <span className="text-slate-500 text-[10px]">({item.percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            💡 Click any block above to isolate it in 3D view.
          </p>
        </div>
      </div>
    </div>
  );
}
