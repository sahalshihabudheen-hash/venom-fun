import React, { useState } from 'react';
import { generatePresetSchematics, parseSchematicFile } from '../utils/schematicData';
import SchematicViewer3D from '../components/SchematicViewer3D';
import { useAuth } from '../context/AuthContext';
import { playMinecraftClick, playLevelUpSound } from '../utils/minecraftAudio';
import { UploadCloud, FileText, CheckCircle2, Lock, Sparkles, FolderDown, Layers } from 'lucide-react';

export default function SchematicsView() {
  const { isLoggedIn, setIsLoginModalOpen } = useAuth();
  const [schematicsList, setSchematicsList] = useState(generatePresetSchematics());
  const [selectedSchematicId, setSelectedSchematicId] = useState(schematicsList[0].id);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const currentSchematic = schematicsList.find(s => s.id === selectedSchematicId) || schematicsList[0];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadSuccess('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = parseSchematicFile(event.target.result, file.name);
        const newSchematic = {
          id: 'custom-' + Date.now(),
          title: result.title || file.name,
          gamemode: 'Custom Upload',
          description: `Custom uploaded schematic from ${file.name} with ${result.blocks.length} blocks.`,
          author: 'Uploaded by You',
          dimensions: result.dimensions || { width: 16, height: 16, length: 16 },
          blocks: result.blocks
        };

        setSchematicsList(prev => [newSchematic, ...prev]);
        setSelectedSchematicId(newSchematic.id);
        setUploadSuccess(`Successfully loaded "${file.name}" with ${result.blocks.length} blocks!`);
        playLevelUpSound();
      } catch (err) {
        setUploadError(err.message || 'Error parsing schematic file.');
      }
    };

    reader.onerror = () => {
      setUploadError('Failed to read file from disk.');
    };

    reader.readAsArrayBuffer(file);
  };

  // If player is not logged in, show restricted access gate as requested
  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-8 bg-[#231e1a] border-4 border-[#3e352d] rounded-lg shadow-2xl text-center relative overflow-hidden">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-950/60 border-2 border-red-500/50 rounded-full flex items-center justify-center text-red-400">
          <Lock size={32} />
        </div>
        <h2 className="font-minecraft text-2xl text-[#f3d052] tracking-wider mb-2">
          3D SCHEMATICS STUDIO RESTRICTED
        </h2>
        <p className="text-gray-300 max-w-lg mx-auto text-sm mb-6 leading-relaxed">
          Access to the interactive 3D Minecraft Schematics visualizer, custom file uploader, and block material calculators is reserved for registered server members.
        </p>

        <div className="inline-block bg-[#161311] border border-[#332b25] p-4 rounded text-left mb-6 max-w-md w-full">
          <div className="text-xs font-minecraft text-amber-400 mb-2">FEATURES YOU UNLOCK WITH LOGIN:</div>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside font-mono">
            <li>Interactive 3D voxel model visualizer for Squid Game, Duels & Lifesteal</li>
            <li>Real-time block breakdown (Stone, Obsidian, Redstone counts)</li>
            <li>Layer-by-layer (Y-level) slicer tool for builders</li>
            <li>Upload external <code className="text-emerald-400">.schematic</code> / <code className="text-emerald-400">.schem</code> files from your PC</li>
          </ul>
        </div>

        <div>
          <button
            onClick={() => { playMinecraftClick(); setIsLoginModalOpen(true); }}
            className="mc-btn px-8 py-3 text-base font-minecraft text-white hover:text-yellow-300 shadow-xl"
          >
            LOG IN WITH MINECRAFT IGN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Studio Header & Upload Bar */}
      <div className="bg-[#24201c] border-4 border-[#3b342e] rounded p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="text-[#f3d052]" size={24} />
            <h1 className="font-minecraft text-xl text-[#f3d052]">
              3D SCHEMATICS & VOXEL STUDIO
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Explore 3D server builds, calculate required materials, or upload your own files.
          </p>
        </div>

        {/* Upload Custom Schematic Button */}
        <div className="flex items-center gap-3">
          <label className="mc-btn px-4 py-2.5 text-xs font-minecraft text-white hover:text-yellow-300 cursor-pointer flex items-center gap-2">
            <UploadCloud size={16} />
            UPLOAD .SCHEMATIC
            <input
              type="file"
              accept=".schematic,.schem,.json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {uploadSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 p-3 rounded text-xs text-emerald-200 flex items-center gap-2 font-mono">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {uploadError && (
        <div className="bg-red-950/80 border border-red-500/50 p-3 rounded text-xs text-red-200 font-mono">
          ⚠️ {uploadError}
        </div>
      )}

      {/* Schematic Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {schematicsList.map((s) => {
          const isSelected = s.id === selectedSchematicId;
          return (
            <button
              key={s.id}
              onClick={() => { playMinecraftClick(); setSelectedSchematicId(s.id); }}
              className={`px-3 py-2 rounded text-xs font-minecraft whitespace-nowrap transition-all border-2 ${
                isSelected
                  ? 'bg-[#4a3f1d] border-[#f3d052] text-yellow-300 shadow-md scale-[1.02]'
                  : 'bg-[#1e1a17] border-[#362f29] text-gray-400 hover:text-gray-200 hover:bg-[#28231f]'
              }`}
            >
              <span className="block text-[10px] text-emerald-400 font-mono">{s.gamemode}</span>
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive 3D Viewer Component */}
      <SchematicViewer3D schematic={currentSchematic} />
    </div>
  );
}
