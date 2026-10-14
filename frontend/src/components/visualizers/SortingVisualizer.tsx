import React from 'react';
import { AlgorithmStep } from '../../types';
import { Shuffle } from 'lucide-react';

interface SortingVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const arrayState = currentStep?.arrayState || resultData?.sortedAmounts || [75000, 12000, 95000, 3200, 48000, 15000, 62000, 89000, 24000, 5000];
  const maxVal = Math.max(...arrayState, 100000);
  const activeIndices = currentStep?.activeIndices || [];
  const pivotVal = currentStep?.stateMap?.pivotValue;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
          <span className="text-slate-400 block mb-1">Expected Time:</span>
          <span className="text-lg font-black text-cyan-300">O(N log N) Las Vegas</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Total Comparisons:</span>
          <span className="text-lg font-black text-white">{resultData?.totalComparisons || 28}</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Total Swaps:</span>
          <span className="text-lg font-black text-violet-400">{resultData?.totalSwaps || 14}</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold text-slate-300">
            Transaction Amounts (Random Pivot Partitioning):
          </span>
          {pivotVal && (
            <span className="text-xs font-mono text-cyan-400 font-bold">
              Active Pivot: ₹{pivotVal.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-end justify-center gap-2 h-56 pt-4 px-2">
          {arrayState.map((val: number, idx: number) => {
            const heightPct = Math.max(12, (val / maxVal) * 100);
            const isActive = activeIndices.includes(idx);
            const isPivot = val === pivotVal;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                <span className="text-[10px] font-mono text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{val < 1000 ? val : `${(val / 1000).toFixed(0)}k`}
                </span>
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t-xl transition-all duration-300 ${
                    isPivot
                      ? 'bg-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.8)]'
                      : isActive
                      ? 'bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.6)]'
                      : 'bg-slate-800 group-hover:bg-slate-700'
                  }`}
                ></div>
                <span className="text-[9px] font-mono text-slate-500">{idx}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
