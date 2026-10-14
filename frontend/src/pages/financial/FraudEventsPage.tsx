import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { FraudEvent } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert
} from 'lucide-react';

export const FraudEventsPage: React.FC = () => {
  const { canHandleFraud } = useAuth();

  const [fraudEvents, setFraudEvents] = useState<FraudEvent[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  const loadFraudEvents = async () => {
    try {
      setIsLoading(true);
      const data = await api.getFraudEvents();
      setFraudEvents(data);
    } catch (err) {
      console.error("Error loading fraud events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFraudEvents();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await api.updateFraudStatus(id, newStatus);
      loadFraudEvents();
    } catch (err) {
      alert("Failed to update status: " + (err as any).message);
    }
  };

  const filteredEvents = fraudEvents.filter(ev => {
    if (severityFilter === 'CRITICAL') return ev.severity === 'CRITICAL';
    if (severityFilter === 'HIGH') return ev.severity === 'HIGH';
    if (severityFilter === 'OPEN') return ev.status === 'DETECTED' || ev.status === 'UNDER_INVESTIGATION';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-wide">Automated Fraud Sentinel Board</h1>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-magenta-500/20 text-magenta-300 border border-magenta-500/30 font-bold animate-pulse">
              Aho-Corasick & DP Engine Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time algorithmic threat detection monitoring multi-pattern token abuse, OTP hijack signatures, and anomaly scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'CRITICAL', 'HIGH', 'OPEN'].map(f => (
            <button
              key={f}
              onClick={() => setSeverityFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                severityFilter === f
                  ? 'bg-magenta-500/20 text-magenta-300 border border-magenta-500/40 shadow-[0_0_15px_rgba(255,0,128,0.2)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Fraud Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            Scanning Streaming Threat Matrix...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            No active fraud events found under selected filter.
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const isCritical = ev.severity === 'CRITICAL';
            const patternTitle = ev.patternType || ev.pattern || 'SUSPICIOUS_TOKEN_MATCH';
            const confidence = ev.confidenceScore ?? 85;

            return (
              <div
                key={ev.id}
                className={`p-5 rounded-3xl glass-panel border transition-all flex flex-col justify-between ${
                  isCritical
                    ? 'border-magenta-500/50 bg-magenta-950/10 shadow-[0_0_20px_rgba(255,0,128,0.15)]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black ${
                      isCritical ? 'bg-magenta-500/20 text-magenta-300 border border-magenta-500/40' :
                      ev.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}>
                      {ev.severity} THREAT
                    </span>

                    <span className="text-[10px] font-mono text-slate-400">
                      ID: FRD-{ev.id.toString().padStart(4, '0')}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <ShieldAlert className={`w-4 h-4 ${isCritical ? 'text-magenta-400' : 'text-amber-400'}`} />
                    <span>{patternTitle.replace(/_/g, ' ')}</span>
                  </h3>

                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    {ev.description || ev.details || 'Automated threat pattern triggered on transaction narrative.'}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 mb-4 space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Detected Algorithm:</span>
                      <span className="text-cyan-400 font-bold">{ev.detectedAlgorithm || 'Aho-Corasick Automaton'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Confidence Score:</span>
                      <span className={`font-bold ${confidence > 80 ? 'text-magenta-400' : 'text-amber-400'}`}>
                        {confidence}% Match
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-semibold ${
                    ev.status === 'RESOLVED' || ev.status === 'RESOLVED_BLOCKED' ? 'text-emerald-400' :
                    ev.status === 'ESCALATED' ? 'text-magenta-400' : 'text-amber-400'
                  }`}>
                    Status: {ev.status}
                  </span>

                  {canHandleFraud && ev.status !== 'RESOLVED' && ev.status !== 'RESOLVED_BLOCKED' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdateStatus(ev.id, 'RESOLVED')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold transition-colors"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(ev.id, 'ESCALATED')}
                        className="px-2.5 py-1 rounded-lg bg-magenta-500/20 hover:bg-magenta-500/30 text-magenta-300 border border-magenta-500/30 text-[10px] font-mono font-bold transition-colors"
                      >
                        Escalate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
