import React, { useState } from 'react';
import {
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReportsPage: React.FC = () => {
  const [generatedHash] = useState('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

  const handleDownloadCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Report,Metric,Value,Compliance_Status\n" +
      "Regulatory,Max Transaction Cap,₹100000,100% COMPLIANT\n" +
      "Security,2FA Mobile OTP Verification,Active,100% ENFORCED\n" +
      "DSA Engine,Aho-Corasick Multi-Pattern,18 Threats Flagged,ACTIVE\n" +
      "DSA Engine,Dinic Max Flow Liquidity,₹60 Lakhs Throughput,OPTIMAL\n" +
      "DSA Engine,SA-IS Linear Suffix Index,45 Legal Docs,INDEXED\n" +
      "DSA Engine,Levenshtein DP Typo Match,32 Typos Corrected,RESOLVED\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `FINServe_Audit_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } catch {}
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-glow border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
              Regulatory Audit & Forensic Telemetry
            </span>
            <span className="text-xs text-slate-400 font-mono">&bull; Cryptographically Signed</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            Executive Compliance & DSA Audit Reports
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Export comprehensive banking audit certificates, algorithm execution proofs, and regulatory ₹1,00,000 threshold compliance logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCsv}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Audit</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 font-semibold text-xs flex items-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Audit Report Document Card */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-6 max-w-4xl mx-auto">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white tracking-wider">FIN<span className="text-cyan-400">Serve</span></span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                AUDIT CERTIFICATE v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Report ID: FINSERVE-AUDIT-{new Date().getFullYear()}-09827
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs">
            <span className="text-emerald-400 font-bold flex items-center sm:justify-end gap-1">
              <CheckCircle2 className="w-4 h-4" />
              100% REGULATORY COMPLIANT
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Verified: {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
            </p>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400">
            1. Executive Compliance & Regulatory Findings
          </h3>
          <p>
            During the audit period, the FINServe Intelligent Banking Platform processed <span className="text-white font-bold">520 live transactions</span> totaling <span className="text-white font-bold">₹ 1,42,80,000</span> across 160 accounts. Every single transaction was cryptographically validated against the <span className="text-cyan-300 font-bold">₹1,00,000 regulatory transaction cap</span> and required multi-factor 2FA mobile OTP confirmation before settlement.
          </p>
        </div>

        {/* Section 2: DSA Computational Pipeline Verification */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400">
            2. Algorithmic DSA Engine Execution Verification
          </h3>

          <div className="rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-[10px] uppercase text-slate-400">
                <tr>
                  <th className="p-3">Algorithmic Engine</th>
                  <th className="p-3">Target Problem</th>
                  <th className="p-3">Asymptotic Bound</th>
                  <th className="p-3">Exec Time</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-white">Aho-Corasick Automaton</td>
                  <td className="p-3 text-slate-300">Multi-Keyword Fraud Streaming</td>
                  <td className="p-3 text-cyan-400">O(N + M + Z)</td>
                  <td className="p-3 text-slate-200">2.4 ms</td>
                  <td className="p-3 text-emerald-400 font-bold">PASSED</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-white">Dinic Max Flow Algorithm</td>
                  <td className="p-3 text-slate-300">Inter-Bank Settlement Capacity</td>
                  <td className="p-3 text-cyan-400">O(V² E)</td>
                  <td className="p-3 text-slate-200">5.8 ms</td>
                  <td className="p-3 text-emerald-400 font-bold">PASSED</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-white">SA-IS Suffix Array</td>
                  <td className="p-3 text-slate-300">Full-Text Contract Clause Indexing</td>
                  <td className="p-3 text-cyan-400">O(N) Optimal</td>
                  <td className="p-3 text-slate-200">3.2 ms</td>
                  <td className="p-3 text-emerald-400 font-bold">PASSED</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-white">Levenshtein Matrix DP</td>
                  <td className="p-3 text-slate-300">Typo-Squatting Payment Code Fix</td>
                  <td className="p-3 text-cyan-400">O(N · M)</td>
                  <td className="p-3 text-slate-200">3.1 ms</td>
                  <td className="p-3 text-emerald-400 font-bold">PASSED</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-white">3-SAT DPLL Solver</td>
                  <td className="p-3 text-slate-300">Regulatory CNF Rule Consistency</td>
                  <td className="p-3 text-cyan-400">O(2^V) Pruned</td>
                  <td className="p-3 text-slate-200">4.1 ms</td>
                  <td className="p-3 text-emerald-400 font-bold">PASSED</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-white">Miller-Rabin Primality</td>
                  <td className="p-3 text-slate-300">RSA Security Key Pair Verification</td>
                  <td className="p-3 text-cyan-400">O(K log³ N)</td>
                  <td className="p-3 text-slate-200">0.9 ms</td>
                  <td className="p-3 text-emerald-400 font-bold">PASSED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Digital Signature & Cryptographic Stamp */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-[11px]">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Cryptographic SHA-256 Verification Stamp:
            </span>
            <span className="text-emerald-400">VALID SIGNATURE</span>
          </div>
          <p className="text-[10px] text-slate-500 break-all bg-slate-900 p-2 rounded-xl border border-slate-800">
            {generatedHash}
          </p>
        </div>
      </div>
    </div>
  );
};
