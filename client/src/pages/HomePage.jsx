import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { playMinecraftClick, playLevelUpSound } from '../utils/minecraftAudio';
import { Copy, Check, Users, Shield, Sparkles, Trophy, ArrowRight, Layers, Flame, Swords, ExternalLink } from 'lucide-react';
import { getPlayerAvatarUrl } from '../utils/leaderboardData';

export default function HomePage() {
  const [copiedIp, setCopiedIp] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState(1482);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlinePlayers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyIp = () => {
    playLevelUpSound();
    navigator.clipboard.writeText('play.venomfun.net');
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2500);
  };

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          {/* Server Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src="/images/server_logo.png"
              alt="VENOM_FUN"
              className="max-h-24 sm:max-h-28 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              onError={(e) => { e.target.src = '/images/server_logo_alt.png'; }}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Competitive Minecraft Server Network
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Next-Gen Competitive Minigames <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              & Hardcore Lifesteal SMP
            </span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experience tournament-grade <span className="text-white font-semibold">Squid-Game</span>, ranked <span className="text-white font-semibold">Duels</span>, chaotic <span className="text-white font-semibold">Pillars of Fortune</span>, and high-stakes <span className="text-white font-semibold">Lifesteal SMP</span> with automated live leaderboards.
          </p>

          {/* Server IP Card */}
          <div className="mt-8 max-w-md mx-auto glass-panel p-2.5 rounded-2xl flex items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-3 pl-2 text-left">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <div className="text-sm font-bold text-white font-mono tracking-wide">
                  play.venomfun.net
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">
                  {onlinePlayers.toLocaleString()} Players Online • Java & Bedrock
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyIp}
              className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shrink-0"
            >
              {copiedIp ? <Check size={14} className="text-white" /> : <Copy size={14} />}
              {copiedIp ? 'Copied IP!' : 'Copy IP'}
            </button>
          </div>

          {/* Quick CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/gamemodes"
              onClick={playMinecraftClick}
              className="btn-primary px-6 py-3 text-sm font-semibold flex items-center gap-2"
            >
              <Swords size={18} />
              Explore Gamemodes
            </Link>

            <Link
              to="/schematics"
              onClick={playMinecraftClick}
              className="btn-secondary px-6 py-3 text-sm font-medium flex items-center gap-2"
            >
              <Layers size={18} className="text-cyan-400" />
              3D Schematics Studio
            </Link>

            <Link
              to="/leaderboards"
              onClick={playMinecraftClick}
              className="btn-secondary px-6 py-3 text-sm font-medium flex items-center gap-2"
            >
              <Trophy size={18} className="text-amber-400" />
              Live Leaderboards
            </Link>
          </div>
        </div>
      </section>

      {/* Gamemodes Showcase */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="text-emerald-400" size={20} />
              Featured Server Gamemodes
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Four distinct, adrenaline-packed game types running continuously on our network.
            </p>
          </div>

          <Link
            to="/gamemodes"
            onClick={playMinecraftClick}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            View all details <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Squid Game */}
          <Link
            to="/gamemodes"
            onClick={playMinecraftClick}
            className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🦑
              </div>
              <div className="text-[11px] font-mono text-pink-400 font-semibold uppercase tracking-wider mb-1">
                Deadly Minigames
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                Squid-Game
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Survive 6 lethal stages including Red Light Green Light and Glass Bridge to claim the massive coin pool.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>100-Player Lobbies</span>
              <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          </Link>

          {/* Duels */}
          <Link
            to="/gamemodes"
            onClick={playMinecraftClick}
            className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ⚔️
              </div>
              <div className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider mb-1">
                Tournament Combat
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                Ranked Duels
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Nodebuff, Classic Sword, Bow, and Combo with zero-delay hit registration and competitive Elo matchmaking.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Global Elo Rankings</span>
              <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          </Link>

          {/* Pillars of Fortune */}
          <Link
            to="/gamemodes"
            onClick={playMinecraftClick}
            className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🏛️
              </div>
              <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider mb-1">
                Sky Battle Chaos
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                Pillars of Fortune
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Battle on elevated pillars high above the void. Random overpowered loot drops every 10s as the void shrinks.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Lucky Drop Randomizer</span>
              <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          </Link>

          {/* Lifesteal */}
          <Link
            to="/gamemodes"
            onClick={playMinecraftClick}
            className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ❤️
              </div>
              <div className="text-[11px] font-mono text-red-400 font-semibold uppercase tracking-wider mb-1">
                Hardcore Survival
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                Lifesteal SMP
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Slay enemies to permanently steal their hearts. Lose all hearts and face realm banishment unless revived.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Up to 40 Max Hearts</span>
              <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3D Schematics Studio Banner Feature */}
      <section className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden border border-emerald-500/20">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers size={14} /> Interactive 3D WebGL Studio
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Inspect & Upload Minecraft Schematics in Real-Time 3D
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Explore 3D arenas, calculate exact material recipes (Stone, Obsidian, Redstone counts), slice layer-by-layer, or upload your own <code className="text-emerald-400 font-mono">.schematic</code> and <code className="text-emerald-400 font-mono">.schem</code> files straight from your PC.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/schematics"
              onClick={playMinecraftClick}
              className="btn-primary px-6 py-3 text-sm font-semibold flex items-center gap-2 justify-center"
            >
              Launch 3D Studio
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Top 3 Champions Leaderboard Preview */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy size={20} className="text-amber-400" />
              Server Leaderboard Champions
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Live updates synchronized directly with in-game matches.
            </p>
          </div>

          <Link
            to="/leaderboards"
            onClick={playMinecraftClick}
            className="btn-secondary px-4 py-2 text-xs font-medium text-slate-200"
          >
            View Full Leaderboards →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-center">
            <span className="text-[11px] font-mono bg-pink-500/10 text-pink-400 border border-pink-500/30 px-2.5 py-0.5 rounded-full font-semibold">
              🦑 SQUID-GAME #1
            </span>
            <img
              src={getPlayerAvatarUrl('SangWoo_67', 48)}
              alt="SangWoo_67"
              className="w-12 h-12 mx-auto my-3 rounded-lg border border-slate-700 bg-slate-900 shadow"
            />
            <div className="text-sm font-bold text-white">SangWoo_67</div>
            <div className="text-xs font-mono text-emerald-400 mt-1">142 Wins • 67.6% WR</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-center">
            <span className="text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-semibold">
              ⚔️ DUELS #1
            </span>
            <img
              src={getPlayerAvatarUrl('ComboGod_X', 48)}
              alt="ComboGod_X"
              className="w-12 h-12 mx-auto my-3 rounded-lg border border-slate-700 bg-slate-900 shadow"
            />
            <div className="text-sm font-bold text-white">ComboGod_X</div>
            <div className="text-xs font-mono text-amber-400 mt-1">2,450 ELO • 34 Streak</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-center">
            <span className="text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full font-semibold">
              ❤️ LIFESTEAL #1
            </span>
            <img
              src={getPlayerAvatarUrl('HeartCollector_X', 48)}
              alt="HeartCollector_X"
              className="w-12 h-12 mx-auto my-3 rounded-lg border border-slate-700 bg-slate-900 shadow"
            />
            <div className="text-sm font-bold text-white">HeartCollector_X</div>
            <div className="text-xs font-mono text-red-400 mt-1">38 Hearts • 312 Kills</div>
          </div>
        </div>
      </section>

      {/* Connection & Network Specs */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <Shield size={18} className="text-emerald-400" />
            High-Performance Server Architecture
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✔</span>
              <span><strong>Constant 20.0 TPS:</strong> Dedicated enterprise Ryzen 9 hardware for maximum tick stability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✔</span>
              <span><strong>Zero Hit Registration Delay:</strong> Custom knockback and packet optimization for pristine PvP.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✔</span>
              <span><strong>Cross-Platform Support:</strong> Java Edition (1.8 - 1.20+) and Bedrock Edition (GeyserMC).</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <Flame size={18} className="text-cyan-400" />
            How to Join VENOM_FUN
          </h3>
          <ol className="space-y-2 text-xs text-slate-300 font-mono list-decimal list-inside">
            <li>Launch Minecraft Java Edition (or Bedrock).</li>
            <li>Click <strong>Multiplayer</strong> &rarr; <strong>Add Server</strong>.</li>
            <li>Server Address: <span className="text-emerald-400 font-bold">play.venomfun.net</span></li>
            <li>Register in-game using: <span className="text-amber-400">/register &lt;password&gt; &lt;password&gt;</span></li>
            <li>Log in to this website to unlock your full combat profile and 3D schematics!</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
