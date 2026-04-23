"use client";
import React, { useState, useEffect } from 'react';

export default function LoginPage() {
  const [text, setText] = useState("");
  const fullText = "AUTHENTICATING STAKEHOLDER...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono p-6">
      <div className="max-w-md w-full border border-zinc-800 p-8 bg-zinc-950/50 backdrop-blur-xl">
        <div className="mb-8">
          <p className="text-emerald-500 text-xs mb-2 tracking-widest">{text}</p>
          <h2 className="text-white text-2xl font-light tracking-tighter">Secure Terminal Access</h2>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2">Stakeholder ID</label>
            <input 
              type="text" 
              className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-zinc-300 focus:outline-none focus:border-emerald-900 transition"
              placeholder="PLI-XXXX-XXXX"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2">Access Key</label>
            <input 
              type="password" 
              className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-zinc-300 focus:outline-none focus:border-emerald-900 transition"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full py-4 bg-zinc-100 text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-emerald-500 transition-colors duration-500">
            Verify Identity
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-900">
          <p className="text-[9px] text-zinc-600 leading-relaxed uppercase tracking-widest text-center">
            Unauthorized access is strictly monitored. <br/> Purchasing Lanka International © 2026
          </p>
        </div>
      </div>
    </div>
  );
}