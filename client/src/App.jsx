import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Dedicated Separate Pages
import HomePage from './pages/HomePage';
import GamemodesPage from './pages/GamemodesPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import SchematicsPage from './pages/SchematicsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gamemodes" element={<GamemodesPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
              <Route path="/schematics" element={<SchematicsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
