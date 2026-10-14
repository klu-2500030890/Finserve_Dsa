import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Binary, Users, CreditCard, ArrowLeftRight, FileText, ShieldAlert, X } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useLocationNavigator(onClose);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dsaItems = [
    { title: "Knuth-Morris-Pratt (KMP)", path: "/dsa/m1-string", cat: "M1 String", desc: "Single-pattern search in O(N+M)" },
    { title: "Aho-Corasick Automaton", path: "/dsa/m1-string", cat: "M1 String", desc: "Multi-keyword streaming fraud detection" },
    { title: "Z-Function Algorithm", path: "/dsa/m1-string", cat: "M1 String", desc: "Linear pattern detection with Z-box" },
    { title: "Rabin-Karp Rolling Hash", path: "/dsa/m1-string", cat: "M1 String", desc: "Polynomial rolling hash pattern matcher" },
    { title: "Suffix Array & Binary Search", path: "/dsa/m2-suffix", cat: "M2 Suffix", desc: "Logarithmic substring lookup" },
    { title: "SA-IS Linear Suffix Array", path: "/dsa/m2-suffix", cat: "M2 Suffix", desc: "O(N) S/L induced sorting" },
    { title: "Kasai's LCP Array", path: "/dsa/m2-suffix", cat: "M2 Suffix", desc: "Longest repeated substring detector" },
    { title: "Suffix Tree (Ukkonen)", path: "/dsa/m2-suffix", cat: "M2 Suffix", desc: "Compact suffix trie query tree" },
    { title: "Suffix Automaton (DAWG)", path: "/dsa/m2-suffix", cat: "M2 Suffix", desc: "Minimal acyclic word graph" },
    { title: "Levenshtein Edit Distance DP", path: "/dsa/m3-dp", cat: "M3 DP", desc: "Fuzzy typo correction matrix" },
    { title: "Damerau-Levenshtein Distance", path: "/dsa/m3-dp", cat: "M3 DP", desc: "Transposition typo anomaly detector" },
    { title: "Bitmask Dynamic Programming", path: "/dsa/m3-dp", cat: "M3 DP", desc: "Subset scheduling across 2^N states" },
    { title: "Matrix-Chain Multiplication", path: "/dsa/m3-dp", cat: "M3 DP", desc: "Portfolio risk matrix parenthesization" },
    { title: "Dinic's Algorithm Max Flow", path: "/dsa/m4-flow", cat: "M4 Flow", desc: "Layered blocking flow in O(V^2 E)" },
    { title: "Ford-Fulkerson Network Flow", path: "/dsa/m4-flow", cat: "M4 Flow", desc: "Augmenting path liquidity analysis" },
    { title: "Edmonds-Karp BFS Max Flow", path: "/dsa/m4-flow", cat: "M4 Flow", desc: "Shortest augmenting path flow" },
    { title: "Maximum Bipartite Matching", path: "/dsa/m4-flow", cat: "M4 Flow", desc: "Analyst-to-fraud-case assignment" },
    { title: "Minimum Cut Partition (S, T)", path: "/dsa/m4-flow", cat: "M4 Flow", desc: "Critical conduit bottleneck locator" },
    { title: "3-SAT DPLL Solver", path: "/dsa/m5-np", cat: "M5 NP", desc: "Regulatory rule constraint verifier" },
    { title: "Reduction Chain (Karp)", path: "/dsa/m5-np", cat: "M5 NP", desc: "3SAT -> CLIQUE -> IS -> Vertex Cover" },
    { title: "Vertex Cover 2-Approximation", path: "/dsa/m5-np", cat: "M5 NP", desc: "Audit sentinel placement <= 2*OPT" },
    { title: "Randomized QuickSort", path: "/dsa/m6-random-parallel", cat: "M6 Random", desc: "Expected O(N log N) Las Vegas sorting" },
    { title: "Miller-Rabin Primality Test", path: "/dsa/m6-random-parallel", cat: "M6 Random", desc: "Probabilistic RSA crypto key generation" },
    { title: "Reservoir Sampling (Alg R)", path: "/dsa/m6-random-parallel", cat: "M6 Random", desc: "Streaming uniform transaction sampler" },
    { title: "Blelloch Parallel Prefix Scan", path: "/dsa/m6-random-parallel", cat: "M6 Parallel", desc: "Work-efficient cumulative balances" },
    { title: "Parallel Reduce (Fork-Join)", path: "/dsa/m6-random-parallel", cat: "M6 Parallel", desc: "Multi-threaded transaction summation" }
  ];

  const quickPages = [
    { title: "Banking Transactions", path: "/transactions", cat: "Data", icon: ArrowLeftRight },
    { title: "Customer Registry", path: "/customers", cat: "Data", icon: Users },
    { title: "Account Directory", path: "/accounts", cat: "Data", icon: CreditCard },
    { title: "Financial Documents", path: "/documents", cat: "Data", icon: FileText },
    { title: "Fraud Incident Alerts", path: "/fraud-events", cat: "Security", icon: ShieldAlert },
    { title: "Network Flow Explorer", path: "/network-explorer", cat: "Analytics", icon: Binary },
    { title: "Algorithm Benchmark Lab", path: "/performance", cat: "Analytics", icon: Binary }
  ];

  const filteredDsa = dsaItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.cat.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPages = quickPages.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.cat.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-slate-950 border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/50">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Search accounts, codes, fraud patterns, or any DSA algorithm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Pages */}
          {filteredPages.length > 0 && (
            <div>
              <p className="px-3 text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-1.5">
                Navigation & Financial Data
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {filteredPages.map(page => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.path}
                      onClick={() => navigate(page.path)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-slate-800/60 text-left transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-200">{page.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{page.cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* DSA Algorithms */}
          {filteredDsa.length > 0 && (
            <div>
              <p className="px-3 text-[10px] font-mono tracking-widest text-cyan-400/70 uppercase mb-1.5">
                DSA Lab Modules (M1–M6)
              </p>
              <div className="space-y-1.5">
                {filteredDsa.map(dsa => (
                  <button
                    key={dsa.title}
                    onClick={() => navigate(dsa.path)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/30 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-slate-800/60 text-left transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">{dsa.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {dsa.cat}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{dsa.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPages.length === 0 && filteredDsa.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs font-mono">
              No matching algorithms or financial records found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Tip: Use arrow keys or click to navigate</span>
          <div className="flex items-center gap-2">
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function useLocationNavigator(onClose: () => void) {
  const navigate = useNavigate();
  return (path: string) => {
    navigate(path);
    onClose();
  };
}
