
import React from 'react';
import { cn } from '@/lib/utils';

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("holo-card p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]", className)}>
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50"></div>
        {children}
    </div>
);

export const Badge = ({ children, variant = "default", animate = false }: { children: React.ReactNode, variant?: "default" | "danger" | "success" | "warning" | "holo", animate?: boolean }) => {
    const colors = {
        default: "bg-slate-900/50 text-slate-400 border-slate-700",
        danger: "bg-red-950/40 text-red-500 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
        success: "bg-emerald-950/40 text-emerald-500 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
        warning: "bg-amber-950/40 text-amber-500 border-amber-500/30",
        holo: "bg-cyan-950/30 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
    };

    return (
        <span className={cn(
            "px-2 py-0.5 rounded-sm text-[9px] font-bold tracking-[0.2em] uppercase border flex items-center gap-2 select-none",
            colors[variant],
            animate && "animate-pulse"
        )}>
            {animate && <span className="w-1 h-1 rounded-full bg-current shadow-[0_0_5px_currentColor]" />}
            {children}
        </span>
    );
};

export const GlitchText = ({ text }: { text: string }) => (
    <span className="glitch font-black tracking-tighter uppercase" data-text={text}>{text}</span>
);
