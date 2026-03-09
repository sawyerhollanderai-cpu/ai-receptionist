'use client';

import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LawyersPage() {
  return (
    <main className="min-h-screen bg-[#FCFBF9] text-[#1C1917]">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-white/90 backdrop-blur-md h-16 px-8 rounded-lg flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-slate-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">RA</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">ReceptionistAI</span>
          </Link>
          <a href="#book" className="hidden md:flex px-5 py-2.5 bg-slate-900 text-white text-[13px] font-bold rounded-xl hover:bg-slate-800 transition-all">
            Get Started
          </a>
        </div>
      </nav>

      <section className="pt-40 pb-24 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-lg text-amber-700 text-xs font-bold uppercase tracking-widest mb-6">
              ⚖️ Built for Law Firms
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter mb-6">
              Convert More<br />
              <span className="text-amber-600">Legal Leads</span><br />
              Around the Clock.
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8 max-w-md">
              When a potential client calls at 9pm after an accident, they don&apos;t leave a voicemail — they call the next firm. ReceptionistAI captures every lead with empathetic, compliant intake.
            </p>
            <div className="space-y-4 mb-10">
              {[
                'Empathetic intake — never gives legal advice',
                'Captures name, phone, and case details instantly',
                'Free consultation booking with attorney calendar',
                '24/7 coverage including weekends and holidays',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+18604071305" className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl text-sm hover:bg-slate-800 transition-all">
                <Phone className="w-4 h-4" /> Try the Legal Demo
              </a>
              <Link href="/#book" className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl text-sm hover:bg-slate-50 transition-all">
                Book a Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Sample Conversation</p>
            <div className="space-y-4">
              {[
                { role: 'ai', text: 'Hi there, this is Sarah with Guardian Law. How can I help you today?' },
                { role: 'user', text: 'I was in a car accident last week and I\'m not sure what to do.' },
                { role: 'ai', text: 'I\'m so sorry to hear that. I completely understand — that must be really stressful. All of our initial consultations are completely free and confidential.' },
                { role: 'user', text: 'That\'s good to know. What do I need to do?' },
                { role: 'ai', text: 'I can get you on the schedule to speak with one of our attorneys right now. Can I grab your name and the best number to reach you?' },
              ].map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm font-medium ${
                    msg.role === 'user' 
                      ? 'bg-amber-600 text-white rounded-br-md' 
                      : 'bg-slate-100 text-slate-700 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center bg-white border-t border-slate-100">
        <Link href="/" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
          ← Back to ReceptionistAI Home
        </Link>
      </footer>
    </main>
  );
}
