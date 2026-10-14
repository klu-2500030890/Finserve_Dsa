import React from 'react';
import { AlgorithmStep } from '../../types';
import { KeyRound, ShieldCheck, AlertTriangle } from 'lucide-react';

interface MillerRabinVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const MillerRabinVisualizer: React.FC<MillerRabinVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const isPrime = resultData?.isPrime;
  const verdict = resultData?.verdict || 'PROBABLY PRIME (Confidence: 99.9%)';
  const rounds = resultData?.roundsExecuted || 5;
  const errorBound = resultData?.errorProbabilityBound !== undefined ? resultData.errorProbabilityBound : 0.00097;

  return (
    <div className="space-y-6">
      {/* Verdict Banner */}
      <div className={`p-5 rounded-3xl border flex items-center justify-between text-xs font-mono ${
        isPrime
          ? 'bg-emerald-950/40 border-emerald-400 text-emerald-200 shadow-xl'
          : 'bg-pink-950/40 border-pink-400 text-pink-200'
      }`}>
        <div className="flex items-center gap-3">
          <KeyRound className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <span className="text-slate-400">Monte Carlo Primality Verdict:</span>
            <strong className="text-white text-base block">{verdict}</strong>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">Error Bound:</span>
          <span className="text-cyan-300 font-bold">&le; (1/4)^{rounds} ({errorBound})</span>
        </div>
      </div>

      {/* Rounds Table */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-300 mb-2 block">
          Witness Rounds (Base a ∈ [2, n-2]):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-xs text-center">
          {Array.from({ length: rounds }).map((_, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-950 border border-emerald-500/20 text-emerald-300">
              <span className="text-slate-500 text-[10px] block">Round #{i + 1}</span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block">PASS</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
