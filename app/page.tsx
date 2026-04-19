'use client';
import { useState } from 'react';

const DEAL_TYPES = ['M&A Acquisition', 'Strategic Investment', 'Minority Stake', 'Joint Venture', 'Vendor/Supplier Onboarding', 'Partnership'];
const TARGET_STAGES = ['Pre-Seed', 'Seed', 'Series A', 'Series B+', 'Profitable/SMB', 'Public Company'];
const FOCUS_AREAS = ['Legal/Compliance', 'Financial', 'Technical/Product', 'Commercial', 'Operations', 'People/HR', 'IP/Technology', 'Customer Concentration'];

export default function DueDiligencePage() {
  const [acquirer, setAcquirer] = useState('');
  const [target, setTarget] = useState('');
  const [dealType, setDealType] = useState('M&A Acquisition');
  const [targetStage, setTargetStage] = useState('Series A');
  const [focusAreas, setFocusAreas] = useState<string[]>(['Legal/Compliance', 'Financial', 'Technical/Product']);
  const [dealSize, setDealSize] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleArea = (a: string) =>
    setFocusAreas(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acquirer || !target) { setError('Acquirer and target names are required.'); return; }
    setError('');
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acquirer, target, dealType, targetStage, focusAreas, dealSize }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No output.');
    } catch { setError('Request failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-rose-400 text-sm font-medium">M&A Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Due Diligence & Red Flag Detector</h1>
          <p className="text-gray-400 text-sm">Generate comprehensive due diligence question lists with red flag analysis</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-5 bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Acquirer / Buyer *</label>
                <input value={acquirer} onChange={e => setAcquirer(e.target.value)} placeholder="Acquirer Corp" required
                  className="w-full bg-gray-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Target Company *</label>
                <input value={target} onChange={e => setTarget(e.target.value)} placeholder="Target Inc." required
                  className="w-full bg-gray-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Deal Type</label>
                <select value={dealType} onChange={e => setDealType(e.target.value)}
                  className="w-full bg-gray-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500/50">
                  {DEAL_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Target Stage</label>
                <select value={targetStage} onChange={e => setTargetStage(e.target.value)}
                  className="w-full bg-gray-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500/50">
                  {TARGET_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Deal Size</label>
                <input value={dealSize} onChange={e => setDealSize(e.target.value)} placeholder="$20M"
                  className="w-full bg-gray-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">DD Focus Areas</label>
              <div className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map(a => (
                  <button key={a} type="button" onClick={() => toggleArea(a)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${focusAreas.includes(a) ? 'bg-rose-500/20 border-rose-500/50 text-rose-300' : 'bg-gray-800/40 border-white/10 text-gray-400 hover:border-white/20'}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-500/40 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
              {loading ? 'Analyzing...' : 'Generate Due Diligence Questions'}
            </button>
          </form>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Due Diligence Report</h3>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3">
                  <div className="w-8 h-8 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
                  <p className="text-gray-500 text-sm">Analyzing due diligence requirements...</p>
                </div>
              ) : output ? (
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono bg-gray-900/60 rounded-lg p-4 max-h-96 overflow-y-auto">{output}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="text-3xl mb-3">🔍</div>
                  <p className="text-gray-500 text-sm">Your due diligence questions and red flag analysis will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
