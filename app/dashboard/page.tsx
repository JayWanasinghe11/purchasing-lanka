"use client";
import React, { useState, useEffect } from 'react';
import { Activity, Box, Users, TrendingUp, ShieldAlert, Globe2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, collection, query, orderBy, limit } from 'firebase/firestore';

const lineData = [
  { name: '06:00', val: 400 }, { name: '09:00', val: 700 },
  { name: '12:00', val: 550 }, { name: '15:00', val: 900 },
  { name: '18:00', val: 1100 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeShipments: "0",
    arbitrageIndex: "0%",
    networkAgents: "0",
    alertLevel: "NORMAL"
  });
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const unsubStats = onSnapshot(doc(db, "stats", "dashboard"), (docSnap) => {
      if (docSnap.exists()) setStats(docSnap.data() as any);
    });

    const q = query(collection(db, "intel"), orderBy("timestamp", "desc"), limit(5));
    const unsubLogs = onSnapshot(q, (querySnapshot) => {
      const items: any[] = [];
      querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setLogs(items);
    });

    return () => { unsubStats(); unsubLogs(); };
  }, []);

  const getAlertColor = () => {
    if (stats.alertLevel === "CRITICAL") return "text-red-500 border-red-900";
    if (stats.alertLevel === "WARNING") return "text-yellow-500 border-yellow-900";
    return "text-emerald-500 border-emerald-900";
  };

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-mono p-4 md:p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-900 pb-6 mb-8">
        <div>
          <h1 className="text-white text-xl font-black tracking-[0.4em]">PLI COMMAND</h1>
          <p className={`text-[10px] animate-pulse mt-1 font-bold ${getAlertColor()}`}>
            ● SYSTEM_STATUS: {stats.alertLevel}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-sm">
          <div className="flex justify-between items-start mb-3 text-[8px] uppercase tracking-widest text-zinc-600 font-bold">
            <span>Active Shipments</span>
            <Box size={14} className="text-white"/>
          </div>
          <div className="text-xl font-light text-white">{stats.activeShipments}</div>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-sm">
          <div className="flex justify-between items-start mb-3 text-[8px] uppercase tracking-widest text-zinc-600 font-bold">
            <span>Arbitrage Index</span>
            <TrendingUp size={14} className="text-emerald-500"/>
          </div>
          <div className="text-xl font-light text-emerald-500">{stats.arbitrageIndex}</div>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-sm">
          <div className="flex justify-between items-start mb-3 text-[8px] uppercase tracking-widest text-zinc-600 font-bold">
            <span>Network Agents</span>
            <Users size={14} className="text-white"/>
          </div>
          <div className="text-xl font-light text-white">{stats.networkAgents}</div>
        </div>

        <motion.div 
          animate={stats.alertLevel === "CRITICAL" ? {
            borderColor: ["#450a0a", "#ef4444", "#450a0a"],
            backgroundColor: ["#020202", "#450a0a", "#020202"],
          } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={`bg-zinc-950 border p-4 rounded-sm transition-colors duration-1000 ${getAlertColor()}`}
        >
          <div className="flex justify-between items-start mb-3 text-[8px] uppercase tracking-widest font-bold opacity-60">
            <span>Alert Level</span>
            <ShieldAlert size={14} className={stats.alertLevel === "CRITICAL" ? "animate-spin" : ""}/>
          </div>
          <div className="text-xl font-black italic tracking-tighter">{stats.alertLevel}</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-950 border border-zinc-900 p-6 h-64 relative">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-2">
                <Activity size={14} className="text-emerald-500"/> Price Index Flux
             </h3>
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <XAxis dataKey="name" stroke="#27272a" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', fontSize: '10px' }} />
                  <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-6 h-[320px] relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
                <Globe2 size={14} className="text-zinc-500 group-hover:text-emerald-500 transition-colors"/> 
                Logistic Network Topology
              </h3>
              <span className="text-[8px] text-emerald-500 font-bold tracking-widest animate-pulse tracking-[0.2em]">SCTR_07_LIVE</span>
            </div>

            <div className="relative h-full flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:15px_15px]"></div>
              
              <svg width="220" height="220" viewBox="0 0 200 300" className="relative z-10">
                <motion.path 
                  d="M100 20 L130 50 L140 100 L150 150 L140 220 L100 280 L60 220 L50 150 L60 100 L70 50 Z" 
                  fill="none" stroke="#27272a" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }}
                />
                <motion.circle r="3" fill="#10b981" animate={{ x: [80, 120, 100], y: [100, 180, 250] }} transition={{ duration: 8, repeat: Infinity }} />
                <motion.circle r="2" fill="#c5a059" animate={{ x: [110, 70, 90], y: [60, 140, 40] }} transition={{ duration: 10, repeat: Infinity }} />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-6 flex flex-col h-[605px]">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6 border-b border-zinc-900 pb-2">Live Intel Feed</h3>
          <div className="flex-1 space-y-6 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {logs.map((log) => (
                <motion.div key={log.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="border-l-2 border-zinc-800 pl-4 py-1">
                  <p className="text-[8px] text-zinc-600 tracking-tighter uppercase">
                    {log.timestamp && typeof log.timestamp.toDate === 'function' ? log.timestamp.toDate().toLocaleTimeString() : '...'}
                  </p>
                  <p className="text-[10px] uppercase text-zinc-300 mt-1 leading-tight tracking-wide">{log.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <button className="w-full mt-6 py-4 bg-zinc-900 text-zinc-600 text-[9px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
            Execute Mediation
          </button>
        </div>
      </div>
    </div>
  );
}