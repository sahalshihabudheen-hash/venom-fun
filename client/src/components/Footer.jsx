import React from 'react';
import { Link } from 'react-router-dom';
import { playMinecraftClick } from '../utils/minecraftAudio';
import { Shield, Heart, Terminal, Sparkles, ExternalLink, Server } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-800/80 bg-[#07090d] text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 text-sm">
        <div>
          <img
            src="/images/server_logo.png"
            alt="VENOM_FUN"
            className="h-9 w-auto object-contain mb-4"
            onError={(e) => { e.target.src = '/images/server_logo_alt.png'; }}
          />
          <p className="text-slate-400 text-xs leading-relaxed">
            The next-generation competitive Minecraft network engineered for high-tickrate PvP, tactical minigames, and hardcore survival.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>play.venomfun.net</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3.5">
            Gamemodes
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/gamemodes" onClick={playMinecraftClick} className="hover:text-emerald-400 transition-colors">🦑 Squid-Game Challenges</Link></li>
            <li><Link to="/gamemodes" onClick={playMinecraftClick} className="hover:text-emerald-400 transition-colors">⚔️ Ranked 1v1 & 2v2 Duels</Link></li>
            <li><Link to="/gamemodes" onClick={playMinecraftClick} className="hover:text-emerald-400 transition-colors">🏛️ Pillars of Fortune</Link></li>
            <li><Link to="/gamemodes" onClick={playMinecraftClick} className="hover:text-emerald-400 transition-colors">❤️ Lifesteal Hardcore SMP</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3.5">
            Platform Tools
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/schematics" onClick={playMinecraftClick} className="hover:text-emerald-400 transition-colors">🧱 3D Schematics Studio</Link></li>
            <li><Link to="/leaderboards" onClick={playMinecraftClick} className="hover:text-emerald-400 transition-colors">📊 Automatic Live Leaderboards</Link></li>
            <li><Link to="/login" onClick={playMinecraftClick} className="hover:text-emerald-400 transition-colors">🔐 In-Game Account Sync</Link></li>
            <li><Link to="/profile" onClick={playMinecraftClick} className="hover:text-emerald-400 transition-colors">👤 Player Combat Profile</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3.5">
            Legal & Support
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft. Minecraft is copyright Mojang AB. VENOM_FUN is an independent community server network.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <div>&copy; {new Date().getFullYear()} VENOM_FUN Network. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-500 font-medium">Java Port: 25565</span>
          <span>•</span>
          <span className="text-cyan-400 font-medium">Bedrock Port: 19132</span>
        </div>
      </div>
    </footer>
  );
}
