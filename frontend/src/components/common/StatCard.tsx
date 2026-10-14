import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  color?: 'cyan' | 'magenta' | 'violet' | 'emerald' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  color = 'cyan'
}) => {
  const colorMap = {
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      glow: 'shadow-[0_0_20px_rgba(0,242,254,0.06)]',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      badgeBg: 'bg-cyan-500/10 text-cyan-300',
    },
    magenta: {
      border: 'border-pink-500/20 hover:border-pink-500/40',
      glow: 'shadow-[0_0_20px_rgba(236,72,153,0.06)]',
      iconBg: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      badgeBg: 'bg-pink-500/10 text-pink-300',
    },
    violet: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      glow: 'shadow-[0_0_20px_rgba(139,92,246,0.06)]',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      badgeBg: 'bg-purple-500/10 text-purple-300',
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.06)]',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      badgeBg: 'bg-emerald-500/10 text-emerald-300',
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.06)]',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      badgeBg: 'bg-amber-500/10 text-amber-300',
    }
  };

  const scheme = colorMap[color];

  return (
    <div className={`p-5 rounded-3xl bg-slate-900/60 border ${scheme.border} ${scheme.glow} backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 group`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${scheme.iconBg} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-black tracking-tight text-white font-mono">
          {value}
        </span>
        {trend && (
          <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
            trendPositive ? 'bg-emerald-500/10 text-emerald-300' : 'bg-pink-500/10 text-pink-300'
          }`}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-slate-500 font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};
