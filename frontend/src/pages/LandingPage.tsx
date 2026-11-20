import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  ShieldCheck,
  BookOpen,
  Compass,
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  PhoneCall,
  ExternalLink,
  HelpCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO SECTION - Rose Gold & White Aesthetic */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F6] via-[#FDF7F8] to-white text-slate-900 pt-16 sm:pt-20 pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#F0BAC3]">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#CF6D80_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-7 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F2] border-2 border-[#E8BAC3] text-[#7D2434] text-xs font-black uppercase tracking-wider shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#9E394C]" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Main Hero Headings */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.15]">
            {t('heroTitle1')}<br />
            <span className="text-[#8C2839] font-black inline-block mt-1">
              {t('heroTitle2')}
            </span>
          </h1>

          {/* Hero Paragraph */}
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('heroDesc')}
          </p>

          {/* CTA Buttons in High-Contrast Rose Gold & White */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/chat"
              className="px-7 py-3.5 rounded-2xl bg-[#8C2839] hover:bg-[#6B1B29] text-white font-black text-base shadow-lg shadow-[#8C2839]/35 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95 border border-[#B74B5B]/40"
            >
              <span className="text-white font-black">{t('askQuestionBtn')}</span>
              <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
            </Link>
            <Link
              to="/legal-aid"
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-[#FFF2F4] text-[#7D2434] border-2 border-[#D98293] font-black text-base transition-all shadow-xs flex items-center gap-2 hover:-translate-y-0.5 active:scale-95"
            >
              <Compass className="w-5 h-5 text-[#9E394C] stroke-[2.5]" />
              <span>{t('findAidBtn')}</span>
            </Link>
            <Link
              to="/resources"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FFF5F6] text-slate-800 hover:text-[#7D2434] border border-[#F0BAC3] font-bold text-base transition-colors shadow-2xs"
            >
              {t('exploreResBtn')}
            </Link>
          </div>

          {/* Non-Lawyer Transparency Disclaimer Pill */}
          <div className="pt-3 max-w-2xl mx-auto">
            <div className="bg-white border border-[#F0BAC3] rounded-xl p-3 text-xs text-slate-700 flex items-center justify-center gap-2 shadow-2xs font-medium">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t('disclaimerPill')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS & FEATURES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-16">
          <h2 className="text-xs uppercase font-black tracking-widest text-[#8C2839]">{t('corePrinciples')}</h2>
          <p className="text-3xl font-black text-slate-950 tracking-tight">
            {t('principlesTitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 shadow-xs space-y-3 hover:border-[#D98293] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFF2F4] text-[#8C2839] flex items-center justify-center border border-[#F8D8DC]">
              <CheckCircle2 className="w-6 h-6 text-[#9E394C]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('p1Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t('p1Desc')}
            </p>
          </div>

          <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 shadow-xs space-y-3 hover:border-[#D98293] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFF2F4] text-[#8C2839] flex items-center justify-center border border-[#F8D8DC]">
              <FileText className="w-6 h-6 text-[#9E394C]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('p2Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t('p2Desc')}
            </p>
          </div>

          <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 shadow-xs space-y-3 hover:border-[#D98293] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFF2F4] text-[#8C2839] flex items-center justify-center border border-[#F8D8DC]">
              <Compass className="w-6 h-6 text-[#9E394C]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('p3Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t('p3Desc')}
            </p>
          </div>

          <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 shadow-xs space-y-3 hover:border-[#D98293] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFF2F4] text-[#8C2839] flex items-center justify-center border border-[#F8D8DC]">
              <Lock className="w-6 h-6 text-[#9E394C]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('p4Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t('p4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#FFF8F9] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#F0BAC3]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase font-black tracking-widest text-[#8C2839]">{t('howItWorks')}</h2>
            <p className="text-3xl font-black text-slate-950">{t('howItWorksSub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#F0BAC3] text-center space-y-2.5 shadow-xs hover:shadow-md transition-all">
              <span className="w-9 h-9 rounded-xl bg-[#8C2839] text-white font-black inline-flex items-center justify-center text-sm shadow-sm">1</span>
              <h4 className="font-bold text-sm text-slate-900">{t('step1Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{t('step1Desc')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#F0BAC3] text-center space-y-2.5 shadow-xs hover:shadow-md transition-all">
              <span className="w-9 h-9 rounded-xl bg-[#8C2839] text-white font-black inline-flex items-center justify-center text-sm shadow-sm">2</span>
              <h4 className="font-bold text-sm text-slate-900">{t('step2Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{t('step2Desc')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#F0BAC3] text-center space-y-2.5 shadow-xs hover:shadow-md transition-all">
              <span className="w-9 h-9 rounded-xl bg-[#8C2839] text-white font-black inline-flex items-center justify-center text-sm shadow-sm">3</span>
              <h4 className="font-bold text-sm text-slate-900">{t('step3Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{t('step3Desc')}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#F0BAC3] text-center space-y-2.5 shadow-xs hover:shadow-md transition-all">
              <span className="w-9 h-9 rounded-xl bg-[#8C2839] text-white font-black inline-flex items-center justify-center text-sm shadow-sm">4</span>
              <h4 className="font-bold text-sm text-slate-900">{t('step4Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{t('step4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR LEGAL TOPICS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs uppercase font-black tracking-widest text-[#8C2839]">{t('popularTopics')}</h2>
          <p className="text-3xl font-black text-slate-950">{t('popularTopicsSub')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/chat"
            className="p-6 bg-white border border-[#F0BAC3] rounded-2xl hover:border-[#D98293] hover:shadow-md transition-all block space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#8C2839] uppercase bg-[#FFF2F4] px-3 py-1 rounded-full border border-[#F0BAC3]">{t('topic1Tag')}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#8C2839] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#8C2839] transition-colors">{t('topic1Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t('topic1Desc')}
            </p>
          </Link>

          <Link
            to="/chat"
            className="p-6 bg-white border border-[#F0BAC3] rounded-2xl hover:border-[#D98293] hover:shadow-md transition-all block space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#8C2839] uppercase bg-[#FFF2F4] px-3 py-1 rounded-full border border-[#F0BAC3]">{t('topic2Tag')}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#8C2839] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#8C2839] transition-colors">{t('topic2Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t('topic2Desc')}
            </p>
          </Link>

          <Link
            to="/chat"
            className="p-6 bg-white border border-[#F0BAC3] rounded-2xl hover:border-[#D98293] hover:shadow-md transition-all block space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#8C2839] uppercase bg-[#FFF2F4] px-3 py-1 rounded-full border border-[#F0BAC3]">{t('topic3Tag')}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#8C2839] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#8C2839] transition-colors">{t('topic3Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t('topic3Desc')}
            </p>
          </Link>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-[#FFF8F9] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#F0BAC3]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase font-black tracking-widest text-[#8C2839]">{t('faqTitle')}</h2>
            <p className="text-3xl font-black text-slate-950">{t('faqHeading')}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-[#F0BAC3] space-y-2 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900">{t('faq1Q')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('faq1A')}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#F0BAC3] space-y-2 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900">{t('faq2Q')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('faq2A')}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#F0BAC3] space-y-2 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900">{t('faq3Q')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('faq3A')}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#F0BAC3] space-y-2 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900">{t('faq4Q')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('faq4A')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER in High-Contrast Rose Gold & White */}
      <section className="bg-gradient-to-r from-[#6B1B29] via-[#8C2839] to-[#5C1A27] text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black">{t('ctaTitle')}</h2>
          <p className="text-rose-100 text-sm max-w-xl mx-auto leading-relaxed font-medium">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/chat"
              className="px-6 py-3 rounded-xl bg-white hover:bg-[#FFF2F4] font-black text-sm text-[#7D2434] shadow-md transition-all active:scale-95"
            >
              {t('ctaInquiry')}
            </Link>
            <Link
              to="/legal-aid"
              className="px-6 py-3 rounded-xl bg-[#481822] hover:bg-[#38121A] font-bold text-sm text-white border border-[#D98293]/60 transition-colors"
            >
              {t('ctaDirectory')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
