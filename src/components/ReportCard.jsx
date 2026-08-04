import React from 'react';
import { Award, Briefcase, GraduationCap, Building2, Home, Sparkles, Heart } from 'lucide-react';

export default function ReportCard({ reportCard, univName }) {
  if (!reportCard) return null;

  const categories = [
    { key: 'placements', title: 'Placements & Career', grade: reportCard.placements, icon: Briefcase, color: 'text-brand-600 bg-brand-50 border-brand-200' },
    { key: 'faculty', title: 'Faculty & Pedagogy', grade: reportCard.faculty, icon: GraduationCap, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { key: 'infrastructure', title: 'Campus Infrastructure', grade: reportCard.infrastructure, icon: Building2, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { key: 'hostel', title: 'Hostel & Amenities', grade: reportCard.hostel, icon: Home, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { key: 'campus_life', title: 'Campus Life & Fests', grade: reportCard.campus_life, icon: Sparkles, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { key: 'student_satisfaction', title: 'Student Satisfaction', grade: reportCard.student_satisfaction, icon: Heart, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  ];

  return (
    <div id="report-card" className="glass-card rounded-3xl p-8 border border-slate-200/80 bg-white mb-12 shadow-glass">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">University Report Card</h2>
            <p className="text-sm text-slate-500">Calculated from sentiment density & comment consensus</p>
          </div>
        </div>

        <div className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
          AI Grade Audit: 2026 Edition
        </div>
      </div>

      {/* Grade Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <div
              key={cat.key}
              className="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all text-center group"
            >
              <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center border ${cat.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{cat.title}</p>
              <div className="inline-block px-4 py-1 rounded-2xl bg-white border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-2xl font-extrabold text-slate-900">{cat.grade}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
