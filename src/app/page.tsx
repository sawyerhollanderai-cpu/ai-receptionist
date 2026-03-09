'use client';

import { cn } from '@/components/VapiButton';
import { CheckCircle2, Phone, ArrowRight, X, Send, Loader2, BarChart2, Users, Zap, MessageSquare, Calendar } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { InlineWidget } from 'react-calendly';

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
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));

    // Stats counter
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated.current) {
            statsAnimated.current = true;
            animateCount(setCount1, 128, 1200);
            animateCount(setCount2, 342, 1500);
            animateCount(setCount3, 12400, 2000);
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
      const eased = 1 - Math.pow(1 - progress, 3);
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
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-white/90 backdrop-blur-md h-16 px-8 rounded-lg flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">RA</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">ReceptionistAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">Features</a>
            <a href="#demo" className="text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">Live Demo</a>
            <a href="#book" className="text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">Book a Call</a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="demo" className="pt-40 pb-24 max-w-7xl mx-auto px-6 scroll-mt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-600 text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-lg bg-blue-600 animate-pulse" />
              AI Receptionist — 24/7
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-8">
              Never Miss<br />
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600">Another Call.</span>
                <svg className="absolute w-[110%] h-auto -bottom-2 -left-2 z-0 text-blue-200" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 15C50 5 150 2 195 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 18C60 12 140 8 185 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-lg">
              ReceptionistAI picks up every call, books appointments, and qualifies leads — automatically. Try it now.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#book"
                className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl text-sm hover:bg-slate-800 transition-all shadow-soft hover:-translate-y-0.5"
              >
                Book a Strategy Call <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right — Live Demo CTA card */}
          <div className="reveal-right relative">
            {/* Organic Floating Tag */}
            <div className="absolute -top-6 -left-6 bg-white border-2 border-slate-900 text-slate-900 font-bold px-4 py-2 rounded-2xl -rotate-6 shadow-soft z-20 flex items-center gap-2">
              <span className="text-xl">👋</span> Hey, I&apos;m Sarah
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center min-h-[300px] text-center shadow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -translate-y-10 translate-x-10" />
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-black text-slate-900 tracking-tight mb-2 relative z-10">Try the Demo Call</p>
              <p className="text-slate-500 font-medium mb-8 relative z-10">Call now to hear our AI receptionist in action.</p>
              <a 
                href="tel:+18604071305"
                className="w-full py-5 bg-slate-900 text-white font-black text-lg rounded-2xl shadow-soft hover:bg-slate-800 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3 relative z-10"
              >
                <Phone className="w-5 h-5" />
                +1 (860) 407-1305
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Phone Mockup + Numbered Features ── */}
      <section id="features" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-4">The Platform</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">One AI. Every Channel.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_1fr] gap-12 items-center">
            {/* Left Features */}
            <div className="flex flex-col gap-16">
              <div className="reveal-left" style={{ transitionDelay: '0ms' }}>
                <p className="text-blue-600 text-sm font-black mb-3">01.</p>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Capture Every Missed Call</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Captures missed phone calls 24/7, even outside regular business hours. Never lose a lead to a competitor just because you were unavailable.
                </p>
              </div>
              <div className="reveal-left" style={{ transitionDelay: '100ms' }}>
                <p className="text-blue-600 text-sm font-black mb-3">03.</p>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Analyze Leads Automatically</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Sarah gathers caller intent, categorizes urgency levels, and delivers concise summaries directly to your CRM dashboard.
                </p>
              </div>
            </div>

            {/* Center — Phone Mockup */}
            <div className="flex justify-center reveal">
              <div className="relative w-[240px] h-[480px]">
                {/* Phone frame */}
                <div className="absolute inset-0 rounded-lg bg-slate-900 shadow-2xl shadow-slate-900/50" />
                {/* Screen */}
                <div className="absolute inset-[6px] rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex flex-col items-center pt-12 px-4">
                  {/* Notch */}
                  <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-2xl" />
                  {/* Business Icon */}
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-3 mt-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                      <span className="text-slate-900 font-black text-base">RA</span>
                    </div>
                  </div>
                  <p className="text-white font-bold text-center text-sm leading-tight">ReceptionistAI</p>
                  <p className="text-white/60 text-xs font-semibold mt-1 uppercase tracking-widest">CALLING</p>

                  {/* Animated waveform */}
                  <div className="flex items-center gap-[3px] mt-8 h-12">
                    {[20, 32, 48, 56, 48, 64, 48, 56, 48, 32, 20].map((h, i) => (
                      <div
                        key={i}
                        className="wave-bar bg-white/70 rounded-lg"
                        style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Bottom actions */}
                  <div className="absolute bottom-12 w-full px-8">
                    <div className="flex justify-around mb-6">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white/70 text-[9px] font-semibold">Schedule</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white/70 text-[9px] font-semibold">Message</span>
                      </div>
                    </div>
                    {/* Swipe answer */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg py-3 px-6 flex items-center justify-center gap-2 border border-white/30">
                      <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                        <Phone className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-white text-xs font-bold">Swipe to answer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Features */}
            <div className="flex flex-col gap-16">
              <div className="reveal-right" style={{ transitionDelay: '0ms' }}>
                <p className="text-blue-600 text-sm font-black mb-3">02.</p>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Turn Calls into Bookings</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Sarah texts callers with your custom booking link, effectively converting every missed call into scheduled revenue.
                </p>
              </div>
              <div className="reveal-right" style={{ transitionDelay: '100ms' }}>
                <p className="text-blue-600 text-sm font-black mb-3">04.</p>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Upsell and Follow Up</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Automated SMS follow-ups re-engage past callers, offer promotions, and create new revenue opportunities passively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Demo CTA ── */}
      <section className="py-32 bg-white border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center reveal">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-10">Call our live demo</h2>
          <a
            href="tel:+18604071305"
            className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white font-black text-xl rounded-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="w-5 h-5" />
            +1 (860) 407-1305
          </a>
          <p className="text-slate-400 font-medium mt-8 text-base">
            Experience firsthand how Sarah handles your incoming calls.
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-soft">
            {[
              {
                quote: "It has ",
                highlight: "completely transformed our front desk.",
                suffix: " Our admin team finally has time to focus on what matters.",
                author: "Tiffany Hurd",
                role: "Operations Manager"
              },
              {
                quote: "The phones used to ring all day long. Now we go hours without hearing the landline. It's a ",
                highlight: "completely different work atmosphere.",
                suffix: "",
                author: "Todd Dusenberry",
                role: "Owner"
              },
              {
                quote: "6,500 clients handled around the clock. Our AI receptionist ",
                highlight: "never sleeps.",
                suffix: "",
                author: "Samson Properties",
                role: "Enterprise Client"
              }
            ].map((t, i) => (
              <div key={i} className="reveal bg-white p-10" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="text-base text-slate-600 leading-relaxed mb-8">
                  &ldquo;{t.quote}<span className="text-blue-600 font-semibold">{t.highlight}</span>{t.suffix}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.author}</p>
                  <p className="text-xs text-slate-400 font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bento Grid: "The AI Workforce that Never Sleeps" ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-4">The AI Workforce</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">That Never Sleeps</h2>
            <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
              Capture tasks and appointments 24/7, even outside business hours. Set it up in minutes, keep your existing number.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: AI Chat */}
            <div className="reveal-left bg-white border border-slate-200 rounded-2xl p-8 min-h-[360px] flex flex-col justify-between overflow-hidden shadow-soft">
              <div>
                {/* Chat bubble */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg rounded-tl-sm px-5 py-4 max-w-[260px] mb-4">
                  <p className="text-slate-900 font-semibold text-sm leading-relaxed">Hi there! I&apos;m Sarah, your AI receptionist. How can I help today?</p>
                </div>
                {/* Waveform */}
                <div className="flex items-end gap-[3px] pl-2 h-10 mt-4">
                  {[12, 20, 32, 24, 40, 32, 24, 40, 32, 20, 28, 16, 24, 32, 20].map((h, i) => (
                    <div
                      key={i}
                      className="wave-bar bg-slate-300 rounded-sm"
                      style={{ height: `${h}px`, animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-2">AI Receptionist Tailored to Your Business</h3>
                <p className="text-slate-500 font-medium text-sm">Fully trained on your business information and services to answer complex questions from callers.</p>
              </div>
            </div>

            {/* Card 2: Sends Texts */}
            <div className="reveal-right bg-slate-900 rounded-2xl p-8 min-h-[360px] flex flex-col justify-between overflow-hidden shadow-soft">
              <div>
                {/* Play + Waveform */}
                <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-lg px-5 py-3 w-fit mb-4">
                  <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center flex-shrink-0">
                    <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] border-t-transparent border-b-transparent border-l-slate-900 ml-0.5" />
                  </div>
                  <div className="flex items-end gap-[2px] h-6">
                    {[8, 14, 20, 16, 24, 20, 14, 20, 16, 12].map((h, i) => (
                      <div
                        key={i}
                        className="wave-bar bg-white/60 rounded-sm"
                        style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
                {/* SMS bubble */}
                <div className="bg-white/10 border border-white/10 rounded-lg rounded-tl-sm px-5 py-4 max-w-[280px]">
                  <p className="text-white font-semibold text-sm leading-relaxed">Any time to set up an appointment — when would be a good time?</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">Sends Texts and Schedules Appointments</h3>
                <p className="text-white/50 font-medium text-sm">Sarah automatically texts callers to reduce friction and turn every lead into a booked appointment.</p>
              </div>
            </div>

            {/* Card 3: Build */}
            <div className="reveal-left bg-slate-50 border border-slate-200 rounded-2xl p-8 min-h-[300px] flex flex-col justify-between items-center overflow-hidden shadow-soft">
              <div className="flex-1 flex items-center justify-center w-full">
                <div className="w-20 h-20 bg-slate-900 rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
                  <span className="text-white font-black text-2xl tracking-tighter">RA</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-black text-slate-900 mb-2">Build and Train in Minutes</h3>
                <p className="text-slate-500 font-medium text-sm">Create a fully trained AI receptionist from scratch in minutes. No code required.</p>
              </div>
            </div>

            {/* Card 4: Analytics Dashboard */}
            <div ref={statsRef} className="reveal-right bg-white border border-slate-100 rounded-2xl p-8 min-h-[300px] flex flex-col justify-between overflow-hidden shadow-soft">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">Sarah</p>
                    <p className="text-slate-400 text-xs">AI Receptionist</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">Live</span>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-2xl font-black text-slate-900">{count1}<span className="text-slate-300 text-sm font-bold ml-1">+12</span></p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calls Handled</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{count2}<span className="text-slate-300 text-sm font-bold ml-1">+28</span></p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Texts Sent</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">${(count3 / 1000).toFixed(1)}k</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</p>
                </div>
              </div>

              {/* Bar Chart */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Leads Conversion</p>
                <div className="flex items-end gap-2 h-16">
                  {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md bg-blue-100 relative overflow-hidden group">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-md transition-all duration-1000 ease-out"
                        style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-black text-slate-900 mb-1">Advanced Analytics</h3>
                <p className="text-slate-500 font-medium text-sm">Track conversion rates, bookings and revenue generated by your AI receptionist in real time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CRM Integration (Lavender card style) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
              Seamless Integration<br />with Leading CRMs
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-lg mx-auto mb-10">
              Use ReceptionistAI&apos;s built-in CRM, or plug into an existing platform. Deep API integrations work out of the box.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#book" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 hover:scale-[1.02]">
                Build My Receptionist
              </a>
              <button onClick={() => setIsContactOpen(true)} className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-lg text-sm hover:bg-slate-50 transition-all">
                Contact Sales
              </button>
            </div>
          </div>

          {/* Integration card */}
          <div className="reveal bg-slate-50 border border-slate-200 rounded-2xl p-8 overflow-hidden shadow-soft">
            <div className="bg-white rounded-2xl p-12 border border-slate-100 flex flex-col items-center justify-center min-h-[280px] gap-8">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center">
                <span className="text-white font-black text-2xl">RA</span>
              </div>
              {/* Integration logos row */}
              <div className="flex items-center gap-4 flex-wrap justify-center">
                {['Salesforce', 'HubSpot', 'GoHighLevel', 'Zoho', 'Pipedrive'].map((crm, i) => (
                  <div key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-xs font-black text-slate-600">{crm}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">+ 50 more integrations</span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking Section ── */}
      <section id="book" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 md:p-24 grid lg:grid-cols-2 gap-20 items-start">
            <div className="reveal-left">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Strategy Call</p>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
                Schedule your<br />
                <span className="text-blue-600">strategy call.</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-md font-medium">
                Ready to deploy your AI workforce? Book a time to build your technical blueprint with our team.
              </p>
              <div className="space-y-6">
                {["15-Minute Technical Blueprint", "Custom Persona Workshop", "Live Deployment Support"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-900">
                    <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Functional Calendly Embed */}
            <div className="reveal-right">
              <div className="rounded-2xl overflow-hidden shadow-soft border border-slate-200 bg-white">
                <InlineWidget 
                  url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com"}
                  styles={{ height: '650px', width: '100%' }}
                  pageSettings={{
                    hideLandingPageDetails: true,
                    hideEventTypeDetails: false,
                    primaryColor: '1e293b',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Stop losing leads<br />
            <span className="text-white/30">to voicemail.</span>
          </h2>
          <p className="text-white/60 text-xl font-medium mb-12">
            Join elite businesses using ReceptionistAI to capture every opportunity, automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#book" className="px-10 py-5 bg-white text-slate-900 font-black rounded-lg text-sm hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              Book Your Demo <ArrowRight className="w-4 h-4" />
            </a>
            <a href="tel:+18604071305" className="px-10 py-5 border border-white/20 text-white font-black rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl tracking-tighter">RA</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">ReceptionistAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#book" className="px-8 py-4 bg-slate-900 text-white rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-soft">
              Schedule Your Demo
            </Link>
          </div>
          <div className="flex gap-10 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/security" className="hover:text-slate-900 transition-colors">Security</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
          </div>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            © 2026 ReceptionistAI — Automated Front Desk
          </p>
        </div>
      </footer>

      {/* ── Contact Modal ── */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsContactOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 p-10 md:p-12 animate-fade-in-up">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 bg-green-600 rounded-lg flex items-center justify-center text-white">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 font-medium">Sarah will notify us immediately. Talk soon!</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-10 text-center">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">Send a Message</h3>
                  <p className="text-slate-500 font-medium">How can Sarah help your business?</p>
                </div>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Enter your name' },
                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'hello@example.com' },
                  ].map(f => (
                    <div key={f.key} className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">{f.label}</label>
                      <input
                        required
                        type={f.type}
                        value={formData[f.key as keyof typeof formData]}
                        onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-sm"
                      />
                    </div>
                  ))}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Your Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      placeholder="Tell us about your business..."
                      className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium resize-none text-sm"
                    />
                  </div>
                  {formError && <p className="text-red-500 text-xs font-bold text-center">{formError}</p>}
                  <button
                    disabled={isSubmitting}
                    className="w-full py-5 bg-slate-900 text-white rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
