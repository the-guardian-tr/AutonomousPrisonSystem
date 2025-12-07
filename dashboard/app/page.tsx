
"use client";

import { useState } from 'react';
import { Card, Button, Badge, StatCard, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Users, Shield, Radio, Settings, LogOut, Bell, Search,
  MoreHorizontal, ChevronDown, Package, Activity, AlertCircle, FileText
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

// Mock Data
const revenueData = [
  { name: 'Mon', total: 1200 },
  { name: 'Tue', total: 2100 },
  { name: 'Wed', total: 1800 },
  { name: 'Thu', total: 2400 },
  { name: 'Fri', total: 3200 },
  { name: 'Sat', total: 2800 },
  { name: 'Sun', total: 3600 },
];

const inmates = [
  { id: "MX-9921", name: "John Doe", status: "Active", cell: "Block A-102", admission: "2023-11-12", risk: "High" },
  { id: "MX-9922", name: "Jane Smith", status: "Active", cell: "Block B-204", admission: "2024-01-05", risk: "Medium" },
  { id: "MX-9923", name: "Robert Johnson", status: "Solitary", cell: "Iso-04", admission: "2023-08-22", risk: "Critical" },
  { id: "MX-9924", name: "Emily Davis", status: "Active", cell: "Block A-105", admission: "2024-02-14", risk: "Low" },
  { id: "MX-9925", name: "Michael Brown", status: "Transfer", cell: "--", admission: "2023-05-30", risk: "Medium" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">

      {/* SIDEBAR */}
      <aside className={cn("w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col fixed h-full z-10 transition-transform md:translate-x-0 md:relative", !sidebarOpen && "-translate-x-full md:hidden")}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Shield className="w-6 h-6 text-blue-600 mr-2" />
          <span className="font-bold text-lg tracking-tight">APS Admin</span>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 mt-4 first:mt-0">Overview</div>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
          <SidebarItem icon={Activity} label="Analytics" />
          <SidebarItem icon={Radio} label="Live Feed" />

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 mt-6">Management</div>
          <SidebarItem icon={Users} label="Inmates" />
          <SidebarItem icon={Shield} label="Security Staff" />
          <SidebarItem icon={Package} label="Inventory" />
          <SidebarItem icon={FileText} label="Reports" />

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 mt-6">System</div>
          <SidebarItem icon={AlertCircle} label="Alerts" badge="3" />
          <SidebarItem icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <SidebarItem icon={LogOut} label="Log Out" variant="danger" />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              Menu
            </Button>
            <div className="relative hidden md:block w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search inmates, staff, reports..." className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative text-slate-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-md transition-colors">
              <Avatar fallback="AD" />
              <div className="hidden md:block">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-slate-500">Facility Director</div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">

          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h2>
              <p className="text-slate-500 text-sm mt-1">Overview of facility operations and metrics.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Download Report</Button>
              <Button size="sm">Add Inmate</Button>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Inmates" value="1,248" change="+2.5%" icon={Users} trend="up" />
            <StatCard title="Security Staff" value="156" change="+0.0%" icon={Shield} trend="neutral" />
            <StatCard title="Incident Reports" value="12" change="-14%" icon={AlertCircle} trend="down" />
            <StatCard title="Operational Cost" value="$48.5k" change="+4.1%" icon={Activity} trend="up" />
          </div>

          {/* CHARTS ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex flex-col mb-4">
                <h3 className="text-lg font-bold text-slate-900">Population Trends</h3>
                <p className="text-sm text-slate-500">Daily inmate intake vs release</p>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                    <Area type="monotone" dataKey="total" stroke="#2563eb" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col mb-4">
                <h3 className="text-lg font-bold text-slate-900">Incident Analytics</h3>
                <p className="text-sm text-slate-500">Security incidents by category</p>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="total" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* DATA TABLE */}
          <Card>
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Admissions</h3>
                <p className="text-sm text-slate-500">Latest inmates processed into the facility.</p>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-3 font-medium">Inmate ID</th>
                    <th className="px-6 py-3 font-medium">Full Name</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Cell Block</th>
                    <th className="px-6 py-3 font-medium">Risk Level</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inmates.map((inmate) => (
                    <tr key={inmate.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{inmate.id}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <Avatar fallback={inmate.name.substring(0, 2)} />
                        <span className="font-medium text-slate-700">{inmate.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={inmate.status === 'Active' ? 'success' : inmate.status === 'Solitary' ? 'danger' : 'warning'}>
                          {inmate.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{inmate.cell}</td>
                      <td className="px-6 py-4">
                        <span className={cn("font-semibold",
                          inmate.risk === 'High' || inmate.risk === 'Critical' ? 'text-red-600' :
                            inmate.risk === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                        )}>
                          {inmate.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      </main>

    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, badge, variant = "default" }: { icon: any, label: string, active?: boolean, badge?: string, variant?: "default" | "danger" }) {
  return (
    <div className={cn(
      "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors group",
      active ? "bg-slate-100/80 text-blue-700" :
        variant === 'danger' ? "text-red-900 hover:bg-red-50" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    )}>
      <div className="flex items-center gap-3">
        <Icon className={cn("w-4 h-4", active ? "text-blue-600" : variant === 'danger' ? "text-red-600" : "text-slate-400 group-hover:text-slate-600")} />
        <span className={cn("text-sm font-medium", active && "font-semibold")}>{label}</span>
      </div>
      {badge && (
        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}
