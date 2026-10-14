import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Transaction } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  ArrowRight,
  GitBranch,
  Table,
  Binary
} from 'lucide-react';

export const TransactionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role, canHandleFraud } = useAuth();

  const [txn, setTxn] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    const loadTxn = async () => {
      try {
        setIsLoading(true);
        if (id) {
          const data = await api.getTransaction(Number(id));
          setTxn(data);
        }
      } catch (err) {
        console.warn("Using sample transaction for detail view:", err);
        setTxn({
          id: Number(id) || 1,
          transactionId: `TXN-CORP-${id || '9082'}`,
          sourceAccountNumber: 'ACC-1002938471',
          destinationAccountNumber: 'ACC-9988776655',
          amount: 45000,
          currency: 'INR',
          paymentCode: 'SWIFT-IN-9082',
          description: 'Payment for urgent server hardware clearance transfer otp bypass verify',
          timestamp: new Date().toISOString(),
          status: 'FLAGGED',
          riskScore: 78,
          detectedFraudPatterns: '["otp", "bypass", "urgent"]'
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadTxn();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!txn) return;
    setStatusUpdating(true);
    try {
      const updated = await api.updateTransactionStatus(txn.id, newStatus, role, "Status updated by " + role);
      setTxn(updated);
    } catch {
      setTxn({ ...txn, status: newStatus });
    } finally {
      setStatusUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="p-12 text-center text-slate-500 font-mono text-xs">Loading Transaction Forensics...</div>;
  }

  if (!txn) {
    return <div className="p-12 text-center text-slate-500 font-mono text-xs">Transaction not found.</div>;
  }

  const detectedPatterns: string[] = (() => {
    try {
      if (typeof txn.detectedFraudPatterns === 'string') {
        return JSON.parse(txn.detectedFraudPatterns);
      }
      return (txn.detectedFraudPatterns as string[]) || [];
    } catch {
      return ['otp', 'bypass'];
    }
  })();

  const isHighRisk = txn.riskScore > 50 || txn.status === 'FLAGGED' || txn.status === 'BLOCKED_FRAUD';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/transactions')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-mono">{txn.transactionId || `TXN-${txn.id}`}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                txn.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                isHighRisk ? 'bg-magenta-500/20 text-magenta-300 border border-magenta-500/30' :
                'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {txn.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Forensic DSA Audit, Aho-Corasick Tokenization & Inter-Bank Flow Trace
            </p>
          </div>
        </div>

        {/* Manager/Admin Resolution Actions */}
        {canHandleFraud && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStatusChange('COMPLETED')}
              disabled={statusUpdating}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve & Clear</span>
            </button>
            <button
              onClick={() => handleStatusChange('REJECTED')}
              disabled={statusUpdating}
              className="px-3.5 py-2 rounded-xl bg-magenta-500/20 hover:bg-magenta-500/30 text-magenta-300 border border-magenta-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Reject Transaction</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Transaction Metrics & Narrative */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400">
              Transaction Metadata & Financial Ledger
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase">Settlement Amount</span>
                <p className="text-base font-black text-white mt-0.5">
                  ₹ {txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
                <span className="text-[10px] text-emerald-400">Max Cap: ₹1,00,000</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase">Risk Metric Score</span>
                <p className={`text-base font-black mt-0.5 ${txn.riskScore > 50 ? 'text-magenta-400' : 'text-cyan-400'}`}>
                  {txn.riskScore}/100
                </p>
                <span className="text-[10px] text-slate-400">
                  {txn.riskScore > 50 ? 'Severe Alert' : 'Normal Variance'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase">Payment Routing Code</span>
                <p className="text-sm font-bold text-cyan-300 mt-0.5">{txn.paymentCode || 'N/A'}</p>
                <span className="text-[10px] text-slate-400">ISO-20022 Tag</span>
              </div>
            </div>

            {/* Narrative with Highlighted Keywords */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400">
                Transaction Narrative / SWIFT Remittance Text:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-mono">
                {txn.description}
              </p>
            </div>

            {/* Detected Pattern Badges */}
            {detectedPatterns.length > 0 && (
              <div className="p-4 rounded-2xl bg-magenta-950/20 border border-magenta-500/30 space-y-2">
                <div className="flex items-center gap-2 text-magenta-300 text-xs font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Aho-Corasick Automated Threat Triggers:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detectedPatterns.map((pat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-magenta-500/20 border border-magenta-500/40 text-magenta-300 font-mono text-xs font-semibold"
                    >
                      Matched Pattern: "{pat}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Transfer Conduit Visualization */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400">
              Inter-Bank Routing Conduit Pipeline
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Originating Bank</span>
                <p className="font-bold text-slate-200 text-xs font-mono">{txn.sourceAccountNumber || 'ACC-1002938471'}</p>
                <span className="text-[10px] text-cyan-400">FINServe Core Switch</span>
              </div>

              <div className="flex items-center gap-2 text-cyan-400">
                <div className="h-0.5 w-8 bg-cyan-500/40 hidden sm:block" />
                <ArrowRight className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400">RTGS Conduit</span>
                <div className="h-0.5 w-8 bg-cyan-500/40 hidden sm:block" />
              </div>

              <div className="text-center sm:text-right">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Receiving Bank</span>
                <p className="font-bold text-slate-200 text-xs font-mono">{txn.destinationAccountNumber || 'ACC-9988776655'}</p>
                <span className="text-[10px] text-emerald-400">Settlement Clearing Node</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 col): DSA Recommendation Engine */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 to-slate-900 space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">DSA Algorithmic Forensics</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Launch targeted algorithmic workbenches with this transaction's payload automatically preloaded:
            </p>

            {/* Action 1: Aho Corasick Multi-Pattern */}
            <button
              onClick={() => navigate('/dsa/m1-string')}
              className="w-full p-3.5 rounded-2xl bg-slate-900/90 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Binary className="w-3.5 h-3.5" />
                  Aho-Corasick Automaton
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-[11px] text-slate-400">
                Visualize multi-pattern state machine traversing narrative keywords in O(N + M).
              </p>
            </button>

            {/* Action 2: Levenshtein Typo DP */}
            <button
              onClick={() => navigate('/dsa/m3-dp')}
              className="w-full p-3.5 rounded-2xl bg-slate-900/90 hover:bg-violet-500/15 border border-slate-800 hover:border-violet-500/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5" />
                  Levenshtein Matrix DP
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-400 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-[11px] text-slate-400">
                Calculate minimum edit distance matrix against valid SWIFT directory codes.
              </p>
            </button>

            {/* Action 3: Dinic Max Flow Liquidity */}
            <button
              onClick={() => navigate('/dsa/m4-flow')}
              className="w-full p-3.5 rounded-2xl bg-slate-900/90 hover:bg-emerald-500/15 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5" />
                  Dinic Max Flow Algorithm
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-[11px] text-slate-400">
                Analyze inter-bank channel capacity and identify potential payment bottleneck cuts.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
