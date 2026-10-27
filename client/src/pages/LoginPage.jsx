import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { playMinecraftClick } from '../utils/minecraftAudio';
import { KeyRound, User, ShieldCheck, Sparkles, ArrowRight, AlertCircle, Info } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already logged in, redirect to profile
  if (isLoggedIn) {
    navigate('/profile');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter your exact in-game Minecraft username.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your in-game server password.');
      return;
    }

    setError('');
    login(username, password);
    navigate('/profile');
  };

  const handleQuickDemo = (demoName) => {
    playMinecraftClick();
    setUsername(demoName);
    setPassword('demoPass123');
  };

  return (
    <div className="max-w-md mx-auto my-12 animate-fade-in">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} /> Server Authentication Gateway
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Player In-Game Log In
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Log in using your Minecraft in-game username & AuthMe server password.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-rose-950/70 border border-rose-500/50 p-3.5 rounded-xl text-xs text-rose-200 flex items-center gap-2.5">
            <AlertCircle size={16} className="text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Minecraft Username (IGN)
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Steve, BloodReaper"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              In-Game Server Password
            </label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5 font-sans">
              <Info size={13} className="text-emerald-400 shrink-0" />
              <span>Password registered via <code className="text-emerald-300 font-mono">/register &lt;pass&gt;</code> in the server lobby.</span>
            </p>
          </div>

          {/* Quick Demo Pre-fills */}
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
              <Sparkles size={13} className="text-amber-400" />
              <span>Quick Test Accounts (Click to prefill):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['SangWoo_67', 'ComboGod_X', 'BloodReaper', 'Steve'].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleQuickDemo(name)}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 px-2.5 py-1 rounded-lg text-xs font-mono transition-all"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3.5 text-sm font-semibold justify-center shadow-xl"
          >
            <span>Log In to Account</span>
            <ArrowRight size={16} className="ml-1.5" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400 font-sans">
          Haven't joined yet? Connect to <strong className="text-white font-mono">play.venomfun.net</strong> in Minecraft and type <code className="text-emerald-400 font-mono">/register</code> to get started.
        </div>
      </div>
    </div>
  );
}
