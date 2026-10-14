import React from 'react';
import { AlgorithmStep } from '../../types';
import { Waves, CheckCircle2 } from 'lucide-react';

interface ReservoirSamplingVisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const ReservoirSamplingVisualizer: React.FC<ReservoirSamplingVisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const reservoir = resultData?.finalReservoir || [
    { id: "TXN-1002", amount: 10000, type: "NEFT_TRANSFER" },
    { id: "TXN-1005", amount: 23500, type: "UPI_PAYMENT" },
    { id: "TXN-1011", amount: 50500, type: "SWIFT_WIRE" },
    { id: "TXN-1014", amount: 64000, type: "POS_PURCHASE" },
    { id: "TXN-1018", amount: 82000, type: "SETTLEMENT" }
  ];

  return (
    <div className="space-y-6">
      {/* Reservoir Size and Probability Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
          <span className="text-slate-400 block mb-1">Uniform Reservoir Size:</span>
          <span className="text-lg font-black text-cyan-300">k = {reservoir.length} Items</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Time Complexity:</span>
          <span className="text-lg font-black text-white">O(N) 1-Pass Streaming</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-1">Exact Item Probability:</span>
          <span className="text-lg font-black text-emerald-400">Pr = k / N</span>
        </div>
      </div>

      {/* Reservoir Slots */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Active Uniform Reservoir Memory Slots R[0..k-1]:
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">Equiprobable</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
          {reservoir.map((item: any, idx: number) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-slate-200 shadow-md"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-cyan-400 font-bold">Slot #{idx}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="font-bold text-white my-1">{item.id || `TXN-0${idx + 1}`}</p>
              <p className="text-emerald-400 font-black">₹{(item.amount || 15000).toLocaleString('en-IN')}</p>
              <span className="text-[9px] text-slate-400 block mt-1">{item.type || 'TRANSFER'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
