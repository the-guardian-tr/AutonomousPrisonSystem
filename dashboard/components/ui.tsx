
import React from 'react';
import { cn } from '@/lib/utils';

interface ArwesProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const ArwesCard = ({ children, className, title }: ArwesProps) => (
    <div className={cn("arwes-card mb-4", className)}>
        {title && (
            <div className="bg-cyan-950/30 border-b border-cyan-500/20 p-2 flex justify-between items-center">
                <h3 className="arwes-title text-cyan-400 text-xs font-bold pl-2">{title}</h3>
                <div className="flex gap-1 pr-2">
                    <div className="w-1 h-1 bg-cyan-500 rounded-full animate-ping"></div>
                    <div className="w-1 h-1 bg-cyan-700 rounded-full"></div>
                    <div className="w-1 h-1 bg-cyan-900 rounded-full"></div>
                </div>
            </div>
        )}
        <div className="arwes-card-content p-4 text-cyan-50">
            {children}
        </div>
    </div>
);

export const SciFiBadge = ({ children, variant = "default", animate = false }: { children: React.ReactNode, variant?: "default" | "alert" | "success" | "warning", animate?: boolean }) => {
    const colors = {
        default: "border-cyan-500 text-cyan-400 bg-cyan-950/40",
        alert: "border-red-500 text-red-500 bg-red-950/40",
        success: "border-emerald-500 text-emerald-400 bg-emerald-950/40",
        warning: "border-amber-500 text-amber-500 bg-amber-950/40"
    };

    return (
        <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-l-4 clip-badge",
            colors[variant],
            animate && "animate-pulse"
        )}>
            {children}
        </div>
    );
};

export const TechText = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={cn("arwes-text font-mono text-cyan-300", className)}>
        {children}
    </span>
);

export const Separator = () => (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-4"></div>
);
