'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight, Phone, Zap, Shield, Clock, ChevronDown } from 'lucide-react';

const plans = [
  {
    name: 'Infrastructure',
    price: '199',
    period: '/mo',
    description: 'Perfect for established local shops',
    highlight: false,
    features: [
      'Full 24/7 AI receptionist',
      'Custom Sarah Persona & Training',
      'Lead capture & CRM sync',
      'Appointment booking integration',
      'SMS follow-up automation',
      'Cancel anytime — No long contracts',
    ],
    cta: 'Select Infrastructure',
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_STARTER_LINK || '#',
  },
  {
    name: 'Performance',
    price: '0',
    period: ' /setup',
    description: 'Pay Only for Results',
    highlight: true,
    badge: 'MOST POPULAR',
    features: [
      '$25 per booked appointment',
      'Full 24/7 Sarah Deployment',
      'Infinite lead capacity',
      'Bilingual Support (EN/ES)',
      'Direct API integration',
      'Dedicated scaling manager',
    ],
    cta: 'Start with Performance',
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_PRO_LINK || '#',
  },
  {
    name: 'Scale',
    price: '499',
    period: '/mo',
    description: 'Lowest cost for high volume',
    highlight: false,
    features: [
      '$15 per booked appointment',
      'Everything in Performance',
      'Multiple location support',
      'White-label portal for your staff',
      'Advanced conversion analytics',
      'Priority Sarah persona training',
    ],
    cta: 'Scale My Agency',
    stripeLink: process.env.NEXT_PUBLIC_CALENDLY_URL || '#',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#FCFBF9] text-[#1C1917]">
      {/* Nav */}
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
            <Link href="/pricing" className="text-[13px] font-semibold text-[#1C1917] transition-colors">Pricing</Link>
            <a href="/#book" className="px-5 py-2.5 bg-[#1C1917] text-white text-[13px] font-bold rounded-xl hover:bg-slate-800 transition-all">
              Try Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-8 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6">
          <Zap className="w-3 h-3" /> Simple Pricing
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter mb-4">
          Stop Paying for<br />Missed Calls.
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto mb-4">
          Every plan includes a custom AI receptionist trained on your business. No setup fees. Cancel anytime.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl border p-8 flex flex-col ${
                plan.highlight
                  ? 'border-slate-900 shadow-[0_8px_40px_rgba(0,0,0,0.12)] scale-[1.02]'
                  : 'border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-black text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-400 font-medium">{plan.description}</p>
              </div>

              <div className="mb-8">
                {plan.price === 'Custom' ? (
                  <span className="text-4xl font-black text-slate-900">Custom</span>
                ) : (
                  <>
                    <span className="text-sm font-bold text-slate-400 align-top">$</span>
                    <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-sm font-bold text-slate-400">{plan.period}</span>
                  </>
                )}
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={plan.stripeLink}
                target={plan.price !== 'Custom' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  plan.highlight
                    ? 'bg-[#1C1917] text-white hover:bg-slate-800'
                    : 'bg-white border border-slate-200 text-[#1C1917] hover:bg-slate-50'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-5xl py-12 border-y border-slate-100">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product</span>
              <Link href="/#features" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Features</Link>
              <Link href="/pricing" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Pricing</Link>
            </div>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Support</span>
              <Link href="/security" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Security</Link>
              <Link href="/privacy" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Privacy</Link>
              <Link href="/terms" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">Terms</Link>
            </div>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Demo</span>
              <a href="tel:+18604071305" className="text-xs font-bold text-slate-500 hover:text-[#1C1917]">+1 (860) 407-1305</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-slate-100">
        <Link href="/" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
          ← Back to ReceptionistAI
        </Link>
      </footer>
    </main>
  );
}
