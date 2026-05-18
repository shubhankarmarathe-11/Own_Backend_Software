import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/master/signup', { name, email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data || 'Signup failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await api.post('/master/oauth', { google_token: credentialResponse.credential });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data || 'Google authentication failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl -z-10 opacity-60"></div>
      
      <Link to="/" className="absolute top-8 left-8 text-gray-500 hover:text-black font-medium flex items-center gap-2 transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Home
      </Link>

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-black flex items-center justify-center text-white font-bold text-2xl shadow-md">
            B
          </div>
        </div>
        <h2 className="mb-8 text-3xl font-extrabold text-gray-900 text-center tracking-tight">Create Account</h2>
        {error && <div className="mb-6 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 font-medium">{error}</div>}
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-gray-500 mt-2 font-medium">Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char</p>
          </div>
          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg rounded-xl transition-all mt-8 shadow-lg shadow-gray-300 font-bold tracking-wide">
            Sign Up
          </Button>
        </form>
        
        <div className="mt-8 flex items-center justify-center">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="px-4 text-gray-400 text-sm font-medium bg-white">OR</span>
          <div className="border-t border-gray-200 w-full"></div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setError('Google signup failed');
            }}
            useOneTap
            theme="outline"
            shape="rectangular"
          />
        </div>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Already have an account? <Link to="/login" className="text-black hover:text-gray-700 font-bold ml-1 transition-colors hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
