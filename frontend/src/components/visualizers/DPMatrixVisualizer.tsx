import React from 'react';
import { AlgorithmStep } from '../../types';

interface DPMatrixVisualizerProps {
  source: string;
  target: string;
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const DPMatrixVisualizer: React.FC<DPMatrixVisualizerProps> = ({
  source,
  target,
  currentStep,
  resultData
}) => {
  const matrix = currentStep?.matrixState || resultData?.matrix || [];
  const activeIndices = currentStep?.activeIndices || [];
  const activeI = activeIndices[0] !== undefined ? activeIndices[0] : -1;
  const activeJ = activeIndices[1] !== undefined ? activeIndices[1] : -1;
  const editDistance = resultData?.editDistance;
  const alignmentPath = resultData?.alignmentPath || [];

  const n = source.length;
  const m = target.length;

  return (
    <div className="space-y-6">
      {/* Result Badge */}
      {editDistance !== undefined && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
          <div>
            <span className="text-slate-400">Comparing: </span>
            <strong className="text-cyan-300">"{source}"</strong>
            <span className="text-slate-400"> vs </span>
            <strong className="text-violet-300">"{target}"</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Min Edit Operations:</span>
            <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 text-sm">
              {editDistance}
            </span>
          </div>
        </div>
      )}

      {/* 2D DP Table Grid */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-slate-300">
            2D DP Recurrence Table DP[i][j]:
          </span>
          <span className="text-[10px] font-mono text-cyan-400">Dimensions: {n + 1} × {m + 1}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="border-collapse font-mono text-xs text-center mx-auto">
            <thead>
              <tr>
                <th className="p-2 text-slate-600 bg-slate-950 border border-slate-800">DP</th>
                <th className="p-2 text-slate-500 bg-slate-950 border border-slate-800">ε</th>
                {target.split('').map((ch, j) => (
                  <th key={j} className="p-2 text-cyan-400 font-bold bg-slate-900 border border-slate-800">
                    {ch}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: n + 1 }).map((_, i) => (
                <tr key={i}>
                  <th className="p-2 text-violet-400 font-bold bg-slate-900 border border-slate-800">
                    {i === 0 ? 'ε' : source.charAt(i - 1)}
                  </th>
                  {Array.from({ length: m + 1 }).map((_, j) => {
                    const isCurrentCell = activeI === i && activeJ === j;
                    const val = matrix[i] && matrix[i][j] !== undefined ? matrix[i][j] : '-';

                    return (
                      <td
                        key={j}
                        className={`min-w-[40px] h-10 border transition-all text-xs font-bold ${
                          isCurrentCell
                            ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100 scale-110 shadow-[0_0_15px_rgba(0,242,254,0.5)] z-10'
                            : i === n && j === m
                            ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 font-black'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optimal Alignment Reconstruction */}
      {alignmentPath.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300 mb-2 block">
            Optimal Backtracked Edit Sequence:
          </span>
          <div className="flex flex-wrap gap-2">
            {alignmentPath.map((step: any, idx: number) => (
              <div
                key={idx}
                className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono flex items-center gap-1.5"
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  step.op === 'MATCH' ? 'bg-emerald-500/20 text-emerald-300' :
                  step.op === 'INSERT' ? 'bg-blue-500/20 text-blue-300' :
                  step.op === 'DELETE' ? 'bg-pink-500/20 text-pink-300' :
                  'bg-amber-500/20 text-amber-300'
                }`}>
                  {step.op}
                </span>
                <span className="text-slate-300 font-bold">'{step.sourceChar}' ➔ '{step.targetChar}'</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
