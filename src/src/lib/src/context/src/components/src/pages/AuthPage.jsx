import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!username.trim()) throw new Error('Username is required');
        const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: cleanUsername,
              full_name: fullName.trim() || cleanUsername,
            }
          }
        });
        if (error) throw error;
        alert('Account created! Logging in...');
        navigate('/');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-[#111521] border border-[#1E2538] rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-black text-center text-white mb-2">
        {isSignUp ? 'Join the League' : 'Welcome Back'}
      </h2>
      <p className="text-xs text-center text-gray-400 mb-6">
        {isSignUp ? 'Create your profile to start voting and competing' : 'Enter your credentials to enter BSL'}
      </p>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
        {isSignUp && (
          <>
            <div>
              <label className="text-xs text-gray-300 font-semibold mb-1 block">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tony Stark"
                className="w-full bg-[#080A10] border border-[#1E2538] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5B8CFF]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 font-semibold mb-1 block">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tony_stark"
                className="w-full bg-[#080A10] border border-[#1E2538] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5B8CFF]"
              />
            </div>
          </>
        )}

        <div>
          <label className="text-xs text-gray-300 font-semibold mb-1 block">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="member@league.com"
            className="w-full bg-[#080A10] border border-[#1E2538] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5B8CFF]"
          />
        </div>

        <div>
          <label className="text-xs text-gray-300 font-semibold mb-1 block">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#080A10] border border-[#1E2538] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5B8CFF]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-2.5 rounded-lg bg-[#5B8CFF] hover:bg-blue-600 font-bold text-sm text-white shadow-lg shadow-[#5B8CFF]/20 transition-all disabled:opacity-50"
        >
          {loading ? 'Processing...' : isSignUp ? 'Create Member Profile' : 'Sign In'}
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-xs text-gray-400 hover:text-[#5B8CFF] transition-colors"
        >
          {isSignUp ? 'Already a member? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}
