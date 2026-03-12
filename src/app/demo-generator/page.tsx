'use client';

import Vapi from '@vapi-ai/web';

interface DemoResult {
  success: boolean;
  assistantConfig: any;
  businessName: string;
  industry: string;
  scrapedCharacters: number;
}

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');

export default function DemoGenerator() {
  const [url, setUrl] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [leadDestination, setLeadDestination] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [error, setError] = useState('');
  const [isCalling, setIsCalling] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/generate-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteUrl: url,
          businessName: businessName || undefined,
          industry: industry || undefined,
          leadDestination: leadDestination || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to generate demo');
        return;
      }

      setResult(data);
    } catch (err) {
      setError('Network error — please try again');
    } finally {
      setIsGenerating(false);
    }
  };

  const startCall = async () => {
    if (result?.assistantConfig) {
      setIsCalling(true);
      try {
        await vapi.start(result.assistantConfig);
      } catch (err) {
        console.error('Failed to start call:', err);
        setIsCalling(false);
      }
    }
  };

  const stopCall = () => {
    vapi.stop();
    setIsCalling(false);
  };

  vapi.on('call-end', () => setIsCalling(false));
  vapi.on('error', () => setIsCalling(false));

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-6 w-[90%] max-w-5xl z-50">
        <div className="bg-glass border-glass px-8 h-16 rounded-2xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-[10px]">RA</span>
            </div>
            <span className="text-lg font-bold tracking-tight">ReceptionistAI</span>
          </div>
        </div>
      </nav>

      <section className="pt-44 pb-32 max-w-4xl w-full px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-500 mb-8 animate-fade-in">
          <Zap className="w-3 h-3 fill-blue-500" />
          Deployment Workbench
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-vibrant">
          DEMO<br />
          <span className="font-serif italic font-light lowercase tracking-normal">generator.</span>
        </h1>
        <p className="text-lg md:text-xl opacity-60 max-w-xl mx-auto font-medium leading-relaxed mb-16">
          Specify a prospect domain. We&apos;ll scrape the business logic, build a custom <span className="text-white">voice assistant</span>, and deploy a ready-to-scale demo instantly.
        </p>

        {/* Generator Form */}
        <div className="relative">
          <form onSubmit={handleGenerate} className="bg-glass border-glass rounded-[2rem] p-10 space-y-8 relative overflow-hidden group">
            <BorderBeam size={400} duration={15} colorFrom="#ffffff" colorTo="#3b82f6" />
            
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-1">Website URL *</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  required
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://example-dental.com"
                  className="w-full pl-12 pr-6 py-4 bg-background/50 border border-white/5 rounded-xl focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-1">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  placeholder="Optional"
                  className="w-full px-6 py-4 bg-background/50 border border-white/5 rounded-xl focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-1">Industry</label>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  className="w-full px-6 py-4 bg-background/50 border border-white/5 rounded-xl focus:outline-none focus:border-white/20 transition-all font-medium text-sm appearance-none"
                >
                  <option value="">Auto-detect</option>
                  <option value="dental">Dental</option>
                  <option value="legal">Legal</option>
                  <option value="realestate">Real Estate</option>
                  <option value="medspa">Med Spa</option>
                  <option value="hvac">HVAC</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-6 py-4 text-red-500 text-xs font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-5 bg-white text-black rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  ANALYZING & DEPLOYING...
                </>
              ) : (
                <>
                  GENERATE SYSTEM DEMO <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Card */}
        {result && (
          <div className="mt-12 bg-glass border-glass rounded-[2rem] p-10 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">System Deployed</h3>
                <p className="text-xs opacity-50 font-bold uppercase tracking-widest">{result.scrapedCharacters} characters analyzed</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-background/50 border border-white/5 rounded-2xl p-6">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-2">Assistant Name</p>
                <p className="font-bold">{result.assistant.name}</p>
              </div>

              <div className="bg-background/50 border border-white/5 rounded-2xl p-6">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-2">System First Message</p>
                <p className="font-medium opacity-60 italic">&ldquo;{result.assistantConfig.firstMessage}&rdquo;</p>
              </div>

              <div className="grid gap-4 pt-4">
                <button
                  onClick={isCalling ? stopCall : startCall}
                  className={`flex items-center justify-center gap-2 py-5 rounded-2xl font-black text-sm transition-all shadow-2xl ${
                    isCalling 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white text-black hover:scale-[1.02]'
                  }`}
                >
                  {isCalling ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      END DEMO SESSION
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4 fill-black" />
                      START LIVE VOICE DEMO
                    </>
                  )}
                </button>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-20 text-center">
                  * This is an ephemeral session. No data is stored in Vapi Dashboard.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="py-20 opacity-20 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">
          RECEPTIONISTAI — INTERNAL DEPLOYMENT WORKBENCH
        </p>
      </footer>
    </main>
  );
}
