import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Account } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  CreditCard,
  Search,
  Plus,
  Lock,
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';

export const AccountsPage: React.FC = () => {
  const { canHandleFraud, canManageSystem } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAcc, setNewAcc] = useState({
    accountNumber: `ACC-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    accountType: 'SAVINGS',
    balance: 50000,
    currency: 'INR',
    customerId: 1
  });

  const loadAccounts = async () => {
    try {
      setIsLoading(true);
      const data = await api.getAccounts();
      setAccounts(data);
    } catch (err) {
      console.error("Error loading accounts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createAccount(newAcc);
      setIsModalOpen(false);
      loadAccounts();
    } catch (err) {
      alert("Failed to create account: " + (err as any).message);
    }
  };

  const filteredAccounts = accounts.filter(a =>
    (a.accountNumber || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.accountType || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.customer && (a.customer.name || '').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-wide">Account Portfolio Directory</h1>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {accounts.length} Active Accounts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time balance monitoring, tier classification, escrow vaults, and multi-currency liquidity reserves.
          </p>
        </div>

        {canManageSystem && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Open New Account</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-slate-800">
        <Search className="w-4 h-4 text-cyan-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by account number (ACC-...), account type, or customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
        />
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            Loading Account Ledger...
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            No accounts found matching search criteria.
          </div>
        ) : (
          filteredAccounts.map((acc) => (
            <div
              key={acc.id}
              className="p-5 rounded-3xl glass-panel border border-slate-800/90 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,242,254,0.12)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    acc.accountType === 'SAVINGS' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    acc.accountType === 'CURRENT' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    acc.accountType === 'ESCROW' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {acc.accountType}
                  </span>

                  <span className={`flex items-center gap-1 text-[10px] font-mono font-semibold ${
                    acc.status === 'ACTIVE' ? 'text-emerald-400' : 'text-magenta-400'
                  }`}>
                    {acc.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {acc.status}
                  </span>
                </div>

                <p className="font-mono text-xs text-slate-400 tracking-wider mb-1">{acc.accountNumber}</p>
                <div className="text-2xl font-black text-white font-mono tracking-tight my-2">
                  ₹ {Number(acc.balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Customer Holder:</span>
                  <span className="font-bold text-slate-200">{acc.customer?.name || 'Authorized Holder'}</span>
                </div>
              </div>

              {canHandleFraud && (
                <div className="mt-4 pt-2 flex items-center justify-end">
                  <button
                    onClick={() => alert(`Status toggled for ${acc.accountNumber}`)}
                    className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Manage Freeze Status</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* New Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Create New Bank Account</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAccount} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Generated Account Number</label>
                <input
                  type="text"
                  readOnly
                  value={newAcc.accountNumber}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Account Category</label>
                <select
                  value={newAcc.accountType}
                  onChange={(e) => setNewAcc({ ...newAcc, accountType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="SAVINGS">SAVINGS (Retail Tier)</option>
                  <option value="CURRENT">CURRENT (Corporate Liquidity)</option>
                  <option value="ESCROW">ESCROW (Protected Settlement)</option>
                  <option value="NOSTRO">NOSTRO (Interbank Reserve)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Initial Deposit (₹ INR)</label>
                <input
                  type="number"
                  required
                  min={1000}
                  value={newAcc.balance}
                  onChange={(e) => setNewAcc({ ...newAcc, balance: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
