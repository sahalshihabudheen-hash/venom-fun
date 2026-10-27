import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPlayerBodyUrl, getPlayerAvatarUrl } from '../utils/leaderboardData';
import { playMinecraftClick, playLevelUpSound, playHeartGainSound } from '../utils/minecraftAudio';
import confetti from 'canvas-confetti';
import { Shield, Heart, Trophy, Swords, Sparkles, Gift, LogOut, CheckCircle, Copy } from 'lucide-react';

export default function ProfileView() {
  const { user, isLoggedIn, logout, setIsLoginModalOpen } = useAuth();
  const [claimedReward, setClaimedReward] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-[#231e1a] border-4 border-[#3e352d] rounded text-center">
        <h2 className="font-minecraft text-xl text-[#f3d052] mb-3">PLAYER PROFILE ACCESS</h2>
        <p className="text-xs text-gray-300 mb-6">
          You must log in with your in-game Minecraft account to view your player stats, hearts, clan info, and claim server gifts.
        </p>
        <button
          onClick={() => { playMinecraftClick(); setIsLoginModalOpen(true); }}
          className="mc-btn px-6 py-2.5 text-xs font-minecraft text-white hover:text-yellow-300"
        >
          LOG IN NOW
        </button>
      </div>
    );
  }

  const handleClaimReward = () => {
    if (claimedReward) return;
    playLevelUpSound();
    confetti({
      particleCount: 100,
      spread: 70,
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

  // Build Minecraft Heart Icons
  const fullHearts = Math.floor(user.hearts / 2);
  const hasHalfHeart = user.hearts % 2 !== 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Profile Card Header */}
      <div className="bg-[#24201c] border-4 border-[#3b342e] rounded p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Skin Render */}
          <div className="relative group shrink-0">
            <div className="w-32 h-64 bg-[#14110f] border-2 border-[#3d342c] rounded flex items-center justify-center p-2 shadow-inner">
              <img
                src={getPlayerBodyUrl(user.username)}
                alt={user.username}
                className="max-h-full object-contain filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]"
                onError={(e) => { e.target.src = 'https://mc-heads.net/body/Steve/right'; }}
              />
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-800">
                ● ONLINE IN LOBBY
              </span>
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="font-minecraft text-2xl text-[#f3d052]">
                {user.username}
              </h1>
              <span className="font-minecraft text-xs bg-yellow-500 text-black px-2 py-0.5 rounded font-bold shadow">
                {user.rank}
              </span>
              <span className="text-xs font-mono bg-[#181512] text-gray-300 px-2 py-0.5 rounded border border-[#3b332b]">
                Clan: [{user.clan}]
              </span>
            </div>

            {/* Lifesteal Hearts Bar */}
            <div className="bg-[#181512] p-3 rounded border border-[#383029]">
              <div className="flex items-center justify-between text-xs font-mono text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5 font-bold text-red-400">
                  <Heart size={14} className="fill-red-500 text-red-500" />
                  Lifesteal Hearts:
                </span>
                <span className="font-bold text-white">{user.hearts} / {user.maxHearts} HP</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 20 }).map((_, i) => {
                  const isAlive = i < fullHearts;
                  return (
                    <span
                      key={i}
                      className={`text-sm ${isAlive ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}
                      title={`Heart ${i + 1}`}
                    >
                      ❤️
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Gamemode Stats Quick Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="bg-[#191512] p-2 rounded border border-[#302923]">
                <div className="text-gray-400 text-[10px]">⚔️ DUELS ELO</div>
                <div className="text-amber-400 font-bold text-sm">{user.duelsElo}</div>
              </div>
              <div className="bg-[#191512] p-2 rounded border border-[#302923]">
                <div className="text-gray-400 text-[10px]">🦑 SQUID WINS</div>
                <div className="text-emerald-400 font-bold text-sm">{user.squidWins}</div>
              </div>
              <div className="bg-[#191512] p-2 rounded border border-[#302923]">
                <div className="text-gray-400 text-[10px]">🏛️ PILLARS WINS</div>
                <div className="text-cyan-400 font-bold text-sm">{user.pillarsWins}</div>
              </div>
            </div>

            {/* In-game Link Command */}
            <div className="bg-[#14110f] p-3 rounded border border-[#302923] flex items-center justify-between gap-3 text-xs font-mono">
              <div>
                <span className="text-gray-400 text-[11px] block">In-Game Link Sync Command:</span>
                <code className="text-yellow-400">/link VENOM-{user.username.toUpperCase()}-77</code>
              </div>
              <button
                onClick={handleCopyLinkCode}
                className="mc-btn-sm shrink-0 flex items-center gap-1"
              >
                {copiedToken ? <CheckCircle size={12} className="text-green-400" /> : <Copy size={12} />}
                {copiedToken ? 'Copied!' : 'Copy Command'}
              </button>
            </div>
          </div>
        </div>

        {/* Claim Daily Rewards & Logout Action Bar */}
        <div className="mt-6 pt-4 border-t-2 border-[#3b342e] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleClaimReward}
            disabled={claimedReward}
            className={`px-4 py-2 rounded text-xs font-minecraft flex items-center gap-2 transition-all ${
              claimedReward
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700 cursor-default'
                : 'mc-btn text-white hover:text-yellow-300'
            }`}
          >
            <Gift size={16} />
            {claimedReward ? 'Daily Reward Claimed (+250 Coins)!' : 'Claim Daily In-Game Reward'}
          </button>

          <button
            onClick={logout}
            className="mc-btn-dark px-4 py-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5"
          >
            <LogOut size={14} />
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
}
