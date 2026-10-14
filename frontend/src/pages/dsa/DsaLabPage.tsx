import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Binary,
  GitBranch,
  Table,
  Network,
  Cpu,
  Shuffle,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export const DsaLabPage: React.FC = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'm1-string',
      title: 'M1: String Algorithms & Text Matching',
      icon: Binary,
      color: 'cyan',
      description: 'Single and multi-pattern string matching algorithms engineered for sub-millisecond payment code verification, narrative scanning, and real-time fraud pattern filtering.',
      algorithms: ['Knuth-Morris-Pratt (KMP)', 'Z-Function Algorithm', 'Rabin-Karp Rolling Hash', 'Aho-Corasick Multi-Pattern Automaton'],
      complexity: 'O(N + M) Linear Time',
      useCase: 'Transaction memo keyword scanning, SWIFT/IFSC regex pattern verification, concurrent multi-threat detection.'
    },
    {
      id: 'm2-suffix',
      title: 'M2: Suffix Structures & Indexing',
      icon: GitBranch,
      color: 'violet',
      description: 'Advanced sublinear suffix indexing structures capable of full-text legal corpus search, repetitive clause discovery, and sub-sequence anomaly tracing.',
      algorithms: ['Suffix Array & Binary Search', 'SA-IS (Induced Sorting O(N))', "Kasai's LCP Array", 'Suffix Tree (Ukkonen)', 'Suffix Automaton (DAWG)'],
      complexity: 'O(N) Construction / O(M log N) Query',
      useCase: 'Loan contract clause indexing, duplicate transaction payload detection, longest repeated fraud pattern extraction.'
    },
    {
      id: 'm3-dp',
      title: 'M3: Dynamic Programming & Sequence Optimization',
      icon: Table,
      color: 'blue',
      description: 'Dynamic programming state-space optimization for fuzzy string similarity correction, subset operation scheduling, and optimal portfolio risk matrix chain multiplication.',
      algorithms: ['Levenshtein Distance Matrix', 'Damerau-Levenshtein (Transpositions)', 'Weighted Edit Distance', 'Bitmask DP Subset Scheduling', 'Matrix-Chain Multiplication'],
      complexity: 'O(N·M) / O(2^N · N) / O(N^3)',
      useCase: 'Typo-squatting payment identifier auto-correction, optimal banking batch settlement order, portfolio variance minimize.'
    },
    {
      id: 'm4-flow',
      title: 'M4: Network Flow & Liquidity Conduit Analysis',
      icon: Network,
      color: 'emerald',
      description: 'Graph-theoretic network flow models measuring maximum inter-bank transaction settlement throughput and isolating systemic liquidity bottleneck cuts.',
      algorithms: ["Dinic's Algorithm (Level Graph)", 'Ford-Fulkerson Max Flow', 'Edmonds-Karp (BFS Flow)', 'Maximum Bipartite Matching', 'Minimum Cut (S, T) Partition'],
      complexity: 'O(V² E) Dinic / O(V E²) Edmonds-Karp',
      useCase: 'Inter-bank settlement channel capacity, bottleneck identification, optimal fraud analyst assignment matching.'
    },
    {
      id: 'm5-np',
      title: 'M5: NP-Completeness & Approximation',
      icon: Cpu,
      color: 'magenta',
      description: 'Computational complexity verifiers, DPLL Boolean satisfiability solvers for complex regulatory constraint logic, and factor-2 approximation heuristics for node coverage.',
      algorithms: ['3-SAT DPLL Solver', 'Karp Reduction Chain (3SAT→CLIQUE→IS→VC)', 'Vertex Cover 2-Approximation (Matching)'],
      complexity: 'NP-Complete / 2-Approximation Factor',
      useCase: 'Automated compliance rule consistency checking, minimal regulatory audit sentinel placement across banking topology.'
    },
    {
      id: 'm6-random-parallel',
      title: 'M6: Randomized & Parallel Algorithmic Paradigms',
      icon: Shuffle,
      color: 'amber',
      description: 'Probabilistic cryptographic testing, unbiased continuous streaming sampling, and parallel divide-and-conquer prefix scans for high-frequency banking feeds.',
      algorithms: ['Randomized QuickSort (Las Vegas)', 'Miller-Rabin Primality Test (RSA)', 'Reservoir Sampling (Algorithm R)', 'Blelloch Parallel Prefix Scan', 'Parallel Reduce (Fork-Join)', "Brent's Theorem Calculator"],
      complexity: 'O(log N) Span / O(N) Work Parallel',
      useCase: 'High-frequency transaction streaming prefix balance sums, RSA key prime generation, uniform random audit transaction draws.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="p-8 rounded-3xl glass-panel-glow border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-violet-950/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
              Data Structures & Algorithms Laboratory
            </span>
            <span className="text-xs text-slate-400 font-mono">&bull; 26 Verified Real-Time Engines</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-wide">
            Computational DSA Command Center
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
            Every module below is backed by real, deterministic Java 25 backend algorithms with step-by-step execution traces, state transitions, and asymptotic complexity analysis.
          </p>
        </div>

        <button
          onClick={() => navigate('/why-this-algorithm')}
          className="px-5 py-3 rounded-2xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-semibold text-xs flex items-center gap-2 transition-all shrink-0 shadow-lg"
        >
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>Why This Algorithm? Guide</span>
        </button>
      </div>

      {/* 6 Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className="p-6 rounded-3xl glass-panel border border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,242,254,0.12)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:border-cyan-400 transition-all shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-700">
                    {m.complexity}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {m.title}
                </h3>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-3">
                  {m.description}
                </p>

                {/* Algorithm List Tags */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                    Core Algorithmic Implementations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {m.algorithms.map((algo, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800 text-[10px] font-mono"
                      >
                        {algo}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300 mb-4">
                  <span className="text-cyan-400 font-semibold font-mono text-[10px] uppercase block mb-0.5">
                    Financial Industry Context:
                  </span>
                  {m.useCase}
                </div>
              </div>

              <button
                onClick={() => navigate(`/dsa/${m.id}`)}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500 hover:to-blue-600 text-cyan-200 hover:text-slate-950 border border-cyan-500/30 hover:border-transparent font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(0,242,254,0.3)]"
              >
                <span>Launch Interactive Workbench</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
