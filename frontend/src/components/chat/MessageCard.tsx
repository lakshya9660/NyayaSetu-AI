import React, { useState } from 'react';
import {
  Scale,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Compass,
  ShieldAlert,
  FileText,
  PhoneCall,
  Share2,
  Sparkles
} from 'lucide-react';
import { ChatMessage, SourceReference } from '../../types';
import { api } from '../../services/api';

interface MessageCardProps {
  message: ChatMessage;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState<number | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(null);

  const isUser = message.sender === 'user';
  const isInsufficient = message.retrieval_status === 'insufficient_evidence';
  const isHi = message.language === 'hi' || /[\u0900-\u097F]/.test(message.content);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = async (rating: number) => {
    setFeedbackGiven(rating);
    setShowCommentBox(true);
    try {
      await api.sendFeedback({
        message_id: message.id,
        rating,
        comments: feedbackComment || undefined
      });
    } catch (err) {
      console.warn("Feedback save error:", err);
    }
  };

  const submitComment = async () => {
    if (feedbackGiven !== null) {
      await api.sendFeedback({
        message_id: message.id,
        rating: feedbackGiven,
        comments: feedbackComment
      });
      setShowCommentBox(false);
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-5 animate-message-in">
        <div className="flex items-start gap-2.5 max-w-2xl group">
          <div className="bg-gradient-to-r from-[#7D2434] via-[#9E394C] to-[#B74B5B] text-white rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-md shadow-[#9E394C]/25 hover:shadow-lg transition-all text-sm sm:text-base leading-relaxed border border-[#B74B5B]/30">
            <p className="whitespace-pre-wrap">{message.content}</p>
            <div className="flex items-center justify-end gap-2 mt-2 pt-1 border-t border-white/20 text-[11px] text-rose-100">
              <span>{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#FFF2F4] text-[#8C2839] border border-[#F0BAC3] flex items-center justify-center shrink-0 mt-1 shadow-xs group-hover:scale-105 transition-transform font-bold">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6 animate-message-in">
      <div className="flex items-start gap-3 max-w-3xl w-full group">
        {/* Assistant Floating Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7D2434] via-[#9E394C] to-[#B74B5B] text-white flex items-center justify-center shrink-0 mt-1 shadow-md shadow-[#9E394C]/25 group-hover:scale-105 transition-transform">
          <Scale className="w-5 h-5 text-white" />
        </div>

        {/* Assistant Response Card */}
        <div className="flex-1 bg-white border-2 border-[#E8BAC3] hover:border-[#D98293] rounded-2xl rounded-tl-sm p-5 sm:p-6 shadow-md hover:shadow-lg transition-all space-y-4 relative">
          {/* Top Status & Quick Action Floating Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FCEEF0] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#6B1B29] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#9E394C]" />
                {isHi ? "न्यायसेतु कानूनी स्पष्टीकरण • NyayaSetu Explanation" : "NyayaSetu Explanation"}
              </span>

              {isInsufficient ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  {isHi ? "अपर्याप्त वैधानिक साक्ष्य (Insufficient Evidence)" : "Insufficient Statutory Evidence"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFF2F4] text-[#6B1B29] border border-[#F8D8DC] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B74B5B] animate-pulse"></span>
                  <BookOpen className="w-3.5 h-3.5 text-[#9E394C]" />
                  {isHi ? `सत्यापित साक्ष्य (${message.sources_cited?.length || 0} स्रोत) • Grounded` : `Evidence Grounded (${message.sources_cited?.length || 0} Sources)`}
                </span>
              )}
            </div>

            {/* Quick Actions Pill */}
            <div className="flex items-center gap-1.5 bg-[#FFFDFE] border border-[#F0BAC3] rounded-xl p-1 shadow-xs">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B1B29] hover:text-[#481822] px-2.5 py-1 rounded-lg hover:bg-[#FFF2F4] transition-all active:scale-95"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isHi ? 'कॉपी हो गया!' : 'Copied') : (isHi ? 'कॉपी करें' : 'Copy')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleFeedback(1)}
                className={`p-1.5 rounded-lg hover:bg-[#FFF2F4] transition-all active:scale-90 ${
                  feedbackGiven === 1 ? 'text-[#9E394C] font-bold bg-[#FFF2F4] shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Helpful response"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleFeedback(-1)}
                className={`p-1.5 rounded-lg hover:bg-[#FFF2F4] transition-all active:scale-90 ${
                  feedbackGiven === -1 ? 'text-rose-600 font-bold bg-[#FFF2F4] shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Inaccurate or unhelpful"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Insufficient Evidence Warning Banner (if applicable) */}
          {isInsufficient && (
            <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 leading-relaxed">
                <p className="font-bold">{isHi ? "वैधानिक सीमा सूचना (Statutory Limitation Notice):" : "Statutory Limitation Notice:"}</p>
                <p>
                  {isHi
                    ? "नागरिकों को भ्रामक जानकारी से बचाने के लिए, न्यायसेतु केवल सत्यापित और आधिकारिक कानूनी अभिलेखों के आधार पर ही उत्तर प्रदान करता है।"
                    : "To protect citizens from speculative or fabricated advice, NyayaSetu strictly refrains from answering when verified provisions are absent from the indexed repository."}
                </p>
              </div>
            </div>
          )}

          {/* 1. Main Answer Explanation */}
          <div className="text-slate-900 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
            {message.content}
          </div>

          {/* 2. Key Supported Points */}
          {message.supported_points && message.supported_points.length > 0 && (
            <div className="bg-[#FFF9FA] border border-[#F0BAC3] rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#6B1B29] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#9E394C] stroke-[3]" />
                {isHi ? "सत्यापित कानूनी प्रावधान एवं मुख्य बिंदु • Verified Key Points" : "Verified Legal Provisions & Key Points"}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                {message.supported_points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#9E394C] shrink-0 mt-1.5"></span>
                    <span className="leading-relaxed font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Suggested General Next Steps */}
          {message.suggested_next_steps && message.suggested_next_steps.length > 0 && (
            <div className="bg-white border border-[#F0BAC3] rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#6B1B29] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#9E394C]" />
                {isHi ? "सुझाए गए सामान्य अगले कदम • Suggested General Next Steps" : "Suggested General Next Steps"}
              </h4>
              <ol className="space-y-2 text-xs sm:text-sm text-slate-800 list-decimal list-inside pl-1">
                {message.suggested_next_steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed font-medium pl-1">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* 4. Retrieved Sources List */}
          {message.sources_cited && message.sources_cited.length > 0 && (
            <div className="border border-[#F0BAC3] rounded-2xl overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setSourcesOpen(!sourcesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#FFF2F4] hover:bg-[#FCEEF0] text-xs font-black text-[#6B1B29] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#9E394C]" />
                  {isHi ? `पुनर्प्राप्त आधिकारिक स्रोत (${message.sources_cited.length}) • Retrieved Official Sources` : `Retrieved Official Sources (${message.sources_cited.length})`}
                </span>
                {sourcesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {sourcesOpen && (
                <div className="p-4 space-y-3 bg-white divide-y divide-[#FCEEF0]">
                  {message.sources_cited.map((source, sIdx) => (
                    <div key={sIdx} className="pt-3 first:pt-0 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#9E394C] shrink-0" />
                          {source.document_title}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          {source.page && (
                            <span className="bg-[#FFF2F4] text-[#8C2839] border border-[#F0BAC3] px-2 py-0.5 rounded font-mono font-bold">
                              {isHi ? `पृष्ठ ${source.page}` : `Page ${source.page}`}
                            </span>
                          )}
                          {source.section && (
                            <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold truncate max-w-[220px]">
                              {source.section}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-800 bg-[#FFFDFE] p-3 rounded-xl border border-[#F0BAC3] font-serif italic text-xs leading-relaxed">
                        "{source.excerpt}"
                      </p>
                      {source.official_url && (
                        <a
                          href={source.official_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#8C2839] hover:text-[#5A1C27] font-bold text-[11px] hover:translate-x-0.5 transition-transform"
                        >
                          <span>{isHi ? "आधिकारिक पोर्टल संदर्भ • Official Portal Link" : "Official Portal Reference"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. Where to Seek Professional / Legal Aid */}
          {message.legal_aid_referral && (
            <div className="bg-gradient-to-r from-[#FFF0F2] via-[#FCEEF0] to-[#FFF5F6] border-2 border-[#E8BAC3] rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-xs">
              <Compass className="w-5 h-5 text-[#9E394C] shrink-0 mt-0.5" />
              <div className="space-y-2 text-xs sm:text-sm text-[#481822] flex-1">
                <h5 className="font-black text-[#6B1B29] flex items-center gap-1.5">
                  {isHi ? "आधिकारिक विधिक सहायता मार्गदर्शन • Official Legal Aid Navigation:" : "Official Legal Aid Navigation:"}
                </h5>
                <p className="leading-relaxed font-semibold">{message.legal_aid_referral}</p>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href="https://nalsa.gov.in/legal-aid/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8C2839] to-[#B74B5B] text-white font-black text-xs hover:from-[#6B1B29] hover:to-[#8C2839] transition-all shadow-sm"
                  >
                    <span>{isHi ? "नालसा (NALSA) ऑनलाइन पोर्टल" : "NALSA Online Portal"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-[#6B1B29] font-black text-xs bg-white border border-[#E8BAC3] px-3.5 py-2 rounded-xl shadow-2xs">
                    <PhoneCall className="w-3.5 h-3.5 text-[#9E394C]" />
                    {isHi ? "राष्ट्रीय हेल्पलाइन: 15100 (टोल-फ्री)" : "Helpline: 15100 (Toll-Free)"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 6. Legal Disclaimer & Feedback Bar */}
          <div className="pt-3 border-t border-[#FCEEF0] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <p className="italic text-[11px] leading-tight max-w-md text-slate-500 font-medium">
              {message.safety_notice || (isHi ? "सामान्य कानूनी जानकारी। कोई व्यक्तिगत कानूनी सलाह नहीं।" : "General legal information only. Not legal advice.")}
            </p>
          </div>

          {/* Feedback comment expansion modal/drawer */}
          {showCommentBox && (
            <div className="pt-2 flex items-center gap-2 animate-message-in">
              <input
                type="text"
                placeholder={isHi ? "वैकल्पिक प्रतिक्रिया: क्या कोई कानूनी संदर्भ अधूरा था?" : "Optional feedback: Was any citation inaccurate or incomplete?"}
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                className="flex-1 text-xs border border-[#F0BAC3] rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#9E394C] bg-white font-medium"
              />
              <button
                type="button"
                onClick={submitComment}
                className="px-4 py-2.5 bg-gradient-to-r from-[#8C2839] to-[#B74B5B] text-white rounded-xl text-xs font-bold hover:from-[#6B1B29] hover:to-[#8C2839] transition-colors shadow-xs"
              >
                {isHi ? "प्रतिक्रिया भेजें" : "Submit Feedback"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
