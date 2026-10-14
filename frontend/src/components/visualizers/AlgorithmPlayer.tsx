import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward, Info } from 'lucide-react';
import { AlgorithmStep } from '../../types';

interface AlgorithmPlayerProps {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  onReset: () => void;
  statusMessage?: string;
}

export const AlgorithmPlayer: React.FC<AlgorithmPlayerProps> = ({
  steps,
  currentStepIndex,
  onStepChange,
  onReset,
  statusMessage
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(600);

  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex] || null;

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        if (currentStepIndex < totalSteps - 1) {
          onStepChange(currentStepIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, speedMs);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentStepIndex, totalSteps, speedMs, onStepChange]);

  const handlePlayPause = () => {
    if (currentStepIndex >= totalSteps - 1) {
      onStepChange(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < totalSteps - 1) {
      onStepChange(currentStepIndex + 1);
    }
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 text-center text-slate-500 text-xs font-mono">
        No execution trace loaded. Press "Run Algorithm" to generate step-by-step trace.
      </div>
    );
  }

  return (
    <div className="p-5 rounded-3xl bg-slate-950/90 border border-cyan-500/20 shadow-xl space-y-4">
      {/* Current Step Description Card */}
      {currentStep && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/80 to-slate-900/40 border border-cyan-500/30 text-xs text-slate-200 flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
            #{currentStep.stepNumber}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {currentStep.type || 'STEP'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Progress: {currentStepIndex + 1} / {totalSteps}
              </span>
            </div>
            <p className="text-slate-100 font-medium leading-relaxed font-mono text-xs">
              {currentStep.description}
            </p>
          </div>
        </div>
      )}

      {/* Progress Timeline Scrubber */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
          <span>Trace Timeline</span>
          <span className="text-cyan-400 font-bold">{Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="relative w-full h-2 rounded-full bg-slate-900 overflow-hidden cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const pct = clickX / rect.width;
          const targetIndex = Math.min(totalSteps - 1, Math.max(0, Math.floor(pct * totalSteps)));
          onStepChange(targetIndex);
        }}>
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-150 shadow-[0_0_12px_rgba(0,242,254,0.6)]"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Control Buttons & Speed Slider */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Playback Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReset}
            title="Reset to Step 1"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleStepBack}
            disabled={currentStepIndex === 0}
            title="Previous Step"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 text-slate-300 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={handlePlayPause}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pause' : currentStepIndex >= totalSteps - 1 ? 'Replay' : 'Play Trace'}</span>
          </button>
          <button
            onClick={handleStepForward}
            disabled={currentStepIndex === totalSteps - 1}
            title="Next Step"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 text-slate-300 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Speed:</span>
          {[
            { label: '0.5x', ms: 1000 },
            { label: '1x', ms: 500 },
            { label: '2x', ms: 250 },
            { label: '4x', ms: 100 }
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setSpeedMs(s.ms)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                speedMs === s.ms
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
