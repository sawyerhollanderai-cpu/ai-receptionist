'use client';

import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-deep-blue/10">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-deep-blue transition-colors font-bold text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-deep-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">RA</span>
            </div>
            <span className="font-bold text-deep-blue tracking-tight">ReceptionistAI</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-6 h-6 text-deep-blue" />
          <h1 className="text-4xl font-black tracking-tight text-deep-blue">Terms of Service</h1>
        </div>

        <div className="prose-premium">
          <p className="text-lg text-zinc-500 mb-12">Status: Demo Utility Terms</p>
          
          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">01. Acceptance of Terms</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              By accessing the ReceptionistAI website and using the "Live Demo" voice feature, you agree to comply with and be bound by these terms. This site is for demonstration purposes only.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">02. Demo Usage</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              The "Sarah" AI is a software simulation. All "appointments" booked during the demo are fictional and do not represent real-world commitments. Users are prohibited from using the demo for any illegal service or to transmit offensive content.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">03. Disclaimer</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              ReceptionistAI is provided "as is" without any warranties. We are not responsible for any outcomes resulting from the use of the demo.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">04. Proprietary Rights</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              The design, code, and &quot;ReceptionistAI&quot; branding are the exclusive property of ReceptionistAI.
            </p>
          </section>
        </div>
      </div>

      <footer className="py-12 border-t border-zinc-100 bg-zinc-50/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
            © 2026 ReceptionistAI — Terms of Service
          </p>
        </div>
      </footer>
    </main>
  );
}
