import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Building2,
  MapPin,
  Phone,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Scale
} from 'lucide-react';
import { api } from '../services/api';
import { LegalAidDirectoryEntry } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const LegalAidPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [entries, setEntries] = useState<LegalAidDirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [info, setInfo] = useState<{ official_portal: string; national_helpline: string; description: string; guidance: string } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [data, aidInfo] = await Promise.all([
        api.searchLegalAid({
          state: selectedState === 'All' ? undefined : selectedState,
          authority_type: selectedType === 'All' ? undefined : selectedType,
          district: searchDistrict.trim() || undefined
        }),
        api.getLegalAidInfo()
      ]);
      setEntries(data);
      setInfo(aidInfo);
    } catch (err) {
      console.warn("Failed to load legal aid directory:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedState, selectedType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const states = ['All', 'Delhi', 'Maharashtra', 'Karnataka', 'Uttar Pradesh'];

  return (
    <div className="min-h-screen bg-[#FFFDFE] py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner - Radiant Rose Gold Gradient */}
        <div className="bg-gradient-to-r from-[#7D2434] via-[#9E394C] to-[#681C2A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D98293]/40 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-xs border border-white/30">
            <Compass className="w-4 h-4 text-rose-200" />
            <span>{t('aidBadge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {t('aidTitle')}
          </h1>

          <p className="text-rose-100 text-xs sm:text-sm max-w-3xl leading-relaxed font-medium">
            {t('aidSubtitle')}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <a
              href={info?.official_portal || "https://nalsa.gov.in/legal-aid/"}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-white hover:bg-rose-50 text-[#7D2434] font-black rounded-xl shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>{t('aidPortalBtn')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex items-center gap-2 bg-[#591722]/80 px-4 py-2.5 rounded-xl border border-rose-300/40 text-white font-bold">
              <Phone className="w-4 h-4 text-rose-200" />
              <span>{t('aidHelpline')}</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#F0BAC3] rounded-3xl p-6 shadow-sm space-y-4">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* State Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">{t('aidFilterState')}</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full text-xs font-semibold border border-[#E8BAC3] rounded-xl px-3 py-2.5 bg-[#FFFDFE] focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-800"
              >
                {states.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? t('aidAll') : s}</option>
                ))}
              </select>
            </div>

            {/* Authority Type Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">{t('aidFilterType')}</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-xs font-semibold border border-[#E8BAC3] rounded-xl px-3 py-2.5 bg-[#FFFDFE] focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-800"
              >
                <option value="All">{t('aidAllAuthorities')}</option>
                <option value="NALSA">NALSA (National Level)</option>
                <option value="SLSA">SLSA (State Level)</option>
                <option value="DLSA">DLSA (District Level)</option>
              </select>
            </div>

            {/* District Search */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">{t('aidFilterDistrict')}</label>
              <input
                type="text"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                placeholder={t('aidPlaceholderDistrict')}
                className="w-full text-xs border border-[#E8BAC3] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-900 bg-[#FFFDFE]"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#9E394C] to-[#B74B5B] hover:from-[#8C2839] hover:to-[#9E394C] text-white font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#9E394C]/25 cursor-pointer active:scale-95"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t('aidSearchBtn')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Directory Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
            <span>{entries.length} {t('aidShowingCount')}</span>
            <span className="text-[#8C2839]">{t('aidVerifiedPortals')}</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-[#F0BAC3]">
              Loading verified directory records...
            </div>
          ) : entries.length === 0 ? (
            <div className="bg-white border border-dashed border-[#F0BAC3] rounded-2xl p-10 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">
                {language === 'hi' ? 'इस खोज के लिए कोई स्थानीय रिकॉर्ड नहीं मिला' : 'No local records found for this specific search'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                {language === 'hi'
                  ? 'यदि आपका जिला इस सूची में नहीं है, तो आप सीधे अपने जिला न्यायालय के DLSA फ्रंट ऑफिस या आधिकारिक NALSA पोर्टल से संपर्क कर सकते हैं।'
                  : 'If your specific district is not in this directory, do not worry. You can locate your District Legal Services Authority front office directly at your local District Court or through the official NALSA portal.'}
              </p>
              <a
                href="https://nalsa.gov.in/legal-aid/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9E394C] to-[#B74B5B] text-white font-bold text-xs shadow-sm"
              >
                <span>{t('aidPortalBtn')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 bg-white border border-[#F0BAC3]/90 hover:border-[#9E394C] rounded-2xl shadow-2xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FFF2F4] text-[#8C2839] border border-[#F8D8DC]">
                      {entry.authority_type} • {entry.state}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{entry.office_name}</h3>
                    <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                      {entry.address && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span>{entry.address}</span>
                        </div>
                      )}
                      {entry.contact_number && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#9E394C] shrink-0" />
                          <span className="font-bold text-slate-900">{entry.contact_number}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#FCEEF0] flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Jurisdiction: {entry.district || entry.state}</span>
                    <a
                      href={entry.official_portal_url || "https://nalsa.gov.in/legal-aid/"}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#8C2839] hover:underline flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
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
