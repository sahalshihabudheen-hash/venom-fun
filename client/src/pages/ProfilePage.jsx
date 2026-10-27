import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPlayerBodyUrl, getPlayerAvatarUrl } from '../utils/leaderboardData';
import { playMinecraftClick, playLevelUpSound } from '../utils/minecraftAudio';
import confetti from 'canvas-confetti';
import { Shield, Heart, Trophy, Swords, Sparkles, Gift, LogOut, CheckCircle, Copy, Terminal, ExternalLink } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [claimedReward, setClaimedReward] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-md mx-auto my-16 glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 text-center shadow-2xl">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
          <Shield size={26} />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Player Profile Access</h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 mb-6">
          You must log in with your in-game Minecraft account to access your personal stats, Lifesteal hearts, and claim daily rewards.
        </p>
        <Link
          to="/login"
          onClick={playMinecraftClick}
          className="btn-primary w-full py-3 text-sm font-semibold justify-center"
        >
          Go to Player Log In
        </Link>
      </div>
    );
  }

  const handleClaimReward = () => {
    if (claimedReward) return;
    playLevelUpSound();
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 }
    });
    setClaimedReward(true);
  };

  const handleCopyLinkCode = () => {
    playMinecraftClick();
    navigator.clipboard.writeText(`/link VENOM-${user.username.toUpperCase()}-77`);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const fullHearts = Math.floor(user.hearts / 2);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Profile Overview Card */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Skin Render Column */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-36 h-64 bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex items-center justify-center shadow-inner relative group">
              <img
                src={getPlayerBodyUrl(user.username)}
                alt={user.username}
                className="max-h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-105"
                onError={(e) => { e.target.src = 'https://mc-heads.net/body/Steve/right'; }}
              />
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE IN LOBBY</span>
            </div>
          </div>

          {/* Player Information & Stats Column */}
          <div className="flex-1 text-center md:text-left space-y-5 w-full">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {user.username}
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-0.5 rounded-full text-xs font-mono font-bold">
                {user.rank}
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-0.5 rounded-full text-xs font-mono font-medium">
                Clan: [{user.clan}]
              </span>
            </div>

            {/* Lifesteal Hearts Meter */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="flex items-center gap-2 font-bold text-rose-400 uppercase tracking-wider">
                  <Heart size={16} className="fill-rose-500 text-rose-500 animate-pulse" />
                  Lifesteal Hearts Capacity
                </span>
                <span className="font-bold text-white text-sm">
                  {user.hearts} / {user.maxHearts} HP
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 20 }).map((_, i) => {
                  const isAlive = i < fullHearts;
                  return (
                    <span
                      key={i}
                      className={`text-base transition-transform ${isAlive ? 'opacity-100 hover:scale-125 cursor-pointer' : 'opacity-20 grayscale'}`}
                      title={`Heart ${i + 1}`}
                    >
                      ❤️
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Gamemode Performance Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-slate-400 text-xs font-mono uppercase">Duels Rating</div>
                <div className="text-amber-400 font-extrabold text-lg mt-0.5 font-mono">{user.duelsElo} ELO</div>
                <div className="text-[10px] text-slate-500 font-mono">Ranked 1v1</div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-slate-400 text-xs font-mono uppercase">Squid-Game Wins</div>
                <div className="text-pink-400 font-extrabold text-lg mt-0.5 font-mono">{user.squidWins}</div>
                <div className="text-[10px] text-slate-500 font-mono">Final Survivor</div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-slate-400 text-xs font-mono uppercase">Pillars Wins</div>
                <div className="text-cyan-400 font-extrabold text-lg mt-0.5 font-mono">{user.pillarsWins}</div>
                <div className="text-[10px] text-slate-500 font-mono">Void Survivor</div>
              </div>
            </div>

            {/* In-Game Sync Command */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[11px] block">In-Game Link Sync Command:</span>
                <code className="text-emerald-300 font-bold">/link VENOM-{user.username.toUpperCase()}-77</code>
              </div>
              <button
                onClick={handleCopyLinkCode}
                className="btn-secondary px-3.5 py-1.5 text-xs font-semibold shrink-0 flex items-center gap-1.5"
              >
                {copiedToken ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedToken ? 'Copied Command!' : 'Copy Command'}
              </button>
            </div>
          </div>
        </div>

        {/* Claim Rewards & Action Controls */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleClaimReward}
            disabled={claimedReward}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              claimedReward
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60 cursor-default'
                : 'btn-primary'
            }`}
          >
            <Gift size={16} />
            {claimedReward ? 'Daily Reward Claimed (+250 In-Game Coins)!' : 'Claim Daily In-Game Reward'}
          </button>

          <button
            onClick={handleLogout}
            className="btn-secondary px-4 py-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border-rose-900/40 flex items-center gap-2"
          >
            <LogOut size={15} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
