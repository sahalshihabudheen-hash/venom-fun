import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_LEADERBOARD, LIVE_ACTIVITY_EVENTS, getPlayerAvatarUrl } from '../utils/leaderboardData';
import { useAuth } from '../context/AuthContext';
import { playMinecraftClick } from '../utils/minecraftAudio';
import { Trophy, Radio, Search, Heart, Swords, Shield, Sparkles, User, Lock, ArrowRight } from 'lucide-react';

export default function LeaderboardsPage() {
  const { isLoggedIn, user } = useAuth();
  const [selectedGamemode, setSelectedGamemode] = useState('squid-game');
  const [leaderboardData, setLeaderboardData] = useState(INITIAL_LEADERBOARD);
  const [liveEvents, setLiveEvents] = useState(LIVE_ACTIVITY_EVENTS);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState('Just now');

  useEffect(() => {
    if (!autoUpdateEnabled) return;

    const interval = setInterval(() => {
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
          if (randomGamemode === 'duels') {
            list.sort((a, b) => b.elo - a.elo);
          } else if (randomGamemode === 'lifesteal') {
            list.sort((a, b) => b.hearts - a.hearts || b.totalKills - a.totalKills);
          } else {
            list.sort((a, b) => b.wins - a.wins);
          }

          list.forEach((item, idx) => { item.rank = idx + 1; });
          copy[randomGamemode] = list;
        }
        return copy;
      });

      const sampleEvents = [
        `[${randomGamemode.toUpperCase()}] Official match completed! Rankings updated.`,
        `[Lifesteal] BloodReaper eliminated an opponent in combat!`,
        `[Squid-Game] 12 players eliminated in Red Light Green Light!`,
        `[Duels] ComboGod_X won 1v1 Nodebuff with 3 hearts remaining!`
      ];
      const newEvent = {
        gamemode: randomGamemode,
        text: sampleEvents[Math.floor(Math.random() * sampleEvents.length)],
        time: 'Just now',
        type: 'live'
      };
      setLiveEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 7000);

    return () => clearInterval(interval);
  }, [autoUpdateEnabled]);

  const currentList = leaderboardData[selectedGamemode] || [];

  const filteredList = currentList.filter(player =>
    player.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleList = isLoggedIn ? filteredList : filteredList.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header Card */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Trophy size={14} /> Competitive Rankings
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Server Leaderboards
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Live statistics updated automatically from our Spigot / Paper / Velocity network.
            </p>
          </div>

          {/* Live Sync Status Pill */}
          <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${autoUpdateEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {autoUpdateEnabled ? 'LIVE SYNC ACTIVE' : 'SYNC PAUSED'}
              </span>
            </div>
            <button
              onClick={() => { playMinecraftClick(); setAutoUpdateEnabled(!autoUpdateEnabled); }}
              className="text-xs font-mono text-slate-400 hover:text-white border-l border-slate-800 pl-3 transition-colors"
            >
              {autoUpdateEnabled ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>

        {/* Gamemode Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-slate-800">
          {[
            { id: 'squid-game', name: 'Squid-Game', icon: '🦑', desc: 'Deadly Minigames' },
            { id: 'duels', name: 'Duels', icon: '⚔️', desc: '1v1 Ranked Combat' },
            { id: 'pillars of fortune', name: 'Pillars of Fortune', icon: '🏛️', desc: 'Sky Drop Battle' },
            { id: 'lifesteal', name: 'Lifesteal SMP', icon: '❤️', desc: 'Heart Extraction' }
          ].map((mode) => {
            const isSelected = selectedGamemode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => { playMinecraftClick(); setSelectedGamemode(mode.id); }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/50 shadow-md scale-[1.01]'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{mode.icon}</span>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">{mode.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{mode.desc}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Server Event Ticker */}
      <div className="glass-panel p-3 rounded-2xl flex items-center gap-3 text-xs overflow-hidden border border-slate-800">
        <div className="bg-red-500/10 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-lg font-mono font-bold flex items-center gap-2 shrink-0">
          <Radio size={14} className="animate-pulse text-red-400" />
          LIVE FEED
        </div>
        <div className="flex-1 font-mono text-slate-300 truncate">
          {liveEvents[0]?.text}
        </div>
        <div className="text-[11px] font-mono text-slate-500 shrink-0 hidden sm:block">
          Sync: {lastSyncTime}
        </div>
      </div>

      {/* Search and Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search player username..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-mono transition-all"
          />
        </div>
        <div className="text-xs font-mono text-slate-400">
          Showing <span className="text-emerald-400 font-bold">{visibleList.length}</span> ranked players
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-xs uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-5 w-20 text-center">Rank</th>
                <th className="py-4 px-5">Player</th>
                {selectedGamemode === 'squid-game' && (
                  <>
                    <th className="py-4 px-5 text-center">Wins</th>
                    <th className="py-4 px-5 text-center">Win Rate</th>
                    <th className="py-4 px-5 text-center">Squid Kills</th>
                    <th className="py-4 px-5 text-center">Glass Survived</th>
                  </>
                )}
                {selectedGamemode === 'duels' && (
                  <>
                    <th className="py-4 px-5 text-center">Elo Rating</th>
                    <th className="py-4 px-5 text-center">1v1 Wins</th>
                    <th className="py-4 px-5 text-center">Win Streak</th>
                    <th className="py-4 px-5 text-center">KDR</th>
                  </>
                )}
                {selectedGamemode === 'pillars of fortune' && (
                  <>
                    <th className="py-4 px-5 text-center">Wins</th>
                    <th className="py-4 px-5 text-center">Knockouts</th>
                    <th className="py-4 px-5 text-center">Rounds Survived</th>
                    <th className="py-4 px-5 text-center">Tier</th>
                  </>
                )}
                {selectedGamemode === 'lifesteal' && (
                  <>
                    <th className="py-4 px-5 text-center">Hearts</th>
                    <th className="py-4 px-5 text-center">Total Kills</th>
                    <th className="py-4 px-5 text-center">Banished</th>
                    <th className="py-4 px-5 text-center">Clan</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {visibleList.map((player) => {
                const isCurrentUser = user && user.username.toLowerCase() === player.username.toLowerCase();
                let rankBadge = `#${player.rank}`;
                let rankColor = 'text-slate-400';
                if (player.rank === 1) { rankBadge = '🥇 #1'; rankColor = 'text-amber-400 font-bold'; }
                else if (player.rank === 2) { rankBadge = '🥈 #2'; rankColor = 'text-slate-300 font-bold'; }
                else if (player.rank === 3) { rankBadge = '🥉 #3'; rankColor = 'text-amber-600 font-bold'; }

                return (
                  <tr
                    key={player.username}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-emerald-500/10 font-bold text-white'
                        : 'hover:bg-slate-800/40 text-slate-200'
                    }`}
                  >
                    <td className={`py-4 px-5 text-center ${rankColor}`}>
                      {rankBadge}
                    </td>

                    <td className="py-4 px-5 flex items-center gap-3 font-sans">
                      <img
                        src={getPlayerAvatarUrl(player.username, 36)}
                        alt={player.username}
                        className="w-8 h-8 rounded-lg border border-slate-700 bg-slate-900 shadow"
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://mc-heads.net/avatar/Steve/36'; }}
                      />
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{player.username}</span>
                          {isCurrentUser && (
                            <span className="text-[10px] bg-emerald-500 text-black px-1.5 py-0.2 rounded font-mono font-bold">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {player.badge || player.division || player.tier || 'Player'}
                        </div>
                      </div>
                    </td>

                    {selectedGamemode === 'squid-game' && (
                      <>
                        <td className="py-4 px-5 text-center font-bold text-emerald-400">{player.wins}</td>
                        <td className="py-4 px-5 text-center text-slate-400">{player.winRate}</td>
                        <td className="py-4 px-5 text-center text-rose-400 font-semibold">{player.squidFinalKills}</td>
                        <td className="py-4 px-5 text-center text-cyan-400">{player.glassBridgeSurvived}</td>
                      </>
                    )}

                    {selectedGamemode === 'duels' && (
                      <>
                        <td className="py-4 px-5 text-center font-bold text-amber-400">{player.elo}</td>
                        <td className="py-4 px-5 text-center text-emerald-400">{player.wins}</td>
                        <td className="py-4 px-5 text-center text-orange-400 font-bold">🔥 {player.winStreak}</td>
                        <td className="py-4 px-5 text-center text-slate-300">{player.kdr}</td>
                      </>
                    )}

                    {selectedGamemode === 'pillars of fortune' && (
                      <>
                        <td className="py-4 px-5 text-center font-bold text-emerald-400">{player.wins}</td>
                        <td className="py-4 px-5 text-center text-rose-400">{player.knockouts}</td>
                        <td className="py-4 px-5 text-center text-cyan-400">{player.roundsSurvived}</td>
                        <td className="py-4 px-5 text-center text-purple-400 font-bold">{player.tier}</td>
                      </>
                    )}

                    {selectedGamemode === 'lifesteal' && (
                      <>
                        <td className="py-4 px-5 text-center font-bold text-rose-500 flex items-center justify-center gap-1.5">
                          <Heart size={14} className="fill-rose-500" />
                          <span>{player.hearts} / 40</span>
                        </td>
                        <td className="py-4 px-5 text-center font-semibold text-slate-200">{player.totalKills}</td>
                        <td className="py-4 px-5 text-center text-purple-400">{player.banishedPlayers}</td>
                        <td className="py-4 px-5 text-center text-amber-400 font-bold">[{player.clan}]</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Public Preview Lock Gate */}
        {!isLoggedIn && (
          <div className="p-6 bg-slate-950/90 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Lock size={16} className="text-amber-400" />
                Viewing Top 5 Public Preview
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Log in with your in-game Minecraft account to unlock complete ladder rankings, custom stats comparisons, and your personal combat card.
              </p>
            </div>

            <Link
              to="/login"
              onClick={playMinecraftClick}
              className="btn-primary px-5 py-2.5 text-xs font-semibold shrink-0"
            >
              Log In to Unlock Full Ladder
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
