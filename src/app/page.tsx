'use client';

import VapiButton, { cn } from '@/components/VapiButton';
import { Activity, Clock, CheckCircle2, User, Phone, ShieldCheck, CalendarCheck, ArrowRight, X, Send, Loader2, Gauge, Zap, TrendingUp, Building2, Globe, Database } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [leads, setLeads] = useState<any[]>([]);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  
  // Contact Form State
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    // Generate or retrieve visitor ID
    let id = localStorage.getItem('receptionist_visitor_id');
    if (!id) {
      id = `vis_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
      localStorage.setItem('receptionist_visitor_id', id);
    }
    setVisitorId(id);

    const fetchLeads = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/leads?visitorId=${id}`);
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error('Failed to fetch leads:', err);
      }
    };

    fetchLeads();
    const interval = setInterval(fetchLeads, 4000); // Poll every 4 seconds
    return () => clearInterval(interval);
  }, []);

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
      setTimeout(() => {
        setIsSubmitted(false);
        setIsContactOpen(false);
      }, 3000);
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen minimal-bg text-zinc-900 selection:bg-deep-blue/10 selection:text-white">
      {/* Navigation */}

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="glass h-16 px-8 rounded-2xl flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.05)] border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-deep-blue rounded-xl flex items-center justify-center shadow-lg shadow-deep-blue/20">
              <span className="text-white font-bold text-sm tracking-tighter">RA</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-deep-blue">ReceptionistAI</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[13px] font-semibold text-zinc-500 uppercase tracking-widest">
            <a href="#book" className="hover:text-deep-blue transition-all">Book a Demo</a>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-2.5 bg-deep-blue text-white rounded-xl hover:bg-zinc-800 transition-all shadow-md shadow-deep-blue/10 active:scale-95 flex items-center gap-2"
            >
              Message Us
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-48 pb-32">
        {/* Cinematic Hero */}
        <section id="demo" className="max-w-6xl mx-auto px-6 mb-24 flex flex-col items-center scroll-mt-48">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-sm mb-10">
            24/7 Virtual Receptionist
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-center mb-10 leading-[0.95] max-w-4xl text-deep-blue">
            Go live with AI <br /> 
            in just 5 minutes.
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 text-center max-w-2xl mb-16 leading-relaxed font-medium">
            The world's fastest way to automate your front-desk, qualify leads, and scale your business with zero-latency voice.
          </p>

          {/* Core Demo Section */}
          <div className="relative w-full max-w-3xl flex justify-center">
            <div className="w-full bg-white border border-slate-200 rounded-[2rem] p-16 shadow-lg relative overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-1 w-16 bg-slate-100 rounded-full" />
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Live Browser Demo</h2>
                </div>
                
                <VapiButton visitorId={visitorId} />
                
                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-4 group-hover:bg-slate-100/50 transition-all duration-500">
                  <div className="w-14 h-14 bg-deep-blue rounded-xl flex items-center justify-center shadow-xl shadow-deep-blue/10">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Live Phone Demo</p>
                    <p className="text-2xl font-black text-deep-blue tracking-tight">
                      (929) 376-0044
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Lead Dashboard - The "WOW" Business Proof */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep-blue/5 border border-deep-blue/10 mb-6">
                <Activity className="w-3 h-3 text-deep-blue" />
                <span className="text-[10px] font-black text-deep-blue uppercase tracking-[0.2em]">Real-Time Pulse</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-deep-blue">
                Live <span className="text-zinc-400 font-medium">Performance</span>
              </h2>
            </div>
            <p className="max-w-[280px] text-zinc-500 text-[13px] font-medium leading-relaxed md:text-right">
              Sarah handles every incoming request. Watch as she qualifies and books patients in real-time.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
            {/* Dashboard Header */}
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Sarah CRM v1.0</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg border border-green-200">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">Systems Active</span>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="divide-y divide-zinc-100">
              {leads.length > 0 ? (
                leads.map((item, i) => (
                  <div key={i} className="group p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white/30 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-center gap-5">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500", item.color || "bg-deep-blue")}>
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-deep-blue">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.task}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-10">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Clock className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{item.time}</span>
                        </div>
                      </div>
                      
                      <div className={cn(
                        "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm transform group-hover:scale-105 transition-all duration-500",
                        item.status === "Booked" ? "bg-green-500 text-white shadow-green-200" : "bg-zinc-100 text-zinc-500"
                      )}>
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center">
                  <p className="text-zinc-400 text-sm font-medium">Waiting for incoming leads...</p>
                </div>
              )}
            </div>

            {/* Dashboard Footer */}
            <div className="px-8 py-6 bg-zinc-50/50 flex items-center justify-center border-t border-zinc-100">
              <button className="text-[10px] font-black text-zinc-400 hover:text-deep-blue transition-colors uppercase tracking-[0.4em]">
                Explore All Logs →
              </button>
            </div>
          </div>
        </section>

        {/* Social Proof Logos */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-12">Trusted by builders at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-20 hover:opacity-50 transition-opacity">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-400"><Building2 className="w-8 h-8"/> HUB<span>SPOT</span></div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-400"><Globe className="w-8 h-8"/> ZAP<span>IER</span></div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-400"><Database className="w-8 h-8"/> MONGO<span>DB</span></div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-400"><Zap className="w-8 h-8"/> STRIPE</div>
          </div>
        </section>

        {/* ROI / Stats Section */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: "$840K+", label: "New Revenue Generated", icon: <TrendingUp className="w-6 h-6" />, color: "bg-green-600" },
              { stat: "3,000%", label: "Average ROI", icon: <Gauge className="w-6 h-6" />, color: "bg-slate-900" },
              { stat: "100%", label: "Call Answer Rate", icon: <CheckCircle2 className="w-6 h-6" />, color: "bg-accent-blue" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 p-10 rounded-3xl group hover:border-slate-300 transition-all duration-300">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-8", item.color)}>
                  {item.icon}
                </div>
                <h3 className="text-5xl font-black tracking-tighter text-deep-blue mb-4 transition-transform origin-left">{item.stat}</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Structured Process Section */}
        <section id="experience" className="max-w-6xl mx-auto px-6 mb-40 scroll-mt-32">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-deep-blue mb-6">
              Three steps to <span className="text-slate-900 font-black">Freedom.</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              We've refined the onboarding process to be as fast as a website launch.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-px bg-slate-100 z-0" />
            
            {[
              { step: "01", title: "Train & Deploy", desc: "Upload your business info and Sarah builds her persona in 60 seconds." },
              { step: "02", title: "Route Traffic", desc: "Connect your existing phone line or get a new local number instantly." },
              { step: "03", title: "Automate Growth", desc: "Watch Sarah book appointments and log leads directly into your CRM." },
            ].map((item, i) => (
              <div key={i} className="relative z-10 group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl font-black text-deep-blue mb-10 group-hover:bg-deep-blue group-hover:text-white transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="text-2xl font-black text-deep-blue mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Section */}
        <section id="book" className="max-w-6xl mx-auto px-6 mb-32 scroll-mt-24">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-12 md:p-20 shadow-xl relative overflow-hidden group">
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-deep-blue/5 text-[10px] font-black uppercase tracking-widest text-deep-blue mb-8">
                  <CalendarCheck className="w-3 h-3" /> Booking Portal
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-deep-blue mb-6">
                  Schedule <span className="text-zinc-400 font-medium">Your Strategy Call.</span>
                </h2>
                <p className="text-lg text-zinc-500 leading-relaxed mb-10 max-w-md">
                  Ready to deploy Sarah to your business? Pick a time that works for you and let's build your AI future together.
                </p>
                
                <div className="space-y-6">
                  {[
                    "15-Minute Technical Blueprint",
                    "Custom Persona Workshop",
                    "Live Deployment Support"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-bold text-deep-blue">
                      <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-zinc-100 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Select Date</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg border border-zinc-100 flex items-center justify-center text-zinc-400 cursor-not-allowed">←</div>
                    <div className="w-8 h-8 rounded-lg border border-zinc-100 flex items-center justify-center text-zinc-400 cursor-not-allowed">→</div>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <span key={d} className="text-[10px] font-black text-zinc-300">{d}</span>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "aspect-square flex items-center justify-center text-xs font-bold rounded-xl transition-all",
                        i + 1 === 15 ? "bg-deep-blue text-white shadow-lg" : "text-zinc-400 hover:bg-zinc-50 cursor-pointer"
                      )}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 bg-deep-blue text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-deep-blue/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Confirm Booking
                </button>
                
                <p className="text-[9px] text-center font-bold text-zinc-300 uppercase tracking-widest">
                  Powered by ReceptionistAI Scheduler
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA - For the Sales Pitch */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="relative rounded-[2rem] overflow-hidden bg-deep-blue p-12 md:p-24 text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
                Stop losing leads <br />
                <span className="opacity-40">to voicemail.</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl font-medium max-w-xl mb-12">
                Join the elite group of businesses using Sarah to dominate their local market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#book" className="px-10 py-5 bg-white text-deep-blue rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-white/10 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                  Book Your Demo <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid with refined cards */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Neural Engine", 
              label: "Human-Like Voice", 
              desc: "98.7% identical to human speech patterns with natural intonations and pauses." 
            },
            { 
              title: "Instant Sync", 
              label: "Calendar Integration", 
              desc: "Real-time read/write access to your scheduling software to prevent double bookings." 
            },
            { 
              title: "Smart Triage", 
              label: "Lead Qualification", 
              desc: "Automatically identifies urgent cases and prioritizes them in your notification center." 
            },
          ].map((feature, i) => (
            <div key={i} className="bg-white border border-slate-200 group p-10 rounded-2xl transition-all duration-300 hover:border-slate-300">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-8 group-hover:bg-deep-blue group-hover:text-white transition-colors duration-300">
                <div className="w-6 h-6 border-2 border-current rounded-lg" />
              </div>
              <h3 className="text-2xl font-bold text-deep-blue mb-2">{feature.title}</h3>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">{feature.label}</div>
              <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Footer */}
      <footer id="contact" className="py-20 border-t border-soft-gray relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-deep-blue rounded-2xl flex items-center justify-center">
              <span className="text-white font-black text-xl tracking-tighter">RA</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-deep-blue">ReceptionistAI</span>
          </div>
          
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300 mb-2">Automated Front-Desk</h3>
            <div className="flex items-center gap-4">
              <Link href="#book" className="px-8 py-4 bg-deep-blue text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
                Schedule Your Demo
              </Link>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="px-8 py-4 bg-white border border-zinc-100 text-deep-blue rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-sm"
              >
                Inquire Now
              </button>
            </div>
          </div>
          <div className="flex gap-10 text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] mt-8">
            <Link href="/privacy" className="hover:text-deep-blue transition-colors">Privacy</Link>
            <Link href="/security" className="hover:text-deep-blue transition-colors">Security</Link>
            <Link href="/terms" className="hover:text-deep-blue transition-colors">Terms</Link>
          </div>
          
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            © 2026 ReceptionistAI | Built for High Performance
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in shadow-2xl">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsContactOpen(false)}
          />
          
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 md:p-12 animate-fade-in-up">
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-deep-blue transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-6 animate-fade-in">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-deep-blue mb-2">Message Sent!</h3>
                  <p className="text-zinc-500 font-medium">Sarah will notify us immediately. Talk soon!</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-10 text-center">
                  <h3 className="text-3xl font-black text-deep-blue mb-2">Send a Message</h3>
                  <p className="text-zinc-500 font-medium">How can Sarah help your business?</p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-deep-blue/5 focus:border-deep-blue transition-all font-medium text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@example.com"
                      className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-deep-blue/5 focus:border-deep-blue transition-all font-medium text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Your Message</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-deep-blue/5 focus:border-deep-blue transition-all font-medium resize-none text-sm"
                    />
                  </div>

                  {formError && (
                    <p className="text-red-500 text-xs font-bold text-center">{formError}</p>
                  )}

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-deep-blue text-white rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-deep-blue/20 hover:bg-slate-900 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isSubmitting ? "Sending..." : "Send Message"}
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
