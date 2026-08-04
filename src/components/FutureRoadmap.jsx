import React from 'react';
import { ShieldAlert, Cpu, AlertCircle, Bell, Globe, Sparkles, Lock } from 'lucide-react';

export default function FutureRoadmap() {
  const modules = [
    { title: 'Hate Speech Detection', tag: 'NLP Classifier', desc: 'Real-time detection and filtering of hate speech and abusive comments across social media channels.', icon: ShieldAlert, color: 'border-rose-200 text-rose-600 bg-rose-50' },
    { title: 'Toxicity Score Engine', tag: 'AI Safety Metric', desc: 'Quantitative toxicity scoring model to measure discourse quality in comment threads.', icon: Cpu, color: 'border-amber-200 text-amber-600 bg-amber-50' },
    { title: 'Risk Score Indicator', tag: 'Predictive Model', desc: 'Comprehensive risk index evaluating fee hikes, placement drops, or sudden policy changes.', icon: AlertCircle, color: 'border-orange-200 text-orange-600 bg-orange-50' },
    { title: 'University Alerts System', tag: 'Instant Push Alerts', desc: 'Automated student alerts for upcoming application deadlines, placement updates, and news.', icon: Bell, color: 'border-sky-200 text-sky-600 bg-sky-50' },
    { title: 'Multilingual AI Assistant', tag: '12+ Vernacular Languages', desc: 'Translate and ask questions in Hindi, Odia, Tamil, Telugu, Bengali, and regional languages.', icon: Globe, color: 'border-brand-200 text-brand-600 bg-brand-50' },
  ];

  return (
    <div id="roadmap" className="glass-card rounded-3xl p-8 border border-slate-200/80 bg-white mb-12 shadow-glass">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Future Intelligence Roadmap</h2>
            <p className="text-sm text-slate-500">Upcoming enterprise safety, toxicity analysis & regional AI modules</p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Planned Modules v2.0</span>
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {modules.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center border ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1">{m.title}</h4>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 mb-3">
                  {m.tag}
                </span>
                <p className="text-slate-500 text-xs leading-relaxed">{m.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-brand-600">
                <span>Coming Soon</span>
                <Sparkles className="w-3 h-3 text-brand-400 group-hover:animate-spin" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
