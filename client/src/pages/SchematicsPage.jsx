import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generatePresetSchematics, parseSchematicFile } from '../utils/schematicData';
import SchematicViewer3D from '../components/SchematicViewer3D';
import { useAuth } from '../context/AuthContext';
import { playMinecraftClick, playLevelUpSound } from '../utils/minecraftAudio';
import { UploadCloud, FileText, CheckCircle2, Lock, Sparkles, Layers, Box, ArrowRight } from 'lucide-react';

export default function SchematicsPage() {
  const { isLoggedIn } = useAuth();
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
        setUploadSuccess(`Successfully parsed "${file.name}" with ${result.blocks.length.toLocaleString()} blocks!`);
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

  // If user is not logged in, show professional access lock as requested
  if (!isLoggedIn) {
    return (
      <div className="max-w-3xl mx-auto my-12 glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 text-center shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Lock size={30} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          3D Schematics Studio Restricted
        </h1>
        <p className="text-slate-300 text-sm max-w-lg mx-auto mt-3 leading-relaxed">
          Access to the interactive 3D WebGL Minecraft model visualizer, material count calculator, and custom external file uploader is reserved for authenticated server players.
        </p>

        <div className="mt-8 bg-slate-950/60 p-6 rounded-2xl border border-slate-800 text-left max-w-md mx-auto">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3">
            Features Unlocked with In-Game Login:
          </div>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5 font-sans">
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-400">✔</span>
              <span>Full 3D rotation, zoom, and wireframe views of official server arenas</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-400">✔</span>
              <span>Real-time block breakdown (Stone, Obsidian, Redstone, Planks)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-400">✔</span>
              <span>Layer-by-layer (Y-level) slicer tool for builders</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-400">✔</span>
              <span>Upload external <code className="text-cyan-300 font-mono">.schematic</code> / <code className="text-cyan-300 font-mono">.schem</code> files from your PC</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            to="/login"
            onClick={playMinecraftClick}
            className="btn-primary px-8 py-3 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>Log In with In-Game Username</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Header & Upload Bar */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Layers size={14} /> 3D Voxel Studio
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Minecraft 3D Schematics Viewer
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Examine 3D structural builds, calculate material costs, or upload your own files.
          </p>
        </div>

        {/* Upload Custom Schematic Button */}
        <div>
          <label className="btn-primary px-5 py-3 text-xs sm:text-sm font-semibold cursor-pointer flex items-center gap-2 shadow-lg">
            <UploadCloud size={18} />
            <span>Upload .schematic File</span>
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
        <div className="bg-emerald-950/70 border border-emerald-500/50 p-4 rounded-2xl text-xs sm:text-sm text-emerald-200 flex items-center gap-3 font-mono">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {uploadError && (
        <div className="bg-rose-950/70 border border-rose-500/50 p-4 rounded-2xl text-xs sm:text-sm text-rose-200 font-mono">
          ⚠️ {uploadError}
        </div>
      )}

      {/* Preset Schematics Selector Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 custom-scrollbar">
        {schematicsList.map((s) => {
          const isSelected = s.id === selectedSchematicId;
          return (
            <button
              key={s.id}
              onClick={() => { playMinecraftClick(); setSelectedSchematicId(s.id); }}
              className={`px-4 py-3 rounded-2xl border text-left whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-800/95 border-emerald-500/60 shadow-lg scale-[1.02]'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="text-[11px] font-mono text-emerald-400 font-semibold">{s.gamemode}</div>
              <div className="font-bold text-white text-xs sm:text-sm mt-0.5">{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Interactive 3D WebGL Canvas */}
      <SchematicViewer3D schematic={currentSchematic} />
    </div>
  );
}
