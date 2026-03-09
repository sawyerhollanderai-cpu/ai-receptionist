'use client';

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-deep-blue/10">
      <nav className="fixed top-0 left-0 right- diffusion-blur z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
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
          <Shield className="w-6 h-6 text-deep-blue" />
          <h1 className="text-4xl font-black tracking-tight text-deep-blue">Privacy Policy</h1>
        </div>

        <div className="prose-premium">
          <p className="text-lg text-zinc-500 mb-12">Last Updated: March 2026</p>
          
          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">01. Overview</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              ReceptionistAI is a demonstration platform designed to showcase AI voice capabilities. We value your privacy and are committed to protecting any personal data shared during your interactions with our AI demo.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">02. Data Collection</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              During the demo call, Sarah (our AI) may ask for your name and appointment preferences. This data is used solely to demonstrate the real-time "Live Lead" dashboard feature.
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>Voice recordings are processed in real-time by Vapi and OpenAI.</li>
              <li>Names provided are stored in a temporary, in-memory database.</li>
              <li>Data is automatically cleared upon server redeployment.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">03. Third-Party Services</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              Our demo utilizes Vapi.ai for voice synthesis and OpenAI for natural language processing. By using the demo, you acknowledge that your audio and transcriptions are processed by these secure providers according to their respective privacy standards.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-deep-blue mb-4 uppercase tracking-widest text-xs">04. Contact</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              If you have questions about how we handle data, please contact us at support@receptionistai.com.
            </p>
          </section>
        </div>
      </div>

      <footer className="py-12 border-t border-zinc-100 bg-zinc-50/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
            © 2026 ReceptionistAI — Secure. Private. Professional.
          </p>
        </div>
      </footer>
    </main>
  );
}
