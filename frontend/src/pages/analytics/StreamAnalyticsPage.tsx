import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Shuffle,
  Cpu,
  Zap
} from 'lucide-react';

export const StreamAnalyticsPage: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [streamCount, setStreamCount] = useState(148);
  const reservoirSize = 5;

  const [reservoir, setReservoir] = useState<Array<{ id: string; amount: number; time: string }>>([
    { id: 'TXN-9021', amount: 45000, time: '14:21:05' },
    { id: 'TXN-9034', amount: 12000, time: '14:21:12' },
    { id: 'TXN-9055', amount: 89000, time: '14:21:28' },
    { id: 'TXN-9062', amount: 34000, time: '14:21:39' },
    { id: 'TXN-9080', amount: 99000, time: '14:21:50' }
  ]);

  const [recentStreamItems, setRecentStreamItems] = useState<Array<{ id: string; amount: number; accepted: boolean }>>([
    { id: 'TXN-9104', amount: 25000, accepted: false },
    { id: 'TXN-9105', amount: 62000, accepted: true },
    { id: 'TXN-9106', amount: 15000, accepted: false },
    { id: 'TXN-9107', amount: 78000, accepted: false },
    { id: 'TXN-9108', amount: 48000, accepted: true }
  ]);

  const parallelPrefixSums: number[] = [
    12000, 37000, 99000, 114000, 192000, 240000, 285000, 374000
  ];

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setStreamCount(prev => {
        const nextCount = prev + 1;
        const newId = `TXN-${9100 + nextCount}`;
        const newAmount = Math.floor(Math.random() * 95000) + 5000;
        const replaceIdx = Math.floor(Math.random() * nextCount);
        const accepted = replaceIdx < reservoirSize;

        if (accepted) {
          setReservoir(oldRes => {
            const copy = [...oldRes];
            const slot = Math.floor(Math.random() * copy.length);
            copy[slot] = { id: newId, amount: newAmount, time: new Date().toLocaleTimeString() };
            return copy;
          });
        }

        setRecentStreamItems(old => [
          { id: newId, amount: newAmount, accepted },
          ...old.slice(0, 5)
        ]);

        return nextCount;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isStreaming, reservoirSize]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-glow border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
              High-Frequency Stream Processing
            </span>
            <span className="text-xs text-slate-400 font-mono">&bull; Continuous Time DSA</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            Real-Time Streaming Analytics & Parallelism
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Demonstrating Reservoir Sampling (Algorithm R) for unbiased audit drawing, Blelloch Work-Efficient Parallel Prefix Scan, and Tree-Based Parallel Reduce.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-mono flex items-center gap-2 transition-all ${
              isStreaming
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)]'
            }`}
          >
            {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isStreaming ? 'Pause Stream Feed' : 'Resume Stream Feed'}</span>
          </button>
        </div>
      </div>

      {/* 3 Streaming Algorithmic Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reservoir Sampling (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shuffle className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Reservoir Sampling (Algorithm R) &mdash; Uniform Sample of Size K={reservoirSize}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                Stream N = {streamCount} Items Processed
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Every incoming transaction item replaces a random reservoir element with probability {'P = k/i'}, mathematically guaranteeing every element in the infinite stream has equal inclusion probability {'k/N'}.
            </p>

            {/* Current Reservoir Slots */}
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">
                Current Active Reservoir Buffer (K={reservoirSize} Unbiased Random Audit Samples):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {reservoir.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 transition-all font-mono text-center shadow-lg"
                  >
                    <span className="text-[10px] text-cyan-400 font-bold block mb-0.5">Slot #{idx + 1}</span>
                    <p className="text-xs font-bold text-white truncate">{item.id}</p>
                    <p className="text-[11px] text-emerald-400 font-bold mt-1">₹ {item.amount.toLocaleString()}</p>
                    <span className="text-[9px] text-slate-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Incoming Stream Feed Log */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">
                Live Transaction Ingress Stream:
              </span>
              <div className="space-y-1.5">
                {recentStreamItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all ${
                      item.accepted
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{item.id}</span>
                      <span>Amount: ₹ {item.amount.toLocaleString()}</span>
                    </div>
                    <span className="text-[10px] font-bold">
                      {item.accepted ? 'ACCEPTED INTO RESERVOIR (P = k/i)' : 'PASSED (Uniform Rejection)'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Blelloch Parallel Scan & Reduce (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Blelloch Scan */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Cpu className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-bold text-white">Blelloch Parallel Prefix Scan</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates running cumulative balance sums across chunks with Span O(log N) and Work O(N) using Up-Sweep (reduce) and Down-Sweep tree phases.
            </p>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Calculated Running Balances (Parallel Cumulative Prefix):
              </span>
              <div className="grid grid-cols-4 gap-1.5 font-mono text-center">
                {parallelPrefixSums.map((sum, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-900 border border-violet-500/30 text-violet-300 text-xs font-bold">
                    ₹ {sum.toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Parallel Reduce */}
          <div className="p-6 rounded-3xl glass-panel border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 to-slate-900 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Parallel Fork-Join Summation</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-core reduction aggregating all intraday settlement amounts in O(log N) parallel steps across available processor threads.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">Total Aggregated Liquidity:</span>
              <span className="text-emerald-400 font-black text-sm">
                ₹ 3,74,000.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
