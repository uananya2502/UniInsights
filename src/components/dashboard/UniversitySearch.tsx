'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface UniversityBasic {
  id: string;
  name: string;
}

interface UniversitySearchProps {
  onSelect: (university: string) => void;
  selected?: string;
  placeholder?: string;
  compact?: boolean;
}

export function UniversitySearch({ onSelect, selected, placeholder, compact }: UniversitySearchProps) {
  const [query, setQuery] = useState(selected || '');
  const [universities, setUniversities] = useState<UniversityBasic[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/data/universities')
      .then(res => res.json())
      .then(data => { setUniversities(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selected) setQuery(selected);
  }, [selected]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = query === ''
    ? universities.slice(0, 8)
    : universities.filter(u => u.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  return (
    <div ref={wrapperRef} className={`relative ${compact ? 'w-full' : 'w-full max-w-md'}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          className={`w-full pl-9 pr-8 border border-slate-200 rounded-lg bg-white placeholder-slate-400 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm ${compact ? 'py-2' : 'py-2.5'}`}
          placeholder={placeholder || 'Search universities...'}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            onClick={() => { setQuery(''); setIsOpen(false); }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && !loading && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-lg border border-slate-200 max-h-64 overflow-y-auto animate-slide-up">
          {filtered.length > 0 ? (
            <ul className="py-1">
              {filtered.map(uni => (
                <li
                  key={uni.id}
                  className="px-3 py-2.5 hover:bg-blue-50 cursor-pointer text-sm text-slate-700 flex items-center gap-2 transition-colors"
                  onClick={() => { setQuery(uni.name); setIsOpen(false); onSelect(uni.name); }}
                >
                  <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0">
                    {uni.name.charAt(0)}
                  </div>
                  <span className="truncate">{uni.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-sm text-slate-400 text-center">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
