import React from 'react';
import { AlgorithmStep } from '../../types';
import { GitFork, CheckCircle2, XCircle } from 'lucide-react';

interface SuffixTreeVisualizerProps {
  text: string;
  query: string;
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const SuffixTreeVisualizer: React.FC<SuffixTreeVisualizerProps> = ({
  text,
  query,
  currentStep,
  resultData
}) => {
  const isFound = resultData?.found;
  const activeNodes = currentStep?.highlightNodes || [];
  const nodeCount = resultData?.nodeCount || 8;

  return (
    <div className="space-y-6">
      {/* Substring Status Banner */}
      {query && (
        <div className={`p-4 rounded-3xl border flex items-center justify-between text-xs font-mono ${
          isFound
            ? 'bg-emerald-950/40 border-emerald-400 text-emerald-200'
            : 'bg-slate-900/60 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center gap-2">
            {isFound ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <GitFork className="w-5 h-5 text-cyan-400" />}
            <div>
              <span className="text-slate-400">Suffix Tree Substring Search: </span>
              <strong className="text-white text-sm block">"{query}"</strong>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-xl font-bold ${
            isFound ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-950 text-slate-400'
          }`}>
            {isFound ? 'SUBSTRING FOUND' : 'TRAVERSING TREE'}
          </span>
        </div>
      )}

      {/* Tree Structure Layout */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-300 font-bold">Compact Suffix Trie Structure:</span>
          <span className="text-cyan-400 text-[11px]">{nodeCount} Total Nodes</span>
        </div>

        {/* Tree ASCII & Node Graph Representation */}
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 font-mono text-slate-300 leading-loose">
          <div className="text-cyan-300 font-bold">ROOT (Node #0)</div>
          <div className="pl-4 border-l border-slate-700 space-y-1">
            <div>├── [Edge: "SWIFT_"] ➔ Node #1 (Leaves: Suffix #0)</div>
            <div>├── [Edge: "WIFT_PAYMENT$"] ➔ Node #2 (Suffix #1)</div>
            <div>├── [Edge: "IFT_PAYMENT$"] ➔ Node #3 (Suffix #2)</div>
            <div>├── [Edge: "PAYMENT$"] ➔ Node #4 (Suffix #6)</div>
            <div>└── [Edge: "$"] ➔ Node #5 (Suffix #{text.length - 1})</div>
          </div>
        </div>
      </div>
    </div>
  );
};
