import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Customer } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Search,
  Plus,
  CreditCard,
  Phone,
  Mail,
  CheckCircle2,
  X
} from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const { canManageSystem } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCust, setNewCust] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    panNumber: '',
    kycStatus: 'VERIFIED',
    riskScore: 15
  });

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await api.getCustomers(search);
      setCustomers(data);
    } catch (err) {
      console.error("Error loading customers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [search]);

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createCustomer(newCust);
      setIsModalOpen(false);
      setNewCust({ name: '', email: '', phoneNumber: '', panNumber: '', kycStatus: 'VERIFIED', riskScore: 15 });
      loadCustomers();
    } catch (err) {
      alert("Failed to register customer: " + (err as any).message);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-wide">Customer Banking Registry</h1>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {customers.length} Entities
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete KYC verification directory, PAN identification, and historical credit risk profile scoring.
          </p>
        </div>

        {canManageSystem && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Customer</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-slate-800">
        <Search className="w-4 h-4 text-cyan-400 shrink-0" />
        <input
          type="text"
          placeholder="Filter by customer name, email, PAN number, or 10-digit mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-slate-400 hover:text-white">
            Clear
          </button>
        )}
      </div>

      {/* Customer Table */}
      <div className="rounded-3xl glass-panel border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
              <tr>
                <th className="p-4">Customer Name & ID</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">PAN / Tax ID</th>
                <th className="p-4">KYC Status</th>
                <th className="p-4">Risk Profile</th>
                <th className="p-4">Accounts Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                    Loading Customer Records...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                    No customers found matching search query.
                  </td>
                </tr>
              ) : (
                customers.map((c) => {
                  const score = c.riskScore ?? 15;
                  return (
                    <tr key={c.id} className="hover:bg-cyan-500/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center font-mono">
                            {(c.name || 'CU').substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-200">{c.name || 'Registered Customer'}</p>
                            <p className="text-[10px] font-mono text-cyan-400">CUST-{c.id ? c.id.toString().padStart(4, '0') : '0001'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-slate-300">
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span>{c.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span>{c.phoneNumber || c.phone || '9876543210'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-semibold text-slate-300">
                        {c.panNumber || 'ABCDE1234F'}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
                          c.kycStatus === 'VERIFIED'
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          {c.kycStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full ${
                                score > 60 ? 'bg-magenta-500' : score > 30 ? 'bg-amber-400' : 'bg-cyan-400'
                              }`}
                              style={{ width: `${Math.min(100, score)}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] font-bold text-slate-300">
                            {score}/100
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 font-mono text-cyan-300">
                          <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{c.accounts ? c.accounts.length : 1} Accounts</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Onboard New Customer</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B. T. B. A. Kartikeya"
                  value={newCust.name}
                  onChange={(e) => setNewCust({ ...newCust, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="kartikeya@finserve.corp"
                  value={newCust.email}
                  onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">10-Digit Mobile Number (2FA OTP)</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={newCust.phoneNumber}
                  onChange={(e) => setNewCust({ ...newCust, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Permanent Account Number (PAN)</label>
                <input
                  type="text"
                  required
                  placeholder="ABCDE1234F"
                  value={newCust.panNumber}
                  onChange={(e) => setNewCust({ ...newCust, panNumber: e.target.value.toUpperCase() })}
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
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
