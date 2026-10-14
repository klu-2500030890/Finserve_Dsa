import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo, demoSteps } from '../../context/DemoContext';
import { Sparkles, ArrowRight, ArrowLeft, X, CheckCircle2 } from 'lucide-react';

export const DemoTourBanner: React.FC = () => {
  const { isDemoActive, activeDemoStep, nextDemoStep, prevDemoStep, stopDemoTour } = useDemo();
  const navigate = useNavigate();

  const currentStep = demoSteps[activeDemoStep];

  useEffect(() => {
    if (isDemoActive && currentStep) {
      navigate(currentStep.path);
    }
  }, [isDemoActive, activeDemoStep, currentStep, navigate]);

  if (!isDemoActive || !currentStep) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 rounded-2xl bg-[#080d1e]/95 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,242,254,0.25)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wide uppercase">
                Academic Demo Tour &bull; Step {activeDemoStep + 1} of {demoSteps.length}
              </span>
              <h4 className="text-sm font-bold text-white">{currentStep.title}</h4>
            </div>
          </div>
          <button
            onClick={stopDemoTour}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          {currentStep.description}
        </p>

        {/* Progress Bar & Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5">
            {demoSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeDemoStep
                    ? 'w-6 bg-cyan-400 shadow-[0_0_10px_rgba(0,242,254,0.8)]'
                    : idx < activeDemoStep
                    ? 'w-2 bg-emerald-400'
                    : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevDemoStep}
              disabled={activeDemoStep === 0}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-500 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={nextDemoStep}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
            >
              {activeDemoStep === demoSteps.length - 1 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  Finish Tour
                </>
              ) : (
                <>
                  Next Step
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
