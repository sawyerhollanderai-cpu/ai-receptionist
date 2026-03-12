'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

const plans = [
  {
    name: 'Starter',
    price: '99',
    period: '/mo',
    description: 'Flat rate infrastructure. Professional caller experience.',
    highlight: false,
    features: [
      '24/7 phone answering',
      'Lead capture & routing',
      'Calendar integration',
      'SMS follow-ups',
      'No long-term contracts',
      'Universal CRM Sync',
    ],
    cta: 'Activate Starter',
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_STARTER_LINK || '#',
  },
  {
    name: 'Pro',
    price: '299',
    period: '/mo',
    description: 'Scaled capacity for high-volume operations.',
    highlight: true,
    badge: 'MOST POPULAR',
    features: [
      'Infinite call capacity',
      'Bilingual system support',
      'Bespoke logic design',
      'Multi-location support',
      'White-label dashboard',
      'Direct API access',
      'Priority performance support',
    ],
    cta: 'Activate Pro Capacity',
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_PRO_LINK || '#',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-grid-white opacity-10 pointer-events-none" />
      
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
            <Link href="/pricing" className="text-sm font-medium underline underline-offset-4 font-bold">Pricing</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 text-center z-10 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 mb-8">
          <Zap className="w-3 h-3 fill-blue-500" />
          Infrastructure Capacity
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-vibrant">
          SCALABLE <span className="font-serif italic font-light lowercase tracking-normal">systems.</span><br />
          PREDICTABLE RESULTS.
        </h1>
        <p className="text-lg md:text-xl opacity-60 max-w-xl mx-auto font-medium leading-relaxed">
          Stop paying for software and start paying for <span className="text-white">booked outcomes</span>. No hidden fees. Zero friction deployment.
        </p>
      </section>

      <section className="relative z-10 w-full max-w-4xl px-6 pb-40">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`group relative bg-glass border-glass p-10 rounded-[2rem] flex flex-col transition-all duration-500 hover:scale-[1.02] ${
                plan.highlight ? 'shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]' : ''
              }`}
            >
              {plan.highlight && (
                <BorderBeam size={300} duration={12} colorFrom="#ffffff" colorTo="#3b82f6" />
              )}
              
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm opacity-50 font-medium">{plan.description}</p>
              </div>

              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tighter">${plan.price}</span>
                <span className="text-sm opacity-40 font-bold">{plan.period}</span>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={plan.stripeLink}
                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  plan.highlight
                    ? 'bg-foreground text-background hover:bg-neutral-200'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className="pb-20 opacity-30 hover:opacity-100 transition-opacity">
        <Link href="/" className="text-sm font-bold tracking-tight flex items-center gap-2">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Base
        </Link>
      </div>
    </main>
  );
}
