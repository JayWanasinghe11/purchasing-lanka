"use client";
import React from 'react';
import { Activity, Globe, Box, Users, TrendingUp, ShieldAlert } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: '06:00', val: 400 }, { name: '09:00', val: 700 },
  { name: '12:00', val: 550 }, { name: '15:00', val: 900 },
  { name: '18:00', val: 1100 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-mono p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-8">
        <div>
          <h1 className="text-white text-lg font-bold tracking-widest">PLI COMMAND CENTER</h1>
          <p className="text-[10px] text-emerald-500 animate-pulse">● SYSTEM LIVE | ENCRYPTED LINK ACTIVE</p>
        </div>
        <div className="flex items-center gap-6 text-[10px]">
          <span className="flex items-center gap-2"><Globe size={12}/> COLOMBO, LK</span>
          <span className="text-zinc-600">ID: STAKEHOLDER-JW-2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Shipments", val: "124", icon: <Box size={16}/>, color: "text-white" },
          { label: "Market Arbitrage", val: "+14.2%", icon: <TrendingUp size={16}/>, color: "text-emerald-500" },
          { label: "Network Agents", val: "48", icon: <Users size={16}/>, color: "text-white" },
          { label: "Security Level", val: "ALPHA", icon: <ShieldAlert size={16}/>, color: "text-red-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-950 border border-zinc-900 p-4 hover:border-zinc-700 transition cursor-crosshair">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] uppercase tracking-widest text-zinc-500">{stat.label}</span>
              <span className={stat.color}>{stat.icon}</span>
            </div>
            <div className={`text-2xl font-light ${stat.color}`}>{stat.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Intelligence Graph */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
              <Activity size={14} className="text-emerald-500"/> Price Index Optimization
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#27272a" fontSize={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', fontSize: '10px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Logs / Terminal */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 overflow-hidden">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">Live Intelligence Feed</h3>
          <div className="space-y-4 text-[10px] leading-relaxed">
            <p className="text-zinc-600">[14:22] <span className="text-zinc-400">Shipment #4421 cleared Dambulla terminal.</span></p>
            <p className="text-zinc-600">[14:35] <span className="text-emerald-500 underline text-xs">NEW: Price dip in global potato market detected.</span></p>
            <p className="text-zinc-600">[14:50] <span className="text-zinc-400">Agent #09 reporting from Hambantota Port.</span></p>
            <p className="text-zinc-600">[15:02] <span className="text-red-800">Alert: Political mediation required in Sector 7.</span></p>
          </div>
          <div className="mt-8 border-t border-zinc-900 pt-4">
             <button className="w-full py-2 border border-zinc-800 text-[9px] hover:bg-white hover:text-black transition uppercase font-bold tracking-widest">
               Execute Mediation
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}