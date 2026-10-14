import React from 'react';
import { Clock, HardDrive, Zap, ShieldAlert } from 'lucide-react';

interface ComplexityBadgeProps {
  complexity: Record<string, string>;
  executionTimeMs?: number;
  memoryUsedKb?: number;
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({
  complexity,
  executionTimeMs,
  memoryUsedKb
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
      {/* Time Complexity */}
      {complexity?.time && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Time: <strong className="text-white">{complexity.time}</strong></span>
        </div>
      )}

      {/* Space Complexity */}
      {complexity?.space && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
          <HardDrive className="w-3.5 h-3.5 text-purple-400" />
          <span>Space: <strong className="text-white">{complexity.space}</strong></span>
        </div>
      )}

      {/* Measured Backend Execution Time */}
      {executionTimeMs !== undefined && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Measured: <strong className="text-white">{executionTimeMs < 1 ? `${(executionTimeMs * 1000).toFixed(0)} µs` : `${executionTimeMs.toFixed(2)} ms`}</strong></span>
        </div>
      )}

      {/* Memory Allocation */}
      {memoryUsedKb !== undefined && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
          <span>Heap: <strong className="text-white">{memoryUsedKb} KB</strong></span>
        </div>
      )}

      {/* Extra attributes */}
      {Object.entries(complexity || {})
        .filter(([k]) => k !== 'time' && k !== 'space')
        .map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-300">
            <span className="capitalize">{k}: <strong className="text-slate-100">{v}</strong></span>
          </div>
        ))}
    </div>
  );
};
