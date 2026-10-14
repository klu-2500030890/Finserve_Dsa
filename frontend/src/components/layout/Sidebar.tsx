import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ArrowLeftRight,
  FileText,
  ShieldAlert,
  FolderLock,
  Binary,
  GitBranch,
  Table,
  Network,
  Cpu,
  Shuffle,
  Activity,
  BarChart3,
  Waves,
  FileSpreadsheet,
  HelpCircle,
  Info,
  Settings,
  Sparkles,
  Zap,
  Lock,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';

export const Sidebar: React.FC = () => {
  const { role, canManageSystem, canHandleFraud } = useAuth();
  const { startDemoTour, isDemoActive } = useDemo();
  const location = useLocation();

  const navSection = (title: string, items: Array<{ to: string; label: string; icon: any; badge?: string; reqRole?: string }>) => (
    <div className="mb-6">
      <div className="px-4 mb-2 text-[10px] font-mono tracking-widest uppercase text-cyan-400/60 flex items-center justify-between">
        <span>{title}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40"></div>
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to !== '/dashboard' && item.to !== '/' && location.pathname.startsWith(item.to));
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,242,254,0.15)] font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className="w-64 h-screen bg-[#070a14]/95 border-r border-slate-800/80 flex flex-col justify-between shrink-0 sticky top-0 backdrop-blur-xl z-30 select-none overflow-y-auto">
      {/* Brand Header */}
      <div className="p-4">
        <div className="flex items-center gap-3 px-2 py-2 mb-4 bg-gradient-to-br from-cyan-950/40 to-slate-900/60 rounded-2xl border border-cyan-500/20 shadow-lg shadow-cyan-950/30">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-md shadow-cyan-500/30 shrink-0 animate-pulse-slow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-wider text-white">FIN<span className="text-cyan-400">Serve</span></span>
              <span className="px-1 py-0.2 text-[9px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">v2.4</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">Algorithmic Banking</p>
          </div>
        </div>

        {/* Demo Tour Launcher Button */}
        <button
          onClick={startDemoTour}
          className={`w-full mb-5 px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            isDemoActive
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
              : 'bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-magenta-500/20 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.2)]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>{isDemoActive ? 'Demo Tour Active' : 'Run Complete Demo'}</span>
        </button>

        {/* Navigation Sections */}
        <nav className="space-y-1">
          {navSection("OVERVIEW", [
            { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }
          ])}

          {navSection("FINANCIAL DATA", [
            { to: "/customers", label: "Customers", icon: Users },
            { to: "/accounts", label: "Accounts", icon: CreditCard },
            { to: "/transactions", label: "Transactions", icon: ArrowLeftRight, badge: "₹1L Max" },
            { to: "/documents", label: "Financial Docs", icon: FileText },
            { to: "/fraud-events", label: "Fraud Alerts", icon: ShieldAlert, badge: "Real-time" },
            { to: "/investigations", label: "Investigation Board", icon: FolderLock }
          ])}

          {navSection("DSA LAB (M1 – M6)", [
            { to: "/dsa/m1-string", label: "M1: String Algorithms", icon: Binary, badge: "KMP / Aho" },
            { to: "/dsa/m2-suffix", label: "M2: Suffix Structures", icon: GitBranch, badge: "Array / LCP" },
            { to: "/dsa/m3-dp", label: "M3: Dynamic Program", icon: Table, badge: "Levenshtein" },
            { to: "/dsa/m4-flow", label: "M4: Network Flow", icon: Network, badge: "Dinic / Cut" },
            { to: "/dsa/m5-np", label: "M5: NP & Approx", icon: Cpu, badge: "3-SAT / VC" },
            { to: "/dsa/m6-random-parallel", label: "M6: Random & Parallel", icon: Shuffle, badge: "Scan / MR" }
          ])}

          {navSection("ANALYTICS", [
            { to: "/network-explorer", label: "Network Explorer", icon: Compass },
            { to: "/performance", label: "Algo Benchmarks", icon: BarChart3 },
            { to: "/stream-analytics", label: "Stream Analytics", icon: Waves },
            { to: "/reports", label: "Executive Reports", icon: FileSpreadsheet }
          ])}

          {navSection("SYSTEM", [
            { to: "/why-this-algorithm", label: "Why This Algorithm?", icon: HelpCircle },
            { to: "/about", label: "About FINServe", icon: Info },
            { to: "/settings", label: "System Settings", icon: Settings }
          ])}
        </nav>
      </div>

      {/* User / Role Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center justify-between px-2 py-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
              role === 'ADMINISTRATOR' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
              role === 'MANAGER' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
              'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {role === 'ADMINISTRATOR' ? 'AD' : role === 'MANAGER' ? 'MG' : 'US'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {role === 'ADMINISTRATOR' ? 'Owner / Admin' : role === 'MANAGER' ? 'Risk Manager' : 'Test Analyst'}
              </p>
              <p className="text-[10px] font-mono text-cyan-400 truncate">{role}</p>
            </div>
          </div>
          <Lock className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </aside>
  );
};
