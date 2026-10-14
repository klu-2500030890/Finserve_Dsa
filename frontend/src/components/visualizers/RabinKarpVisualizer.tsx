import React from 'react';
import { AlgorithmStep } from '../../types';
import { Hash, Sparkles, AlertTriangle } from 'lucide-react';

interface RabinKarpVisualizerProps {
  text: string;
  pattern: string;
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const RabinKarpVisualizer: React.FC<RabinKarpVisualizerProps> = ({
  text,
  pattern,
  currentStep,
  resultData
}) => {
  const stateMap = currentStep?.stateMap || {};
  const patternHash = stateMap.patternHash || resultData?.patternHash || 0;
  const windowHash = stateMap.windowHash || 0;
  const windowIndex = stateMap.windowIndex !== undefined ? stateMap.windowIndex : 0;
  const m = pattern.length;

  const isCollision = currentStep?.type === 'HASH_COLLISION_SPURIOUS';
  const isMatch = currentStep?.type === 'HASH_MATCH_VERIFIED';

  return (
    <div className="space-y-6">
      {/* Hash Comparison Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pattern Hash Card */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-violet-500/30">
          <div className="flex items-center gap-2 mb-1 text-xs font-mono text-violet-300">
            <Hash className="w-3.5 h-3.5 text-violet-400" />
            <span>Target Pattern Hash (Modulo 10^9+7):</span>
          </div>
          <div className="text-xl font-mono font-black text-white">
            {patternHash}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Pattern: "{pattern}"</p>
        </div>

        {/* Current Window Hash Card */}
        <div className={`p-4 rounded-2xl border transition-all ${
          isMatch
            ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_0_20px_rgba(0,245,160,0.2)]'
            : isCollision
            ? 'bg-pink-950/40 border-pink-400 shadow-[0_0_20px_rgba(255,0,128,0.2)]'
            : 'bg-slate-900/60 border-cyan-500/30'
        }`}>
          <div className="flex items-center justify-between mb-1 text-xs font-mono">
            <span className="flex items-center gap-2 text-cyan-300">
              <Hash className="w-3.5 h-3.5 text-cyan-400" />
              <span>Current Window Hash:</span>
            </span>
            {isMatch && <span className="text-emerald-400 font-bold">MATCH!</span>}
            {isCollision && <span className="text-pink-400 font-bold">SPURIOUS COLLISION</span>}
          </div>
          <div className="text-xl font-mono font-black text-white">
            {windowHash}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            Window: "{text.substring(windowIndex, Math.min(text.length, windowIndex + m))}"
          </p>
        </div>
      </div>

      {/* Sliding Window Visualization */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-slate-300">
            Sliding Window Scan on Financial Transaction Memo:
          </span>
          <span className="text-[10px] font-mono text-cyan-400">Rolling Update: O(1)</span>
        </div>

        <div className="flex flex-wrap gap-1 p-1">
          {text.split('').map((char, idx) => {
            const inWindow = idx >= windowIndex && idx < windowIndex + m;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center min-w-[28px] p-1.5 rounded-lg border text-xs font-mono transition-all ${
                  inWindow && isMatch
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-100 font-bold scale-105 shadow-[0_0_12px_rgba(0,245,160,0.5)]'
                    : inWindow && isCollision
                    ? 'bg-pink-500/30 border-pink-400 text-pink-100 font-bold'
                    : inWindow
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100 font-bold scale-105'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <span className="text-[9px] text-slate-500">{idx}</span>
                <span className="text-sm font-bold">{char === ' ' ? '␣' : char}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
