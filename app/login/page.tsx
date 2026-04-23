"use client";
import React, { useState, useEffect } from 'react';

export default function LoginPage() {
  const [loadingText, setLoadingText] = useState("");
  const message = "ESTABLISHING SECURE CONNECTION...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, []);

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

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Identification</label>
            <input 
              type="text" 
              placeholder="ENTER ID..." 
              className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Access Key</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition"
            />
          </div>

          <button className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all duration-700">
            Verify & Authenticate
          </button>
        </form>

        <div className="mt-10 opacity-30">
          <p className="text-[8px] text-center text-zinc-500 tracking-widest leading-loose">
            PURCHASING LANKA INTERNATIONAL <br/>
            ENCRYPTED NETWORK | 2026.04.24
          </p>
        </div>
      </div>
    </div>
  );
}