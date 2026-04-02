"use client";

import { useState } from "react";

export default function DueDiligence() {
  const [form, setForm] = useState({
    dealType: "",
    targetIndustry: "",
    dealSize: "",
    stage: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="border-b border-orange-500/20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">AI Due Diligence Checklist</h1>
          </div>
          <p className="text-gray-400 text-sm">Generate M&A due diligence checklists, timelines, and red flag analyses</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Deal Type</label>
              <select
                name="dealType"
                value={form.dealType}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="">Select deal type…</option>
                <option value="Asset Acquisition">Asset Acquisition</option>
                <option value="Stock Acquisition">Stock Acquisition</option>
                <option value="Merger">Merger</option>
                <option value="Leveraged Buyout (LBO)">Leveraged Buyout (LBO)</option>
                <option value="Management Buyout (MBO)">Management Buyout (MBO)</option>
                <option value="Growth Investment (Minority)">Growth Investment (Minority)</option>
                <option value="Platform Acquisition">Platform Acquisition</option>
                <option value="Add-on Acquisition">Add-on Acquisition</option>
                <option value="Joint Venture">Joint Venture</option>
                <option value="Carve-out / Spin-off">Carve-out / Spin-off</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Target Industry</label>
              <select
                name="targetIndustry"
                value={form.targetIndustry}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="">Select industry…</option>
                <option value="SaaS / B2B Technology">SaaS / B2B Technology</option>
                <option value="FinTech / Payments">FinTech / Payments</option>
                <option value="HealthTech / Digital Health">HealthTech / Digital Health</option>
                <option value="E-Commerce / DTC">E-Commerce / DTC</option>
                <option value="Marketplace / Platform">Marketplace / Platform</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="AI / Machine Learning">AI / Machine Learning</option>
                <option value="Data / Analytics">Data / Analytics</option>
                <option value="Media / Content">Media / Content</option>
                <option value="Manufacturing / Industrial">Manufacturing / Industrial</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Real Estate Tech">Real Estate Tech</option>
                <option value="Logistics / Supply Chain">Logistics / Supply Chain</option>
                <option value="EdTech">EdTech</option>
                <option value="Consumer / Retail">Consumer / Retail</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Deal Size</label>
              <select
                name="dealSize"
                value={form.dealSize}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="">Select deal size…</option>
                <option value="Seed / Pre-Series A (<$5M)">Seed / Pre-Series A (&lt;$5M)</option>
                <option value="Series A ($5M–$25M)">Series A ($5M–$25M)</option>
                <option value="Series B/C ($25M–$100M)">Series B/C ($25M–$100M)</option>
                <option value="Growth Equity ($100M–$500M)">Growth Equity ($100M–$500M)</option>
                <option value="Mid-Market ($500M–$2B)">Mid-Market ($500M–$2B)</option>
                <option value="Large Cap (>$2B)">Large Cap (&gt;$2B)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Transaction Stage</label>
              <select
                name="stage"
                value={form.stage}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="">Select stage…</option>
                <option value="Early Stage (LOI/Indicative)">Early Stage (LOI/Indicative)</option>
                <option value="Pre-Signing (Exclusivity)">Pre-Signing (Exclusivity)</option>
                <option value="Signing to Closing (30-60 days)">Signing to Closing (30-60 days)</option>
                <option value="Signing to Closing (60-120 days)">Signing to Closing (60-120 days)</option>
                <option value="Post-Signing Integration Planning">Post-Signing Integration Planning</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Building Checklist…
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Generate Due Diligence Checklist
                </>
              )}
            </button>
          </form>

          <div>
            {loading && (
              <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <svg className="animate-spin w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Building comprehensive M&A due diligence checklist…</p>
              </div>
            )}

            {!loading && !result && !error && (
              <div className="bg-gray-800/20 border border-dashed border-gray-700 rounded-xl p-12 text-center">
                <div className="text-4xl mb-4">📋🔍</div>
                <p className="text-gray-500 text-sm">Due diligence checklist will appear here</p>
              </div>
            )}

            {result && (
              <div className="bg-gray-800/40 border border-orange-500/30 rounded-xl">
                <div className="px-5 py-3 border-b border-gray-700 flex items-center justify-between">
                  <span className="text-sm font-semibold text-orange-400">Due Diligence Package</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <div className="px-5 py-4 overflow-auto max-h-[600px]">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {result}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
