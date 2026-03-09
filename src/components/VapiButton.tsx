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
        await vapi.start(assistantId, {
          metadata: {
            visitorId: visitorId || "unknown_visitor"
          },
          // Overriding the prompt for ReceptionistAI branding
          model: {
            provider: 'openai',
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are Sarah, the highly efficient virtual receptionist for "ReceptionistAI".
 
Goal: Answer the phone warmly, ask for their name, ask why they are calling, and book an appointment slot.
 
Strict Rules:
1. YOU ARE A DEMO AI. Your purpose is to show how effectively ReceptionistAI can handle business calls.
2. Keep all responses under 2 sentences. Your communication must be extremely brief and conversational.
3. Ask only ONE question at a time.
4. If the user asks about your capabilities, explain that you can book appointments, qualify leads, and handle routine inquiries 24/7.
5. To book them, simply ask if they prefer "Mornings or Afternoons", pick a random time slot, and say "Your demo booking is confirmed! This is how I help businesses scale."`
              }
            ],
            tools: [
              {
                type: 'function',
                function: {
                  name: 'bookAppointment',
                  description: 'Book an appointment. Call this when the user agrees to a date and time.',
                  parameters: {
                    type: 'object',
                    properties: {
                      patientName: { type: 'string', description: 'The name of the person' },
                      date: { type: 'string', description: 'The date (YYYY-MM-DD)' },
                      time: { type: 'string', description: 'The time (e.g. 10:00 AM)' }
                    },
                    required: ['patientName', 'date', 'time']
                  }
                }
              }
            ]
          },
          firstMessage: "Hi! Thanks for trying the ReceptionistAI Demo. This is Sarah, how can I help your business today?"
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
        <div className="glass px-6 py-3 rounded-2xl border-red-500/20 shadow-xl animate-fade-in-up">
          <p className="text-red-600 text-[11px] font-bold uppercase tracking-widest">{error}</p>
        </div>
      )}
      
      <div className="relative group flex items-center justify-center">
        {/* Deep background pulsing rings for WOW effect */}
        {isSessionActive && (
          <>
            <div className="absolute inset-0 rounded-full bg-deep-blue/20 blur-3xl animate-pulse-slow scale-150" />
            <div className="absolute inset-[-40px] rounded-full border border-deep-blue/5 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-[-80px] rounded-full border border-deep-blue/5 animate-pulse" style={{ animationDuration: '6s' }} />
          </>
        )}

        <button
          onClick={toggleCall}
          disabled={isConnecting}
          className={cn(
            "relative z-20 w-32 h-32 rounded-full transition-all duration-700 ease-out flex items-center justify-center overflow-hidden",
            isSessionActive 
              ? "scale-110 shadow-[0_20px_60px_rgba(30,58,95,0.4)]" 
              : "hover:scale-105 shadow-[0_15px_40px_rgba(30,58,95,0.1)] hover:shadow-[0_25px_50px_rgba(30,58,95,0.15)]",
            isConnecting && "opacity-80 scale-95 pointer-events-none"
          )}
        >
          {/* Internal Glows */}
          <div 
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              isSessionActive ? "bg-deep-blue opacity-100" : "bg-white opacity-100"
            )} 
          />
          
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

          {/* Inner Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-2">
            {isConnecting ? (
              <Loader2 className={cn("w-8 h-8 animate-spin", isSessionActive ? "text-white" : "text-deep-blue")} />
            ) : isSessionActive ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-1 bg-white/40 rounded-full mb-3 animate-pulse" />
                <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Live</span>
              </div>
            ) : (
              <div className="relative group-hover:scale-110 transition-transform duration-500">
                <Mic className="w-10 h-10 text-deep-blue transition-colors group-hover:text-accent-blue" />
                {/* Subtle ping to draw eye */}
                {!isSessionActive && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-accent-blue rounded-full border-2 border-white animate-ping" />
                )}
              </div>
            )}
          </div>

          {/* Ripple Effect Animation */}
          {isSessionActive && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
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
          <div className={cn("w-1 h-1 rounded-full bg-zinc-300", isSessionActive && "bg-deep-blue scale-150 transition-all")} />
          <div className={cn("w-1 h-1 rounded-full bg-zinc-300", isSessionActive && "bg-deep-blue/60 scale-125 transition-all")} />
          <div className={cn("w-1 h-1 rounded-full bg-zinc-300", isSessionActive && "bg-deep-blue/30 transition-all")} />
        </div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
          {isSessionActive ? "Sarah is Listening" : isConnecting ? "Connecting to Sarah" : "Terminal Offline"}
        </p>
      </div>
    </div>
  );
}
