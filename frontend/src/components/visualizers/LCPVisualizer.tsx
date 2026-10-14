import React from 'react';
import { AlgorithmStep } from '../../types';
import { Sparkles } from 'lucide-react';

interface LCPVisualizerProps {
  text: string;
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const LCPVisualizer: React.FC<LCPVisualizerProps> = ({
  text,
  currentStep,
  resultData
}) => {
  const lcpArray = currentStep?.arrayState || resultData?.lcpArray || [];
  const longestRepeated = resultData?.longestRepeatedSubstring || currentStep?.stateMap?.longestRepeated || '';
  const maxLcp = resultData?.maxLcpLength || currentStep?.stateMap?.maxLcp || 0;
  const activeIndices = currentStep?.activeIndices || [];

  return (
    <div className="space-y-6">
      {/* Longest Repeated Substring Banner */}
      {longestRepeated && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-violet-950/60 to-slate-900 border border-violet-500/40 flex items-center justify-between text-xs font-mono shadow-lg">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-violet-400 shrink-0" />
            <div>
              <span className="text-slate-400">Longest Repeated Substring in Ledger: </span>
              <strong className="text-white font-bold text-sm block">"{longestRepeated}"</strong>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-violet-500/20 text-violet-300 font-bold border border-violet-500/30">
            LCP Length = {maxLcp}
          </span>
        </div>
      )}

      {/* LCP Array Cells */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-slate-300">
            Kasai's LCP Array (Longest Common Prefix between adjacent sorted suffixes):
          </span>
          <span className="text-[10px] font-mono text-cyan-400">Kasai: O(N)</span>
        </div>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {lcpArray.map((lcpVal: number, idx: number) => {
            const isActive = activeIndices.includes(idx);
            return (
              <div
                key={idx}
                className={`flex flex-col items-center min-w-[36px] p-2 rounded-xl border text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-violet-500/30 border-violet-400 text-violet-100 font-bold scale-110 shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <span className="text-[9px] text-slate-500">Rank {idx}</span>
                <span className={`text-base font-black my-1 ${lcpVal > 0 ? 'text-violet-300' : 'text-slate-600'}`}>
                  {lcpVal}
                </span>
                <span className="text-[9px] text-slate-500">LCP</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
