'use client';

import { useState } from 'react';

interface VADERResult {
  compound: number;
  pos: number;
  neu: number;
  neg: number;
  label: 'positive' | 'negative' | 'neutral';
  score_out_of_10: number;
  error?: string;
}

const EXAMPLES = [
  { text: 'Placements are amazing here, got placed in Google with huge package!', expected: 'Positive' },
  { text: 'Fees are too high, hostel food is terrible, totally not worth it.', expected: 'Negative' },
  { text: 'BML Munjal me CSE lena chahiye ya nhi?', expected: 'Neutral' },
  { text: 'Faculty is very supportive and campus is beautiful!', expected: 'Positive' },
  { text: 'Infrastructure is worst, wifi never works, waste of money.', expected: 'Negative' },
];

export default function AnalyzePage() {
  const [text, setText]       = useState('');
  const [result, setResult]   = useState<VADERResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze(inputText?: string) {
    const comment = inputText ?? text;
    if (!comment.trim()) return;
    if (inputText) setText(inputText);
    setLoading(true);
    setResult(null);
    try {
      const res  = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: comment }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ compound: 0, pos: 0, neu: 0, neg: 0, label: 'neutral', score_out_of_10: 5, error: 'Failed to connect.' });
    } finally {
      setLoading(false);
    }
  }

  const labelStyle = {
    positive: { bg: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-200 text-emerald-800', emoji: '😊', word: 'POSITIVE' },
    negative: { bg: 'bg-red-500',     light: 'bg-red-50 border-red-200 text-red-800',             emoji: '😟', word: 'NEGATIVE' },
    neutral:  { bg: 'bg-slate-400',   light: 'bg-slate-50 border-slate-200 text-slate-700',       emoji: '😐', word: 'NEUTRAL'  },
  };

  const style = result ? labelStyle[result.label] : null;

  // gauge fill: compound goes -1 to +1, map to 0-100%
  const gaugePct = result ? Math.round(((result.compound + 1) / 2) * 100) : 50;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
            🧪 VADER Sentiment Analyzer
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Type any comment below — see exactly how VADER classifies it as Positive, Neutral, or Negative.
          </p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <label className="block text-sm font-bold text-slate-700">Enter a Comment:</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={4}
            placeholder="Type any student comment here e.g. 'Placements are amazing, got placed in Google!'"
            className="w-full border border-slate-200 rounded-lg p-3 text-sm text-slate-800 font-normal resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          <button
            onClick={() => analyze()}
            disabled={loading || !text.trim()}
            className="w-full py-3 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Running VADER Analysis...' : '▶ Analyze Sentiment'}
          </button>
        </div>

        {/* Result */}
        {result && !result.error && style && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5 animate-pulse-once">

            {/* Big label */}
            <div className={`rounded-lg border p-4 text-center ${style.light}`}>
              <p className="text-4xl mb-1">{style.emoji}</p>
              <p className="text-2xl font-black tracking-wider">{style.word}</p>
              <p className="text-sm font-semibold mt-1 opacity-75">Sentiment Classification by VADER</p>
            </div>

            {/* Gauge bar */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>😟 Very Negative (-1.0)</span>
                <span>😐 Neutral (0.0)</span>
                <span>😊 Very Positive (+1.0)</span>
              </div>
              <div className="relative h-5 bg-gradient-to-r from-red-400 via-slate-300 to-emerald-500 rounded-full overflow-hidden">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow"
                  style={{ left: `calc(${gaugePct}% - 8px)` }}
                />
              </div>
              <p className="text-center text-xs text-slate-500 mt-1 font-medium">
                Compound Score: <span className="font-black text-slate-800">{result.compound}</span>
              </p>
            </div>

            {/* Score breakdown table */}
            <div>
              <p className="text-xs font-bold text-slate-600 mb-2">📊 VADER Score Breakdown:</p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left px-3 py-2 text-xs font-bold text-slate-600 rounded-tl-lg">Metric</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-slate-600">Value</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-slate-600 rounded-tr-lg">What It Means</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-3 py-2 font-bold text-emerald-700">Positive (pos)</td>
                    <td className="px-3 py-2 font-black text-emerald-700">{result.pos}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">Proportion of positive words</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-3 py-2 font-bold text-slate-600">Neutral (neu)</td>
                    <td className="px-3 py-2 font-black text-slate-600">{result.neu}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">Proportion of neutral words</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-3 py-2 font-bold text-red-700">Negative (neg)</td>
                    <td className="px-3 py-2 font-black text-red-700">{result.neg}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">Proportion of negative words</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-3 py-2 font-bold text-indigo-700">Compound</td>
                    <td className="px-3 py-2 font-black text-indigo-700">{result.compound}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">Overall score (−1 to +1)</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-3 py-2 font-bold text-indigo-800">Score / 10</td>
                    <td className="px-3 py-2 font-black text-indigo-800">{result.score_out_of_10}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">(compound+1)/2 × 10 — used in dashboard</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Rule reminder */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-medium text-slate-600">
              <p className="font-bold text-slate-800 mb-1">📏 Classification Rule (VADER):</p>
              <p>🟢 <strong>Positive</strong>: compound ≥ +0.05 &nbsp;|&nbsp; 🔴 <strong>Negative</strong>: compound ≤ −0.05 &nbsp;|&nbsp; ⚪ <strong>Neutral</strong>: between −0.05 and +0.05</p>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-medium">
            ⚠️ {result.error}
          </div>
        )}

        {/* Example comments */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-700 mb-3">💡 Try These Example Comments:</p>
          <div className="space-y-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => analyze(ex.text)}
                className="w-full text-left text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 hover:bg-indigo-50 hover:border-indigo-300 transition-all font-medium text-slate-700"
              >
                <span className={`inline-block mr-2 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  ex.expected === 'Positive' ? 'bg-emerald-100 text-emerald-700' :
                  ex.expected === 'Negative' ? 'bg-red-100 text-red-700' :
                  'bg-slate-200 text-slate-600'
                }`}>{ex.expected}</span>
                &ldquo;{ex.text}&rdquo;
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
