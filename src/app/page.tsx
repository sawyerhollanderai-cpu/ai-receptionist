'use client';

import { CheckCircle2, Phone, ArrowRight, X, Send, Loader2, BarChart2, Zap, MessageSquare, Calendar } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { InlineWidget } from 'react-calendly';
import { Marquee } from '@/components/ui/marquee';
import { BorderBeam } from '@/components/ui/border-beam';

export default function Home() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsAnimated = useRef(false);

  useEffect(() => {
    let id = localStorage.getItem('receptionist_visitor_id');
    if (!id) {
      id = `vis_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
      localStorage.setItem('receptionist_visitor_id', id);
    }
    setVisitorId(id);

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Stats counter
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated.current) {
            statsAnimated.current = true;
            animateCount(setCount1, 850, 1500);
            animateCount(setCount2, 2400, 1500);
            animateCount(setCount3, 12000, 2000);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  function animateCount(setter: (v: number) => void, target: number, duration: number) {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setter(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, visitorId }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => { setIsSubmitted(false); setIsContactOpen(false); }, 3000);
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/10 selection:text-white">

      {/* ── Fixed Navigation ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-glass border-glass h-16 px-8 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-xs">RA</span>
            </div>
            <span className="text-lg font-bold tracking-tight">ReceptionistAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Home</Link>
            <Link href="/pricing" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Pricing</Link>
            <a href="#book" className="px-5 py-2.5 bg-foreground text-background text-xs font-bold rounded-xl hover:bg-neutral-200 transition-all">
              Try Demo
            </a>
          </div>
        </div>
      </nav>

      {/* ── Centered Hero ── */}
      <section className="relative pt-60 pb-32 flex flex-col items-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="reveal flex flex-col items-center max-w-5xl z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 mb-10 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            V3.0 Infrastructure Live
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8 text-vibrant">
            NEVER MISS<br />
            <span className="font-serif italic font-light tracking-normal lowercase">another</span> CALL.
          </h1>
          
          <p className="text-lg md:text-2xl opacity-60 max-w-2xl font-medium leading-relaxed mb-12">
            The high-performance layer for <span className="text-white">automated intake</span>. Our system answers 24/7, qualifies leads, and schedules bookings onto your calendar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <a href="#book" className="px-12 py-5 bg-foreground text-background font-black rounded-full text-sm hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              Deploy Your System <ArrowRight className="w-4 h-4" />
            </a>
            <a href="tel:+18604071305" className="px-12 py-5 bg-glass border-glass text-white font-black rounded-full text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 opacity-50" /> Live Demo
            </a>
          </div>
        </div>

        {/* Floating Demo Card */}
        <div className="reveal mt-32 w-full max-w-4xl relative">
          <div className="bg-glass border-glass rounded-[2.5rem] p-12 overflow-hidden group">
            <BorderBeam size={300} duration={14} colorFrom="#ffffff" colorTo="#3b82f6" />
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="text-left space-y-6">
                <div className="w-12 h-12 bg-foreground rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-background" />
                </div>
                <h3 className="text-4xl font-bold tracking-tight">Interactive Voice Demo</h3>
                <p className="opacity-50 text-lg font-medium">Experience the speed and logic of our conversational system. Dial the number on the right to interact with a live instance.</p>
              </div>
              <div className="bg-background/50 border border-white/5 rounded-3xl p-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mb-6 animate-pulse border border-white/10">
                  <Phone className="w-8 h-8 opacity-70" />
                </div>
                <p className="text-2xl font-bold mb-4">+1 (860) 407-1305</p>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">System Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento Grid Section ── */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
        <div className="text-center mb-24 reveal">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6">Autonomous Operations</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            Engineered for <span className="font-serif italic font-normal">absolute</span> scale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Large Card 1 */}
          <div className="reveal md:col-span-2 bg-glass border-glass rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full" />
            <div className="space-y-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                <BarChart2 className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Conversion-First Logic</h3>
              <p className="opacity-50 max-w-md font-medium">Our system doesn&apos;t just answer. It converts. It handles complex objections and proactively guides callers toward a booking.</p>
            </div>
            <div ref={statsRef} className="flex gap-12 border-t border-white/5 pt-10">
               <div>
                  <p className="text-3xl font-black tracking-tighter">{(count3/1000).toFixed(1)}k+</p>
                  <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mt-1">Revenue Captured</p>
               </div>
               <div>
                  <p className="text-3xl font-black tracking-tighter">{count2}</p>
                  <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mt-1">Active Accounts</p>
               </div>
            </div>
          </div>

          {/* Small Card 1 */}
          <div className="reveal bg-glass border-glass rounded-3xl p-10 flex flex-col justify-between group">
            <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-background" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Automated Scheduling</h3>
              <p className="opacity-50 text-sm font-medium">Deep integration with your existing calendars.</p>
            </div>
          </div>

          {/* Small Card 2 */}
          <div className="reveal bg-glass border-glass rounded-3xl p-10 flex flex-col justify-between group">
            <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center border border-white/10">
              <MessageSquare className="w-5 h-5 opacity-70" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">SMS Follow-up</h3>
              <p className="opacity-50 text-sm font-medium">Automated text engagement for higher retention.</p>
            </div>
          </div>

          {/* Large Card 2 */}
          <div className="reveal md:col-span-2 bg-[#1C1C1C] border-glass rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-white opacity-5" />
            <div className="relative z-10 space-y-4">
               <h3 className="text-3xl font-bold tracking-tight text-white">Universal Integration</h3>
               <p className="text-white/40 max-w-md font-medium">Sync with Salesforce, HubSpot, or GoHighLevel out of the box. Custom API support for enterprise workloads.</p>
            </div>
            <div className="relative z-10 py-6">
              <Marquee className="[--duration:30s] opacity-30">
                {['Salesforce', 'HubSpot', 'GoHighLevel', 'Zoho', 'Pipedrive', 'Clio', 'Zapier'].map((crm, i) => (
                  <div key={i} className="px-6 py-2 border border-white/10 bg-white/5 rounded-lg mx-3">
                    <span className="text-xs font-black text-white">{crm}</span>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section id="book" className="py-40 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <div className="reveal bg-glass border-glass text-white rounded-[3rem] p-12 md:p-20 grid lg:grid-cols-2 gap-20 items-center w-full relative overflow-hidden">
          <BorderBeam size={400} duration={15} colorFrom="#ffffff" colorTo="#3b82f6" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-400 mb-8">
              System Configuration
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
              DEPLOY THE<br />
              <span className="font-serif italic font-normal text-vibrant">Engine.</span>
            </h2>
            <p className="text-lg opacity-60 font-medium max-w-md leading-relaxed mb-10">
              Ready to automate your intake? Schedule a 15-minute technical audit to align your logic flows and activate the system.
            </p>
            <div className="space-y-4">
              {["15-Minute Blueprint", "Logic-Flow Architecture", "Live Deployment Strategy"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 rounded-2xl overflow-hidden border border-white/5 bg-black/40 shadow-2xl">
            <InlineWidget 
              url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/ai-business-strategies/15min"}
              styles={{ height: '650px', width: '100%' }}
              pageSettings={{
                hideLandingPageDetails: true,
                hideEventTypeDetails: true,
                backgroundColor: '000000',
                textColor: 'ffffff',
                primaryColor: '#3b82f6',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Compact Footer ── */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-xs">RA</span>
            </div>
            <span className="text-lg font-bold tracking-tight">ReceptionistAI</span>
          </div>
          <div className="flex gap-10 opacity-40 hover:opacity-100 transition-opacity">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest hover:text-white">Terms</Link>
            <Link href="/security" className="text-[10px] font-black uppercase tracking-widest hover:text-white">Security</Link>
          </div>
          <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.2em]">© 2026 RECEPTIONISTAI SYSTEM</p>
        </div>
      </footer>

    </main>
  );
}
