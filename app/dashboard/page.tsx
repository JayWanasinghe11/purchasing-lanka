"use client";
import React from 'react';
import { Activity, Globe, Box, Users, TrendingUp, ShieldAlert, Map as MapIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: '06:00', val: 400 },
  { name: '09:00', val: 700 },
  { name: '12:00', val: 550 },
  { name: '15:00', val: 900 },
  { name: '18:00', val: 1100 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-mono p-4 md:p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-900 pb-6 mb-8">
        <div>
          <h1 className="text-white text-xl font-black tracking-[0.4em]">PLI COMMAND</h1>
          <p className="text-[10px] text-emerald-500 animate-pulse mt-1">● ENCRYPTED TERMINAL ACTIVE</p>
        </div>
        <div className="text-[9px] text-right hidden sm:block">
          <p className="text-zinc-500 uppercase">Operator: Jayamantha</p>
          <p className="text-zinc-700 font-bold uppercase">Session: AX-992</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Shipments", val: "124", icon: <Box size={14}/>, color: "text-white" },
          { label: "Arbitrage Index", val: "+14.2%", icon: <TrendingUp size={14}/>, color: "text-emerald-500" },
          { label: "Network Agents", val: "48", icon: <Users size={14}/>, color: "text-white" },
          { label: "Alert Level", val: "ALPHA", icon: <ShieldAlert size={14}/>, color: "text-red-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-950 border border-zinc-900 p-4 rounded-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold">{stat.label}</span>
              <span className={stat.color}>{stat.icon}</span>
            </div>
            <div className={`text-xl font-light ${stat.color}`}>{stat.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Graph & Map */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Price Graph */}
          <div className="bg-zinc-950 border border-zinc-900 p-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-2">
              <Activity size={14} className="text-emerald-500"/> Price Index Optimization
            </h3>
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

          {/* Live Logistic Map */}
          <div className="relative bg-zinc-950 border border-zinc-900 p-6 h-[350px] overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
                <MapIcon size={14} className="text-zinc-400"/> Live Logistic Flux (Sector 07)
              </h3>
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
            </div>

            <div className="relative h-full flex items-center justify-center border border-zinc-900/50 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]">
              <svg width="250" height="250" viewBox="0 0 200 300" className="opacity-40">
                <path d="M100 20 L130 50 L140 100 L150 150 L140 220 L100 280 L60 220 L50 150 L60 100 L70 50 Z" 
                      fill="none" stroke="#3f3f46" strokeWidth="1.5" />
                <motion.circle r="4" fill="#10b981"
                  animate={{ x: [80, 120, 100], y: [100, 180, 250] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.circle r="3" fill="#c5a059"
                  animate={{ x: [110, 70], y: [60, 140] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </svg>
              <div className="absolute top-4 left-4 p-3 bg-black/80 border border-zinc-800 text-[8px] space-y-1">
                <p className="text-emerald-500 tracking-tighter uppercase">Transit_ID: PLI-091</p>
                <p className="text-zinc-500 uppercase">Cargo: Seed Potato</p>
                <p className="text-white uppercase">ETA: 04:20 MIN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Intelligence Feed */}
        <div className="bg-zinc-950 border border-zinc-900 p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6">Real-time Intel Feed</h3>
          <div className="space-y-6 text-[10px] leading-relaxed font-mono">
            {[
              { time: "14:22", text: "Shipment #4421 cleared Dambulla terminal.", color: "border-zinc-800" },
              { time: "14:35", text: "Alert: Price arbitrage window detected in Southern Sector.", color: "border-emerald-900 text-emerald-400" },
              { time: "14:50", text: "Agent #09 reporting from Hambantota Port.", color: "border-zinc-800" },
              { time: "15:02", text: "Priority: High-level mediation required.", color: "border-red-900 text-red-500 italic underline" },
            ].map((log, i) => (
              <div key={i} className={`border-l-2 ${log.color} pl-4`}>
                <p className="opacity-50 tracking-tighter">[{log.time}]</p>
                <p className="uppercase mt-1">{log.text}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-zinc-900 text-zinc-500 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
            Initiate Protocol
          </button>
        </div>

      </div>
    </div>
  );    
}