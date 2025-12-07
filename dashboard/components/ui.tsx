
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

/* --- MODERN ENTERPRISE COMPONENTS --- */

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden", className)}>
        {children}
    </div>
);

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    className,
    onClick,
    disabled
}: {
    children: React.ReactNode,
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger",
    size?: "sm" | "md" | "lg",
    className?: string,
    onClick?: () => void,
    disabled?: boolean
}) => {
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        secondary: "bg-slate-900 text-white hover:bg-slate-800",
        outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700",
        ghost: "hover:bg-slate-100 text-slate-700",
        danger: "bg-red-600 text-white hover:bg-red-700"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </button>
    );
};

export const Badge = ({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "success" | "warning" | "danger" | "outline" }) => {
    const variants = {
        default: "bg-slate-100 text-slate-800",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100 text-amber-800",
        danger: "bg-red-100 text-red-800",
        outline: "border border-slate-200 text-slate-600"
    };

    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant])}>
            {children}
        </span>
    );
}

export const StatCard = ({ title, value, change, icon: Icon, trend }: { title: string, value: string, change: string, icon: LucideIcon, trend: "up" | "down" | "neutral" }) => (
    <Card className="p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
                <Icon className="w-5 h-5 text-blue-600" />
            </div>
        </div>
        <div className="mt-4 flex items-center text-xs">
            <span className={cn("font-medium", trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-slate-600")}>
                {change}
            </span>
            <span className="text-slate-500 ml-2">from last month</span>
        </div>
    </Card>
);

export const Avatar = ({ src, fallback }: { src?: string, fallback: string }) => (
    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-200">
        {src ? <img src={src} alt="Avatar" className="h-full w-full object-cover" /> : <span className="text-xs font-medium text-slate-600">{fallback}</span>}
    </div>
);
