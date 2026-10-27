import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { playMinecraftClick } from '../utils/minecraftAudio';
import { getPlayerAvatarUrl } from '../utils/leaderboardData';
import { Home, Trophy, Layers, Swords, User, LogIn, Menu, X, Shield, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, isLoggedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/gamemodes', label: 'Gamemodes', icon: Swords },
    { to: '/leaderboards', label: 'Leaderboards', icon: Trophy, live: true },
    { to: '/schematics', label: '3D Schematics', icon: Layers, badge: 'PRO' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090c10]/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={playMinecraftClick}
            className="flex items-center gap-3 group select-none"
          >
            <img
              src="/images/server_logo.png"
              alt="VENOM_FUN"
              className="h-11 w-auto max-w-[200px] object-contain transition-transform group-hover:scale-105"
              onError={(e) => { e.target.src = '/images/server_logo_alt.png'; }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={playMinecraftClick}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                  {item.live && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                  )}
                  {item.badge && (
                    <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.2 rounded-full font-bold ml-1">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* User Account / Login Button */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                to="/profile"
                onClick={playMinecraftClick}
                className="flex items-center gap-3 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/70 px-3.5 py-1.5 rounded-xl transition-all shadow-sm group"
              >
                <img
                  src={getPlayerAvatarUrl(user.username, 36)}
                  alt={user.username}
                  className="w-8 h-8 rounded-lg border border-slate-700 shadow bg-slate-950"
                  onError={(e) => { e.target.src = 'https://mc-heads.net/avatar/Steve/36'; }}
                />
                <div className="text-left font-sans">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{user.username}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono font-medium">
                      {user.rank}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-red-400 font-medium">
                    ❤️ {user.hearts} HP
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={playMinecraftClick}
                className="btn-primary px-4 py-2 text-sm font-semibold flex items-center gap-2"
              >
                <LogIn size={16} />
                <span>Player Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {isLoggedIn && (
              <Link to="/profile" onClick={playMinecraftClick}>
                <img
                  src={getPlayerAvatarUrl(user.username, 32)}
                  alt={user.username}
                  className="w-8 h-8 rounded-lg border border-emerald-500"
                />
              </Link>
            )}
            <button
              onClick={() => { playMinecraftClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-slate-800 p-4 space-y-2">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => { playMinecraftClick(); setMobileMenuOpen(false); }}
              className={({ isActive }) =>
                `w-full text-left p-3 rounded-lg text-sm font-medium flex items-center justify-between ${
                  isActive ? 'bg-emerald-500/15 text-emerald-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.live && <span className="text-[11px] text-emerald-400 font-mono">● LIVE</span>}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-slate-800">
            {isLoggedIn ? (
              <Link
                to="/profile"
                onClick={() => { playMinecraftClick(); setMobileMenuOpen(false); }}
                className="block text-center p-3 rounded-lg text-sm font-medium bg-slate-800 text-slate-200"
              >
                My Account ({user.username})
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => { playMinecraftClick(); setMobileMenuOpen(false); }}
                className="btn-primary w-full py-3 text-sm font-semibold justify-center"
              >
                In-Game Player Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
