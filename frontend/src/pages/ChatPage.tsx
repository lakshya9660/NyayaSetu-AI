import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Plus,
  Trash2,
  Send,
  Scale,
  Sparkles,
  ShieldAlert,
  Search,
  Globe,
  Loader2,
  AlertCircle,
  Menu,
  X,
  Compass,
  ArrowRight,
  BookOpen,
  HelpCircle,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';
import { Conversation, ChatMessage } from '../types';
import { MessageCard } from '../components/chat/MessageCard';

export const ChatPage: React.FC = () => {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('General Legal Information');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>(language || 'en');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  // Pure container-bound scroll - NEVER scrolls parent window/body
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  // Load user conversations list
  const loadConversations = async () => {
    if (!user) return;
    try {
      const list = await api.getConversations();
      setConversations(list);
    } catch (err) {
      console.warn("Could not load conversations:", err);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [user]);

  // Load active conversation messages
  useEffect(() => {
    if (!conversationId) {
      setActiveConv(null);
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const detail = await api.getConversation(conversationId);
        setActiveConv(detail);
        setMessages(detail.messages || []);
        setSelectedLanguage((detail.language as 'en' | 'hi') || 'en');
        setSelectedTopic(detail.topic || 'General Legal Information');
      } catch (err) {
        console.error("Failed to load conversation:", err);
        navigate('/chat');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  const handleNewConversation = async () => {
    if (!user) {
      // Guest local reset
      setActiveConv(null);
      setMessages([]);
      navigate('/chat');
      return;
    }

    try {
      const newConv = await api.createConversation({
        title: "New Legal Inquiry",
        language: selectedLanguage,
        topic: selectedTopic
      });
      setConversations([newConv, ...conversations]);
      navigate(`/chat/${newConv.id}`);
    } catch (err) {
      console.error("Failed to create conversation:", err);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputContent.trim();
    if (!query || sending) return;

    // Auto-detect Hindi if input contains Devanagari script
    const isHindi = /[\u0900-\u097F]/.test(query);
    const activeLang = isHindi ? 'hi' : selectedLanguage;
    if (isHindi && selectedLanguage !== 'hi') {
      setSelectedLanguage('hi');
    }

    setInputContent('');
    setSending(true);

    try {
      let currentId = conversationId;

      // If user is authenticated and no conversation is selected, create one first
      if (user && !currentId) {
        const words = query.split(' ');
        const autoTitle = words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');
        const newConv = await api.createConversation({
          title: autoTitle,
          language: activeLang,
          topic: selectedTopic
        });
        currentId = newConv.id;
        setConversations([newConv, ...conversations]);
        navigate(`/chat/${currentId}`, { replace: true });
      }

      if (user && currentId) {
        // Optimistically add user query to UI
        const tempUserMsg: ChatMessage = {
          id: `temp-${Date.now()}`,
          conversation_id: currentId,
          sender: 'user',
          content: query,
          language: activeLang,
          topic: selectedTopic,
          sources_cited: [],
          supported_points: [],
          suggested_next_steps: [],
          created_at: new Date().toISOString()
        };
        setMessages((prev) => [...prev, tempUserMsg]);

        // Call backend API
        const assistantMsg = await api.sendMessage(currentId, {
          content: query,
          language: activeLang,
          topic: selectedTopic
        });

        // Replace/Append with verified assistant message
        setMessages((prev) => [...prev.filter((m) => m.id !== tempUserMsg.id), tempUserMsg, assistantMsg]);
        loadConversations();
      } else {
        // Guest mode fallback
        const guestUserMsg: ChatMessage = {
          id: `guest-${Date.now()}`,
          conversation_id: 'guest',
          sender: 'user',
          content: query,
          language: selectedLanguage,
          topic: selectedTopic,
          sources_cited: [],
          supported_points: [],
          suggested_next_steps: [],
          created_at: new Date().toISOString()
        };
        setMessages((prev) => [...prev, guestUserMsg]);

        // Request login for preserved sessions
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `guest-resp-${Date.now()}`,
              conversation_id: 'guest',
              sender: 'assistant',
              content: "To consult the verified legal repository with continuous history tracking, please sign in or register a free citizen account.",
              language: selectedLanguage,
              topic: selectedTopic,
              retrieval_status: 'insufficient_evidence',
              sources_cited: [],
              supported_points: [
                "Sign in to preserve your legal inquiry history.",
                "All inquiries are grounded in official Indian statutes."
              ],
              suggested_next_steps: [
                "Sign in to unlock full statutory citations.",
                "Or consult https://nalsa.gov.in/legal-aid/ directly."
              ],
              legal_aid_referral: "National Legal Services Authority (NALSA): https://nalsa.gov.in/legal-aid/ | Helpline: 15100",
              safety_notice: "General legal information only. Not legal advice.",
              created_at: new Date().toISOString()
            }
          ]);
        }, 600);
      }
    } catch (err: any) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          conversation_id: conversationId || 'error',
          sender: 'assistant',
          content: `Unable to process legal inquiry: ${err.message || 'Please check your connection and try again.'}`,
          language: selectedLanguage,
          retrieval_status: 'error',
          sources_cited: [],
          supported_points: [],
          suggested_next_steps: ["Verify your question formatting", "Check connection"],
          safety_notice: "General legal information only.",
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this conversation?')) return;
    try {
      await api.deleteConversation(id);
      setConversations(conversations.filter((c) => c.id !== id));
      if (conversationId === id) {
        navigate('/chat');
      }
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const samplePrompts = [
    {
      category: "NALSA Legal Aid",
      title: "Free Legal Aid Criteria",
      query: "Who is entitled to free legal aid under Section 12 of the Legal Services Authorities Act?",
      icon: Scale
    },
    {
      category: "Consumer Rights",
      title: "Consumer Court Procedure",
      query: "What are the consumer dispute commissions and when can I file on e-Daakhil?",
      icon: ShieldCheck
    },
    {
      category: "Tenancy & Housing",
      title: "Rental Security Deposit",
      query: "What is the maximum security deposit a landlord can demand under the Model Tenancy Act?",
      icon: BookOpen
    },
    {
      category: "Motor Vehicles Act",
      title: "Helmet Violation Penalties",
      query: "What is the penalty for driving without a helmet under Section 194D of the Motor Vehicles Act?",
      icon: Compass
    },
    {
      category: "हिन्दी विधिक सहायता",
      title: "मुफ्त वकील कैसे मिलेगा?",
      query: "मुफ्त कानूनी सहायता किसे मिल सकती है और धारा 12 के तहत कैसे आवेदन करें?",
      icon: Globe
    }
  ];

  return (
    <div className="flex-1 flex h-full bg-[#FFFDFE] overflow-hidden relative">
      {/* SIDEBAR: CONVERSATION LIST */}
      <aside
        className={`bg-[#241117] border-r border-[#421D25] text-white w-72 sm:w-80 flex flex-col shrink-0 transition-all duration-300 z-30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute md:relative md:translate-x-0 md:w-0 md:hidden'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#421D25] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-200/80 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#CF6D80]" />
              Inquiry History
            </span>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 text-rose-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleNewConversation}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#9E394C] to-[#B74B5B] hover:from-[#7D2434] hover:to-[#9E394C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#9E394C]/30 transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>New Legal Inquiry</span>
          </button>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Filter inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#180B10] text-xs text-rose-100 rounded-xl border border-[#52222D] focus:outline-none focus:ring-1 focus:ring-[#CF6D80] focus:border-[#CF6D80] placeholder:text-rose-300/40"
            />
            <Search className="w-3.5 h-3.5 text-rose-300/60 absolute left-2.5 top-2" />
          </div>
        </div>

        {/* Conversation List Scroll Area */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {!user ? (
            <div className="p-5 text-center space-y-3">
              <p className="text-xs text-rose-200/70 leading-relaxed">Sign in to save and manage your legal conversations.</p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full px-3 py-2 bg-[#361620] hover:bg-[#481E2B] text-xs rounded-xl text-rose-200 font-bold border border-[#5E2736] transition-colors shadow-xs"
              >
                Sign In to NyayaSetu
              </button>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-6 text-center text-xs text-rose-300/60">
              {searchQuery ? 'No matching conversations' : 'No saved conversations'}
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isActive = conversationId === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => navigate(`/chat/${conv.id}`)}
                  className={`group px-3 py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-between gap-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#59202E] to-[#421722] text-white font-bold border border-[#8C3446] shadow-sm'
                      : 'text-rose-100/80 hover:bg-[#33141C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{conv.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteConversation(conv.id, e)}
                    className="p-1 rounded opacity-0 group-hover:opacity-100 hover:text-rose-400 text-rose-300 transition-opacity"
                    title="Delete conversation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-3 border-t border-[#421D25] text-[11px] text-rose-200/60 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#CF6D80]" />
            <span>NyayaSetu RAG</span>
          </span>
          <span className="font-mono text-[10px] text-rose-300/60">v1.0-gov</span>
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col bg-[#FFFDFE] overflow-hidden relative">
        {/* Floating Glassmorphic Header */}
        <div className="sticky top-0 z-20 backdrop-blur-md bg-white/95 border-b border-[#F0BAC3] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-xl hover:bg-[#FFF2F4] text-slate-700 transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-slate-900 truncate max-w-xs sm:max-w-md">
                  {activeConv?.title || "AI Legal Assistant"}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF2F4] text-[#8C2839] border border-[#F8D8DC]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B74B5B] animate-pulse"></span>
                  Grounded Engine Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Grounded in official Indian statutes • Not a lawyer
              </p>
            </div>
          </div>

          {/* Controls: Topic Selector & Language Toggle */}
          <div className="flex items-center gap-2">
            {/* Topic Dropdown */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="text-xs bg-[#FFFDFE] border border-[#E8BAC3] rounded-xl px-2.5 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-[#9E394C] hover:bg-[#FFF2F4] transition-colors"
            >
              <option value="General Legal Information">All Statutory Topics</option>
              <option value="Legal Aid & Free Legal Services">Legal Aid (NALSA / DLSA)</option>
              <option value="Consumer Protection">Consumer Protection Act</option>
              <option value="Tenancy & Housing">Model Tenancy Act</option>
              <option value="Motor Vehicles Act">Motor Vehicles Act (1988/2019)</option>
            </select>

            {/* Language Switch */}
            <div className="flex items-center rounded-xl bg-white p-0.5 border-2 border-[#D98293] shadow-xs">
              <button
                type="button"
                onClick={() => setSelectedLanguage('en')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                  selectedLanguage === 'en'
                    ? 'bg-gradient-to-r from-[#7D2434] to-[#B74B5B] text-white shadow-xs'
                    : 'text-[#7D2434] hover:bg-[#FFF2F4]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setSelectedLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                  selectedLanguage === 'hi'
                    ? 'bg-gradient-to-r from-[#7D2434] to-[#B74B5B] text-white shadow-xs'
                    : 'text-[#7D2434] hover:bg-[#FFF2F4]'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Message Feed (Scroll container strictly isolated) */}
        <div
          ref={chatScrollContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
              <Loader2 className="w-7 h-7 animate-spin text-[#9E394C]" />
              <span className="text-sm font-bold text-slate-600">Retrieving verified statutory records...</span>
            </div>
          ) : messages.length === 0 ? (
            /* Empty State / Floating Welcome Screen */
            <div className="max-w-2xl mx-auto py-8 sm:py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FFF2F4] via-[#FCEEF0] to-[#F8D8DC] text-[#9E394C] flex items-center justify-center mx-auto shadow-sm border border-[#F0BAC3] animate-float-slow">
                <Scale className="w-8 h-8 text-[#9E394C]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {selectedLanguage === 'hi' ? "कानूनी प्रश्न पूछें" : "Ask a Legal Information Question"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {selectedLanguage === 'hi'
                    ? "सवाल केवल अनुमोदित आधिकारिक सरकारी रिकॉर्ड्स से उत्तरित होते हैं। कानूनी धाराएं और NALSA/DLSA कानूनी सहायता विवरण स्वतः प्रदान किए जाते हैं।"
                    : "Questions are answered strictly using approved public documents. Citations and DLSA legal aid referrals are automatically provided."}
                </p>
              </div>

              {/* Floating Interactive Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputContent(p.query);
                      if (p.query.includes("मुफ्त")) setSelectedLanguage('hi');
                    }}
                    className="p-4 bg-white border border-[#F0BAC3] hover:border-[#9E394C] rounded-2xl text-xs space-y-1.5 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 text-left group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C2839] bg-[#FFF2F4] px-2 py-0.5 rounded-full border border-[#F8D8DC]">
                        {p.category}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#9E394C] group-hover:translate-x-1 transition-all" />
                    </div>
                    <span className="font-bold text-slate-900 group-hover:text-[#9E394C] block text-sm transition-colors">
                      {p.title}
                    </span>
                    <span className="text-slate-600 line-clamp-2 leading-relaxed">{p.query}</span>
                  </button>
                ))}
              </div>

              {/* Strict Disclaimer Notice */}
              <div className="bg-[#FFF8F9] border border-[#F0BAC3] rounded-xl p-3 text-xs text-[#6E1C2B] flex items-center justify-center gap-2 shadow-xs max-w-xl mx-auto font-medium">
                <ShieldAlert className="w-4 h-4 text-[#9E394C] shrink-0" />
                <span>Non-lawyer disclaimer: Does not create an attorney-client relationship.</span>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageCard key={msg.id} message={msg} />
              ))}

              {/* Animated Floating Thinking Indicator */}
              {sending && (
                <div className="flex items-start gap-3 max-w-xl animate-message-in">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7D2434] via-[#9E394C] to-[#B74B5B] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#9E394C]/25 animate-pulse">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div className="p-4 bg-white border border-[#F0BAC3] rounded-2xl rounded-tl-sm shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Loader2 className="w-4 h-4 animate-spin text-[#9E394C]" />
                      <span>Grounded Statutory Retrieval in Progress...</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="w-2 h-2 rounded-full bg-[#9E394C] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-[#B74B5B] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-[#CF6D80] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <p className="text-[11px] text-slate-500">Verifying citations against indexed legal acts & official guidelines</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating Input Dock */}
        <div className="p-3 sm:p-4 bg-transparent">
          <div className="max-w-4xl mx-auto space-y-2">
            {/* Floating Capsule Form */}
            <form
              onSubmit={handleSendMessage}
              className="bg-white/95 backdrop-blur-md shadow-lg hover:shadow-xl border border-[#F0BAC3] focus-within:border-[#9E394C] focus-within:ring-2 focus-within:ring-[#9E394C]/20 rounded-2xl p-2 sm:p-2.5 transition-all flex flex-col relative"
            >
              <textarea
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={2}
                placeholder={
                  selectedLanguage === 'hi'
                    ? "अपना कानूनी सवाल यहाँ लिखें (उदा. धारा 12 के तहत मुफ्त कानूनी सहायता कौन पा सकता है?)... (Enter दबाएं)"
                    : "Ask about consumer rights, legal aid eligibility, rent agreements... (Press Enter to send)"
                }
                className="w-full px-3 py-1.5 text-sm bg-transparent focus:outline-none resize-none text-slate-900 placeholder:text-slate-400"
              />

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 px-1 font-medium">
                  <span className="hidden sm:inline">Grounded in Indian Statutes</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Do not share Aadhaar or private IDs</span>
                </div>

                <button
                  type="submit"
                  disabled={!inputContent.trim() || sending}
                  className="p-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-[#9E394C] to-[#B74B5B] hover:from-[#7D2434] hover:to-[#9E394C] text-white disabled:opacity-40 transition-all shadow-md shadow-[#9E394C]/25 flex items-center gap-1.5 text-xs font-bold active:scale-95 cursor-pointer"
                  title="Send inquiry"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
