import React from 'react';
import { AlgorithmStep } from '../../types';

interface SuffixAutomatonVisualizerProps {
  text: string;
  query: string;
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const SuffixAutomatonVisualizer: React.FC<SuffixAutomatonVisualizerProps> = ({
  text,
  query,
  currentStep,
  resultData
}) => {
  const states = resultData?.states || [];
  const totalStates = resultData?.totalStates || 1;

  return (
    <div className="space-y-6">
      {/* Automaton Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Minimal States (≤ 2N-1):</span>
          <span className="text-xl font-black text-cyan-400">{totalStates} States</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Transitions Bound (≤ 3N-4):</span>
          <span className="text-xl font-black text-violet-400">{states.length * 2} Links</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Substring Acceptance:</span>
          <span className="text-xl font-black text-emerald-400">O(|Query|)</span>
        </div>
      </div>

      {/* State Transitions Table */}
      {states.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300 mb-2 block">
            Automaton State Transitions & Suffix Links:
          </span>
          <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-800/80">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 sticky top-0 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">State ID</th>
                  <th className="p-2.5">Max Length (len)</th>
                  <th className="p-2.5">Suffix Link</th>
                  <th className="p-2.5">Transitions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
                {states.map((st: any) => (
                  <tr key={st.id} className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-bold text-cyan-300">#{st.id}</td>
                    <td className="p-2.5 text-white">{st.len}</td>
                    <td className="p-2.5 text-purple-300">{st.link}</td>
                    <td className="p-2.5 text-slate-400 truncate max-w-xs">
                      {JSON.stringify(st.transitions)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
