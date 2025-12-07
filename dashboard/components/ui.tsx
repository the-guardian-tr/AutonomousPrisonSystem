
import React from 'react';
import { cn } from '@/lib/utils';

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-xl p-6 shadow-xl", className)}>
        {children}
    </div>
);

export const Badge = ({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "danger" | "success" | "warning" }) => {
    const colors = {
        default: "bg-slate-800 text-slate-300",
        danger: "bg-red-900/40 text-red-400 border border-red-900/50",
        success: "bg-emerald-900/40 text-emerald-400 border border-emerald-900/50",
        warning: "bg-amber-900/40 text-amber-400 border border-amber-900/50"
    };
    return (
        <span className={cn("px-2 py-1 rounded text-xs font-semibold tracking-wider uppercase", colors[variant])}>
            {children}
        </span>
    );
};
