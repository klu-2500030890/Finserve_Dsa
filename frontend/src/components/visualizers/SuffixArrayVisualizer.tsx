import React from 'react';
import { AlgorithmStep } from '../../types';

interface SuffixArrayVisualizerProps {
  text: string;
  query: string;
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const SuffixArrayVisualizer: React.FC<SuffixArrayVisualizerProps> = ({
  text,
  query,
  currentStep,
  resultData
}) => {
  const suffixTable = resultData?.suffixTable || [];
  const suffixArray = currentStep?.arrayState || resultData?.suffixArray || [];
  const activeIndices = currentStep?.activeIndices || [];
  const low = currentStep?.stateMap?.low;
  const mid = currentStep?.stateMap?.mid;
  const high = currentStep?.stateMap?.high;

  return (
    <div className="space-y-6">
      {/* Binary Search Substring Status */}
      {query && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
          <div>
            <span className="text-slate-400">Logarithmic Substring Lookup: </span>
            <strong className="text-cyan-300">"{query}"</strong>
          </div>
          {mid !== undefined && (
            <div className="flex items-center gap-3 text-slate-300">
              <span>Low: <strong className="text-white">{low}</strong></span>
              <span>Mid (Active): <strong className="text-cyan-400 font-bold">{mid}</strong></span>
              <span>High: <strong className="text-white">{high}</strong></span>
            </div>
          )}
        </div>
      )}

      {/* Suffix Array Output */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-slate-300">
            Suffix Array (Starting Indices of Lexicographically Sorted Suffixes):
          </span>
          <span className="text-[10px] font-mono text-cyan-400">SA[0..N-1]</span>
        </div>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-2">
          {suffixArray.map((saIdx: number, rank: number) => (
            <div
              key={rank}
              className={`flex flex-col items-center p-2 rounded-xl border text-xs font-mono transition-all ${
                mid === rank
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100 font-bold scale-105 shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[9px] text-slate-500">Rank {rank}</span>
              <span className="text-base font-black text-cyan-300 my-0.5">{saIdx}</span>
              <span className="text-[9px] text-slate-400 truncate max-w-[60px]">
                {text.substring(saIdx, Math.min(text.length, saIdx + 6))}...
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suffix Lexicographical Table */}
      {suffixTable.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300 mb-2 block">
            Lexicographically Ordered Suffix Table:
          </span>
          <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-800/80">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 sticky top-0 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Rank</th>
                  <th className="p-2.5">Suffix Index</th>
                  <th className="p-2.5">Full Suffix Content</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {suffixTable.map((row: any) => {
                  const isMid = mid === row.rank;
                  const isMatch = query && row.suffix.startsWith(query);
                  return (
                    <tr
                      key={row.rank}
                      className={
                        isMatch
                          ? 'bg-emerald-500/20 text-emerald-200'
                          : isMid
                          ? 'bg-cyan-500/20 text-cyan-200'
                          : 'hover:bg-slate-800/40 text-slate-300'
                      }
                    >
                      <td className="p-2.5 font-bold">{row.rank}</td>
                      <td className="p-2.5 text-cyan-400 font-bold">{row.index}</td>
                      <td className="p-2.5 font-mono truncate max-w-xs">{row.suffix}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
