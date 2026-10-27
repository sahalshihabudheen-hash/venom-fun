import React, { createContext, useContext, useState, useEffect } from 'react';
import { playLevelUpSound, playMinecraftClick } from '../utils/minecraftAudio';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('venom_fun_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('venom_fun_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('venom_fun_user');
    }
  }, [user]);

  // Login handler accepting In-Game username & password
  const login = (username, password) => {
    playLevelUpSound();
    // In production this verifies against AuthMe / FastLogin MySQL or server API
    const formattedUsername = username.trim();
    const newUser = {
      username: formattedUsername,
      rank: formattedUsername.toLowerCase().includes('admin') ? 'ADMIN' : (formattedUsername.length > 8 ? 'VIP+' : 'MEMBER'),
      hearts: Math.floor(Math.random() * 20) + 16, // Lifesteal hearts (16-36)
      maxHearts: 40,
      duelsElo: 1400 + Math.floor(Math.random() * 600),
      squidWins: Math.floor(Math.random() * 45),
      pillarsWins: Math.floor(Math.random() * 60),
      joinedDate: '2026-03-15',
      clan: 'VENOM'
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
    return true;
  };

  const logout = () => {
    playMinecraftClick();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
