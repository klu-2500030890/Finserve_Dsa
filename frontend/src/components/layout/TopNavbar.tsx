import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Cpu,
  ShieldCheck,
  ChevronDown,
  UserCheck,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface TopNavbarProps {
  onOpenSearch: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const { role, setRole, user } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getBreadcrumbs = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return ['Overview', 'Dashboard'];
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '));
  };

  const breadcrumbs = getBreadcrumbs();

  const notifications = [
    { id: 1, title: "Aho-Corasick Sentinel", time: "2 min ago", desc: "Detected OTP bypass keyword pattern on TXN-FRAUD-8023." },
    { id: 2, title: "Max-Flow Min-Cut Recalibration", time: "15 min ago", desc: "Interbank corridor between Switch-A and Clearing Hub saturated at 28 Lakhs." },
    { id: 3, title: "Regulatory Compliance", time: "1 hr ago", desc: "All 520 transactions verified within ₹1,00,000 cap." }
  ];

  return (
    <header className="h-16 px-6 bg-[#070a14]/80 border-b border-slate-800/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
      {/* Left: Breadcrumbs & Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-slate-500 font-mono">FINServe</span>
          <span className="text-slate-700">/</span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className={idx === breadcrumbs.length - 1 ? "text-cyan-300 font-semibold" : "text-slate-400"}>
                {crumb}
              </span>
              {idx < breadcrumbs.length - 1 && <span className="text-slate-700">/</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>DSA Engine: Active (Port 8088)</span>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Max Limit: ₹1,00,000 / Txn</span>
        </div>
      </div>

      {/* Right: Search, Notifications & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-slate-200 text-xs transition-all shadow-inner"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Search IDs, Codes, Algorithms...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 border border-slate-700 text-slate-300">
            Ctrl + K
          </kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-magenta-500 animate-ping"></span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-magenta-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-3 space-y-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-2 py-1 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-200">System Alerts & Triggers</span>
                <span className="text-[10px] font-mono text-cyan-400">3 New</span>
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/60 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200 mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RBAC Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all text-xs font-medium text-slate-200 shadow-lg"
          >
            <div className={`w-2 h-2 rounded-full ${
              role === 'ADMINISTRATOR' ? 'bg-cyan-400' : role === 'MANAGER' ? 'bg-amber-400' : 'bg-emerald-400'
            }`}></div>
            <span className="font-mono text-cyan-300 font-semibold">{role}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-800/80 mb-1.5">
                <p className="text-[11px] font-semibold text-slate-300">Switch Active Role (RBAC)</p>
                <p className="text-[10px] text-slate-500">Test platform permissions instantly</p>
              </div>

              {(['ADMINISTRATOR', 'MANAGER', 'USER'] as UserRole[]).map((r) => {
                const isCurrent = role === r;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between ${
                      isCurrent
                        ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-200'
                        : 'hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">{r}</span>
                        {r === 'ADMINISTRATOR' && <span className="text-[9px] px-1 rounded bg-cyan-500/20 text-cyan-300">Superowner</span>}
                        {r === 'MANAGER' && <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300">Fraud Ops</span>}
                        {r === 'USER' && <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300">Testing</span>}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {r === 'ADMINISTRATOR' ? 'Full system control & config' :
                         r === 'MANAGER' ? 'Handle fraud, escalations & payment overrides' :
                         'Initiate ₹1L transfers & test all DSA labs'}
                      </p>
                    </div>
                    {isCurrent && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
