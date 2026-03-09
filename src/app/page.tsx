'use client';

import VapiButton, { cn } from '@/components/VapiButton';
import { Activity, Clock, CheckCircle2, User, Phone, ShieldCheck, CalendarCheck, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [leads, setLeads] = useState<any[]>([]);
  const [visitorId, setVisitorId] = useState<string | null>(null);

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

  return (
    <main className="min-h-screen mesh-gradient text-zinc-900 selection:bg-deep-blue/10 selection:text-white">
      {/* ... (rest of the dynamic background and nav) ... */}
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-deep-blue/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-accent-blue/5 rounded-full blur-[120px] animate-pulse-slow delay-700" />
      </div>

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
            <a href="#experience" className="hover:text-deep-blue transition-all">Experience</a>
            <a href="#demo" className="hover:text-deep-blue transition-all">Live Demo</a>
            <a href="#contact" className="px-6 py-2.5 bg-deep-blue text-white rounded-xl hover:bg-zinc-800 transition-all shadow-md shadow-deep-blue/10 active:scale-95 flex items-center gap-2">
              Contact us
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-48 pb-32">
        {/* Cinematic Hero */}
        <section id="demo" className="max-w-6xl mx-auto px-6 mb-24 flex flex-col items-center scroll-mt-48">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-deep-blue/10 text-[10px] font-bold uppercase tracking-[0.2em] text-deep-blue shadow-sm mb-10 transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-deep-blue opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-deep-blue"></span>
            </span>
            24/7 Virtual Receptionist
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-center mb-10 leading-[0.95] max-w-4xl">
            The next-gen <br /> 
            <span className="text-gradient">receptionist is here.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 text-center max-w-2xl mb-16 leading-relaxed font-medium">
            Automate intake, qualify leads, and scale your business with zero latency AI voice.
          </p>

          {/* Core Demo Section */}
          <div className="relative w-full max-w-3xl flex justify-center">
            {/* Decorator blob for WOW factor */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-accent-blue/10 rounded-full blur-xl animate-float" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-deep-blue/10 rounded-full blur-xl animate-float delay-1000" />
            
            <div className="w-full bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-16 shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              {/* Internal subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-deep-blue/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-1 w-16 bg-deep-blue/10 rounded-full" />
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-300">Live Demo</h2>
                </div>
                
                <VapiButton visitorId={visitorId} />
                
                <div className="text-center group-hover:transform group-hover:translate-y-[-5px] transition-transform duration-500">
                  <p className="text-zinc-400 text-sm font-medium mb-1">Say something like...</p>
                  <p className="max-w-xs text-xl font-bold text-deep-blue italic leading-relaxed">
                    &quot;Hey Sarah, can you find me a slot tomorrow morning?&quot;
                  </p>
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

          <div className="glass rounded-[2.5rem] border-white/60 shadow-2xl overflow-hidden">
            {/* Dashboard Header */}
            <div className="px-8 py-6 bg-white/40 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                </div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Sarah CRM v1.0</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg border border-green-100">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-black text-green-700 uppercase tracking-widest uppercase tracking-widest">Systems Active</span>
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

        {/* Process Section - High-Fidelity Timeline */}
        <section id="experience" className="max-w-6xl mx-auto px-6 mb-32 relative scroll-mt-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-deep-blue mb-4">
              Simple. <span className="text-zinc-400 font-medium">Powerful.</span> Seamless.
            </h2>
            <p className="text-zinc-500 font-medium tracking-tight">Three steps to a 24/7 automated business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-[2.25rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-zinc-100 to-transparent z-0" />
            
            {[
              { 
                step: "01", 
                title: "Inbound Call", 
                desc: "Sarah picks up within 1 second, answering with your professional business greeting.",
                icon: Phone,
                color: "text-blue-600 bg-blue-50"
              },
              { 
                step: "02", 
                title: "AI Triage", 
                desc: "Sarah identifies the patient's needs and checks your schedule in real-time.",
                icon: ShieldCheck,
                color: "text-indigo-600 bg-indigo-50"
              },
              { 
                step: "03", 
                title: "Live Booking", 
                desc: "The appointment is booked and your team receives an instant notification.",
                icon: CalendarCheck,
                color: "text-accent-blue bg-blue-50"
              }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all duration-500", item.color)}>
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="text-[10px] font-black text-deep-blue/20 uppercase tracking-[0.5em] mb-2">{item.step}</div>
                <h3 className="text-2xl font-bold text-deep-blue mb-4">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium max-w-[240px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA - For the Sales Pitch */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="relative rounded-[3rem] overflow-hidden bg-deep-blue p-12 md:p-24 text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
                Stop losing patients <br />
                <span className="opacity-50">to voicemail.</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl font-medium max-w-xl mb-12">
                Join the elite group of businesses using Sarah to dominate their local market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:hollandersawyer@gmail.com" className="px-10 py-5 bg-white text-deep-blue rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-white/10 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                  Get Started Now <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:8609891823" className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all flex items-center justify-center">
                  Request Custom Demo
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
              desc: "Automatically identifies emergency cases and prioritizes them in your notification center." 
            },
          ].map((feature, i) => (
            <div key={i} className="glass group p-10 rounded-[2rem] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 border-white">
              <div className="w-12 h-12 bg-deep-blue/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-deep-blue group-hover:text-white transition-colors duration-500">
                <div className="w-6 h-6 border-2 border-current rounded-lg" />
              </div>
              <h3 className="text-2xl font-bold text-deep-blue mb-2">{feature.title}</h3>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">{feature.label}</div>
              <p className="text-zinc-500 leading-relaxed font-medium">{feature.desc}</p>
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
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300 mb-2">Direct Connection</h3>
            <div className="flex flex-col items-center gap-3">
              <a href="mailto:hollandersawyer@gmail.com" className="text-xl md:text-2xl font-black text-deep-blue hover:scale-105 transition-transform">
                hollandersawyer@gmail.com
              </a>
              <a href="tel:8609891823" className="text-xl md:text-2xl font-black text-zinc-400 hover:text-deep-blue hover:scale-105 transition-all">
                860-989-1823
              </a>
            </div>
          </div>
          <div className="flex gap-10 text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] mt-8">
            <Link href="/privacy" className="hover:text-deep-blue transition-colors">Privacy</Link>
            <Link href="/security" className="hover:text-deep-blue transition-colors">Security</Link>
            <Link href="/terms" className="hover:text-deep-blue transition-colors">Terms</Link>
          </div>
          
          <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
            © 2026 ReceptionistAI — Built for High Performance
          </p>
        </div>
      </footer>
    </main>
  );
}
