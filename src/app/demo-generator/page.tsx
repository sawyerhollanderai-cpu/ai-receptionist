'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, Globe, Phone, CheckCircle2, Copy, ExternalLink } from 'lucide-react';

interface DemoResult {
  success: boolean;
  assistant: {
    id: string;
    name: string;
    firstMessage: string;
  };
  businessName: string;
  industry: string;
  scrapedCharacters: number;
}

export default function DemoGenerator() {
  const [url, setUrl] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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

  const copyAssistantId = () => {
    if (result) {
      navigator.clipboard.writeText(result.assistant.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#FCFBF9] text-[#1C1917]">
      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-white/90 backdrop-blur-md h-16 px-8 rounded-lg flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-slate-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">RA</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">ReceptionistAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">← Back to Home</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-12 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-lg bg-emerald-600 animate-pulse" />
            Internal Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter mb-4">
            Demo Generator
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
            Paste a prospect&apos;s website URL. We&apos;ll scrape it, build a custom AI receptionist, and give you a ready-to-share demo in seconds.
          </p>
        </div>

        {/* Generator Form */}
        <form onSubmit={handleGenerate} className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-8 md:p-10 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Website URL *</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                required
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example-dental.com"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Business Name (Optional)</label>
              <input
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder="e.g. Dr. Smith Dental"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Industry (Optional)</label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-sm appearance-none"
              >
                <option value="">Auto-detect</option>
                <option value="dental">Dental</option>
                <option value="legal">Legal / Law Firm</option>
                <option value="realestate">Real Estate</option>
                <option value="medspa">Med Spa / Aesthetics</option>
                <option value="hvac">HVAC / Home Services</option>
                <option value="automotive">Automotive</option>
                <option value="restaurant">Restaurant / Food</option>
                <option value="salon">Salon / Barbershop</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-red-600 text-sm font-bold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Scraping &amp; Building AI Receptionist...
              </>
            ) : (
              <>
                Generate Demo <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Result Card */}
        {result && (
          <div className="mt-8 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-emerald-200 p-8 md:p-10 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Demo Ready!</h3>
                <p className="text-sm text-slate-500 font-medium">{result.businessName} — {result.scrapedCharacters} chars scraped</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Assistant Name</p>
                <p className="font-bold text-slate-900">{result.assistant.name}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">First Message</p>
                <p className="font-medium text-slate-700 italic">&ldquo;{result.assistant.firstMessage}&rdquo;</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Vapi Assistant ID</p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-slate-200 text-sm font-mono text-slate-600 overflow-x-auto">
                    {result.assistant.id}
                  </code>
                  <button
                    onClick={copyAssistantId}
                    className="px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <a
                  href={`https://dashboard.vapi.ai/assistants/${result.assistant.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold text-sm hover:bg-slate-50 transition-all"
                >
                  <ExternalLink className="w-4 h-4" /> Open in Vapi
                </a>
                <a
                  href="tel:+18604071305"
                  className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
                >
                  <Phone className="w-4 h-4" /> Test Call
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
          ReceptionistAI — Internal Demo Generator
        </p>
      </footer>
    </main>
  );
}
