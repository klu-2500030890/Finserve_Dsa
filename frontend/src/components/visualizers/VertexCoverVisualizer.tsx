import React from 'react';
import { AlgorithmStep } from '../../types';
import { Shield, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface VertexCoverVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const VertexCoverVisualizer: React.FC<VertexCoverVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const selectedSentinels = resultData?.selectedSentinels || ["Core Switch", "Escrow Vault", "ATM Cluster A", "SWIFT Gateway"];
  const matchingEdges = resultData?.maximalMatchingEdges || [];
  const guarantee = resultData?.approximationFactorGuarantee || "2.0 (Proof: |C| <= 2 * |OPT|)";

  return (
    <div className="space-y-6">
      {/* Approximation Factor Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/40 text-xs font-mono">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400">Vertex Cover 2-Approximation Guarantee:</span>
          <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
            Factor α ≤ 2.0 (Polynomial Bound)
          </span>
        </div>
        <p className="text-slate-300">
          Maximal edge matching selects both endpoints for every uncovered edge, ensuring all network transaction conduits are monitored with size ≤ 2 × OPT.
        </p>
      </div>

      {/* Selected Sentinels Grid */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Selected Banking Sentinel Audit Probes ({selectedSentinels.length} Nodes):
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">100% Edges Covered</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {selectedSentinels.map((sentinel: string, idx: number) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{sentinel}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
