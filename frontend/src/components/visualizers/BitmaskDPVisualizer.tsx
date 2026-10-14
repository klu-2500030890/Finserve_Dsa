import React from 'react';
import { AlgorithmStep } from '../../types';
import { Binary, ArrowRight } from 'lucide-react';

interface BitmaskDPVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const BitmaskDPVisualizer: React.FC<BitmaskDPVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const operations = [
    "Payment", "Transfer", "KYC Verification", "Fraud Check", "Compliance Audit", "Settlement"
  ];
  const activeMask = currentStep?.stateMap?.mask || "111111";
  const optimalSequence = resultData?.optimalSequence || [];
  const minCost = resultData?.optimalCost || 0;

  return (
    <div className="space-y-6">
      {/* Optimal Sequence Banner */}
      {optimalSequence.length > 0 && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 text-xs font-mono">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Optimal Pipeline Sequencing (2^N Subset DP):</span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Minimal Transition Cost = {minCost}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {optimalSequence.map((op: string, idx: number) => (
              <React.Fragment key={idx}>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-bold">
                  {idx + 1}. {op}
                </span>
                {idx < optimalSequence.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Bitmask States Grid */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Binary className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Binary Subset Bitmask Transitions:
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">Current Mask: [{activeMask}]</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {operations.map((op, idx) => {
            const isBitSet = activeMask && activeMask.length === 6 ? activeMask[5 - idx] === '1' : false;
            return (
              <div
                key={idx}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isBitSet
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                    : 'bg-slate-900/40 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] font-mono block text-slate-400">Bit {idx} (1 &lt;&lt; {idx})</span>
                <span className="text-xs font-bold block my-1">{op}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  isBitSet ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-950 text-slate-600'
                }`}>
                  {isBitSet ? 'ACTIVE (1)' : 'OFF (0)'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
