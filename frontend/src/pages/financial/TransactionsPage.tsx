import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Transaction } from '../../types';
import { OtpModal } from '../../components/common/OtpModal';
import {
  Search,
  ShieldAlert,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Cpu,
  Send,
  ArrowRight,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  // Transfer Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState<number>(25000);
  const [sourceAcc, setSourceAcc] = useState('ACC-1002938471');
  const [destAcc, setDestAcc] = useState('ACC-9988776655');
  const [paymentCode, setPaymentCode] = useState('SWIFT-CORP-4820');
  const [narrative, setNarrative] = useState('Quarterly inter-bank liquidity settlement transfer');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [amountError, setAmountError] = useState<string | null>(null);

  // OTP Modal State
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('749281');

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await api.getTransactions(search);
      setTransactions(data);
    } catch (err) {
      console.error("Error loading transactions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [search]);

  const handleAmountChange = (val: number) => {
    setAmount(val);
    if (val > 100000) {
      setAmountError("REGULATORY VIOLATION: Maximum transaction limit is strictly ₹1,00,000 per transaction!");
    } else if (val <= 0) {
      setAmountError("Amount must be greater than ₹0.");
    } else {
      setAmountError(null);
    }
  };

  const handleInitiateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 100000) {
      alert("Error: Maximum transaction limit is ₹1,00,000.");
      return;
    }
    try {
      const otpRes = await api.sendOtp(phoneNumber);
      if (otpRes && otpRes.otp) {
        setGeneratedOtp(otpRes.otp);
      } else {
        setGeneratedOtp('749281');
      }
      setIsModalOpen(false);
      setIsOtpOpen(true);
    } catch {
      setGeneratedOtp('749281');
      setIsModalOpen(false);
      setIsOtpOpen(true);
    }
  };

  const handleOtpVerified = async () => {
    try {
      await api.processTransaction({
        sourceAccountNumber: sourceAcc,
        destinationAccountNumber: destAcc,
        amount: amount,
        paymentCode: paymentCode,
        description: narrative,
        phoneNumber: phoneNumber
      });
      setIsOtpOpen(false);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch {}
      loadTransactions();
    } catch (err: any) {
      alert("Transaction processing failed: " + err.message);
    }
  };

  const filteredTransactions = transactions.filter(t => {
    if (statusFilter === 'HIGH_RISK') return t.riskScore > 50 || t.status === 'FLAGGED' || t.status === 'BLOCKED_FRAUD';
    if (statusFilter === 'COMPLETED') return t.status === 'COMPLETED';
    if (statusFilter === 'FLAGGED') return t.status === 'FLAGGED' || t.status === 'BLOCKED_FRAUD' || t.status === 'ESCALATED_MANAGER';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-wide">Transaction Ledger & Settlement</h1>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {transactions.length} Records
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
              ₹1L Regulatory Cap Enforced
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time inter-bank payment stream, Aho-Corasick forensic screening, and 2FA Mobile OTP cryptographic verification.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Initiate Transaction (2FA)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-2 w-full md:w-96">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Search Txn ID (TXN-...), Account, or Payment Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Transactions' },
            { id: 'HIGH_RISK', label: 'High Risk / Suspicious' },
            { id: 'FLAGGED', label: 'Fraud Flagged' },
            { id: 'COMPLETED', label: 'Settled & Verified' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all ${
                statusFilter === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,242,254,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-3xl glass-panel border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
              <tr>
                <th className="p-4">Txn ID & Time</th>
                <th className="p-4">Transfer Channel</th>
                <th className="p-4">Amount (₹ INR)</th>
                <th className="p-4">Payment Code</th>
                <th className="p-4">Forensic Risk</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">DSA Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-mono">
                    Loading Financial Transactions Stream...
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-mono">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t) => {
                  const isHighRisk = t.riskScore > 50 || t.status === 'FLAGGED' || t.status === 'BLOCKED_FRAUD';
                  return (
                    <tr
                      key={t.id}
                      className={`hover:bg-cyan-500/5 transition-colors ${
                        isHighRisk ? 'bg-magenta-950/10' : ''
                      }`}
                    >
                      <td className="p-4">
                        <p className="font-mono font-bold text-slate-200">{t.transactionId || (t.id ? `TXN-${t.id.toString().padStart(5, '0')}` : 'TXN-00000')}</p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {t.timestamp ? new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Recent'}
                        </p>
                      </td>

                      <td className="p-4 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <span className="text-slate-500">From:</span>
                          <span>{t.sourceAccountNumber || `ACC-${t.accountId || 1001}`}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-cyan-300">
                          <span className="text-slate-500">To:</span>
                          <span>{t.destinationAccountNumber || 'ACC-9988776655'}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-mono font-black text-white text-sm">
                          ₹ {Number(t.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                        {Number(t.amount) >= 100000 && (
                          <span className="text-[9px] font-mono text-amber-400">At ₹1L Cap</span>
                        )}
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[11px]">
                          {t.paymentCode || 'N/A'}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full ${
                                isHighRisk ? 'bg-magenta-500' : t.riskScore > 25 ? 'bg-amber-400' : 'bg-cyan-400'
                              }`}
                              style={{ width: `${Math.min(100, t.riskScore)}%` }}
                            />
                          </div>
                          <span className={`font-mono text-[11px] font-bold ${
                            isHighRisk ? 'text-magenta-400' : 'text-slate-300'
                          }`}>
                            {t.riskScore}%
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          t.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' :
                          isHighRisk ? 'bg-magenta-500/10 text-magenta-300 border border-magenta-500/30' :
                          'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        }`}>
                          {t.status === 'COMPLETED' ? <CheckCircle2 className="w-3 h-3" /> :
                           isHighRisk ? <ShieldAlert className="w-3 h-3" /> :
                           <Clock className="w-3 h-3" />}
                          {t.status}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => navigate(`/transactions/${t.id}`)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/40 text-cyan-300 font-mono text-[11px] inline-flex items-center gap-1.5 transition-all"
                        >
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Forensic DSA</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer Initiation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Initiate Secure Banking Transfer</h3>
                  <p className="text-[10px] font-mono text-cyan-300">RBI Regulatory Cap: Maximum ₹1,00,000</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInitiateTransfer} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Source Account</label>
                  <input
                    type="text"
                    required
                    value={sourceAcc}
                    onChange={(e) => setSourceAcc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Destination Account</label>
                  <input
                    type="text"
                    required
                    value={destAcc}
                    onChange={(e) => setDestAcc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Transfer Amount (₹ INR) &mdash; <span className="text-cyan-400 font-mono">Max ₹1,00,000</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100000}
                    value={amount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className={`w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border text-sm font-mono font-bold focus:outline-none ${
                      amount > 100000
                        ? 'border-red-500 text-red-300 focus:border-red-400 bg-red-950/20'
                        : 'border-slate-800 text-white focus:border-cyan-500'
                    }`}
                  />
                </div>
                {amountError && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    {amountError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Payment Code / Identifier</label>
                <input
                  type="text"
                  required
                  value={paymentCode}
                  onChange={(e) => setPaymentCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Transaction Narrative</label>
                <input
                  type="text"
                  required
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">2FA Verified Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-800">
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>2FA OTP Dispatch</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!!amountError}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 shadow-lg"
                  >
                    <span>Verify & Send OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2FA OTP Confirmation Modal */}
      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onVerify={handleOtpVerified}
        phoneNumber={phoneNumber}
        sampleOtp={generatedOtp}
        transactionAmount={amount}
      />
    </div>
  );
};
