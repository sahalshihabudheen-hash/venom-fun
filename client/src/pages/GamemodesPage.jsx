import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { playMinecraftClick } from '../utils/minecraftAudio';
import { Swords, Heart, Shield, Sparkles, Skull, Crown, ExternalLink, ArrowRight, Terminal } from 'lucide-react';

export default function GamemodesPage() {
  const [activeTab, setActiveTab] = useState('squid-game');

  const gamemodes = [
    {
      id: 'squid-game',
      name: 'Squid-Game',
      badge: 'MINIGAMES',
      icon: '🦑',
      themeColor: 'from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400',
      command: '/squid join',
      tagline: 'Survive 6 deadly challenges or face elimination. Only one claims the jackpot prize pool!',
      description: 'Step into the arena with up to 100 competitors. Play authentic recreations of the death games with custom motion detection animations, eerie voice broadcasts, and sudden death mechanics.',
      stages: [
        'Stage 1: Red Light, Green Light (Motion Detection Giant Doll)',
        'Stage 2: Sugar Honeycombs / Dalgona (Carve the shape under extreme time limits)',
        'Stage 3: Tug of War (Squad synchronization and click timing)',
        'Stage 4: Marbles (Psychological mind games and betting)',
        'Stage 5: Stepping Stones / Glass Bridge (One fragile pane plunges you into the void)',
        'Grand Final: The Squid Game (1v1 weapon battle inside the squid court)'
      ],
      features: ['100-Player Capacity', 'Automated Prize Jackpot', 'VIP Spectator Sky-Box', 'Custom Sound FX'],
      schematicId: 'squid-game-arena'
    },
    {
      id: 'duels',
      name: 'Ranked Duels',
      badge: 'COMPETITIVE 1v1',
      icon: '⚔️',
      themeColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
      command: '/duel <player>',
      tagline: 'Tournament-grade 1v1 and 2v2 combat. Instant matchmaking, fluid combos, and global Elo tiers.',
      description: 'Built from the ground up for esports-level competitive PvP. Features zero-delay hit registration, customizable knockback profiles, seasonal rank resets, and instant queuing.',
      stages: [
        'Nodebuff / PotPvP: Diamond armor, Speed II, and splash healing potion micro-management',
        'Classic 1v1: Pure 1.8 sword, fishing rod spacing, and precise bow accuracy',
        'Combo Mode: Ultra-responsive sprint-resetting for continuous mid-air juggles',
        'Sumo: Pure hand-to-hand combat on a shrinking platform over the void',
        'Bow Duel: Precision archery battles with limited arrows and golden apple management'
      ],
      features: ['Elo Matchmaking System', 'Custom Kill Holograms & Cages', 'Detailed Replay System', 'Seasonal Tier Rewards'],
      schematicId: 'duels-colosseum'
    },
    {
      id: 'pillars of fortune',
      name: 'Pillars of Fortune',
      badge: 'CHAOTIC SKY-BATTLE',
      icon: '🏛️',
      themeColor: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
      command: '/pillars join',
      tagline: 'Isolated on floating pillars above the void. Random overpowered loot drops every 10 seconds!',
      description: 'You and your opponents spawn on narrow pillars suspended above the endless void. Every 10 seconds, the sky drops random items: Ender Pearls, Knockback X Slimeballs, Launch Pads, or Anvils! Knock enemies into the abyss as the void slowly rises.',
      stages: [
        'Phase 1: Foundation Looting (Gather basic bridge blocks and starter gear)',
        'Phase 2: Lucky Catastrophe (Meteor drops, TNT rain, and super items appear)',
        'Phase 3: The Void Collapse (Pillars begin disintegrating layer by layer)',
        'Sudden Death: Floating rings and final bow duel over the void'
      ],
      features: ['Randomized Item Drops', 'Destructible Block Physics', 'Double Jump Abilities', 'Instant Respawn Queues'],
      schematicId: 'pillars-of-fortune'
    },
    {
      id: 'lifesteal',
      name: 'Lifesteal SMP',
      badge: 'HARDCORE SURVIVAL',
      icon: '❤️',
      themeColor: 'from-red-500/20 to-rose-500/10 border-red-500/30 text-red-400',
      command: '/hearts',
      tagline: 'Kill a player = Steal their Heart (+1 Max HP). Lose all your hearts = Banished forever.',
      description: 'The highest-stakes survival experience in Minecraft. Every player starts with 10 hearts. Defeating an opponent permanently extracts 1 of their hearts and awards it to you (up to 40 max hearts). Die to 0 hearts and you are banished from the realm until your clan crafts a Revive Beacon.',
      stages: [
        'Heart Stealing: Slay an enemy to permanently gain +1 Heart (2 Max HP)',
        'Banishment: Losing your 10th heart results in a 3-day realm ban or clan rescue',
        'Heart Crafting: Extremely rare recipe requiring Nether Stars and Echo Shards',
        'Revive Beacons: Sacrifice 10 hearts at an ancient altar to revive a dead teammate',
        'Clan Territories: Claim chunks, build reinforced vaults, and raid enemy heart vaults'
      ],
      features: ['Custom Heart GUI Tracker', 'Unbreakable Clan Vaults', 'Bounty Hunter Contracts', 'Netherite Economy'],
      schematicId: 'lifesteal-heart-vault'
    }
  ];

  const current = gamemodes.find(g => g.id === activeTab) || gamemodes[0];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Swords size={14} /> Server Gamemodes
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Arena on VENOM_FUN
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Discover all four distinct gamemodes engineered with custom mechanics, balanced matchmaking, and live web leaderboard synchronization.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800">
          {gamemodes.map((g) => {
            const isSelected = activeTab === g.id;
            return (
              <button
                key={g.id}
                onClick={() => { playMinecraftClick(); setActiveTab(g.id); }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/50 shadow-lg scale-[1.02]'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-2xl mb-2">{g.icon}</div>
                <div className="font-bold text-white text-sm">{g.name}</div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">{g.badge}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Gamemode Detail Card */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{current.icon}</span>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {current.name}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${current.themeColor}`}>
                  {current.badge}
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-1">{current.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal size={14} className="text-emerald-400" />
              <span>In-Game:</span>
              <code className="text-emerald-300 font-bold">{current.command}</code>
            </div>

            <Link
              to="/schematics"
              onClick={playMinecraftClick}
              className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 shrink-0"
            >
              <Sparkles size={14} />
              Inspect 3D Arena Schematic
            </Link>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
          {current.description}
        </p>

        {/* Detailed Stages & Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Crown size={16} className="text-amber-400" />
              Game Stages & Gameplay Flow
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-sans text-slate-300">
              {current.stages.map((stage, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/50">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{stage}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Shield size={16} className="text-emerald-400" />
              Engineered Systems & Rules
            </h3>
            <div className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm">
              {current.features.map((feat, idx) => (
                <div key={idx} className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/60 flex items-center gap-2.5 text-slate-200">
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="text-xs text-slate-400 font-mono mb-2">Live Web Integration:</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every victory, kill streak, and heart acquired in this gamemode instantly broadcasts to the <Link to="/leaderboards" onClick={playMinecraftClick} className="text-emerald-400 underline font-semibold">Live Leaderboards</Link>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
