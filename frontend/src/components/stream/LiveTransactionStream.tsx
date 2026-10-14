import React, { useState, useEffect } from 'react';
import { Play, Pause, AlertTriangle, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const LiveTransactionStream: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [activeParticles, setActiveParticles] = useState<Array<{ id: number; from: string; to: string; amount: number; isFraud: boolean; progress: number }>>([]);
  const [fraudAlerts, setFraudAlerts] = useState<Array<{ id: number; title: string; desc: string; time: string }>>([]);

  const stages = [
    { id: 'cust', label: 'Origin Customer' },
    { id: 'bank', label: 'Initiating Bank' },
    { id: 'gateway', label: 'Payment Gateway' },
    { id: 'switch', label: 'Interbank Switch' },
    { id: 'merchant', label: 'Merchant / Vault' }
  ];

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        // Spawn particle
        const isFraud = Math.random() < 0.15;
        const amount = Math.floor(1000 + Math.random() * 95000); // <= 1 Lakh
        const newParticle = {
          id: Date.now() + Math.random(),
          from: 'Origin Customer',
          to: 'Merchant / Vault',
          amount,
          isFraud,
          progress: 0
        };

        if (isFraud) {
          setFraudAlerts(prev => [
            {
              id: Date.now(),
              title: `Fraud Flagged: ₹${amount.toLocaleString('en-IN')}`,
              desc: "Aho-Corasick Multi-Pattern triggered: 'UNAUTHORIZED_OTP_DRAIN'",
              time: new Date().toLocaleTimeString()
            },
            ...prev.slice(0, 4)
          ]);
        }

        setActiveParticles(prev => [...prev.slice(-8), newParticle]);
      }, 1800 / speed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, speed]);

  return (
    <div className="p-6 rounded-3xl bg-slate-950/90 border border-cyan-500/20 shadow-2xl relative overflow-hidden space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 animate-pulse-slow">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              LIVE FINANCIAL DATA STREAM
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </h3>
            <p className="text-xs text-slate-400">Algorithmic Transaction Pipeline Simulation</p>
          </div>
        </div>

        {/* Speed & Stream Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause Feed' : 'Resume Feed'}</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-[10px] font-mono">
            {[1, 2, 4].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  speed === s ? 'bg-cyan-500/30 text-cyan-200 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Network Pipeline Stages Bar */}
      <div className="relative py-4 px-2">
        <div className="flex items-center justify-between relative z-10">
          {stages.map((st, idx) => (
            <React.Fragment key={st.id}>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-mono font-bold shadow-lg shadow-cyan-950/40">
                  #{idx + 1}
                </div>
                <span className="text-[11px] font-mono text-slate-300 font-semibold">{st.label}</span>
              </div>
              {idx < stages.length - 1 && (
                <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 relative mx-2">
                  <div className="absolute inset-0 bg-cyan-400 animate-pulse"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Stream Particles Log */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-400 mb-2 block">
          Recent Streaming Transaction Ingestions:
        </span>
        <div className="space-y-1.5">
          {activeParticles.slice(-4).map((p) => (
            <div
              key={p.id}
              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all ${
                p.isFraud
                  ? 'bg-pink-950/30 border-pink-500/40 text-pink-300 shadow-[0_0_15px_rgba(255,0,128,0.2)]'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {p.isFraud ? (
                  <AlertTriangle className="w-4 h-4 text-pink-400 animate-bounce" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                )}
                <span>Amount: <strong className="text-white font-bold">₹{p.amount.toLocaleString('en-IN')}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">{p.from} ➔ {p.to}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  p.isFraud ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {p.isFraud ? 'SUSPICIOUS (FLAGGED)' : 'VERIFIED'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
