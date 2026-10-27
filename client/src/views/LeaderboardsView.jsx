import React, { useState, useEffect } from 'react';
import { INITIAL_LEADERBOARD, LIVE_ACTIVITY_EVENTS, getPlayerAvatarUrl } from '../utils/leaderboardData';
import { useAuth } from '../context/AuthContext';
import { playMinecraftClick } from '../utils/minecraftAudio';
import { Trophy, RefreshCw, Radio, Search, Heart, Swords, Skull, Shield, Zap, Sparkles } from 'lucide-react';

export default function LeaderboardsView() {
  const { isLoggedIn, user, setIsLoginModalOpen } = useAuth();
  const [selectedGamemode, setSelectedGamemode] = useState('squid-game');
  const [leaderboardData, setLeaderboardData] = useState(INITIAL_LEADERBOARD);
  const [liveEvents, setLiveEvents] = useState(LIVE_ACTIVITY_EVENTS);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState('Just now');

  // Automatic live updating interval
  useEffect(() => {
    if (!autoUpdateEnabled) return;

    const interval = setInterval(() => {
      // Simulate live Minecraft server sync event
      const gamemodes = ['squid-game', 'duels', 'pillars of fortune', 'lifesteal'];
      const randomGamemode = gamemodes[Math.floor(Math.random() * gamemodes.length)];

      setLeaderboardData(prev => {
        const copy = { ...prev };
        const list = [...copy[randomGamemode]];
        if (list.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(list.length, 5));
          const target = { ...list[randomIndex] };

          if (randomGamemode === 'squid-game') {
            target.wins += 1;
            target.gamesPlayed += 1;
          } else if (randomGamemode === 'duels') {
            target.wins += 1;
            target.elo += Math.floor(Math.random() * 15) + 5;
            target.winStreak += 1;
          } else if (randomGamemode === 'pillars of fortune') {
            target.wins += 1;
            target.knockouts += Math.floor(Math.random() * 3) + 1;
          } else if (randomGamemode === 'lifesteal') {
            if (target.hearts < 40) target.hearts += 1;
            target.totalKills += 1;
          }

          list[randomIndex] = target;
          // re-sort by primary score
          if (randomGamemode === 'duels') {
            list.sort((a, b) => b.elo - a.elo);
          } else if (randomGamemode === 'lifesteal') {
            list.sort((a, b) => b.hearts - a.hearts || b.totalKills - a.totalKills);
          } else {
            list.sort((a, b) => b.wins - a.wins);
          }

          // re-index rank
          list.forEach((item, idx) => { item.rank = idx + 1; });
          copy[randomGamemode] = list;
        }
        return copy;
      });

      // Add a live ticker event
      const sampleEvents = [
        `[${randomGamemode.toUpperCase()}] Match concluded! Winner claimed victory and points.`,
        `[Lifesteal] BloodReaper eliminated an opponent in combat!`,
        `[Squid-Game] 14 players eliminated in Red Light Green Light!`,
        `[Duels] ComboGod_X won 1v1 Classic with 3 hearts remaining!`
      ];
      const newEvent = {
        gamemode: randomGamemode,
        text: sampleEvents[Math.floor(Math.random() * sampleEvents.length)],
        time: 'Just now',
        type: 'live'
      };
      setLiveEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 8000); // Live sync every 8 seconds

    return () => clearInterval(interval);
  }, [autoUpdateEnabled]);

  const currentList = leaderboardData[selectedGamemode] || [];

  // Filter based on search query
  const filteredList = currentList.filter(player =>
    player.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If not logged in, display up to top 5 players with gate for the rest
  const visibleList = isLoggedIn ? filteredList : filteredList.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Gamemode selector */}
      <div className="bg-[#24201c] border-4 border-[#3b342e] rounded p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="text-[#f3d052]" size={26} />
              <h1 className="font-minecraft text-xl text-[#f3d052]">
                SERVER LEADERBOARDS & RANKINGS
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Live statistics updated automatically from our Spigot / Paper / Velocity network.
            </p>
          </div>

          {/* Auto-Sync Indicator */}
          <div className="flex items-center gap-3 bg-[#171412] px-3 py-1.5 rounded border border-[#302a24]">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${autoUpdateEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {autoUpdateEnabled ? 'AUTO-SYNC ACTIVE' : 'PAUSED'}
              </span>
            </div>
            <button
              onClick={() => { playMinecraftClick(); setAutoUpdateEnabled(!autoUpdateEnabled); }}
              className="text-[11px] font-mono text-yellow-400 hover:underline border-l border-gray-700 pl-3"
            >
              {autoUpdateEnabled ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>

        {/* Gamemode Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#3b342e]">
          {[
            { id: 'squid-game', name: 'Squid-Game', icon: '🦑', desc: 'Deadly Minigames' },
            { id: 'duels', name: 'Duels', icon: '⚔️', desc: '1v1 Ranked PvP' },
            { id: 'pillars of fortune', name: 'Pillars of Fortune', icon: '🏛️', desc: 'Sky Drop Battle' },
            { id: 'lifesteal', name: 'Lifesteal', icon: '❤️', desc: 'Heart Extraction SMP' }
          ].map((mode) => {
            const isSelected = selectedGamemode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => { playMinecraftClick(); setSelectedGamemode(mode.id); }}
                className={`p-3 rounded border-2 text-left transition-all ${
                  isSelected
                    ? 'bg-[#3d3319] border-[#eab308] text-white shadow-lg'
                    : 'bg-[#1a1714] border-[#2c2621] text-gray-300 hover:bg-[#25201c]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{mode.icon}</span>
                  <span className="font-minecraft text-xs text-[#f3d052] uppercase">{mode.name}</span>
                </div>
                <div className="text-[10px] text-gray-400 font-mono mt-0.5">{mode.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Server Activity Feed / Ticker */}
      <div className="bg-[#1b1714] border-2 border-[#332b25] rounded p-2.5 flex items-center gap-3 text-xs overflow-hidden">
        <div className="bg-red-950/80 text-red-300 px-2 py-0.5 rounded text-[11px] font-minecraft flex items-center gap-1.5 shrink-0 border border-red-700/40">
          <Radio size={12} className="animate-pulse text-red-500" />
          LIVE FEED
        </div>
        <div className="flex-1 font-mono text-gray-300 truncate">
          {liveEvents[0]?.text}
        </div>
        <div className="text-[10px] font-mono text-gray-500 shrink-0">
          Last sync: {lastSyncTime}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between gap-3 bg-[#1d1916] p-3 rounded border border-[#302a24]">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search player username..."
            className="w-full bg-[#13110f] border border-[#362f29] rounded pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#558a28] font-mono"
          />
        </div>
        <div className="text-xs text-gray-400 font-mono">
          Showing <span className="text-yellow-400 font-bold">{visibleList.length}</span> competitors
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#211d19] border-4 border-[#3a3530] rounded shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#181512] text-[#f3d052] font-minecraft border-b-2 border-[#3a3530]">
              <tr>
                <th className="py-3 px-4 w-16 text-center">RANK</th>
                <th className="py-3 px-4">PLAYER</th>
                {selectedGamemode === 'squid-game' && (
                  <>
                    <th className="py-3 px-4 text-center">WINS</th>
                    <th className="py-3 px-4 text-center">WIN RATE</th>
                    <th className="py-3 px-4 text-center">SQUID KILLS</th>
                    <th className="py-3 px-4 text-center">GLASS SURVIVED</th>
                  </>
                )}
                {selectedGamemode === 'duels' && (
                  <>
                    <th className="py-3 px-4 text-center">ELO RATING</th>
                    <th className="py-3 px-4 text-center">1v1 WINS</th>
                    <th className="py-3 px-4 text-center">WIN STREAK</th>
                    <th className="py-3 px-4 text-center">KDR</th>
                  </>
                )}
                {selectedGamemode === 'pillars of fortune' && (
                  <>
                    <th className="py-3 px-4 text-center">TOTAL WINS</th>
                    <th className="py-3 px-4 text-center">KNOCKOUTS</th>
                    <th className="py-3 px-4 text-center">ROUNDS SURVIVED</th>
                    <th className="py-3 px-4 text-center">TIER</th>
                  </>
                )}
                {selectedGamemode === 'lifesteal' && (
                  <>
                    <th className="py-3 px-4 text-center">HEARTS</th>
                    <th className="py-3 px-4 text-center">TOTAL KILLS</th>
                    <th className="py-3 px-4 text-center">BANISHED</th>
                    <th className="py-3 px-4 text-center">CLAN</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c2621]">
              {visibleList.map((player) => {
                const isCurrentUser = user && user.username.toLowerCase() === player.username.toLowerCase();
                let rankBadge = `${player.rank}`;
                if (player.rank === 1) rankBadge = '🥇 #1';
                else if (player.rank === 2) rankBadge = '🥈 #2';
                else if (player.rank === 3) rankBadge = '🥉 #3';

                return (
                  <tr
                    key={player.username}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-[#3d3319] text-white font-bold'
                        : 'hover:bg-[#28231f] text-gray-200'
                    }`}
                  >
                    <td className="py-3 px-4 text-center font-bold font-minecraft text-amber-400">
                      {rankBadge}
                    </td>

                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={getPlayerAvatarUrl(player.username, 32)}
                        alt={player.username}
                        className="w-8 h-8 rounded border border-black/50 shadow-inner bg-[#111]"
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://mc-heads.net/avatar/Steve/32'; }}
                      />
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          <span>{player.username}</span>
                          {isCurrentUser && (
                            <span className="text-[10px] bg-yellow-400 text-black px-1.5 py-0.2 rounded font-sans font-bold">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-gray-500 font-sans">
                          {player.badge || player.division || player.tier || 'Player'}
                        </div>
                      </div>
                    </td>

                    {selectedGamemode === 'squid-game' && (
                      <>
                        <td className="py-3 px-4 text-center font-bold text-emerald-400">{player.wins}</td>
                        <td className="py-3 px-4 text-center text-gray-400">{player.winRate}</td>
                        <td className="py-3 px-4 text-center text-red-400 font-semibold">{player.squidFinalKills}</td>
                        <td className="py-3 px-4 text-center text-cyan-400">{player.glassBridgeSurvived}</td>
                      </>
                    )}

                    {selectedGamemode === 'duels' && (
                      <>
                        <td className="py-3 px-4 text-center font-bold text-amber-400">{player.elo}</td>
                        <td className="py-3 px-4 text-center text-emerald-400">{player.wins}</td>
                        <td className="py-3 px-4 text-center text-orange-400 font-bold">🔥 {player.winStreak}</td>
                        <td className="py-3 px-4 text-center text-gray-300">{player.kdr}</td>
                      </>
                    )}

                    {selectedGamemode === 'pillars of fortune' && (
                      <>
                        <td className="py-3 px-4 text-center font-bold text-emerald-400">{player.wins}</td>
                        <td className="py-3 px-4 text-center text-red-400">{player.knockouts}</td>
                        <td className="py-3 px-4 text-center text-cyan-400">{player.roundsSurvived}</td>
                        <td className="py-3 px-4 text-center text-purple-400 font-bold">{player.tier}</td>
                      </>
                    )}

                    {selectedGamemode === 'lifesteal' && (
                      <>
                        <td className="py-3 px-4 text-center font-bold text-red-500 flex items-center justify-center gap-1">
                          <Heart size={14} className="fill-red-500" />
                          <span>{player.hearts} / 40</span>
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-gray-200">{player.totalKills}</td>
                        <td className="py-3 px-4 text-center text-purple-400">{player.banishedPlayers}</td>
                        <td className="py-3 px-4 text-center font-bold text-yellow-400">[{player.clan}]</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Guest Lock Banner */}
        {!isLoggedIn && (
          <div className="p-4 bg-[#191512] border-t-2 border-[#3a3530] text-center">
            <p className="text-xs text-gray-400 mb-2 font-mono">
              🔒 You are viewing the Top 5 public preview. Log in with your in-game Minecraft account to unlock the full leaderboards, search all players, and check your own ranking!
            </p>
            <button
              onClick={() => { playMinecraftClick(); setIsLoginModalOpen(true); }}
              className="mc-btn px-6 py-2 text-xs font-minecraft text-white hover:text-yellow-300"
            >
              LOG IN TO UNLOCK ALL RANKS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
