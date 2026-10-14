import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { InvestigationCase } from '../../types';
import {
  Users,
  GitBranch,
  Clock,
  ArrowRight
} from 'lucide-react';

export const InvestigationCasesPage: React.FC = () => {
  const navigate = useNavigate();

  const [cases, setCases] = useState<InvestigationCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const caseData = await api.getInvestigationCases();
      setCases(caseData);
    } catch (err) {
      console.error("Error loading investigations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-wide">Forensic Investigation Docket</h1>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {cases.length} Open Cases
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analyst case workload balanced via Maximum Bipartite Matching & Network Flow algorithms.
          </p>
        </div>

        <button
          onClick={() => navigate('/dsa/m4-flow')}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-semibold text-xs flex items-center gap-2 transition-all"
        >
          <GitBranch className="w-4 h-4" />
          <span>Bipartite Matching Engine (M4)</span>
        </button>
      </div>

      {/* Grid of Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            Loading Investigation Dossiers...
          </div>
        ) : cases.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            No active forensic cases on docket.
          </div>
        ) : (
          cases.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-3xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    c.priority === 'CRITICAL' ? 'bg-magenta-500/20 text-magenta-300 border border-magenta-500/40' :
                    c.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}>
                    {c.priority} PRIORITY
                  </span>

                  <span className="text-[10px] font-mono text-slate-500">{c.caseNumber || `CASE-${c.id}`}</span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {c.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {c.summary || c.notes || 'Forensic threat anomaly assigned for auditor investigation.'}
                </p>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs mb-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Assigned Forensic Analyst:</span>
                    </span>
                    <span className="font-bold text-slate-200">
                      {c.assignedAnalyst?.name || c.assignedAnalystName || 'M. Abhiram (Lead)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Case Status:</span>
                    </span>
                    <span className="font-mono text-[11px] text-cyan-300 font-semibold">
                      {c.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">
                  Opened: {c.openedAt || c.createdAt ? new Date(c.openedAt || c.createdAt || '').toLocaleDateString() : 'Active'}
                </span>

                <button
                  onClick={() => alert(`Investigation Dossier: ${c.caseNumber || c.id}\nSummary: ${c.summary || c.notes}`)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <span>Review Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
