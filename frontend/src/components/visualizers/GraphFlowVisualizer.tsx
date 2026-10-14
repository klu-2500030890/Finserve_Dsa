import React from 'react';
import { AlgorithmStep } from '../../types';
import { Network, Zap, Waves, AlertTriangle } from 'lucide-react';

interface GraphFlowVisualizerProps {
  algorithmName: string;
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const GraphFlowVisualizer: React.FC<GraphFlowVisualizerProps> = ({
  algorithmName,
  currentStep,
  resultData
}) => {
  const maxFlow = resultData?.maxFlow || currentStep?.stateMap?.totalFlow || 0;
  const criticalCutEdges = resultData?.criticalCutEdges || [];
  const minCutCapacity = resultData?.minCutCapacity;

  // Visual layout for 6 financial nodes
  const nodes = [
    { id: 0, name: "Customer Bank (Source)", x: 60, y: 150, role: 'source' },
    { id: 1, name: "Interbank Switch A", x: 220, y: 60, role: 'node' },
    { id: 2, name: "Interbank Switch B", x: 220, y: 240, role: 'node' },
    { id: 3, name: "Clearing House A", x: 380, y: 60, role: 'node' },
    { id: 4, name: "Clearing House B", x: 380, y: 240, role: 'node' },
    { id: 5, name: "Settlement Vault (Sink)", x: 540, y: 150, role: 'sink' },
  ];

  // Flow channels
  const edges = [
    { from: 0, to: 1, cap: 16, flow: 12 },
    { from: 0, to: 2, cap: 13, flow: 11 },
    { from: 1, to: 2, cap: 10, flow: 0 },
    { from: 1, to: 3, cap: 12, flow: 12, isBottleneck: true },
    { from: 2, to: 4, cap: 14, flow: 11 },
    { from: 3, to: 2, cap: 9, flow: 0 },
    { from: 3, to: 5, cap: 20, flow: 12 },
    { from: 4, to: 3, cap: 7, flow: 0 },
    { from: 4, to: 5, cap: 4, flow: 4, isBottleneck: true }
  ];

  return (
    <div className="space-y-6">
      {/* Flow Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
          <span className="text-slate-400 block mb-1">Max Liquidity Throughput:</span>
          <span className="text-xl font-black text-cyan-300">{maxFlow || 23} ₹ Lakhs / sec</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Max-Flow Min-Cut Theorem:</span>
          <span className="text-xl font-black text-emerald-400">Duality = {minCutCapacity || maxFlow || 23} L</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Active Flow Channels:</span>
          <span className="text-xl font-black text-violet-400">9 Corridors</span>
        </div>
      </div>

      {/* Interactive Network Graph Canvas */}
      <div className="p-5 rounded-3xl bg-slate-950/90 border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Live Interbank Flow & Capacity Corridors:
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Source / Sink</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-500"></span> Min-Cut Saturated</span>
          </div>
        </div>

        {/* SVG Flow Canvas */}
        <div className="w-full h-80 bg-slate-900/30 rounded-2xl border border-slate-800/60 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 600 300" className="w-full h-full">
            {/* Edge lines */}
            {edges.map((e, idx) => {
              const u = nodes[e.from];
              const v = nodes[e.to];
              const isCut = e.isBottleneck || (minCutCapacity && e.flow === e.cap);

              return (
                <g key={idx}>
                  <line
                    x1={u.x}
                    y1={u.y}
                    x2={v.x}
                    y2={v.y}
                    stroke={isCut ? '#ff0080' : '#00f2fe'}
                    strokeWidth={isCut ? 3 : 2}
                    strokeDasharray={isCut ? "4,4" : undefined}
                    opacity={0.7}
                  />
                  {/* Flow label */}
                  <text
                    x={(u.x + v.x) / 2}
                    y={(u.y + v.y) / 2 - 6}
                    fill={isCut ? '#ff4b8b' : '#00f2fe'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {e.flow} / {e.cap} L
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map(n => {
              const isTerminal = n.role === 'source' || n.role === 'sink';
              return (
                <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                  <circle
                    r={isTerminal ? 22 : 18}
                    fill={isTerminal ? '#00f2fe' : '#0f172a'}
                    stroke={isTerminal ? '#ffffff' : '#3b82f6'}
                    strokeWidth={2}
                    style={{
                      filter: isTerminal ? 'drop-shadow(0px 0px 8px rgba(0, 242, 254, 0.8))' : undefined
                    }}
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill={isTerminal ? '#05070e' : '#ffffff'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {n.role === 'source' ? 'SRC' : n.role === 'sink' ? 'SINK' : `N${n.id}`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Critical Min-Cut Saturated Corridors */}
      {criticalCutEdges.length > 0 && (
        <div className="p-4 rounded-2xl bg-pink-950/30 border border-pink-500/40 text-xs font-mono">
          <div className="flex items-center gap-2 text-pink-300 font-bold mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Critical Minimum Cut Bottleneck Channels (Systemic Risk Points):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {criticalCutEdges.map((edge: any, i: number) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-pink-500/30 flex justify-between text-slate-200">
                <span>{edge.from} ➔ {edge.to}</span>
                <span className="text-pink-400 font-bold">{edge.capacity} Lakhs Cap</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
