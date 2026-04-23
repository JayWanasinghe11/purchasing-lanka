import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-10 py-8 border-b border-white/5 backdrop-blur-sm">
        <div className="text-xl font-black tracking-[0.3em] text-white">
          PURCHASING <span className="text-zinc-600">LANKA</span>
        </div>
        <div className="hidden md:flex space-x-10 text-[10px] uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-white transition">Global Network</a>
          <a href="#" className="hover:text-white transition">Strategic Intelligence</a>
          <a href="/login" className="px-4 py-1 border border-white/20 hover:bg-white hover:text-black transition">Terminal Login</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-40 px-6 text-center">
        <div className="mb-6 h-[1px] w-16 bg-zinc-700 animate-pulse"></div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8">
          Market Intelligence. <br />
          <span className="text-zinc-600 italic font-serif">Global Stability.</span>
        </h1>
        <p className="max-w-xl text-xs md:text-sm text-zinc-500 leading-loose tracking-[0.1em] mb-12 uppercase">
          Optimizing high-stakes supply chains through complex geopolitical mediation and domestic market stabilization.
        </p>
        
        <div className="flex gap-8">
          <a href="/login" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white border-b border-white/50 pb-1 hover:text-zinc-400 hover:border-zinc-400 transition">
            Access Stakeholder Terminal
          </a>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="fixed bottom-10 w-full text-center opacity-20">
        <p className="text-[8px] tracking-[1.2em] uppercase">Private Corporate Network | Secured Access Only</p>
      </footer>
    </main>
  );
}