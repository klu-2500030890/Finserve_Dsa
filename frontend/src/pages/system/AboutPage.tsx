import React from 'react';
import {
  Zap,
  GraduationCap,
  Code2,
  Server,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "B. T. B. A. KARTIKEYA",
      regNo: "2500030890",
      role: "Lead Full-Stack Architect & Algorithm Designer",
      contributions: "End-to-End System Architecture, String Automata (M1), Dynamic Programming Engines (M3), RBAC Security & 2FA OTP Protocol."
    },
    {
      name: "M. ABHIRAM",
      regNo: "2500030834",
      role: "Backend Core & Network Flow Lead",
      contributions: "Java 25 Spring Boot Services, Dinic & Edmonds-Karp Max Flow Engines (M4), NP-Completeness Solvers (M5), Transaction Ledger."
    },
    {
      name: "B. ABHIRAM VARMA",
      regNo: "2500030834 / Team Co-Lead",
      role: "Frontend Engineer & Suffix Specialist",
      contributions: "Cosmic Financial Intelligence UI, SA-IS & Kasai Suffix Lab (M2), Streaming Reservoir & Blelloch Visualizers (M6)."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="p-8 rounded-3xl glass-panel-glow border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 shadow-[0_0_30px_rgba(0,242,254,0.4)] mb-2">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-black text-white tracking-wide">
          FIN<span className="text-cyan-400">Serve</span> &mdash; Intelligent Banking Analytics Platform
        </h1>
        <p className="text-sm font-mono text-cyan-300">
          "Turning Financial Data into Algorithmic Intelligence"
        </p>
        <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
          A production-grade, DSA-centric full-stack banking platform designed for academic demonstration and faculty evaluation.
        </p>
      </div>

      {/* Project Team Members Card */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <GraduationCap className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
            B.Tech Academic Project Team & Faculty Review Docket
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center font-mono mb-3 group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400 font-bold mb-1">
                  Reg No: {member.regNo}
                </p>
                <p className="text-[11px] font-semibold text-slate-300 mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                  {member.contributions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack & Architecture Card */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
            Full-Stack Technology Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold font-mono">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Backend Core (Java 25)</span>
            </div>
            <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
              <li>&bull; Spring Boot 3.3.4 (Port 8088)</li>
              <li>&bull; 26 Real Deterministic DSA Classes</li>
              <li>&bull; Spring Data JPA & H2 In-Memory DB</li>
              <li>&bull; Strict 12/12 JUnit Test Pass</li>
              <li>&bull; REST Controllers with CORS</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-violet-300 font-bold font-mono">
              <Layers className="w-4 h-4 text-violet-400" />
              <span>Frontend (React 19 + Vite)</span>
            </div>
            <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
              <li>&bull; React 19 + TypeScript + Vite</li>
              <li>&bull; Tailwind CSS + Glassmorphism</li>
              <li>&bull; Framer Motion + Canvas Confetti</li>
              <li>&bull; Recharts Analytics & Visualizers</li>
              <li>&bull; 10-Step Interactive Demo Tour</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security & Compliance</span>
            </div>
            <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
              <li>&bull; Strict ₹1,00,000 Transaction Cap</li>
              <li>&bull; 2FA Mobile OTP Cryptographic Modal</li>
              <li>&bull; Role-Based Access Control (RBAC)</li>
              <li>&bull; Automated Aho-Corasick Sentinel</li>
              <li>&bull; Pre-seeded 500+ Financial Records</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
