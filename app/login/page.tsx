"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase'; // Ensure this path matches your firebase config file
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const message = "ESTABLISHING SECURE CONNECTION...";

  // Typing Effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Firebase Login Logic
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setIsLoggingIn(false);
      setError("ACCESS DENIED: INVALID STAKEHOLDER CREDENTIALS");
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center font-mono p-4">
      <div className="w-full max-w-md border border-zinc-900 bg-zinc-950/40 p-8 shadow-2xl backdrop-blur-md">
        
        {/* Terminal Header */}
        <div className="mb-8 border-l-2 border-emerald-500 pl-4">
          <p className="text-[10px] text-emerald-500 tracking-[0.3em] mb-1 animate-pulse">
            {loadingText}
          </p>
          <h2 className="text-white text-xl font-light tracking-tighter uppercase">
            Stakeholder Terminal
          </h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Identification</label>
            <input 
              name="email"
              required
              type="email" 
              placeholder="ENTER REGISTERED EMAIL..." 
              className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-sm text-zinc-300 focus:outline-none focus:border-emerald-900 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Access Key</label>
            <input 
              name="password"
              required
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-sm text-zinc-300 focus:outline-none focus:border-emerald-900 transition-all"
            />
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-3 border border-red-900/50 bg-red-950/20">
              <p className="text-[10px] text-red-500 tracking-tighter text-center animate-pulse">
                {error}
              </p>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoggingIn}
            className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-700 ${
              isLoggingIn 
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
              : "bg-white text-black hover:bg-emerald-500"
            }`}
          >
            {isLoggingIn ? "Authenticating..." : "Verify & Authenticate"}
          </button>
        </form>

        <div className="mt-10 opacity-30 text-center">
          <p className="text-[8px] text-zinc-500 tracking-widest leading-loose uppercase">
            Purchasing Lanka International <br/>
            Encrypted Network | 2026.04.24
          </p>
        </div>
      </div>
    </div>
  );
}