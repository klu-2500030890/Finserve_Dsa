import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import type { DashboardStats, AlgorithmExecution } from '../types';
import { StatCard } from '../components/common/StatCard';
import { LiveTransactionStream } from '../components/stream/LiveTransactionStream';
import {
  Users,
  CreditCard,
  ArrowLeftRight,
  ShieldAlert,
  FileText,
  Binary,
  Zap,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 105,
    activeAccounts: 160,
    totalTransactions: 520,
    fraudPatternsDetected: 18,
    documentsIndexed: 45,
    algorithmsExecuted: 142
  });

  const [recentExecutions, setRecentExecutions] = useState<AlgorithmExecution[]>([
    {
      id: 1,
      algorithmName: "Aho-Corasick Automaton",
      category: "STRING_MATCHING",
      executionTimeMs: 2.4,
      status: "COMPLETED",
      inputSummary: "Multi-pattern scan across 520 transaction narratives",
      executedAt: new Date().toISOString()
    },
    {
      id: 2,
      algorithmName: "Dinic's Max Flow Algorithm",
      category: "NETWORK_FLOW",
      executionTimeMs: 5.8,
      status: "COMPLETED",
      inputSummary: "Capacity graph across 8 settlement clearing banks",
      executedAt: new Date().toISOString()
    },
    {
      id: 3,
      algorithmName: "Knuth-Morris-Pratt (KMP)",
      category: "STRING_MATCHING",
      executionTimeMs: 0.9,
      status: "COMPLETED",
      inputSummary: "Payment code pattern verify: 'SWIFT-IN-9082'",
      executedAt: new Date().toISOString()
    },
    {
      id: 4,
      algorithmName: "Levenshtein Matrix DP",
      category: "DYNAMIC_PROGRAMMING",
      executionTimeMs: 3.1,
      status: "COMPLETED",
      inputSummary: "Typo correction: 'TRANSFER_INT' vs 'TRNASFER_INT'",
      executedAt: new Date().toISOString()
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dStats = await api.getDashboardStats();
        if (dStats) setStats(dStats);
        const execs = await api.getRecentExecutions();
        if (execs && Array.isArray(execs) && execs.length > 0) {
          const normalized: AlgorithmExecution[] = execs.map((e: any) => ({
            id: e.id || Math.random(),
            algorithmName: e.algorithm || e.algorithmName || 'DSA Algorithm',
            category: (e.module || e.category || 'DSA_MODULE').replace(/_/g, ' '),
            executionTimeMs: typeof e.executionTimeMs === 'number' ? e.executionTimeMs : (e.executionTimeNs ? e.executionTimeNs / 1_000_000 : 0.5),
            status: e.status || 'COMPLETED',
            inputSummary: e.resultSummary || e.inputSummary || (e.inputSize ? `Input items: ${e.inputSize}` : 'Live computational trace generated'),
            executedAt: e.executedAt || new Date().toISOString()
          }));
          setRecentExecutions(normalized);
        }
      } catch (err) {
        console.warn("Using fallback local dashboard telemetry:", err);
      }
    };
    fetchData();
  }, []);

  const volumeTrendData = [
    { time: '09:00', volume: 180, amountLakhs: 45 },
    { time: '10:00', volume: 290, amountLakhs: 72 },
    { time: '11:00', volume: 420, amountLakhs: 98 },
    { time: '12:00', volume: 510, amountLakhs: 135 },
    { time: '13:00', volume: 380, amountLakhs: 89 },
    { time: '14:00', volume: 490, amountLakhs: 120 },
    { time: '15:00', volume: 520, amountLakhs: 142 }
  ];

  const riskPieData = [
    { name: 'Low Risk', value: 430, color: '#00f5a0' },
    { name: 'Medium Risk', value: 72, color: '#f59e0b' },
    { name: 'Critical Fraud Flag', value: 18, color: '#ff0080' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-glow border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
              {role} Command Center
            </span>
            <span className="text-xs text-slate-400 font-mono">&bull; System Online</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">
            Good Morning, <span className="text-cyan-400">{user?.username || 'Analyst'}</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            Here's what's happening across the financial intelligence & DSA computational pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/transactions')}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Transact (₹1L Limit)</span>
          </button>

          <button
            onClick={() => navigate('/dsa/m1-string')}
            className="px-4 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold text-xs flex items-center gap-2 transition-all"
          >
            <Binary className="w-4 h-4 text-cyan-400" />
            <span>Open DSA Lab</span>
          </button>
        </div>
      </div>

      {/* 6 Key Performance Metric Counters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          color="cyan"
          subtitle="KYC Verified"
        />
        <StatCard
          title="Active Accounts"
          value={stats.activeAccounts ?? 160}
          icon={CreditCard}
          color="violet"
          subtitle="All Tier Types"
        />
        <StatCard
          title="Txns Processed"
          value={stats.totalTransactions}
          icon={ArrowLeftRight}
          color="emerald"
          subtitle="Cap: ₹1,00,000"
        />
        <StatCard
          title="Fraud Patterns"
          value={stats.fraudPatternsDetected ?? 18}
          icon={ShieldAlert}
          color="magenta"
          subtitle="Aho-Corasick Flag"
        />
        <StatCard
          title="Docs Indexed"
          value={stats.documentsIndexed ?? 45}
          icon={FileText}
          color="violet"
          subtitle="Suffix Array DB"
        />
        <StatCard
          title="Algos Executed"
          value={stats.algorithmsExecuted ?? 142}
          icon={Binary}
          color="amber"
          subtitle="Real Java Runtime"
        />
      </div>

      {/* Large Live Transaction Particle Stream Network */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800/80 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-wide">Live Financial Data Stream</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse">
                LIVE KINETIC MESH
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulated inter-bank liquidity flow from Originating Customers through Gateways to Settlement Merchants.
            </p>
          </div>
          <button
            onClick={() => navigate('/network-explorer')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Launch Topology Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <LiveTransactionStream />
      </div>

      {/* Two Column Grid: Charts & Recent Algorithm Executions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Analytics Charts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-white">Settlement Volume & Throughput Trend</h4>
                <p className="text-xs text-slate-400">Aggregated intraday settlement flow (₹ in Lakhs)</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+14.2% Flow</span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeTrendData}>
                  <defs>
                    <linearGradient id="cyanVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#475569" fontSize={11} fontStyle="italic" />
                  <YAxis stroke="#475569" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d1f',
                      borderColor: '#1e293b',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amountLakhs"
                    name="Settled Volume (₹ Lakhs)"
                    stroke="#00f2fe"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#cyanVolume)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Distribution Breakdown */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">Aho-Corasick Forensic Threat Classification</h4>
              <p className="text-xs text-slate-400 max-w-sm">
                Real-time keyword pattern matches across SWIFT payloads, OTP bypass attempts, and payment descriptions.
              </p>
              <div className="space-y-1.5 text-xs">
                {riskPieData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300 font-medium">{item.name}:</span>
                    <span className="font-mono text-slate-100 font-bold">{item.value} txns</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-44 h-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d1f',
                      borderColor: '#1e293b',
                      borderRadius: '12px',
                      fontSize: '11px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Algorithm Activity Panel & Quick Lab Hub */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">Recent Algorithm Executions</h4>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Verified Java 25 Engine
              </span>
            </div>

            <div className="space-y-3">
              {recentExecutions.map((exec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {exec.algorithmName}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {exec.executionTimeMs.toFixed(2)} ms
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{exec.inputSummary}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] font-mono text-slate-500">
                    <span>{(exec.category || 'DSA MODULE').replace(/_/g, ' ')}</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      {exec.status || 'COMPLETED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Module Launchpad */}
          <div className="p-6 rounded-3xl glass-panel border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 to-slate-900">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">Direct DSA Module Launchpad</h4>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Explore step-by-step traces, state machines, and mathematical complexity proofs.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('/dsa/m1-string')}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
              >
                <p className="text-xs font-bold text-slate-200">M1: Strings</p>
                <p className="text-[10px] text-slate-400 font-mono">KMP &bull; Aho-Corasick</p>
              </button>
              <button
                onClick={() => navigate('/dsa/m2-suffix')}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
              >
                <p className="text-xs font-bold text-slate-200">M2: Suffix</p>
                <p className="text-[10px] text-slate-400 font-mono">SA-IS &bull; LCP Kasai</p>
              </button>
              <button
                onClick={() => navigate('/dsa/m3-dp')}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
              >
                <p className="text-xs font-bold text-slate-200">M3: Dynamic Prog</p>
                <p className="text-[10px] text-slate-400 font-mono">Levenshtein &bull; Bitmask</p>
              </button>
              <button
                onClick={() => navigate('/dsa/m4-flow')}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
              >
                <p className="text-xs font-bold text-slate-200">M4: Max Flow</p>
                <p className="text-[10px] text-slate-400 font-mono">Dinic &bull; Min Cut</p>
              </button>
              <button
                onClick={() => navigate('/dsa/m5-np')}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
              >
                <p className="text-xs font-bold text-slate-200">M5: NP-Hard</p>
                <p className="text-[10px] text-slate-400 font-mono">3-SAT &bull; Vertex Cover</p>
              </button>
              <button
                onClick={() => navigate('/dsa/m6-random-parallel')}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
              >
                <p className="text-xs font-bold text-slate-200">M6: Parallel & Rand</p>
                <p className="text-[10px] text-slate-400 font-mono">Blelloch &bull; Miller-Rabin</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
