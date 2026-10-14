import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDemo } from '../context/DemoContext';
import type { UserRole } from '../types';
import { Zap, ShieldCheck, Lock, Sparkles, ArrowRight, CheckCircle2, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const { startDemoTour } = useDemo();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMINISTRATOR');
  const [username, setUsername] = useState('admin@finserve.corp');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Cosmic Galaxy Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const colors = ['#00f2fe', '#4facfe', '#7928ca', '#ff0080', '#00f5a0'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(5, 7, 14, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Draw constellation connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.2 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'ADMINISTRATOR') setUsername('admin@finserve.corp');
    else if (role === 'MANAGER') setUsername('manager.fraud@finserve.corp');
    else setUsername('analyst.test@finserve.corp');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsZooming(true);

    try {
      await login(selectedRole, username);
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setIsZooming(false);
    }
  };

  const handleDemoMode = async () => {
    setIsLoading(true);
    setIsZooming(true);
    await login('ADMINISTRATOR', 'Demo Superowner');
    startDemoTour();
    setTimeout(() => {
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#05070e]">
      {/* Background Cosmic Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 cosmic-grid opacity-30 pointer-events-none" />

      {/* Center Glass Login Panel with Zoom Effect */}
      <div
        className={`relative z-10 w-full max-w-xl mx-4 transition-all duration-700 ${
          isZooming ? 'scale-110 opacity-0 blur-md' : 'scale-100 opacity-100'
        }`}
      >
        <div className="p-8 md:p-10 rounded-3xl glass-panel-glow border border-cyan-500/40 bg-[#090d1f]/90 shadow-[0_0_80px_rgba(0,242,254,0.18)]">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 shadow-[0_0_30px_rgba(0,242,254,0.4)] mb-4">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-wider text-white">
              FIN<span className="text-cyan-400">Serve</span>
            </h1>
            <p className="text-xs font-mono text-cyan-300 mt-1">
              Intelligent Banking Analytics Platform
            </p>
            <p className="text-xs text-slate-400 mt-0.5 italic">
              "Turning Financial Data into Algorithmic Intelligence"
            </p>
          </div>

          {/* Role Selection Tabs (RBAC) */}
          <div className="mb-6">
            <label className="block text-[11px] font-mono tracking-widest uppercase text-slate-400 mb-2">
              Select Role-Based Access Identity (RBAC)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['ADMINISTRATOR', 'MANAGER', 'USER'] as UserRole[]).map((r) => {
                const isSel = selectedRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSel
                        ? r === 'ADMINISTRATOR'
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(0,242,254,0.25)]'
                          : r === 'MANAGER'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                          : 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono">
                        {r === 'ADMINISTRATOR' ? 'ADMIN' : r === 'MANAGER' ? 'MANAGER' : 'ANALYST'}
                      </span>
                      {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {r === 'ADMINISTRATOR'
                        ? 'Full System Owner'
                        : r === 'MANAGER'
                        ? 'Fraud & Override'
                        : 'Testing & ₹1L Transfers'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Username / Corporate Email
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Access Security Token / Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-all font-mono"
                />
              </div>
            </div>

            {/* Login & Demo Action Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.35)] transition-all hover:scale-[1.01]"
              >
                <span>Authenticate into FINServe</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDemoMode}
                className="w-full py-2.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Launch Guided B.Tech Faculty Demo Mode</span>
              </button>
            </div>
          </form>

          {/* Security & Regulatory Compliance Footer */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>RBI Regulatory Limit: ₹1,00,000 / Txn</span>
            </div>
            <span>2FA OTP Engine Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
