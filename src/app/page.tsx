import VapiButton from '@/components/VapiButton';

export default function Home() {
  return (
    <main className="min-h-screen mesh-gradient text-zinc-900 selection:bg-deep-blue/10 selection:text-white">
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
              <span className="text-white font-bold text-sm tracking-tighter">WH</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-deep-blue">West Hartford Dentist</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[13px] font-semibold text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-deep-blue transition-all">Experience</a>
            <a href="#" className="hover:text-deep-blue transition-all">Technology</a>
            <a href="#" className="hover:text-deep-blue transition-all">Our AI</a>
            <button className="px-6 py-2.5 bg-deep-blue text-white rounded-xl hover:bg-zinc-800 transition-all shadow-md shadow-deep-blue/10 active:scale-95">
              Contact us
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-48 pb-32">
        {/* Cinematic Hero */}
        <section className="max-w-6xl mx-auto px-6 mb-24 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-deep-blue/10 text-[10px] font-bold uppercase tracking-[0.2em] text-deep-blue shadow-sm mb-10 transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-deep-blue opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-deep-blue"></span>
            </span>
            24/7 Virtual Patient Care
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-center mb-10 leading-[0.95] max-w-4xl">
            The next-gen <br /> 
            <span className="text-gradient">receptionist is here.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 text-center max-w-2xl mb-16 leading-relaxed font-medium">
            Automate patient intake, qualify leads, and scale your dental practice with zero latency AI voice.
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
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-300">Experience Live</h2>
                </div>
                
                <VapiButton />
                
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
      <footer className="py-20 border-t border-soft-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-deep-blue rounded-2xl flex items-center justify-center">
              <span className="text-white font-black text-xl tracking-tighter">WH</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-deep-blue">West Hartford Dentist</span>
          </div>
          
          <div className="flex gap-10 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            <a href="#" className="hover:text-deep-blue transition-colors">Privacy</a>
            <a href="#" className="hover:text-deep-blue transition-colors">Security</a>
            <a href="#" className="hover:text-deep-blue transition-colors">Terms</a>
          </div>
          
          <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
            © 2026 West Hartford Dentist — Built for High Performance
          </p>
        </div>
      </footer>
    </main>
  );
}
