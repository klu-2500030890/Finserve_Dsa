import React from 'react';
import { AlgorithmStep } from '../../types';
import { ShieldAlert, Zap, AlertTriangle } from 'lucide-react';

interface AhoCorasickVisualizerProps {
  text: string;
  patterns: string[];
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const AhoCorasickVisualizer: React.FC<AhoCorasickVisualizerProps> = ({
  text,
  patterns,
  currentStep,
  resultData
}) => {
  const activeNodeId = currentStep?.highlightNodes?.[0] || '0';
  const isAlert = currentStep?.type === 'FRAUD_PATTERN_HIT';
  const activeChar = currentStep?.stateMap?.char || currentStep?.stateMap?.matchedChar || '';
  const streamIdx = currentStep?.stateMap?.streamIndex !== undefined ? currentStep?.stateMap?.streamIndex : -1;
  const detectedHits = resultData?.detectedPatterns || [];

  // Static node layout for trie graph nodes
  const trieNodes = [
    { id: '0', label: 'ROOT', x: 260, y: 35, type: 'root' },
    { id: '1', label: 'f', x: 70, y: 100, parent: '0' },
    { id: '2', label: 'r', x: 70, y: 170, parent: '1' },
    { id: '3', label: 'a', x: 70, y: 240, parent: '2' },
    { id: '4', label: 'u', x: 70, y: 310, parent: '3' },
    { id: '5', label: 'd [HIT]', x: 70, y: 380, parent: '4', isMatch: true },

    { id: '6', label: 'o', x: 190, y: 100, parent: '0' },
    { id: '7', label: 't', x: 190, y: 180, parent: '6' },
    { id: '8', label: 'p [HIT]', x: 190, y: 260, parent: '7', isMatch: true },

    { id: '9', label: 'b', x: 310, y: 100, parent: '0' },
    { id: '10', label: 'l', x: 310, y: 170, parent: '9' },
    { id: '11', label: 'o', x: 310, y: 240, parent: '10' },
    { id: '12', label: 'c', x: 310, y: 310, parent: '11' },
    { id: '13', label: 'k [HIT]', x: 310, y: 380, parent: '12', isMatch: true },

    { id: '14', label: 's', x: 440, y: 100, parent: '0' },
    { id: '15', label: 't', x: 440, y: 170, parent: '14' },
    { id: '16', label: 'o', x: 440, y: 240, parent: '15' },
    { id: '17', label: 'l', x: 440, y: 310, parent: '16' },
    { id: '18', label: 'e', x: 440, y: 380, parent: '17' },
    { id: '19', label: 'n [HIT]', x: 440, y: 440, parent: '18', isMatch: true },
  ];

  return (
    <div className="space-y-6">
      {/* Real-time Sentinel Alert Banner */}
      {isAlert && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-pink-950/60 to-red-950/60 border border-pink-500/60 text-white flex items-center justify-between shadow-[0_0_30px_rgba(255,0,128,0.3)] animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-mono text-pink-300">🚨 Aho-Corasick Automated Fraud Trigger</h4>
              <p className="text-xs text-slate-200">
                Pattern matched: <strong className="text-pink-200 font-mono">"{currentStep?.stateMap?.patterns?.join(', ')}"</strong> at stream position {streamIdx}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-pink-500/20 border border-pink-500/40 text-xs font-mono font-bold text-pink-300">
            CRITICAL SEVERITY
          </span>
        </div>
      )}

      {/* Automaton Trie Graph View */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Multi-Pattern Prefix Trie with BFS Failure Transitions:
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Active Node</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-500"></span> Fraud Hit</span>
          </div>
        </div>

        {/* SVG Graph Canvas */}
        <div className="w-full h-80 flex items-center justify-center bg-slate-900/30 rounded-2xl border border-slate-800/60 overflow-hidden">
          <svg viewBox="0 0 540 460" className="w-full h-full">
            {/* Edges */}
            {trieNodes.filter(n => n.parent).map(node => {
              const parentNode = trieNodes.find(p => p.id === node.parent);
              if (!parentNode) return null;
              return (
                <line
                  key={`edge-${node.id}`}
                  x1={parentNode.x}
                  y1={parentNode.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={activeNodeId === node.id ? '#00f2fe' : 'rgba(71, 85, 105, 0.4)'}
                  strokeWidth={activeNodeId === node.id ? 2.5 : 1.5}
                />
              );
            })}

            {/* Nodes */}
            {trieNodes.map(node => {
              const isActive = activeNodeId === node.id;
              const isMatchNode = node.isMatch;

              return (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                  <circle
                    r={node.type === 'root' ? 20 : 16}
                    fill={isMatchNode ? '#ff0080' : isActive ? '#00f2fe' : '#0f172a'}
                    stroke={isActive ? '#ffffff' : isMatchNode ? '#ff4b8b' : '#334155'}
                    strokeWidth={isActive ? 3 : 1.5}
                    className="transition-all duration-300"
                    style={{
                      filter: isActive ? 'drop-shadow(0px 0px 8px rgba(0, 242, 254, 0.8))' : undefined
                    }}
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill={isActive || isMatchNode ? '#ffffff' : '#94a3b8'}
                    fontSize={node.type === 'root' ? '9' : '11'}
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {node.label.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Target Fraud Dictionary Keywords */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-300 mb-2 block">
          Active Multi-Pattern Fraud Dictionary (Scanned in Parallel O(N)):
        </span>
        <div className="flex flex-wrap gap-2">
          {patterns.map((pat, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-xl bg-slate-950 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold"
            >
              "{pat}"
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
