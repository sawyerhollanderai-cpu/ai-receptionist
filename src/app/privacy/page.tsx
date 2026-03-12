'use client';

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
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
            <Shield className="w-6 h-6 opacity-70" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Privacy Policy</h1>
        </div>

        <div className="space-y-16">
          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">01. Overview</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              ReceptionistAI is an infrastructure layer for automated voice intake. We value your privacy and the security of the data processed by our systems.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">02. Data Processing</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium mb-6">
              During voice interactions, our system processes audio streams to handle inquiries and schedule appointments.
            </p>
            <ul className="space-y-4">
              {['Real-time audio processing via secure infrastructure.', 'Temporary storage of lead information for routing.', 'Automated deletion protocols for demo data.'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 opacity-50 font-medium text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">03. Security</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              All data is encrypted in transit using TLS 1.3. We leverage enterprise-grade providers to ensure the highest standards of audio and text data protection.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">04. Contact</p>
            <p className="text-lg opacity-60 font-medium">
              support@receptionistai.com
            </p>
          </section>
        </div>
      </div>

      <footer className="py-20 border-t border-white/5 w-full flex justify-center">
        <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.3em]">
          © 2026 RECEPTIONISTAI SYSTEM — PRIVACY
        </p>
      </footer>
    </main>
  );
}
