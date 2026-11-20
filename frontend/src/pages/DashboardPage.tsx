import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  MessageSquare,
  Compass,
  BookOpen,
  ArrowRight,
  Trash2,
  Clock,
  Sparkles,
  ShieldAlert,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';
import { Conversation, LegalResource } from '../types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [resources, setResources] = useState<LegalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickQuestion, setQuickQuestion] = useState('');
  const [startingChat, setStartingChat] = useState(false);

  const loadData = async () => {
    try {
      const [convs, resList] = await Promise.all([
        api.getConversations(),
        api.getResources()
      ]);
      setConversations(convs);
      setResources(resList.slice(0, 3));
    } catch (err) {
      console.warn("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim() || startingChat) return;

    setStartingChat(true);
    try {
      const conv = await api.createConversation({
        title: quickQuestion.slice(0, 40) + (quickQuestion.length > 40 ? '...' : ''),
        language: language || user?.preferred_language || 'en'
      });
      // Send the first message
      await api.sendMessage(conv.id, {
        content: quickQuestion,
        language: language || user?.preferred_language || 'en'
      });
      navigate(`/chat/${conv.id}`);
    } catch (err) {
      console.error("Failed to launch conversation:", err);
      navigate('/chat');
    } finally {
      setStartingChat(false);
    }
  };

  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this conversation? This action cannot be undone.')) return;
    try {
      await api.deleteConversation(id);
      setConversations(conversations.filter(c => c.id !== id));
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  };

  const exampleQuestions = language === 'hi' ? [
    { text: "धारा 12 के तहत मुफ्त कानूनी सहायता कौन प्राप्त कर सकता है?", topic: "विधिक सहायता (NALSA)" },
    { text: "दोषपूर्ण सामान मिलने पर उपभोक्ता फोरम में शिकायत कैसे करें?", topic: "उपभोक्ता अधिकार" },
    { text: "मॉडल टेनेंसी एक्ट के तहत मकान मालिक कितना सिक्योरिटी डिपॉजिट मांग सकता है?", topic: "किरायेदारी कानून" },
    { text: "बिना हेलमेट गाड़ी चलाने पर धारा 194D में कितना चालान लगता है?", topic: "मोटर वाहन नियम" }
  ] : [
    { text: "Who qualifies for free legal services under Section 12?", topic: "Legal Aid" },
    { text: "How do I file a consumer complaint for defective goods?", topic: "Consumer Rights" },
    { text: "What is the maximum security deposit a landlord can demand?", topic: "Tenancy" },
    { text: "What is the penalty for driving without helmet under Sec 194D?", topic: "Motor Vehicles Act" }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFE] py-8 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section - Vibrant Rose Gold Gradient with White High Contrast */}
        <div className="bg-gradient-to-r from-[#7D2434] via-[#9E394C] to-[#681C2A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D98293]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-xs border border-white/30">
              <Sparkles className="w-4 h-4 text-rose-200" />
              <span>{t('dashBadge')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              {t('dashWelcome')}, {user?.full_name || (language === 'hi' ? 'नागरिक' : 'Citizen')}
            </h1>
            <p className="text-rose-100 text-xs sm:text-sm leading-relaxed font-medium">
              {t('dashSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/chat"
              className="px-5 py-3 rounded-xl bg-white hover:bg-[#FFF5F6] text-[#7D2434] font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-[#9E394C]" />
              <span>{t('dashNewChat')}</span>
            </Link>
            <Link
              to="/legal-aid"
              className="px-5 py-3 rounded-xl bg-[#591722]/80 hover:bg-[#591722] text-white border border-rose-300/40 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-2xs"
            >
              <Compass className="w-4 h-4 text-rose-200" />
              <span>{t('dashFindDlsa')}</span>
            </Link>
          </div>
        </div>

        {/* Large Quick Question Input in Rose Gold & White */}
        <div className="bg-white border border-[#F0BAC3] rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-[#5C1A27] uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4 text-[#9E394C]" />
            <span>{t('dashAskHeading')}</span>
          </h2>

          <form onSubmit={handleStartChat} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={quickQuestion}
              onChange={(e) => setQuickQuestion(e.target.value)}
              placeholder={t('dashInputPlaceholder')}
              className="flex-1 px-4 py-3 text-sm border border-[#E8BAC3] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 focus:border-[#9E394C] text-slate-900 bg-[#FFFDFE] placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!quickQuestion.trim() || startingChat}
              className="px-6 py-3 bg-gradient-to-r from-[#8C2839] to-[#B74B5B] hover:from-[#731E2D] hover:to-[#9E394C] text-white font-black text-sm rounded-2xl transition-all shrink-0 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-[#9E394C]/25 cursor-pointer active:scale-95"
            >
              <span>{startingChat ? t('dashBtnConsulting') : t('dashBtnAsk')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick-Start Example Questions */}
          <div className="pt-2 space-y-2">
            <p className="text-xs text-slate-600 font-bold">{t('dashCommonPrompt')}</p>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQuickQuestion(q.text)}
                  className="text-xs px-3.5 py-2 rounded-xl bg-[#FFF5F6] hover:bg-[#FCEEF0] hover:text-[#7D2434] hover:border-[#D98293] border border-[#F0BAC3] text-[#5C1A27] font-semibold text-left transition-all shadow-2xs"
                >
                  <span className="font-bold text-[#8C2839] mr-1.5">•</span>
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Grid: Recent Conversations & Saved Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Conversations (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9E394C]" />
                <span>{t('dashRecentHeading')}</span>
              </h3>
              <Link to="/chat" className="text-xs font-bold text-[#8C2839] hover:underline">
                {t('dashViewAll')}
              </Link>
            </div>

            {loading ? (
              <div className="bg-white border border-[#F0BAC3] rounded-2xl p-8 text-center text-xs text-slate-400">
                Loading inquiries...
              </div>
            ) : conversations.length === 0 ? (
              <div className="bg-white border border-dashed border-[#F0BAC3] rounded-2xl p-10 text-center space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF2F4] text-[#9E394C] flex items-center justify-center mx-auto border border-[#E8BAC3]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{t('dashNoConvs')}</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  {t('dashNoConvsSub')}
                </p>
                <Link
                  to="/chat"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9E394C] to-[#B74B5B] text-white font-bold text-xs shadow-sm hover:opacity-95"
                >
                  {t('dashStartFirst')}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {conversations.slice(0, 5).map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => navigate(`/chat/${conv.id}`)}
                    className="p-4 bg-white border border-[#F0BAC3]/90 hover:border-[#9E394C] rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-4 group shadow-2xs hover:shadow-md"
                  >
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#8C2839] transition-colors truncate">
                        {conv.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-medium text-[#7D2434] bg-[#FFF2F4] px-2 py-0.5 rounded-md border border-[#F8D8DC]">{conv.topic}</span>
                        <span>•</span>
                        <span>{new Date(conv.updated_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {conv.language}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleDeleteConversation(conv.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                        title="Delete conversation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#9E394C] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Official Resources & Helplines (1 Column) */}
          <div className="space-y-6">
            <div className="bg-white border border-[#F0BAC3] rounded-3xl p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center justify-between border-b border-[#FCEEF0] pb-3">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#9E394C]" />
                  <span>{t('dashPortalsHeading')}</span>
                </span>
                <Link to="/resources" className="text-xs font-bold text-[#8C2839] hover:underline">
                  {t('dashViewAllPortals')}
                </Link>
              </h3>

              <div className="space-y-2.5">
                {resources.map((res) => (
                  <a
                    key={res.id}
                    href={res.official_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-[#F0BAC3]/70 hover:border-[#9E394C] hover:bg-[#FFF5F6] block transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#8C2839] transition-colors">
                        {res.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#9E394C]" />
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Helpline quick card in Rose Gold */}
            <div className="bg-gradient-to-br from-[#FFF5F6] to-[#FCEEF0] border border-[#F0BAC3] rounded-3xl p-5 space-y-3.5 text-xs text-[#5C1A27] shadow-2xs">
              <h4 className="font-black text-[#681C2A] text-sm flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#9E394C]" />
                <span>{t('dashHelplineHeading')}</span>
              </h4>
              <div className="space-y-2 font-semibold">
                <div className="flex justify-between items-center py-1.5 border-b border-[#F0BAC3]/60">
                  <span className="text-slate-700">NALSA National Legal Aid</span>
                  <strong className="text-[#7D2434] font-mono text-sm font-black">15100</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#F0BAC3]/60">
                  <span className="text-slate-700">National Consumer Helpline</span>
                  <strong className="text-[#7D2434] font-mono text-sm font-black">1915</strong>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-700">National Emergency Support</span>
                  <strong className="text-[#7D2434] font-mono text-sm font-black">112</strong>
                </div>
              </div>
              <Link
                to="/legal-aid"
                className="mt-2 w-full py-2.5 bg-gradient-to-r from-[#9E394C] to-[#B74B5B] hover:from-[#8C2839] hover:to-[#9E394C] text-white rounded-xl text-xs font-black text-center block transition-all shadow-md shadow-[#9E394C]/20"
              >
                {t('dashFindDlsa')}
              </Link>
            </div>
          </div>
        </div>

        {/* Non-Lawyer Disclaimer Footer Banner */}
        <div className="bg-[#FFF2F4] border border-[#F0BAC3] rounded-2xl p-4 text-xs text-[#5C1A27] flex items-start gap-3 shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-[#9E394C] shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            <strong className="font-black text-[#7D2434]">Notice / सूचना:</strong> {t('dashDisclaimerNotice')}
          </p>
        </div>
      </div>
    </div>
  );
};
