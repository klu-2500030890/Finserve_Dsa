import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SettingsPage: React.FC = () => {
  const { role, canManageSystem } = useAuth();
  const [maxLimit, setMaxLimit] = useState(100000);
  const [otpExpirySeconds, setOtpExpirySeconds] = useState(300);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
    } catch {}
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-glow border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
              System Control & Security Policies
            </span>
            <span className="text-xs text-slate-400 font-mono">&bull; {role} Access</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            Platform Settings & Governance
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Configure regulatory limits, 2FA OTP parameters, and role-based permissions matrix.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings Applied!</span>
          </div>
        )}
      </div>

      {/* RBAC Role Permissions Matrix */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Users className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Role-Based Access Control (RBAC) Permissions Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-[10px] uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Platform Capability / Action</th>
                <th className="p-3 text-cyan-300">ADMINISTRATOR (Owner)</th>
                <th className="p-3 text-amber-300">MANAGER (Fraud Ops)</th>
                <th className="p-3 text-emerald-300">USER (Analyst / Test)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="p-3 text-slate-300">Full System Configuration & Limits</td>
                <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                <td className="p-3 text-slate-500">Read Only</td>
                <td className="p-3 text-slate-500">Read Only</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300">Fraud Resolution & Account Freeze/Override</td>
                <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                <td className="p-3 text-slate-500">View Only</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300">Initiate Transactions (₹1L Cap + 2FA)</td>
                <td className="p-3 text-emerald-400 font-bold">ENABLED</td>
                <td className="p-3 text-emerald-400 font-bold">ENABLED</td>
                <td className="p-3 text-emerald-400 font-bold">ENABLED</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300">Execute M1–M6 DSA Algorithms & Visualizers</td>
                <td className="p-3 text-emerald-400 font-bold">ENABLED</td>
                <td className="p-3 text-emerald-400 font-bold">ENABLED</td>
                <td className="p-3 text-emerald-400 font-bold">ENABLED</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Regulatory & Security Configuration Form */}
      <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Regulatory Limits & Sentinel Thresholds
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">
              Regulatory Maximum Limit per Transaction (₹ INR)
            </label>
            <input
              type="number"
              disabled={!canManageSystem}
              value={maxLimit}
              onChange={(e) => setMaxLimit(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-500 disabled:opacity-50"
            />
            <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
              Default RBI Regulatory Cap: ₹1,00,000 (1 Lakh)
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">
              2FA Mobile OTP Expiry Window (Seconds)
            </label>
            <input
              type="number"
              disabled={!canManageSystem}
              value={otpExpirySeconds}
              onChange={(e) => setOtpExpirySeconds(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-500 disabled:opacity-50"
            />
            <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
              Configured: 300 seconds (5 minutes)
            </span>
          </div>
        </div>

        {canManageSystem && (
          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save System Parameters</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
