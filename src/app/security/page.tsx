'use client';

import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function SecurityPage() {
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
          <Lock className="w-6 h-6 text-deep-blue" />
          <h1 className="text-4xl font-black tracking-tight text-deep-blue">Security Infrastructure</h1>
        </div>

        <div className="prose-premium">
          <p className="text-lg text-zinc-500 mb-12">Enterprise-Grade Voice Security</p>
          
          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">01. Call Encryption</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              All voice data is encrypted in transit using industry-standard TLS protocols. We utilize Vapi.ai's secure infrastructure to ensure that audio streams remain private and protected from unauthorized access.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">02. Data Processing</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              We leverage OpenAI’s SOC2-compliant models for natural language processing. Transcriptions are processed securely and are not used for training models without explicit enterprise agreements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">03. Webhook Security</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              Our backend endpoints are secured within the Vercel edge network, utilizing modern sanitization and validation protocols for every incoming payload. 
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">04. Continuous Monitoring</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              We perform continuous logging and monitoring of our infrastructure to detect and mitigate any potential security threats in real-time.
            </p>
          </section>
        </div>
      </div>

      <footer className="py-12 border-t border-zinc-100 bg-zinc-50/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
            © 2026 ReceptionistAI — Advanced Security Architecture
          </p>
        </div>
      </footer>
    </main>
  );
}
