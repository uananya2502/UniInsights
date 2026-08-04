import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SnapshotCard from './components/SnapshotCard';
import AskSeniorsRAG from './components/AskSeniorsRAG';
import ReportCard from './components/ReportCard';
import CompareModule from './components/CompareModule';
import StrengthsConcerns from './components/StrengthsConcerns';
import StudentVoice from './components/StudentVoice';
import ReputationTimeline from './components/ReputationTimeline';
import TrendingDiscussions from './components/TrendingDiscussions';
import BestForBadges from './components/BestForBadges';
import EducationNews from './components/EducationNews';
import AnalyticsSection from './components/AnalyticsSection';
import FutureRoadmap from './components/FutureRoadmap';
import { fetchUniversityDashboard } from './services/api';
import { Sparkles, Heart } from 'lucide-react';

const UNIVERSITIES_LIST = [
  { id: 'kiit', name: 'KIIT University', location: 'Bhubaneswar, Odisha' },
  { id: 'srm', name: 'SRM IST', location: 'Kattankulathur, Tamil Nadu' },
  { id: 'iit-bombay', name: 'IIT Bombay', location: 'Mumbai, Maharashtra' },
  { id: 'iit-madras', name: 'IIT Madras', location: 'Chennai, Tamil Nadu' },
  { id: 'lpu', name: 'Lovely Professional University', location: 'Phagwara, Punjab' },
  { id: 'bml-munjal', name: 'BML Munjal University', location: 'Gurugram, Haryana' },
];

export default function App() {
  const [selectedUnivId, setSelectedUnivId] = useState('kiit');
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchUniversityDashboard(selectedUnivId);
      setDashData(data);
      setLoading(false);
    }
    loadData();
  }, [selectedUnivId]);

  const handleSearch = (term) => {
    const termLower = term.toLowerCase();
    const match = UNIVERSITIES_LIST.find(u =>
      u.name.toLowerCase().includes(termLower) || u.id.includes(termLower)
    );
    if (match) {
      setSelectedUnivId(match.id);
    } else {
      setSelectedUnivId('kiit');
    }

    const elem = document.getElementById('snapshot');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedUnivInfo = UNIVERSITIES_LIST.find(u => u.id === selectedUnivId) || UNIVERSITIES_LIST[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between">
      {/* Navigation Header */}
      <Navbar
        selectedUniv={selectedUnivInfo}
        onSelectUniv={setSelectedUnivId}
        universities={UNIVERSITIES_LIST}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* Landing Page Hero Section */}
        <HeroSection
          onSearch={handleSearch}
          popularUniversities={UNIVERSITIES_LIST}
          onSelectUniv={setSelectedUnivId}
        />

        {/* Dashboard Intelligence Suite Container */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Active Target Banner */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-brand-600 animate-ping"></span>
              <h2 className="text-xl font-black text-slate-900">
                Active Intelligence Target: <span className="text-brand-600">{dashData?.university?.name || selectedUnivInfo.name}</span>
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-200">
              {dashData?.university?.location || selectedUnivInfo.location}
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center glass-card rounded-3xl">
              <Sparkles className="w-10 h-10 text-brand-600 animate-spin mx-auto mb-4" />
              <p className="text-lg font-bold text-slate-800">Processing Social Analytics & RAG Vectors...</p>
              <p className="text-xs text-slate-400 mt-1">Reading precomputed PostgreSQL intelligence dataset</p>
            </div>
          ) : (
            <>
              {/* FEATURE 2: AI University Snapshot */}
              <SnapshotCard snapshot={dashData?.snapshot} univName={dashData?.university?.name} />

              {/* FEATURE 3: Ask Seniors (RAG Chatbot) */}
              <AskSeniorsRAG selectedUnivId={selectedUnivId} univName={dashData?.university?.name} />

              {/* FEATURE 4: University Report Card */}
              <ReportCard reportCard={dashData?.report_card} univName={dashData?.university?.name} />

              {/* FEATURE 10: Best For Recommendation Badges */}
              <BestForBadges bestFor={dashData?.best_for} />

              {/* FEATURE 6: Strengths vs Concerns */}
              <StrengthsConcerns strengths={dashData?.strengths} concerns={dashData?.concerns} />

              {/* FEATURE 7: Student Voice (Liked Comments) */}
              <StudentVoice voices={dashData?.top_student_voices} />

              {/* FEATURE 9: Trending Discussions */}
              <TrendingDiscussions topics={dashData?.topics} />

              {/* FEATURE 8: Reputation Timeline */}
              <ReputationTimeline timeline={dashData?.timeline} />

              {/* FEATURE 5: Compare Universities */}
              <CompareModule universities={UNIVERSITIES_LIST} />

              {/* ANALYTICS SECTION: Charts, Sentiment, Topics, Network Graph */}
              <AnalyticsSection
                snapshot={dashData?.snapshot}
                topics={dashData?.topics}
                network={dashData?.network}
                community={dashData?.community_detection}
              />

              {/* FEATURE 11: Current Education News */}
              <EducationNews />

              {/* FUTURE ROADMAP MODULES */}
              <FutureRoadmap />
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-4 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-extrabold text-slate-900">Uni<span className="text-brand-600">Insights</span></span>
            <span>– Know Your College!</span>
          </div>
          <p>© 2026 UniInsights Platform. AI-Powered Social Media Analytics.</p>
          <div className="flex items-center space-x-1">
            <span>Built for students with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>
        </div>
      </footer>
    </div>
  );
}
