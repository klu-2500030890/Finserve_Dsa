import React from 'react';
import { AlgorithmStep } from '../../types';
import { Network, Sparkles } from 'lucide-react';

interface MatrixChainVisualizerProps {
  dimensions: number[];
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const MatrixChainVisualizer: React.FC<MatrixChainVisualizerProps> = ({
  dimensions,
  currentStep,
  resultData
}) => {
  const optimalParens = resultData?.optimalParenthesization || currentStep?.stateMap?.optimalParens || '';
  const minCost = resultData?.minimumScalarMultiplications || currentStep?.stateMap?.minCost || 0;
  const costMatrix = resultData?.costMatrix || [];

  return (
    <div className="space-y-6">
      {/* Parenthesization Tree Result */}
      {optimalParens && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-violet-950/60 to-slate-900 border border-violet-500/40 text-xs font-mono shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Optimal Parenthesization Order:</span>
            <span className="px-3 py-1 rounded-xl bg-violet-500/20 text-violet-300 font-bold border border-violet-500/30">
              Min Scalar Multiplications = {minCost.toLocaleString()}
            </span>
          </div>
          <div className="text-lg font-black text-cyan-300 tracking-wider py-1 font-mono">
            {optimalParens}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Minimizes computation time when computing multi-asset risk portfolio covariance matrices.
          </p>
        </div>
      )}

      {/* Matrix Chain Specs */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-300 mb-2 block">
          Matrix Sequence & Dimensions:
        </span>
        <div className="flex flex-wrap gap-2">
          {dimensions.slice(0, -1).map((d, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold">A{i + 1}</span>: [{d} × {dimensions[i + 1]}]
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
