import React, { useState } from 'react';
import {
  Binary,
  GitBranch,
  Table,
  Network,
  Cpu,
  Shuffle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Zap
} from 'lucide-react';

export const WhyThisAlgorithmPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('m1');

  const sections = [
    {
      id: 'm1',
      title: 'Module 1: String Algorithms & Text Matching',
      icon: Binary,
      color: 'cyan',
      problem: 'High-frequency transaction streaming requires instant screening of payment routing narratives for fraud keywords and strict formatting tags (e.g. SWIFT codes).',
      naiveApproach: 'Naive string comparison checks every pattern character from every text index, yielding quadratic O(N · M) worst-case time. Under high stream throughput (10,000 txns/sec), CPU stalls and causes catastrophic transaction queue latency.',
      chosenDsa: 'Knuth-Morris-Pratt (KMP) with Longest Proper Prefix-Suffix (LPS) π-array, Z-Algorithm with linear Z-box boundaries, Rabin-Karp polynomial rolling hash, and Aho-Corasick multi-pattern Trie automaton with suffix failure links.',
      complexity: 'Time: O(N + M + Z) linear pass | Space: O(Σ|Pattern_i|)',
      financialBenefit: 'Aho-Corasick matches 100+ concurrent fraud trigger words in a single linear pass over the transaction narrative with zero backtracking, guaranteeing sub-millisecond threat detection.'
    },
    {
      id: 'm2',
      title: 'Module 2: Suffix Structures & Indexing',
      icon: GitBranch,
      color: 'violet',
      problem: 'Banks must index tens of thousands of multi-page legal loan contracts, covenants, and SWIFT slips to perform instant substring searches and detect duplicated fraud boilerplate.',
      naiveApproach: 'Scanning full contract text naively for each query takes O(N) per query. Storing all substrings in a naive Trie consumes quadratic O(N²) memory, which crashes servers on 100MB documents.',
      chosenDsa: 'Suffix Array with SA-IS (Induced Sorting) constructing the lexicographical array in strictly linear O(N) time and space, Kasai’s LCP algorithm for repeated substring discovery in O(N), and Suffix Automaton (DAWG) representing all substrings in O(N) states.',
      complexity: 'Time: O(N) Construction, O(M log N) Query | Space: O(N)',
      financialBenefit: 'Enables sub-millisecond clause lookups and instant discovery of copy-pasted fraudulent indemnity terms across millions of indexed financial documents.'
    },
    {
      id: 'm3',
      title: 'Module 3: Dynamic Programming & Sequence Optimization',
      icon: Table,
      color: 'blue',
      problem: 'Customers frequently make typos in payment routing identifiers and account codes (e.g. "TRNASFER" instead of "TRANSFER", or character transpositions in SWIFT keys). Furthermore, banking pipelines require optimal task execution schedules.',
      naiveApproach: 'Recursive string distance evaluation takes exponential O(3^(N+M)) time. Brute force evaluation of N banking pipeline task permutations takes factorial O(N!) time.',
      chosenDsa: 'Levenshtein 2D Dynamic Programming matrix with Wagner-Fischer recurrence, Damerau-Levenshtein handling adjacent transpositions, Weighted Edit Distance reflecting asymmetric financial risk penalties, and Bitmask DP with 2^N state bit-vectors.',
      complexity: 'Time: O(N · M) Edit Distance, O(2^N · N²) Bitmask DP, O(N³) Matrix Chain | Space: O(N · M)',
      financialBenefit: 'Corrects payment code typos automatically in under 3ms while preventing financial phishing typosquatting, and optimizes multi-asset portfolio covariance matrix multiplication ordering.'
    },
    {
      id: 'm4',
      title: 'Module 4: Network Flow & Liquidity Conduit Analysis',
      icon: Network,
      color: 'emerald',
      problem: 'Inter-bank settlement systems (RTGS/NEFT/SWIFT) have finite liquidity channels between switches and clearing houses. The bank must determine the maximum settlement throughput and pinpoint critical bottleneck links.',
      naiveApproach: 'Ford-Fulkerson with arbitrary augmenting paths can take O(E · MaxFlow) iterations. If capacities are large (e.g. ₹100 Crores), it can make millions of tiny 1-unit flow augmentations.',
      chosenDsa: 'Dinic’s Algorithm constructing BFS level graphs and pushing layered blocking flows in DFS phases, Edmonds-Karp shortest augmenting path flow, and Max-Flow Min-Cut Theorem isolating saturated cut edges (S, T).',
      complexity: 'Time: O(V² E) Dinic, O(V E²) Edmonds-Karp | Space: O(V + E)',
      financialBenefit: 'Guarantees polynomial execution regardless of monetary values, identifies the exact physical corridor bottlenecks in under 5ms, and assigns fraud analysts to critical investigation cases via Maximum Bipartite Matching.'
    },
    {
      id: 'm5',
      title: 'Module 5: NP-Completeness & Approximation Algorithms',
      icon: Cpu,
      color: 'magenta',
      problem: 'Complex banking regulatory compliance rules (KYC, AML, FATCA, RBI Guidelines) often involve hundreds of interdependent logical constraints that must be verified for consistency. Additionally, banks need to place audit sentinels on minimal network nodes.',
      naiveApproach: 'Testing all 2^V truth assignments for compliance rules takes astronomical time for large rule-sets. Finding minimum vertex cover is NP-Complete and unsolvable in polynomial time for general graphs.',
      chosenDsa: '3-SAT DPLL (Davis-Putnam-Logemann-Loveland) solver with unit propagation and pure literal elimination, Karp polynomial reduction visualizer (3SAT → CLIQUE → Independent Set → Vertex Cover), and Factor-2 Vertex Cover Approximation via Maximal Matching.',
      complexity: 'Time: DPLL Pruned Backtracking / 2-Approximation in O(V + E) | Space: O(V + E)',
      financialBenefit: 'Validates automated regulatory rule consistency without deadlocks and provides a provably bounded solution (<= 2 · OPT) for physical sentinel surveillance placement.'
    },
    {
      id: 'm6',
      title: 'Module 6: Randomized & Parallel Algorithmic Paradigms',
      icon: Shuffle,
      color: 'amber',
      problem: 'Banking infrastructure requires cryptographic prime verification for RSA asymmetric key generation, uniform transaction audit sampling from infinite streams, and high-frequency parallel balance sum calculations.',
      naiveApproach: 'Deterministic trial division for 1024-bit primes takes exponential O(√N) time (longer than the age of the universe). Storing an entire infinite transaction stream for sampling exhausts all RAM.',
      chosenDsa: 'Miller-Rabin Probabilistic Primality Test with error probability bounded by (1/4)^K, Reservoir Sampling (Algorithm R) with uniform inclusion probability k/N in a single pass, Blelloch Work-Efficient Parallel Prefix Scan, and Brent’s Theorem speedup modeling.',
      complexity: 'Time: Miller-Rabin O(K log³ N), Reservoir Sampling O(N), Blelloch Scan Span O(log N) Work O(N) | Space: O(K)',
      financialBenefit: 'Generates secure cryptographic banking tokens in under 1ms, guarantees mathematically unbiased regulatory audit draws from infinite live feeds, and executes parallel prefix balances at multi-gigahertz hardware speeds.'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-8 rounded-3xl glass-panel-glow border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
            Academic Reference Catalog
          </span>
          <span className="text-xs text-slate-400 font-mono">&bull; Theoretical & Practical Proofs</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-wide">
          "Why This Algorithm?" &mdash; Financial Problem to DSA Mapping
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Comprehensive guide explaining why each advanced data structure and algorithm was selected, why naive alternatives fail in production banking, and the exact asymptotic efficiency gained.
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isOpen = openSection === sec.id;
          return (
            <div
              key={sec.id}
              className="rounded-3xl glass-panel border border-slate-800 overflow-hidden transition-all shadow-xl"
            >
              <button
                onClick={() => setOpenSection(isOpen ? null : sec.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-900/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{sec.title}</h3>
                    <span className="text-xs font-mono text-cyan-400">{sec.complexity}</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs leading-relaxed">
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <span className="text-cyan-400 font-bold font-mono text-[11px] uppercase block mb-1">
                      1. Financial Domain Problem Formulation:
                    </span>
                    <p className="text-slate-300">{sec.problem}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30">
                    <span className="text-red-400 font-bold font-mono text-[11px] uppercase block mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      2. Why Naive Approaches Fail in Real Banking Systems:
                    </span>
                    <p className="text-red-200">{sec.naiveApproach}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                    <span className="text-cyan-400 font-bold font-mono text-[11px] uppercase block mb-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      3. Selected Advanced Algorithm & Data Structure:
                    </span>
                    <p className="text-cyan-200">{sec.chosenDsa}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                    <span className="text-emerald-400 font-bold font-mono text-[11px] uppercase block mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      4. Quantifiable Banking & Efficiency Impact:
                    </span>
                    <p className="text-emerald-200">{sec.financialBenefit}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
