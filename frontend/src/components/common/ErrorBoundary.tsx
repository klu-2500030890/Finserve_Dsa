import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('FINServe Uncaught Component Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-slate-950/90 border border-pink-500/40 shadow-[0_0_30px_rgba(236,72,153,0.15)] text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mx-auto">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            
            <h3 className="text-lg font-bold text-white tracking-wide">
              {this.props.fallbackTitle || 'Component Render Anomaly Intercepted'}
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              FINServe runtime shield prevented a crash. The underlying telemetry or state experienced an unhandled boundary error.
            </p>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left font-mono text-[11px] text-pink-300 overflow-x-auto">
                <div className="flex items-center gap-2 mb-1 text-slate-500 text-[10px]">
                  <Terminal className="w-3 h-3" />
                  <span>Exception Trace</span>
                </div>
                <code>{this.state.error.toString()}</code>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 mx-auto shadow-lg transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recover & Reload Interface</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
