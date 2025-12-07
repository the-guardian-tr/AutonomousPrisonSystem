
"use client";

import { useEffect, useState } from 'react';
import { Card, Badge, GlitchText } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Activity, Camera, Lock, UserCheck, Siren, Radio, Zap, Hexagon, Database, Globe, Eye } from 'lucide-react';
import {
  AreaChart, Area,
  ResponsiveContainer, Tooltip, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Bar, Line, XAxis, YAxis, ReferenceLine
} from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [radarData, setRadarData] = useState<any[]>([
    { subject: 'SECURITY', A: 120, fullMark: 150 },
    { subject: 'AI CORE', A: 98, fullMark: 150 },
    { subject: 'NETWORK', A: 86, fullMark: 150 },
    { subject: 'POWER', A: 99, fullMark: 150 },
    { subject: 'SENSORS', A: 85, fullMark: 150 },
    { subject: 'DRONES', A: 65, fullMark: 150 },
  ]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Stream Data
      setData(prev => {
        const newVal = {
          time: new Date().toLocaleTimeString(),
          stress: Math.floor(Math.random() * 50) + 10,
          activity: Math.floor(Math.random() * 80) + 20,
          power: Math.floor(Math.random() * 30) + 70,
        };
        const newArr = [...prev, newVal];
        if (newArr.length > 30) newArr.shift();
        return newArr;
      });

      // Fluctuate Radar
      setRadarData(prev => prev.map(item => ({
        ...item,
        A: Math.min(150, Math.max(50, item.A + (Math.random() * 10 - 5)))
      })));

      setRotation(p => (p + 1) % 360);

    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen text-cyan-500 font-mono relative overflow-hidden flex flex-col items-center justify-center p-8 bg-black">

      {/* Environmental Effects */}
      <div className="cyber-grid"></div>
      <div className="crt-overlay"></div>

      <div className="hud-container w-full max-w-[1600px] h-[90vh] grid grid-cols-12 grid-rows-12 gap-4">

        {/* TOP BAR */}
        <div className="col-span-12 row-span-1 flex justify-between items-center border-b border-cyan-900/50 pb-2 px-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Hexagon className="w-8 h-8 text-cyan-400 animate-spin-slow" />
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter text-white">
                <GlitchText text="APS // COMMAND" />
              </h1>
              <div className="text-[10px] text-cyan-600 tracking-[0.5em]">AUTONOMOUS PRISON SYSTEM</div>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-cyan-700">CPU LOAD</span>
              <div className="w-24 h-1 bg-cyan-900/30 mt-1"><div className="h-full bg-cyan-500 w-[45%]"></div></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-cyan-700">MEM USAGE</span>
              <div className="w-24 h-1 bg-cyan-900/30 mt-1"><div className="h-full bg-cyan-500 w-[72%]"></div></div>
            </div>
            <Badge variant="holo" animate>SYSTEM SECURE</Badge>
          </div>
        </div>

        {/* LEFT COLUMN: SYSTEM HEALTH */}
        <div className="col-span-3 row-span-7 flex flex-col gap-4">
          {/* RADAR CHART */}
          <Card className="flex-1 flex flex-col items-center justify-center relative bg-slate-950/80">
            <div className="absolute top-2 left-2 flex gap-2">
              <Activity className="w-4 h-4" /> <span className="text-xs font-bold">SUBSYSTEM STATUS</span>
            </div>
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#0891b2', fontSize: 10, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Status" dataKey="A" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* SERVER LOGS */}
          <Card className="h-[250px] overflow-hidden font-mono text-[10px] bg-black/60 border-t-4 border-t-cyan-500">
            <div className="text-xs font-bold mb-2 flex justify-between">
              <span>&gt; EVENT_LOG</span>
              <span className="animate-pulse">● REC</span>
            </div>
            <div className="opacity-70 space-y-1">
              <p className="text-emerald-500">[12:44:02] SEC_PROTOCOL_INIT_OK</p>
              <p className="text-cyan-600">[12:44:05] HANDSHAKE_ACCEPTED: NODE_04</p>
              <p className="text-yellow-600">[12:44:11] WARNING: LATENCY_SPIKE_DETECTED</p>
              <p className="text-cyan-600">[12:44:15] AI_MODEL_REBALANCING...</p>
              <p className="text-emerald-500">[12:44:20] OPTIMIZATION_COMPLETE</p>
              <p className="text-red-500">[12:44:45] BLOCK_7: MOTION_SENSOR_TRIGGER</p>
              {[...Array(5)].map((_, i) => (
                <p key={i} className="text-slate-600">... syncing data stream ...</p>
              ))}
            </div>
          </Card>
        </div>

        {/* CENTER COLUMN: MAIN VIEW */}
        <div className="col-span-6 row-span-7 relative group">
          <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-lg overflow-hidden bg-slate-950">
            {/* Reticle Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-50">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-cyan-500/30 rounded-full"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-500/20"></div>
              <div className="absolute top-0 left-1/2 w-px h-full bg-cyan-500/20"></div>
            </div>

            {/* Video Source */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"></div>

            {/* Data Overlays */}
            <div className="absolute top-4 left-4 z-30 bg-black/80 backdrop-blur p-2 border-l-2 border-cyan-500">
              <p className="text-[10px] text-slate-400">CAMERA SOURCE</p>
              <p className="text-lg font-bold text-white">BLOCK A-4</p>
            </div>

            <div className="absolute bottom-4 right-4 z-30 bg-black/80 backdrop-blur p-2 border-r-2 border-red-500 text-right">
              <p className="text-[10px] text-slate-400">THREAT LEVEL</p>
              <p className="text-2xl font-black text-red-500 animate-pulse">ELEVATED</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: METRICS */}
        <div className="col-span-3 row-span-7 flex flex-col gap-4">
          <Card className="flex-1 bg-slate-950/80">
            <div className="text-xs font-bold mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" /> POPULATION METRICS
            </div>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                  <CartesianGrid stroke="#1e293b" vertical={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #06b6d4' }} />
                  <Bar dataKey="activity" barSize={4} fill="#06b6d4" />
                  <Line type="monotone" dataKey="stress" stroke="#ef4444" dot={false} strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-cyan-950/20 p-2 border border-cyan-900/50 text-center">
                <div className="text-[10px] text-cyan-400">TOTAL</div>
                <div className="text-xl font-bold text-white">1,248</div>
              </div>
              <div className="bg-red-950/20 p-2 border border-red-900/50 text-center">
                <div className="text-[10px] text-red-400">ALERTS</div>
                <div className="text-xl font-bold text-white">3</div>
              </div>
            </div>
          </Card>

          <Card className="flex-1 flex flex-col justify-center items-center bg-slate-950/80 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://media.giphy.com/media/dummy/giphy.gif')]"></div> {/* Placeholder for noise */}
            <Eye className="w-12 h-12 text-cyan-500 mb-2 animate-pulse" />
            <div className="text-lg font-bold tracking-widest text-white">AI WATCHDOG</div>
            <div className="text-[10px] text-cyan-400 mt-1">SCANNING...</div>
          </Card>
        </div>

        {/* BOTTOM ROW: TIMELINE / DETAILED GRAPH */}
        <div className="col-span-12 row-span-4 bg-slate-950/50 border border-cyan-500/20 p-4 backdrop-blur relative">
          <div className="absolute top-2 left-4 text-xs font-bold text-cyan-400">
            SYSTEM RESOURCE USAGE (24H)
          </div>
          <div className="w-full h-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="power" stackId="1" stroke="#8b5cf6" fill="url(#colorPower)" strokeWidth={2} />
                <Area type="monotone" dataKey="activity" stackId="1" stroke="#06b6d4" fill="url(#colorActivity)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </main>
  );
}
