import React from 'react';
import { AlgorithmStep } from '../../types';

interface KMPVisualizerProps {
  text: string;
  pattern: string;
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const KMPVisualizer: React.FC<KMPVisualizerProps> = ({
  text,
  pattern,
  currentStep,
  resultData
}) => {
  const activeIndices = currentStep?.activeIndices || [];
  const activeTextIdx = activeIndices[0] !== undefined ? activeIndices[0] : -1;
  const activePatIdx = activeIndices[1] !== undefined ? activeIndices[1] : -1;
  const lpsArray = currentStep?.stateMap?.lps || resultData?.lpsArray || [];
  const foundIndex = currentStep?.stateMap?.foundIndex;

  return (
    <div className="space-y-6">
      {/* LPS Array Display */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-cyan-300">
            LPS Array (Longest Proper Prefix which is also Suffix):
          </span>
          <span className="text-[10px] font-mono text-slate-400">Preprocessing: O(M)</span>
        </div>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-2">
          {pattern.split('').map((char, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center p-2 rounded-xl border text-xs font-mono transition-all ${
                activePatIdx === idx
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 scale-105 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'bg-slate-950/80 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[10px] text-slate-500">[{idx}]</span>
              <span className="text-sm font-bold text-white my-0.5">{char}</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-400 font-bold">
                {lpsArray[idx] !== undefined ? lpsArray[idx] : 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Text Stream Display */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-slate-300">
            Transaction Payment Memo Stream (Text N = {text.length}):
          </span>
          <span className="text-[10px] font-mono text-slate-400">Pointer: {activeTextIdx >= 0 ? activeTextIdx : '-'}</span>
        </div>
        <div className="flex flex-wrap gap-1 max-h-48 overflow-y-auto p-1">
          {text.split('').map((char, idx) => {
            const isActive = activeTextIdx === idx;
            const isMatched = foundIndex !== undefined && idx >= foundIndex && idx < foundIndex + pattern.length;

            return (
              <div
                key={idx}
                className={`flex flex-col items-center min-w-[28px] p-1.5 rounded-lg border text-xs font-mono transition-all ${
                  isMatched
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold shadow-[0_0_12px_rgba(0,245,160,0.4)]'
                    : isActive
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100 font-bold scale-110 shadow-[0_0_15px_rgba(0,242,254,0.5)]'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <span className="text-[9px] text-slate-500">{idx}</span>
                <span className="text-sm font-bold">{char === ' ' ? '␣' : char}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern Alignment Display */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-violet-300">
            Target Suspicious Payment Code Pattern (Length M = {pattern.length}):
          </span>
          <span className="text-[10px] font-mono text-slate-400">Shifted by LPS</span>
        </div>
        <div className="flex flex-wrap gap-1 p-1">
          {pattern.split('').map((char, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center min-w-[28px] p-1.5 rounded-lg border text-xs font-mono transition-all ${
                activePatIdx === idx
                  ? 'bg-violet-500/30 border-violet-400 text-violet-200 font-bold scale-110 shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[9px] text-slate-500">{idx}</span>
              <span className="text-sm font-bold">{char}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
