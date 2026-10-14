import React from 'react';
import { AlgorithmStep } from '../../types';
import { Cpu, Zap } from 'lucide-react';

interface ParallelReduceVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const ParallelReduceVisualizer: React.FC<ParallelReduceVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const partialSums = resultData?.partialSums || [39000, 53000, 81000, 126000];
  const totalSum = resultData?.totalAggregateSum || 299000;
  const numWorkers = resultData?.threadsUsed || 4;

  return (
    <div className="space-y-6">
      {/* Total Aggregate Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/40 text-xs font-mono">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400">Fork-Join Parallel Reducer Result:</span>
          <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
            Total Sum = ₹{totalSum.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-slate-300">
          Partitioned into {numWorkers} parallel OS worker threads, computing local partial sums before final reduction tree merge.
        </p>
      </div>

      {/* Worker Threads Partial Sums */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Worker Thread Partial Summations ({numWorkers} Threads):
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">Concurrent</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {partialSums.map((pSum: number, idx: number) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Worker #{idx + 1}</span>
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span className="text-lg font-black text-white block my-1">
                ₹{pSum.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">COMPLETED</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
