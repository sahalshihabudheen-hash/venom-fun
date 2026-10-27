import React, { useState, useEffect } from 'react';
import { playMinecraftClick, playLevelUpSound } from '../utils/minecraftAudio';
import { Copy, Check, Users, Server, Shield, Sparkles, Trophy, ArrowRight, Play, Heart } from 'lucide-react';
import { getPlayerAvatarUrl } from '../utils/leaderboardData';

export default function HomeView({ onNavigate, onOpenLogin }) {
  const [copiedIp, setCopiedIp] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState(1482);
  const [splashText, setSplashText] = useState('Squid Game & Lifesteal!');

  const splashes = [
    'Squid Game & Lifesteal SMP!',
    'Now with 3D Schematics Studio!',
    'Over 1,400+ Players Online!',
    'Pillars of Fortune Chaos!',
    '1.8 to 1.20+ Supported!',
    'Steal hearts, win prizes!'
  ];

  useEffect(() => {
    // Pick random splash
    setSplashText(splashes[Math.floor(Math.random() * splashes.length)]);

    // Subtle random fluctuation for online count
    const interval = setInterval(() => {
      setOnlinePlayers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyIp = () => {
    playLevelUpSound();
    navigator.clipboard.writeText('play.venomfun.net');
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner Section */}
      <div className="bg-[#211d19] border-4 border-[#3b342e] rounded-lg p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
        {/* Server Logo */}
        <div className="relative inline-block mb-3">
          <img
            src="/images/server_logo.png"
            alt="VENOM_FUN Minecraft Server"
            className="max-h-24 md:max-h-28 mx-auto object-contain filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.8)]"
            onError={(e) => {
              // fallback if alt image
              e.target.src = '/images/server_logo_alt.png';
            }}
          />

          {/* Wobbling Yellow Splash Text (Classic Minecraft) */}
          <div className="absolute -bottom-2 -right-4 sm:-right-8 transform rotate-[-14deg] animate-pulse">
            <span className="font-minecraft text-xs sm:text-sm text-[#ffff00] drop-shadow-[2px_2px_0px_#3f3f00] tracking-wide font-bold">
              {splashText}
            </span>
          </div>
        </div>

        <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto mt-4 font-mono leading-relaxed">
          The ultimate competitive Minecraft network featuring <span className="text-yellow-400 font-bold">Squid-Game</span>, <span className="text-yellow-400 font-bold">Ranked Duels</span>, <span className="text-yellow-400 font-bold">Pillars of Fortune</span>, and hardcore <span className="text-yellow-400 font-bold">Lifesteal SMP</span>.
        </p>

        {/* Server IP & Status Box */}
        <div className="mt-6 max-w-md mx-auto bg-[#151210] border-2 border-[#362f29] rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3 text-left">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div>
              <div className="font-minecraft text-xs text-white tracking-wider flex items-center gap-1.5">
                <span>play.venomfun.net</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">
                {onlinePlayers.toLocaleString()} / 2,000 Players Online (1.8 - 1.20+)
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyIp}
            className="mc-btn px-4 py-2 text-xs font-minecraft text-white hover:text-yellow-300 flex items-center gap-1.5 shrink-0"
          >
            {copiedIp ? <Check size={14} className="text-green-300" /> : <Copy size={14} />}
            {copiedIp ? 'COPIED!' : 'COPY IP'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate('gamemodes')}
            className="mc-btn px-5 py-2.5 text-xs font-minecraft text-white hover:text-yellow-300"
          >
            EXPLORE GAMEMODES
          </button>
          <button
            onClick={() => onNavigate('schematics')}
            className="mc-btn-dark px-5 py-2.5 text-xs font-minecraft text-yellow-400 hover:text-yellow-300 border border-yellow-600/40"
          >
            3D SCHEMATICS VIEWER
          </button>
          <button
            onClick={onOpenLogin}
            className="mc-btn px-5 py-2.5 text-xs font-minecraft text-emerald-300 hover:text-white"
          >
            PLAYER IN-GAME LOG IN
          </button>
        </div>
      </div>

      {/* 4 Featured Gamemodes Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-minecraft text-lg text-[#f3d052] flex items-center gap-2">
            <Sparkles size={18} />
            FEATURED SERVER GAMEMODES
          </h2>
          <button
            onClick={() => onNavigate('gamemodes')}
            className="text-xs font-mono text-yellow-400 hover:underline flex items-center gap-1"
          >
            View all rules <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Squid Game Card */}
          <div
            onClick={() => onNavigate('gamemodes')}
            className="bg-[#211d19] border-3 border-[#3a3530] hover:border-[#f3d052] rounded p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-xl group"
          >
            <div className="text-3xl mb-2">🦑</div>
            <h3 className="font-minecraft text-sm text-[#f3d052] group-hover:text-yellow-300">
              Squid-Game
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-mono">
              Survive 6 deadly games including Red Light Green Light and Glass Bridge.
            </p>
            <div className="mt-3 text-[10px] font-mono text-emerald-400 bg-[#161311] p-1.5 rounded border border-[#2b2520]">
              Active Arenas: 8 | Prize: 100k Coins
            </div>
          </div>

          {/* Duels Card */}
          <div
            onClick={() => onNavigate('gamemodes')}
            className="bg-[#211d19] border-3 border-[#3a3530] hover:border-[#f3d052] rounded p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-xl group"
          >
            <div className="text-3xl mb-2">⚔️</div>
            <h3 className="font-minecraft text-sm text-[#f3d052] group-hover:text-yellow-300">
              Ranked Duels
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-mono">
              1v1 & 2v2 Nodebuff, Classic Sword, Bow, and Combo with zero-delay hit registration.
            </p>
            <div className="mt-3 text-[10px] font-mono text-amber-400 bg-[#161311] p-1.5 rounded border border-[#2b2520]">
              Global Elo Rankings & Seasons
            </div>
          </div>

          {/* Pillars of Fortune Card */}
          <div
            onClick={() => onNavigate('gamemodes')}
            className="bg-[#211d19] border-3 border-[#3a3530] hover:border-[#f3d052] rounded p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-xl group"
          >
            <div className="text-3xl mb-2">🏛️</div>
            <h3 className="font-minecraft text-sm text-[#f3d052] group-hover:text-yellow-300">
              Pillars of Fortune
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-mono">
              Sky battle on high pillars with random items falling from above. Knock enemies to the void!
            </p>
            <div className="mt-3 text-[10px] font-mono text-cyan-400 bg-[#161311] p-1.5 rounded border border-[#2b2520]">
              Shrinking Void & Lucky Blocks
            </div>
          </div>

          {/* Lifesteal Card */}
          <div
            onClick={() => onNavigate('gamemodes')}
            className="bg-[#211d19] border-3 border-[#3a3530] hover:border-[#f3d052] rounded p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-xl group"
          >
            <div className="text-3xl mb-2">❤️</div>
            <h3 className="font-minecraft text-sm text-[#f3d052] group-hover:text-yellow-300">
              Lifesteal SMP
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-mono">
              Defeat enemies to steal their hearts. Lose all hearts and face realm banishment!
            </p>
            <div className="mt-3 text-[10px] font-mono text-red-400 bg-[#161311] p-1.5 rounded border border-[#2b2520]">
              Max 40 Hearts | Clan Heart Vaults
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Champions Showcase */}
      <div className="bg-[#211d19] border-4 border-[#3a3530] rounded-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 border-b-2 border-[#362f29] pb-3">
          <h2 className="font-minecraft text-base text-[#f3d052] flex items-center gap-2">
            <Trophy size={18} />
            CURRENT LEADERBOARD TITANS
          </h2>
          <button
            onClick={() => onNavigate('leaderboards')}
            className="text-xs font-mono text-yellow-400 hover:underline"
          >
            Full Live Leaderboard →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Squid Game #1 */}
          <div className="bg-[#171412] p-4 rounded border border-[#332a23] text-center">
            <span className="text-[10px] font-minecraft bg-yellow-500 text-black px-2 py-0.5 rounded font-bold">
              🥇 SQUID-GAME #1
            </span>
            <img
              src={getPlayerAvatarUrl('SangWoo_67', 48)}
              alt="SangWoo_67"
              className="w-12 h-12 mx-auto my-2 rounded border border-black"
            />
            <div className="font-minecraft text-xs text-white">SangWoo_67</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1">142 Wins (67.6% WR)</div>
          </div>

          {/* Duels #1 */}
          <div className="bg-[#171412] p-4 rounded border border-[#332a23] text-center">
            <span className="text-[10px] font-minecraft bg-yellow-500 text-black px-2 py-0.5 rounded font-bold">
              🥇 DUELS #1
            </span>
            <img
              src={getPlayerAvatarUrl('ComboGod_X', 48)}
              alt="ComboGod_X"
              className="w-12 h-12 mx-auto my-2 rounded border border-black"
            />
            <div className="font-minecraft text-xs text-white">ComboGod_X</div>
            <div className="text-[11px] font-mono text-amber-400 mt-1">2,450 ELO (34 Win Streak)</div>
          </div>

          {/* Lifesteal #1 */}
          <div className="bg-[#171412] p-4 rounded border border-[#332a23] text-center">
            <span className="text-[10px] font-minecraft bg-yellow-500 text-black px-2 py-0.5 rounded font-bold">
              🥇 LIFESTEAL #1
            </span>
            <img
              src={getPlayerAvatarUrl('HeartCollector_X', 48)}
              alt="HeartCollector_X"
              className="w-12 h-12 mx-auto my-2 rounded border border-black"
            />
            <div className="font-minecraft text-xs text-white">HeartCollector_X</div>
            <div className="text-[11px] font-mono text-red-400 mt-1">38 Hearts ❤️ (312 Kills)</div>
          </div>
        </div>
      </div>

      {/* How to Connect / Server Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#211d19] border-4 border-[#3a3530] rounded p-5 shadow-xl">
          <h3 className="font-minecraft text-sm text-[#f3d052] mb-3 flex items-center gap-2">
            <Server size={16} />
            HOW TO CONNECT TO VENOM_FUN
          </h3>
          <ol className="text-xs font-mono text-gray-300 space-y-2 list-decimal list-inside">
            <li>Launch Minecraft Java Edition (version 1.8 to 1.20+ supported).</li>
            <li>Click <strong>Multiplayer</strong> &rarr; <strong>Add Server</strong>.</li>
            <li>Server Name: <code className="text-yellow-400">VENOM_FUN</code></li>
            <li>Server Address: <code className="text-yellow-400">play.venomfun.net</code></li>
            <li>Join and type <code className="text-emerald-400">/register &lt;password&gt; &lt;password&gt;</code> in chat!</li>
            <li>Use that same username & password on this website to unlock 3D Schematics!</li>
          </ol>
        </div>

        <div className="bg-[#211d19] border-4 border-[#3a3530] rounded p-5 shadow-xl">
          <h3 className="font-minecraft text-sm text-[#f3d052] mb-3 flex items-center gap-2">
            <Shield size={16} />
            SERVER RULES & FAIR PLAY
          </h3>
          <ul className="text-xs font-mono text-gray-300 space-y-2 list-disc list-inside">
            <li>No hacked clients, autoclickers, or combat modifications.</li>
            <li>Respect opponents across Squid Game and Duels matchmaking.</li>
            <li>No exploiting bugs or duping items on Lifesteal SMP.</li>
            <li>Bedrock players can connect via port <code className="text-yellow-400">19132</code> (GeyserMC).</li>
            <li>Daily auto-backups and 24/7 dedicated anti-DDoS protection.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
