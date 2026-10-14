import React from 'react';
import { AlgorithmStep } from '../../types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SAT3VisualizerProps {
  currentStep: AlgorithmStep | null;
  resultData?: any;
}

export const SAT3Visualizer: React.FC<SAT3VisualizerProps> = ({
  currentStep,
  resultData
}) => {
  const isSatisfiable = resultData?.satisfiable;
  const assignment = resultData?.satisfyingAssignment || {};
  const clauses = [
    ["X1", "X2", "X3"],
    ["¬X1", "X2", "X4"],
    ["¬X2", "¬X3", "X4"],
    ["X1", "¬X4", "X3"]
  ];

  return (
    <div className="space-y-6">
      {/* Solver Verdict */}
      <div className={`p-4 rounded-3xl border flex items-center justify-between text-xs font-mono ${
        isSatisfiable
          ? 'bg-emerald-950/40 border-emerald-400 text-emerald-200'
          : 'bg-pink-950/40 border-pink-400 text-pink-200'
      }`}>
        <div className="flex items-center gap-2">
          {isSatisfiable ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-pink-400" />}
          <div>
            <span className="text-slate-400">DPLL Boolean Satisfiability Status: </span>
            <strong className="text-white text-sm block">
              {isSatisfiable ? 'FORMULA IS SATISFIABLE (Valid Regulatory Model Found)' : 'UNSATISFIABLE (Constraint Conflict)'}
            </strong>
          </div>
        </div>
        <span className="px-3 py-1.5 rounded-xl font-bold bg-slate-950 border border-slate-800">
          DPLL with Unit Propagation
        </span>
      </div>

      {/* Model Assignment */}
      {isSatisfiable && Object.keys(assignment).length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300 mb-2 block">
            Satisfying Truth Model:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(assignment).map(([k, v]) => (
              <div key={k} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
                <span className="text-slate-400 text-xs block">{k}</span>
                <span className={`text-sm font-black ${v ? 'text-emerald-400' : 'text-pink-400'}`}>
                  {v ? 'TRUE' : 'FALSE'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3-CNF Clauses */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-300 mb-2 block">
          3-CNF Clause Set:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {clauses.map((c, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
              Clause #{i + 1}: ({c.join(' ∨ ')})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
