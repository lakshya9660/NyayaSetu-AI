import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  Calendar,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import { LegalResource } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const ResourcesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [resources, setResources] = useState<LegalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [search, setSearch] = useState('');

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await api.getResources({
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        language: selectedLanguage === 'all' ? undefined : selectedLanguage,
        search: search.trim() || undefined
      });
      setResources(data);
    } catch (err) {
      console.warn("Failed to load resources:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [selectedCategory, selectedLanguage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResources();
  };

  const categories = ['All', 'Legal Aid', 'Consumer Protection', 'General Legal Information'];

  return (
    <div className="min-h-screen bg-[#FFFDFE] py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner - Radiant Rose Gold Gradient */}
        <div className="bg-gradient-to-r from-[#7D2434] via-[#9E394C] to-[#681C2A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D98293]/40 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-xs border border-white/30">
            <BookOpen className="w-3.5 h-3.5 text-rose-200" />
            <span>{t('resBadge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {t('resTitle')}
          </h1>

          <p className="text-rose-100 text-xs sm:text-sm max-w-3xl leading-relaxed font-medium">
            {t('resSubtitle')}
          </p>
        </div>

        {/* Search & Filter Bar in Rose Gold & White */}
        <div className="bg-white border border-[#F0BAC3] rounded-3xl p-6 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1">{t('resSearchKw')}</label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('resPlaceholderSearch')}
                  className="w-full text-xs border border-[#E8BAC3] rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-900 bg-[#FFFDFE]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">{t('resCategory')}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-semibold border border-[#E8BAC3] rounded-xl px-3 py-2.5 bg-[#FFFDFE] focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-800"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'All' ? t('resAllCategories') : c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">{t('resLanguage')}</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full text-xs font-semibold border border-[#E8BAC3] rounded-xl px-3 py-2.5 bg-[#FFFDFE] focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-800"
              >
                <option value="all">{t('resAllLanguages')}</option>
                <option value="English">English</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="Bilingual">Bilingual</option>
              </select>
            </div>
          </form>
        </div>

        {/* Resources Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
            <span>{resources.length} {t('resShowingCount')}</span>
            <span className="text-[#8C2839]">All links lead to official government domains (.gov.in, .nic.in)</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-[#F0BAC3]">
              Loading verified official resources...
            </div>
          ) : resources.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-2xl border border-[#F0BAC3]">
              No resources found matching the criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white border border-[#F0BAC3]/90 hover:border-[#9E394C] rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFF2F4] text-[#8C2839] border border-[#F8D8DC]">
                        {res.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#8C2839] transition-colors">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#FCEEF0] space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{res.source_organization}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400">
                        {res.last_verified_date ? `Verified: ${res.last_verified_date}` : 'Verified Public Portal'}
                      </span>
                      <a
                        href={res.official_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#8C2839] hover:underline"
                      >
                        <span>Access Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
