import React from 'react';
import { AlgorithmStep } from '../../types';
import { GitCommit, Layers } from 'lucide-react';

interface BlellochScanVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const BlellochScanVisualizer: React.FC<BlellochScanVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const inclusivePrefix = resultData?.inclusivePrefixSum || [1000, 3500, 7500, 9000, 12000, 17000, 19000, 25000];
  const totalSum = resultData?.totalAggregateSum || 25000;

  return (
    <div className="space-y-6">
      {/* Up-sweep / Down-sweep Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
          <span className="text-slate-400 block mb-1">Work Complexity:</span>
          <span className="text-lg font-black text-cyan-300">O(N) Work-Efficient</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Parallel Span Depth:</span>
          <span className="text-lg font-black text-violet-400">O(log N) Steps</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Total Running Sum:</span>
          <span className="text-lg font-black text-emerald-400">₹{totalSum.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Prefix Array Results */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Parallel Cumulative Balance Output (Inclusive Prefix Sum):
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">SIMD Ready</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {inclusivePrefix.map((val: number, idx: number) => (
            <div key={idx} className="flex-1 min-w-[70px] p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center font-mono text-xs">
              <span className="text-[9px] text-slate-500 block">Step {idx}</span>
              <span className="text-sm font-black text-cyan-300 my-1 block">
                ₹{val < 1000 ? val : `${(val / 1000).toFixed(1)}k`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
