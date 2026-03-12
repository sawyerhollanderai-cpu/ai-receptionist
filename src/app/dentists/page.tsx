'use client';

import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

export default function DentistsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-6 w-[90%] max-w-5xl z-50">
        <div className="bg-glass border-glass px-8 h-16 rounded-2xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-xs">RA</span>
            </div>
            <span className="text-lg font-bold tracking-tight">ReceptionistAI</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Home</Link>
            <Link href="/pricing" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Pricing</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 text-center z-10 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-500 mb-8">
          <Zap className="w-3 h-3 fill-blue-500" />
          Dental Operations Layer
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-vibrant">
          FILL <span className="font-serif italic font-light lowercase tracking-normal">every</span><br />DENTAL CHAIR.
        </h1>
        <p className="text-lg md:text-2xl opacity-60 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          Dental practices lose 30% of new patient calls to voicemail. Our system answers <span className="text-white">instantly</span> and handles scheduling 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a href="tel:+18604071305" className="px-12 py-5 bg-white text-black font-black rounded-full text-sm hover:scale-[1.05] transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            <Phone className="w-4 h-4" /> Call Dental Demo
          </a>
          <Link href="/pricing" className="px-12 py-5 bg-glass border-glass text-white font-black rounded-full text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            View Capacity Tiers
          </Link>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 w-full max-w-6xl px-6 pb-40 grid lg:grid-cols-2 gap-12 items-center">
        <div className="bg-glass border-glass rounded-[2.5rem] p-10 relative overflow-hidden group">
          <BorderBeam size={200} duration={10} colorFrom="#ffffff" colorTo="#3b82f6" />
          <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-6">Automation Logic</h3>
          <div className="space-y-6">
            {[
              { role: 'System', text: 'Hi, this is Dr. Smith\'s dental office. How can I help you today?' },
              { role: 'Patient', text: 'Do you guys do teeth whitening?' },
              { role: 'System', text: 'Yes, we do! We offer Zoom whitening which takes about an hour. Would you like to check our availability for a consultation?' },
            ].map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'Patient' ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">{msg.role}</span>
                <div className={`px-5 py-3 rounded-2xl text-sm font-medium ${
                  msg.role === 'Patient' ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20' : 'bg-white/5 border border-white/10 opacity-70'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <div className="reveal">
            <h3 className="text-2xl font-bold tracking-tight mb-4">Patient Acquisition Engine</h3>
            <p className="opacity-50 font-medium">The system acts as a high-performance intake layer, ensuring no new patient opportunities are missed while your staff focuses on in-office care.</p>
          </div>
          <div className="reveal">
            <h3 className="text-2xl font-bold tracking-tight mb-4">Insurance & Pricing Logic</h3>
            <p className="opacity-50 font-medium">Pre-load your common procedures and insurance providers. The system answers basic inquiries instantly to reduce friction.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-secondary border border-border rounded-2xl">
              <p className="text-3xl font-black tracking-tighter mb-1">30%</p>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Avg. Call Leakage</p>
            </div>
            <div className="p-6 bg-secondary border border-border rounded-2xl">
              <p className="text-3xl font-black tracking-tighter mb-1">1s</p>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Response Time</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 w-full flex justify-center">
        <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.2em]">
          © 2026 RECEPTIONISTAI SYSTEM — DENTAL SOLUTIONS
        </p>
      </footer>
    </main>
  );
}
