import React from 'react';
import { AlgorithmStep } from '../../types';
import { Users, ShieldCheck, ArrowRight } from 'lucide-react';

interface BipartiteMatchingVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const BipartiteMatchingVisualizer: React.FC<BipartiteMatchingVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const assignments = resultData?.assignments || [
    { analyst: "A1 (AML Lead)", case: "C1 (ATM Skimming #89)" },
    { analyst: "A2 (Cyber Forensics)", case: "C2 (SWIFT Typo Heist)" },
    { analyst: "A3 (High-Value Fraud)", case: "C3 (Phishing Ring #412)" },
    { analyst: "A4 (Compliance Special)", case: "C4 (Dormant Account Drain)" }
  ];

  return (
    <div className="space-y-6">
      {/* Matching Stats */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-300">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Optimal Bipartite Matching: <strong>{assignments.length} Cases Assigned</strong></span>
        </div>
        <span className="px-2.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
          Hopcroft-Karp: O(E √V)
        </span>
      </div>

      {/* Assignment Pairs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {assignments.map((pair: any, idx: number) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono group hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>{pair.analyst}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            <div className="text-emerald-300 font-bold">
              {pair.case}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
