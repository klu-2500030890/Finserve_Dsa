import React, { useState } from 'react';
import { AlgorithmStep } from '../../types';
import { ArrowRight, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReductionChainVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const ReductionChainVisualizer: React.FC<ReductionChainVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const [selectedStage, setSelectedStage] = useState('3-SAT');

  const stages = [
    {
      id: '3-SAT',
      title: '3-SAT',
      fullTitle: '3-CNF Boolean Satisfiability',
      color: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/40 text-cyan-300',
      gadget: '3-Literal Triangles & Truth Assignment Gadgets',
      bankingApplication: 'Proving consistency of multi-rule automated compliance policies with zero contradiction.'
    },
    {
      id: 'CLIQUE',
      title: 'CLIQUE',
      fullTitle: 'k-Clique in Graph',
      color: 'from-purple-500/20 to-indigo-600/10 border-purple-500/40 text-purple-300',
      gadget: 'Complement Graph Inversion (Edge present in G_bar iff absent in G)',
      bankingApplication: 'Syndicated lending: Identifying maximally co-trusting banking subgroups to underwrite massive infrastructure debt.'
    },
    {
      id: 'INDEPENDENT_SET',
      title: 'INDEPENDENT SET',
      fullTitle: 'Maximum Independent Set',
      color: 'from-pink-500/20 to-rose-600/10 border-pink-500/40 text-pink-300',
      gadget: 'Subset Inversion: V\' is IS in G <=> (V - V\') is Vertex Cover in G',
      bankingApplication: 'Risk diversification: Assembling an optimal investment basket where no two assets share bilateral default contagion.'
    },
    {
      id: 'VERTEX_COVER',
      title: 'VERTEX COVER',
      fullTitle: 'Minimum Vertex Cover',
      color: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/40 text-emerald-300',
      gadget: 'Edge Coverage: Placing minimum sentinel nodes S covering all transaction edges',
      bankingApplication: 'Placing minimum AML monitoring probes to inspect 100% of interbank payment corridors.'
    }
  ];

  const activeStageObj = stages.find(s => s.id === selectedStage) || stages[0];

  return (
    <div className="space-y-6">
      {/* Reduction Flow Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-3xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
        {stages.map((st, idx) => (
          <React.Fragment key={st.id}>
            <button
              onClick={() => setSelectedStage(st.id)}
              className={`px-4 py-2.5 rounded-2xl border transition-all font-bold ${
                selectedStage === st.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 scale-105 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st.title}
            </button>
            {idx < stages.length - 1 && (
              <span className="text-slate-600 font-bold">≤p</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Selected Problem Deep-Dive Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-950 border border-cyan-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-mono">{activeStageObj.fullTitle}</h4>
              <p className="text-xs text-slate-400 font-mono">Karp's 21 NP-Complete Reductions</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
            NP-Complete
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-mono space-y-2">
          <div>
            <span className="text-slate-400">Gadget Construction: </span>
            <span className="text-cyan-300 font-bold">{activeStageObj.gadget}</span>
          </div>
          <div>
            <span className="text-slate-400">Banking Domain Analogy: </span>
            <span className="text-slate-200">{activeStageObj.bankingApplication}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
