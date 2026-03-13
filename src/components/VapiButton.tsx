'use client';

import { useEffect, useState, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, PhoneOff, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function VapiButton({ visitorId }: { visitorId: string | null }) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vapiRef = useRef<Vapi | null>(null);

  // ... (useEffect for Vapi initialization remains same) ...
  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || 'your-public-key';
    vapiRef.current = new Vapi(pk);
    const vapi = vapiRef.current;

    vapi.on('call-start', () => {
      setIsSessionActive(true);
      setIsConnecting(false);
      setError(null);
    });

    vapi.on('call-end', () => {
      setIsSessionActive(false);
      setIsConnecting(false);
    });

    vapi.on('error', (e) => {
      console.error('Vapi Web SDK error raw:', e);
      setError(e.message || 'An error occurred with the voice agent.');
      setIsConnecting(false);
      setIsSessionActive(false);
    });

    return () => {
      vapi.removeAllListeners();
      if (isSessionActive) vapi.stop();
    };
  }, []);

  const toggleCall = async () => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    if (isSessionActive) {
      vapi.stop();
    } else {
      setIsConnecting(true);
      setError(null);
      try {
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
        if (!assistantId) throw new Error('Assistant ID not set');

        // Correctly pass the visitorId in call metadata
        // Start call using Dashboard settings (Voice, Model, Prompt)
        await vapi.start(assistantId, {
          metadata: {
            visitorId: visitorId || "unknown_visitor"
          }
        });

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to start call');
        } else {
          setError('Failed to start call due to unknown error');
        }
        setIsConnecting(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      {error && (
        <div className="glass px-6 py-3 rounded-lg border-red-500/20 shadow-xl animate-fade-in-up">
          <p className="text-red-600 text-[11px] font-bold uppercase tracking-widest">{error}</p>
        </div>
      )}
      
      <div className="relative group flex items-center justify-center">
        {/* Pulsing state for active session */}
        {isSessionActive && (
          <div className="absolute inset-[-10px] rounded-lg border border-accent-blue/20 animate-pulse" />
        )}

        <button
          onClick={toggleCall}
          disabled={isConnecting}
          className={cn(
            "relative z-20 w-32 h-32 rounded-lg transition-all duration-300 ease-out flex items-center justify-center overflow-hidden border border-slate-200",
            isSessionActive 
              ? "bg-accent-blue shadow-lg border-accent-blue" 
              : "bg-white hover:bg-slate-50 shadow-sm hover:border-slate-300",
            isConnecting && "opacity-80 scale-95 pointer-events-none"
          )}
        >
          {/* Inner Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-2">
            {isConnecting ? (
              <Loader2 className={cn("w-8 h-8 animate-spin", isSessionActive ? "text-white" : "text-deep-blue")} />
            ) : isSessionActive ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-1 bg-white/40 rounded-lg mb-3 animate-pulse" />
                <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Live</span>
              </div>
            ) : (
              <div className="relative group-hover:scale-110 transition-transform duration-500">
                <Mic className="w-10 h-10 text-deep-blue transition-colors group-hover:text-accent-blue" />
                {/* Subtle ping to draw eye */}
                {!isSessionActive && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-accent-blue rounded-lg border-2 border-white animate-ping" />
                )}
              </div>
            )}
          </div>

          {/* No ripple for minimalist look */}
        </button>

        {/* Hover label */}
        {!isSessionActive && !isConnecting && (
          <div className="absolute -bottom-16 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span className="text-[10px] font-black text-deep-blue uppercase tracking-[0.4em] whitespace-nowrap">Click to Initiate</span>
          </div>
        )}
      </div>

      {/* Visual Status Indicator */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex items-center gap-1.5">
          <div className={cn("w-1.5 h-1.5 rounded-lg bg-zinc-300", isSessionActive && "bg-accent-blue scale-150 transition-all")} />
          <div className={cn("w-1.5 h-1.5 rounded-lg bg-zinc-300", isSessionActive && "bg-accent-blue/60 scale-125 transition-all")} />
          <div className={cn("w-1.5 h-1.5 rounded-lg bg-zinc-300", isSessionActive && "bg-accent-blue/30 transition-all")} />
        </div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
          {isSessionActive ? "Sarah is Listening" : isConnecting ? "Connecting to Sarah" : "Terminal Offline"}
        </p>
      </div>
    </div>
  );
}
