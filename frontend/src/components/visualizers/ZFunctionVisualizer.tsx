import React from 'react';
import { AlgorithmStep } from '../../types';

interface ZFunctionVisualizerProps {
  inputString: string;
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const ZFunctionVisualizer: React.FC<ZFunctionVisualizerProps> = ({
  inputString,
  currentStep,
  resultData
}) => {
  const zArray = currentStep?.arrayState || resultData?.zArray || [];
  const stateMap = currentStep?.stateMap || {};
  const currentL = stateMap.L !== undefined ? stateMap.L : -1;
  const currentR = stateMap.R !== undefined ? stateMap.R : -1;
  const currentI = stateMap.i !== undefined ? stateMap.i : -1;

  return (
    <div className="space-y-6">
      {/* Active Z-box info banner */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>Active Z-Box Window: <strong>[{currentL}, {currentR}]</strong></span>
        </div>
        <div className="text-slate-400">
          <span>Current Index i: <strong className="text-white">{currentI >= 0 ? currentI : '-'}</strong></span>
        </div>
      </div>

      {/* Interactive Z-Array Cells */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-slate-300">
            Z-Array (Length of longest prefix matching substring starting at i):
          </span>
          <span className="text-[10px] font-mono text-cyan-400">Linear O(N)</span>
        </div>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {inputString.split('').map((char, idx) => {
            const isCurrent = currentI === idx;
            const inZBox = idx >= currentL && idx <= currentR && currentL !== currentR;
            const zVal = zArray[idx] !== undefined ? zArray[idx] : 0;

            return (
              <div
                key={idx}
                className={`flex flex-col items-center min-w-[36px] p-2 rounded-xl border text-xs font-mono transition-all ${
                  isCurrent
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100 font-bold scale-110 shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                    : inZBox
                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-200 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <span className="text-[9px] text-slate-500">i={idx}</span>
                <span className="text-sm font-black my-1 text-white">{char}</span>
                <div className={`px-1.5 py-0.5 rounded text-xs font-mono font-bold ${
                  zVal > 0 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-900 text-slate-500'
                }`}>
                  Z={zVal}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
