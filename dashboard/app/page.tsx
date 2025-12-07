
"use client";

import { useEffect, useState } from 'react';
import { ArwesCard, SciFiBadge, TechText, Separator } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Activity, Camera, Lock, UserCheck, Siren, Radio, Zap, Hexagon, Cpu, Shield, AlertOctagon } from 'lucide-react';
import {
  AreaChart, Area,
  ResponsiveContainer, Tooltip, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis
} from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [radarData, setRadarData] = useState<any[]>([
    { subject: 'SEC', A: 100, fullMark: 150 },
    { subject: 'AI', A: 100, fullMark: 150 },
    { subject: 'NET', A: 100, fullMark: 150 },
    { subject: 'PWR', A: 100, fullMark: 150 },
    { subject: 'BIO', A: 100, fullMark: 150 },
  ]);

  useEffect(() => {
    // Initial Logs
    setLogs([
      "SYSTEM_INIT_COMPLETE",
      "SECURE_CONNECTION_ESTABLISHED",
      "LOADING_MODULES...",
      "AI_CORE_ONLINE"
    ]);

    const interval = setInterval(() => {
      setData(prev => {
        const newVal = {
          time: new Date().toLocaleTimeString(),
          stress: Math.floor(Math.random() * 40) + 10,
          energy: Math.floor(Math.random() * 20) + 80,
        };
        const newArr = [...prev, newVal];
        if (newArr.length > 40) newArr.shift();
        return newArr;
      });

      // Fluctuate Radar
      setRadarData(prev => prev.map(item => ({
        ...item,
        A: Math.min(150, Math.max(50, item.A + (Math.random() * 20 - 10)))
      })));

      // Random Logs
      if (Math.random() > 0.8) {
        const newLog = `EVENT_${Math.floor(Math.random() * 9999)}: STATUS_CHECK_OK`;
        setLogs(prev => [newLog, ...prev].slice(0, 10));
      }

    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen font-mono relative p-6 flex flex-col gap-4 text-cyan-500 selection:bg-cyan-500/30 selection:text-white">
      <div className="sci-fi-grid"></div>
      <div className="scanline-overlay"></div>

      {/* HEADER */}
      <header className="flex justify-between items-end border-b border-cyan-800/50 pb-4 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Hexagon className="w-10 h-10 text-cyan-400 animate-spin-slow opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white arwes-title">
              APS // CORE
            </h1>
            <div className="flex gap-4 text-[10px] tracking-widest text-cyan-700">
              <span>BUILD: v4.8.2</span>
              <span>SERVER: ASIA-01</span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <div className="text-right hidden md:block">
            <div className="text-[10px] text-cyan-800">OPERATOR</div>
            <div className="text-xs font-bold text-cyan-400">ADMIN_USER</div>
          </div>
          <SciFiBadge variant="success" animate>SYSTEM SECURE</SciFiBadge>
          <SciFiBadge variant="alert">DEFCON 4</SciFiBadge>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-12 gap-6 flex-1">

        {/* LEFT COLUMN */}
        <div className="col-span-12 md:col-span-3 flex flex-col">
          <ArwesCard title="SYSTEM STATUS" className="flex-1">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#0e7490" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#06b6d4', fontSize: 10, fontWeight: 'bold' }} />
                  <Radar name="Status" dataKey="A" stroke="#22d3ee" strokeWidth={2} fill="#06b6d4" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <Separator />
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-cyan-600">CPU_LOAD</span>
                <div className="flex-1 mx-4 h-2 bg-cyan-950/50">
                  <div className="h-full bg-cyan-500 w-[45%] animate-pulse"></div>
                </div>
                <span className="text-xs font-bold">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-cyan-600">MEM_USG</span>
                <div className="flex-1 mx-4 h-2 bg-cyan-950/50">
                  <div className="h-full bg-cyan-500 w-[62%]"></div>
                </div>
                <span className="text-xs font-bold">62%</span>
              </div>
            </div>
          </ArwesCard>

          <ArwesCard title="ACTIVE UNITS" className="h-[200px]">
            <div className="grid grid-cols-2 gap-4 h-full content-center">
              <div className="bg-cyan-950/20 border border-cyan-800/30 p-2 text-center">
                <Cpu className="w-6 h-6 mx-auto text-cyan-400 mb-1" />
                <div className="text-2xl font-bold text-white">14</div>
                <div className="text-[8px] text-cyan-600 tracking-widest">DRONES</div>
              </div>
              <div className="bg-cyan-950/20 border border-cyan-800/30 p-2 text-center">
                <UserCheck className="w-6 h-6 mx-auto text-cyan-400 mb-1" />
                <div className="text-2xl font-bold text-white">42</div>
                <div className="text-[8px] text-cyan-600 tracking-widest">GUARDS</div>
              </div>
            </div>
          </ArwesCard>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="col-span-12 md:col-span-6 flex flex-col">
          <div className="relative flex-1 bg-black border-2 border-cyan-900/50 overflow-hidden group">
            <div className="absolute top-0 left-0 p-2 bg-black/60 backdrop-blur z-20 border-b border-r border-cyan-500/30">
              <TechText className="text-xs font-bold flex items-center gap-2">
                <Camera className="w-4 h-4 text-red-500 animate-pulse" /> CAM_FEED_04
              </TechText>
            </div>

            {/* VIDEO & OVERLAYS */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')] bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

            {/* FACE TARGET BOX */}
            <div className="absolute top-[30%] left-[40%] w-[150px] h-[150px] border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <div className="absolute -top-2 -left-2 w-2 h-2 border-t border-l border-cyan-400"></div>
              <div className="absolute -bottom-2 -right-2 w-2 h-2 border-b border-r border-cyan-400"></div>
              <div className="absolute top-[-20px] left-0 bg-cyan-950/80 px-2 py-1 text-[8px] text-cyan-400">
                ID: 8842-A [MATCH 99%]
              </div>
            </div>
          </div>

          {/* TIMELINE CHART */}
          <div className="h-[200px] bg-black/40 border-t border-cyan-900/50 mt-4 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-cyan-600 uppercase tracking-widest">Psychometric Stress Analysis (Real-time)</span>
            </div>
            <div className="w-full h-full pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#164e63" vertical={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#06b6d4' }} />
                  <Area type="monotone" dataKey="stress" stroke="#ef4444" fill="url(#colorStress)" strokeWidth={2} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 md:col-span-3 flex flex-col">
          <ArwesCard title="ACCESS LOGS" className="flex-1 bg-black/40">
            <div className="font-mono text-[10px] space-y-2 opacity-80 h-full overflow-hidden relative">
              {logs.map((log, i) => (
                <div key={i} className="border-l-2 border-cyan-800 pl-2 py-0.5 hover:bg-cyan-900/20 hover:border-cyan-400 transition-colors cursor-default">
                  <span className="text-cyan-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-cyan-100">{log}</span>
                </div>
              ))}
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </ArwesCard>

          <ArwesCard title="ALERT LEVEL" className="bg-red-950/20 border-red-900/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-black text-red-500 flicker">HIGH</div>
                <div className="text-[10px] text-red-400 mt-1">SECTOR 4 COMPROMISED</div>
              </div>
              <AlertOctagon className="w-12 h-12 text-red-500 animate-pulse" />
            </div>
          </ArwesCard>
        </div>
      </div>
    </main>
  );
}
