'use client';

import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-6 w-[90%] max-w-4xl z-50">
        <div className="bg-glass border-glass px-8 h-16 rounded-2xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-[10px]">RA</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl w-full px-6 pt-44 pb-32 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-secondary border border-border rounded-xl flex items-center justify-center">
            <Lock className="w-6 h-6 opacity-70" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Security</h1>
        </div>

        <div className="space-y-16">
          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">01. Voice Encryption</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              All audio streams are encrypted via Secure RTP (SRTP) and TLS 1.3 across the entire transport layer.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">02. Infrastructure Layer</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              Our system runs on high-availability edge nodes with geographically distributed redundancy to ensure zero downtime for your inbound operations.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">03. Data Isolation</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              Customer data is strictly isolated within our secure database clusters. We utilize SOC2-compliant processing layers for natural language understanding.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">04. Monitoring</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              Continuous threat detection and automated response protocols monitor our API and voice endpoints 24/7/365.
            </p>
          </section>
        </div>
      </div>

      <footer className="py-20 border-t border-white/5 w-full flex justify-center">
        <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.2em]">
          © 2026 RECEPTIONISTAI SYSTEM — SECURITY
        </p>
      </footer>
    </main>
  );
}
