import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import { useAuth } from './context/AuthContext';
import { Flame, Trophy, Users, ShieldAlert } from 'lucide-react';

function HomePage() {
  const { profile } = useAuth();
  return (
    <div className="max-w-4xl mx-auto p-4 pb-24 text-center space-y-8">
      <div className="pt-8">
        <div className="inline-block px-3 py-1 rounded-full bg-[#5B8CFF]/10 border border-[#5B8CFF]/20 text-xs font-semibold text-[#5B8CFF] mb-3">
          Official Community League
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          BOYS SOCIAL LEAGUE
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-2 max-w-lg mx-auto">
          Participate in live battles, cast verified votes, and rank among the top champions of the club.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#111521] border border-[#1E2538] p-4 rounded-xl">
          <Flame className="text-[#5B8CFF] mx-auto mb-1" size={24} />
          <div className="text-lg font-bold">Realtime</div>
          <div className="text-[11px] text-gray-400">Live Polls</div>
        </div>
        <div className="bg-[#111521] border border-[#1E2538] p-4 rounded-xl">
          <Trophy className="text-amber-400 mx-auto mb-1" size={24} />
          <div className="text-lg font-bold">XP Based</div>
          <div className="text-[11px] text-gray-400">Leaderboard</div>
        </div>
        <div className="bg-[#111521] border border-[#1E2538] p-4 rounded-xl">
          <Users className="text-[#8B5CF6] mx-auto mb-1" size={24} />
          <div className="text-lg font-bold">Verified</div>
          <div className="text-[11px] text-gray-400">Profiles</div>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
        <Link
          to="/vote"
          className="px-6 py-3 rounded-xl bg-[#5B8CFF] hover:bg-blue-600 font-bold text-white shadow-lg shadow-[#5B8CFF]/25"
        >
          Enter Battle Arena
        </Link>
        {!profile && (
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-[#1E2538] bg-[#111521] hover:border-[#5B8CFF] font-semibold text-gray-200"
          >
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#080A10] text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/vote" element={<div className="p-8 text-center text-gray-400">Live Voting Arena Ready</div>} />
          <Route path="/leaderboard" element={<div className="p-8 text-center text-gray-400">Leaderboard Ready</div>} />
          <Route path="/discover" element={<div className="p-8 text-center text-gray-400">Discover Members Ready</div>} />
          <Route path="/u/:username" element={<div className="p-8 text-center text-gray-400">Member Profile Ready</div>} />
        </Routes>
      </main>
    </div>
  );
}
