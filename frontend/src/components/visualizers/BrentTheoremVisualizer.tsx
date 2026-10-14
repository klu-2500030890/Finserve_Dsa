import React from 'react';
import { AlgorithmStep } from '../../types';
import { TrendingUp, Cpu } from 'lucide-react';

interface BrentTheoremVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const BrentTheoremVisualizer: React.FC<BrentTheoremVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const scalingCurve = resultData?.scalingCurve || [
    { processorsP: 1, theoreticalTimeTp: 10100, speedup: 1.0, efficiencyPercent: 100 },
    { processorsP: 2, theoreticalTimeTp: 5100, speedup: 1.98, efficiencyPercent: 99 },
    { processorsP: 4, theoreticalTimeTp: 2600, speedup: 3.88, efficiencyPercent: 97 },
    { processorsP: 8, theoreticalTimeTp: 1350, speedup: 7.48, efficiencyPercent: 93.5 },
    { processorsP: 16, theoreticalTimeTp: 725, speedup: 13.93, efficiencyPercent: 87.1 }
  ];

  return (
    <div className="space-y-6">
      {/* Brent Formula Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/40 text-xs font-mono">
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-400">Brent's Scheduling Law:</span>
          <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
            T_p ≤ W / P + S
          </span>
        </div>
        <p className="text-slate-300 mt-1">
          Where <strong>W</strong> = Total Work (Sequential operations) and <strong>S</strong> = Critical Path Span (Minimum step depth).
        </p>
      </div>

      {/* Speedup and Efficiency Table */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-300 mb-2 block">
          Theoretical Parallel Speedup & Core Efficiency:
        </span>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-2.5">Processors (P)</th>
                <th className="p-2.5">Time Bound (T_p)</th>
                <th className="p-2.5">Speedup Factor</th>
                <th className="p-2.5">Parallel Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
              {scalingCurve.map((row: any) => (
                <tr key={row.processorsP} className="hover:bg-slate-800/40">
                  <td className="p-2.5 font-bold text-cyan-400">{row.processorsP} Cores</td>
                  <td className="p-2.5 text-white">{Math.round(row.theoreticalTimeTp)} steps</td>
                  <td className="p-2.5 text-emerald-400 font-bold">{Number(row.speedup).toFixed(2)}x</td>
                  <td className="p-2.5 text-violet-300 font-bold">{Number(row.efficiencyPercent).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
