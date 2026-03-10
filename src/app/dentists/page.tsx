'use client';

import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

export default function DentistsPage() {
  return (
    <main className="min-h-screen bg-[#FCFBF9] text-[#1C1917]">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-white/90 backdrop-blur-md h-16 px-8 rounded-lg flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-slate-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1C1917] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">RA</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1C1917]">ReceptionistAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[13px] font-semibold text-slate-500 hover:text-[#1C1917] transition-colors">Home</Link>
            <div className="group relative">
              <button className="text-[13px] font-semibold text-slate-500 group-hover:text-[#1C1917] transition-colors flex items-center gap-1">
                Solutions <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-2 w-48 overflow-hidden">
                  <Link href="/dentists" className="block px-4 py-2.5 text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-all">🦷 Dentists</Link>
                  <Link href="/lawyers" className="block px-4 py-2.5 text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-amber-600 rounded-lg transition-all">⚖️ Lawyers</Link>
                  <Link href="/realestate" className="block px-4 py-2.5 text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 rounded-lg transition-all">🏡 Real Estate</Link>
                </div>
              </div>
            </div>
            <Link href="/pricing" className="text-[13px] font-semibold text-slate-500 hover:text-[#1C1917] transition-colors">Pricing</Link>
            <a href="/#book" className="px-5 py-2.5 bg-[#1C1917] text-white text-[13px] font-bold rounded-xl hover:bg-slate-800 transition-all">
              Try Demo
            </a>
          </div>
        </div>
      </nav>

      <section className="pt-40 pb-24 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
              🦷 Built for Dental Practices
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#1C1917] leading-tight tracking-tighter mb-6">
              Stop Losing<br />
              <span className="text-blue-600">New Patients</span><br />
              to Voicemail.
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8 max-w-md">
              Dental practices lose 30% of new patient calls. ReceptionistAI answers every call instantly — 24/7 — books cleanings, handles insurance questions, and fills your chair schedule.
            </p>
            <div className="space-y-4 mb-10">
              {[
                'Answers insurance & pricing questions automatically',
                'Books cleanings, whitening, and Invisalign consults',
                'Sends SMS follow-up with booking link after every call',
                'Speaks English & Spanish fluently',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-[#1C1917]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+18604071305" className="flex items-center gap-2 px-8 py-4 bg-[#1C1917] text-white font-bold rounded-2xl text-sm hover:bg-slate-800 transition-all shadow-soft">
                <Phone className="w-4 h-4" /> Try the Dental Demo
              </a>
              <Link href="/#book" className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-[#1C1917] font-bold rounded-2xl text-sm hover:bg-slate-50 transition-all">
                Book a Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Sample Conversation</p>
            <div className="space-y-4">
              {[
                { role: 'ai', text: 'Hi there! This is Sarah from Dr. Smith Dental. How can I help you today?' },
                { role: 'user', text: 'Do you guys do teeth whitening?' },
                { role: 'ai', text: 'We absolutely do! We use the Zoom method which is about $300. I can get you on the calendar for a consultation right now if you\'d like?' },
                { role: 'user', text: 'That sounds great, yeah!' },
                { role: 'ai', text: 'Perfect! Can I grab your name and a good number to reach you?' },
              ].map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm font-medium ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-md' 
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

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-4">Why Dental Practices Choose Us</h2>
          <p className="text-slate-500 font-medium mb-12 max-w-lg mx-auto">Every missed call is a lost patient worth $500+ in lifetime value.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '30%', label: 'Of new patient calls go unanswered', sub: 'Industry average' },
              { stat: '$500+', label: 'Lifetime value per patient', sub: 'You\'re losing this per missed call' },
              { stat: '< 1s', label: 'Answer time with ReceptionistAI', sub: 'Every call, instantly' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
                <h3 className="text-4xl font-black text-slate-900 mb-2">{item.stat}</h3>
                <p className="text-sm font-bold text-slate-900 mb-1">{item.label}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-[#1C1917] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl tracking-tighter">RA</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-[#1C1917]">ReceptionistAI</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl py-12 border-y border-slate-100 text-left">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product</span>
              <Link href="/#features" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Features</Link>
              <Link href="/pricing" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Pricing</Link>
              <Link href="/demo-generator" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Demo Generator</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Solutions</span>
              <Link href="/dentists" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">For Dentists</Link>
              <Link href="/lawyers" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">For Lawyers</Link>
              <Link href="/realestate" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">For Real Estate</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Support</span>
              <Link href="/security" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Security</Link>
              <Link href="/privacy" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Privacy</Link>
              <Link href="/terms" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Terms</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call Us</span>
              <a href="tel:+18604071305" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">+1 (860) 407-1305</a>
            </div>
          </div>

          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            © 2026 ReceptionistAI — Automated Front Desk
          </p>
        </div>
      </footer>
    </main>
  );
}
