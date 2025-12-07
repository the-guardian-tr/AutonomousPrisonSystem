
"use client";

import { useEffect, useState } from 'react';
import { Card, Badge } from '@/components/ui';
import { Activity, Camera, Lock, AlertTriangle, UserCheck, ShieldAlert, Cpu } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState([
    { id: 1, msg: "SECTOR 4: Anomaly Detected", time: "12:04:32", level: "high" },
    { id: 2, msg: "GATE 2: Unauthorized Access Attempt", time: "11:58:11", level: "high" },
    { id: 3, msg: "PATROL BOT 7: Battery Low", time: "11:45:00", level: "low" },
  ]);

  useEffect(() => {
    // Simulate live data
    const interval = setInterval(() => {
      setData(prev => {
        const newVal = { time: new Date().toLocaleTimeString(), stress: Math.floor(Math.random() * 40) + 20 };
        const newArr = [...prev, newVal];
        if (newArr.length > 20) newArr.shift();
        return newArr;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen p-8 text-slate-200 font-sans">
      <header className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 tracking-tighter">
            APS COMMAND CENTER
          </h1>
          <p className="text-slate-500 tracking-widest text-xs mt-1">AUTONOMOUS PRISON SYSTEM v4.2</p>
        </div>
        <div className="flex gap-4">
          <Badge variant="success">SYSTEM ONLINE</Badge>
          <Badge variant="warning">DEFCON 4</Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Left Column: Stats */}
        <div className="space-y-6">
          <Card className="border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">TOTAL INMATES</span>
              <UserCheck className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-bold">1,248</div>
            <div className="text-xs text-blue-400 mt-1">+12 checked in today</div>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">SECURITY LOCKS</span>
              <Lock className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold">98.4%</div>
            <div className="text-xs text-emerald-400 mt-1">All sectors secure</div>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">ACTIVE DRONES</span>
              <Cpu className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-3xl font-bold">14/15</div>
            <div className="text-xs text-purple-400 mt-1">1 Charging</div>
          </Card>
        </div>

        {/* Middle Column: Live Feeds & Map */}
        <div className="md:col-span-2 space-y-6">
          <Card className="h-[400px] flex flex-col relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Badge variant="danger">LIVE FEED - SECTOR 4</Badge>
              <Camera className="w-4 h-4 animate-pulse text-red-500" />
            </div>
            {/* Simulated Camera Feed Effect */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

            <div className="mt-auto relative z-10 p-4">
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <Line type="monotone" dataKey="stress" stroke="#38bdf8" strokeWidth={2} dot={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-center text-slate-500 mt-2">REAL-TIME TENSION ANALYSIS</div>
            </div>
          </Card>
        </div>

        {/* Right Column: Alerts */}
        <div className="space-y-6">
          <Card className="h-full border-red-900/20">
            <h3 className="flex items-center gap-2 font-bold mb-4 text-red-500">
              <ShieldAlert className="w-5 h-5" />
              PRIORITY ALERTS
            </h3>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 bg-red-950/20 border border-red-900/30 rounded flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <span className={cn("text-xs font-bold uppercase", alert.level === 'high' ? 'text-red-400' : 'text-amber-400')}>
                      [{alert.level}]
                    </span>
                    <span className="text-[10px] text-slate-500">{alert.time}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-300">{alert.msg}</p>
                </div>
              ))}
              <div className="p-3 bg-slate-800/20 border border-slate-700/30 rounded text-center text-xs text-slate-500 cursor-pointer hover:bg-slate-800/40 transition">
                VIEW ALL SYSTEM LOGS
              </div>
            </div>
          </Card>
        </div>

      </div>
    </main>
  );
}
