'use client';

import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
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
            <FileText className="w-6 h-6 opacity-70" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Terms of Service</h1>
        </div>

        <div className="space-y-16">
          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">01. Agreement</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              By accessing the ReceptionistAI core infrastructure or interacting with our voice systems, you agree to these service terms.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">02. Usage Limits</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              The automated systems are provided for legitimate business use. Unauthorized attempts to reverse-engineer or degrade the voice logic are strictly prohibited.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">03. Performance Model</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              Our performance-based tiers are governed by the volume of successfully booked appointments. Invoices are generated based on system-verified outcomes.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-4">04. Liability</p>
            <p className="text-lg opacity-60 leading-relaxed font-medium">
              ReceptionistAI provides the horizontal infrastructure for intake. The accuracy of business data provided to the system is the responsibility of the account holder.
            </p>
          </section>
        </div>
      </div>

      <footer className="py-20 border-t border-white/5 w-full flex justify-center">
        <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.2em]">
          © 2026 RECEPTIONISTAI SYSTEM — TERMS
        </p>
      </footer>
    </main>
  );
}
