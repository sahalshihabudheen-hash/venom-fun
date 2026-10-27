import React, { useState } from 'react';
import { playMinecraftClick } from '../utils/minecraftAudio';
import { Swords, Heart, Shield, Sparkles, Skull, Crown, ExternalLink } from 'lucide-react';

export default function GamemodesView({ onNavigateToSchematics }) {
  const [activeTab, setActiveTab] = useState('squid-game');

  const gamemodes = [
    {
      id: 'squid-game',
      name: 'Squid-Game',
      badge: 'MINIGAMES',
      icon: '🦑',
      tagline: 'Survive 6 deadly challenges or face elimination. Only one wins the prize pool!',
      description: 'Step into the arena with up to 100 players. Play authentic recreations of the death games with custom animations, voice announcements, and instant elimination mechanics.',
      stages: [
        'Round 1: Red Light, Green Light (Motion Detection Doll)',
        'Round 2: Sugar Honeycombs / Dalgona (Pick the shape under time pressure)',
        'Round 3: Tug of War (Team coordination & spam clicks)',
        'Round 4: Marbles (Guess even/odd, psychological games)',
        'Round 5: Stepping Stones / Glass Bridge (One wrong step is void death)',
        'Final Round: The Squid Game (1v1 weapon battle in the squid court)'
      ],
      features: ['100-Player Lobbies', 'Custom 3D Doll & Sounds', 'Automated Prize Pool', 'VIP Spectator Lounge']
    },
    {
      id: 'duels',
      name: 'Duels',
      badge: 'COMPETITIVE PVP',
      icon: '⚔️',
      tagline: 'Pure 1v1 and 2v2 skill. Fluid knockback, instant matchmaking, and global Elo ratings.',
      description: 'Engineered for tournament-grade PvP. Zero hit delay glitches, custom anticheat, responsive combos, and multiple competitive duel kits.',
      stages: [
        'Nodebuff / PotPvP: Diamond armor, Speed II, and splash healing pots',
        'Classic 1v1: Traditional 1.8 sword, rod, and bow mechanics',
        'Combo Mode: Ultra-low knockback delay for continuous airborne combos',
        'Sumo: Pure fist fighting on a platform over water/void',
        'Bow Duel: Precision archery battles with limited arrows and golden apples'
      ],
      features: ['Elo Matchmaking', 'Custom Replays', 'Kill Effects & Cages', 'Top 100 Seasonal Rewards']
    },
    {
      id: 'pillars of fortune',
      name: 'Pillars of Fortune',
      badge: 'CHAOTIC SKY-BATTLE',
      icon: '🏛️',
      tagline: 'Spawn on a lone pillar above the void. Random overpowered loot drops every 10 seconds!',
      description: 'You and 3 to 7 opponents are trapped on isolated high-altitude pillars. Every few seconds, the sky drops random items: Ender Pearls, Knockback 10 Slimeballs, Launch Pads, or Anvils! Knock your opponents into the abyss.',
      stages: [
        'Phase 1: Foundation Looting (Gather starter blocks and tools)',
        'Phase 2: Lucky Catastrophe (Meteor drops, TNT rain, and super items appear)',
        'Phase 3: The Void Collapse (Pillars start crumbling layer by layer)',
        'Sudden Death: Floating rings and final bow duel over the void'
      ],
      features: ['Custom Randomizer Loot', 'Destructible Arenas', 'Instant Matchmaking', 'Double Jump Abilities']
    },
    {
      id: 'lifesteal',
      name: 'Lifesteal SMP',
      badge: 'SURVIVAL HARDCORE',
      icon: '❤️',
      tagline: 'Kill a player = Steal their Heart. Lose all your hearts = Banished forever.',
      description: 'The highest-stakes survival experience in Minecraft. Every player starts with 10 hearts. Defeating an enemy permanently transfers 1 heart to you (up to 40 max). Die to zero hearts and you are banished from the realm until your clan crafts a Revive Beacon.',
      stages: [
        'Heart Stealing: Slay an enemy to gain +1 Heart (2 Max HP)',
        'Banishment: Losing your 10th heart results in a 3-day server ban or clan rescue',
        'Heart Crafting: Extremely rare recipe requiring Nether Stars and Echo Shards',
        'Revive Beacons: Sacrifice 10 hearts at an ancient altar to revive a dead teammate',
        'Clan Territories: Claim chunks, build unbreakable vaults, and raid enemy heart vaults'
      ],
      features: ['Custom Heart GUI', 'Unbreakable Clan Vaults', 'Bounty Hunter System', 'Netherite Economy']
    }
  ];

  const current = gamemodes.find(g => g.id === activeTab) || gamemodes[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Gamemodes Showcase Header */}
      <div className="bg-[#24201c] border-4 border-[#3b342e] rounded p-6 shadow-xl">
        <h1 className="font-minecraft text-2xl text-[#f3d052] mb-1">
          VENOM_FUN GAMEMODES
        </h1>
        <p className="text-xs text-gray-400">
          Discover all four gamemodes running 24/7 on our high-performance Minecraft server.
        </p>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-5">
          {gamemodes.map((g) => {
            const isSelected = activeTab === g.id;
            return (
              <button
                key={g.id}
                onClick={() => { playMinecraftClick(); setActiveTab(g.id); }}
                className={`p-3 rounded border-2 text-left transition-all ${
                  isSelected
                    ? 'bg-[#3b321a] border-[#eab308] text-white shadow-lg'
                    : 'bg-[#181512] border-[#2f2822] text-gray-400 hover:text-white hover:bg-[#25201b]'
                }`}
              >
                <div className="text-xl mb-1">{g.icon}</div>
                <div className="font-minecraft text-xs text-[#f3d052]">{g.name}</div>
                <div className="text-[10px] text-gray-500 font-mono">{g.badge}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gamemode Detail Card */}
      <div className="bg-[#211d19] border-4 border-[#3a3530] rounded p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#362f29] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{current.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-minecraft text-xl text-[#f3d052]">{current.name}</h2>
                <span className="bg-[#151210] text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded text-[10px] font-mono">
                  {current.badge}
                </span>
              </div>
              <p className="text-xs text-gray-300 font-mono mt-0.5">{current.tagline}</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToSchematics(current.id)}
            className="mc-btn px-4 py-2 text-xs font-minecraft text-white hover:text-yellow-300 flex items-center gap-2 shrink-0"
          >
            <Sparkles size={14} />
            VIEW 3D ARENA SCHEMATIC
          </button>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed font-sans mb-6">
          {current.description}
        </p>

        {/* Stages / Gameplay Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#171412] p-4 rounded border border-[#302923]">
            <h3 className="font-minecraft text-xs text-yellow-400 mb-3 flex items-center gap-2">
              <Crown size={14} />
              RULES & GAMEPLAY PROGRESSION
            </h3>
            <ul className="space-y-2 text-xs font-mono text-gray-300">
              {current.stages.map((stage, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">#{idx + 1}</span>
                  <span>{stage}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#171412] p-4 rounded border border-[#302923]">
            <h3 className="font-minecraft text-xs text-yellow-400 mb-3 flex items-center gap-2">
              <Shield size={14} />
              SERVER FEATURES & SYSTEM
            </h3>
            <div className="grid grid-cols-1 gap-2 text-xs font-mono">
              {current.features.map((feat, idx) => (
                <div key={idx} className="bg-[#211d19] p-2.5 rounded border border-[#2d2620] flex items-center gap-2 text-gray-200">
                  <span className="text-emerald-400">✔</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
