import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { playMinecraftClick } from '../utils/minecraftAudio';
import { KeyRound, User, ShieldAlert, Sparkles, X } from 'lucide-react';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter your Minecraft Username.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your in-game password.');
      return;
    }
    setError('');
    login(username, password);
  };

  const fillQuickDemo = (demoName) => {
    playMinecraftClick();
    setUsername(demoName);
    setPassword('mcpass123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#231f1c] border-4 border-[#4a423b] rounded shadow-2xl relative p-6 text-gray-200">
        {/* Close Button */}
        <button
          onClick={() => { playMinecraftClick(); setIsLoginModalOpen(false); }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 bg-[#151210] border border-[#3b342e] rounded text-xs font-mono text-emerald-400 mb-2">
            SERVER AUTHENTICATION GATEWAY
          </div>
          <h2 className="font-minecraft text-xl text-[#f3d052] tracking-wide">
            PLAYER LOG IN
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Log in using your in-game Minecraft username & AuthMe password.
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-950/80 border border-red-500/50 p-2.5 rounded text-xs text-red-200 flex items-center gap-2">
            <ShieldAlert size={16} className="text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-minecraft text-gray-300 mb-1">
              Minecraft Username (IGN):
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Steve, VenomPlayer"
                className="w-full bg-[#141210] border-2 border-[#3c3630] rounded pl-10 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#558a28] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-minecraft text-gray-300 mb-1">
              In-Game Server Password:
            </label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#141210] border-2 border-[#3c3630] rounded pl-10 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#558a28] font-mono"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              *The same password you set via <code className="text-yellow-400">/register &lt;pass&gt;</code> in the lobby.
            </p>
          </div>

          {/* Quick Demo Pre-fill for Testing */}
          <div className="bg-[#191614] p-2.5 rounded border border-[#2f2924] text-xs">
            <span className="text-gray-400 font-minecraft text-[11px] block mb-1.5 flex items-center gap-1">
              <Sparkles size={12} className="text-yellow-400" />
              Quick Demo Logins (Click to prefill):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['SangWoo_67', 'ComboGod_X', 'BloodReaper', 'Steve'].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => fillQuickDemo(name)}
                  className="bg-[#2a2420] hover:bg-[#3d342e] text-emerald-300 border border-[#3e352d] px-2 py-0.5 rounded text-[11px] font-mono"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              className="mc-btn flex-1 py-2.5 text-sm font-minecraft text-white hover:text-yellow-300"
            >
              LOG IN
            </button>
            <button
              type="button"
              onClick={() => { playMinecraftClick(); setIsLoginModalOpen(false); }}
              className="mc-btn-dark px-4 py-2.5 text-xs text-gray-300"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
