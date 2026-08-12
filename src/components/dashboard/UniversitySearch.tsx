'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Building2 } from 'lucide-react';

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

  const cleanQuery = query.trim().toLowerCase();
  const isDefaultSelectedQuery = Boolean(selected && query === selected);

  const filtered = (cleanQuery === '' || isDefaultSelectedQuery)
    ? universities.slice(0, 8)
    : universities
        .map(u => {
          const nameLower = u.name.toLowerCase();
          let rank = 999;
          if (nameLower === cleanQuery) {
            rank = 1;
          } else if (nameLower.startsWith(cleanQuery)) {
            rank = 2;
          } else if (nameLower.split(/[\s,()-]+/).some(w => w.startsWith(cleanQuery))) {
            rank = 3;
          } else if (nameLower.includes(cleanQuery)) {
            rank = 4;
          }
          return { u, rank };
        })
        .filter(item => item.rank < 999)
        .sort((a, b) => a.rank - b.rank || a.u.name.localeCompare(b.u.name))
        .map(item => item.u)
        .slice(0, 8);


  return (
    <div ref={wrapperRef} className={`relative ${compact ? 'w-full' : 'w-full max-w-md'}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          className={`w-full pl-9 pr-8 border border-slate-200 rounded-md bg-white placeholder-slate-400 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm font-medium ${compact ? 'py-1.5' : 'py-2'}`}
          placeholder={placeholder || 'Search universities e.g. BML Munjal, IIT Delhi...'}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={(e) => {
            setIsOpen(true);
            e.target.select();
          }}
        />

        {query && (
          <button
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            onClick={() => { setQuery(''); setIsOpen(false); }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && !loading && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md border border-slate-200 max-h-64 overflow-y-auto animate-slide-up">
          {filtered.length > 0 ? (
            <ul className="py-1 divide-y divide-slate-100">
              {filtered.map(uni => (
                <li
                  key={uni.id}
                  className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-800 flex items-center gap-2.5 transition-colors"
                  onClick={() => { setQuery(uni.name); setIsOpen(false); onSelect(uni.name); }}
                >
                  <div className="w-6 h-6 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-600 flex-shrink-0">
                    {uni.name.charAt(0)}
                  </div>
                  <span className="truncate font-medium">{uni.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-sm text-slate-400 text-center flex flex-col items-center gap-1">
              <Building2 className="w-5 h-5 text-slate-300" />
              <span>No universities found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

