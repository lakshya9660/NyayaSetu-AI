import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scale, Globe, User, LogOut, ShieldCheck, Cpu, Menu, X, BookOpen, MessageSquare, Compass, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { api } from '../../services/api';
import { HealthStatus } from '../../types';

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    api.getHealth()
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: t('dashboard'), path: '/dashboard', icon: Scale, authOnly: true },
    { name: t('askQuestion'), path: '/chat', icon: MessageSquare },
    { name: t('findLegalAid'), path: '/legal-aid', icon: Compass },
    { name: t('exploreResources'), path: '/resources', icon: BookOpen },
    { name: t('legalSources'), path: '/sources', icon: FileText },
  ];

  const isLiveKey = health?.ai_engine?.is_live_key_configured;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F0BAC3] text-slate-800 shadow-xs">
      {/* Top Disclaimer & Engine Mode Strip in Rose Gold & White with strong contrast */}
      <div className="bg-[#FFF2F4] px-4 py-1.5 text-xs text-[#5C1A27] font-medium border-b border-[#F8D8DC]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B74B5B] animate-pulse"></span>
            <span>{t('disclaimerBanner')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold ${
              isLiveKey
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-white text-[#8A2B3C] border border-[#E8BAC3] shadow-2xs'
            }`}>
              <Cpu className="w-3.5 h-3.5 text-[#B74B5B]" />
              {isLiveKey ? t('liveEngine') : t('localEngine')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo without the Gov-Grounded badge */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9E394C] to-[#B74B5B] flex items-center justify-center text-white shadow-md shadow-[#B74B5B]/30 group-hover:scale-105 transition-all">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#481822] flex items-center gap-1.5">
                {t('appName')}
              </span>
              <p className="text-[11px] text-[#8A2B3C] font-semibold -mt-0.5">{t('tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              if (link.authOnly && !user) return null;
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 font-bold ${
                    isActive
                      ? 'bg-[#FCEEF0] text-[#7A2433] border border-[#F0BAC3] shadow-2xs'
                      : 'text-slate-800 hover:text-[#9E394C] hover:bg-[#FFF5F6]'
                  }`}
                >
                  <link.icon className={`w-4 h-4 ${isActive ? 'text-[#9E394C]' : 'text-slate-500'}`} />
                  {link.name}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 font-bold ${
                  location.pathname === '/admin'
                    ? 'bg-amber-100 text-amber-950 border border-amber-300'
                    : 'text-amber-900 hover:bg-amber-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                {t('adminPortal')}
              </Link>
            )}
          </nav>

          {/* Right Actions: High-Contrast Language Switch & User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher with BOTH English and हिंदी visible in High-Contrast */}
            <div className="flex items-center rounded-xl bg-white p-1 border-2 border-[#D98293] shadow-sm gap-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-[#7D2434] via-[#9E394C] to-[#B74B5B] text-white shadow-md'
                    : 'text-[#7D2434] hover:text-[#9E394C] hover:bg-[#FFF2F4]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${language === 'en' ? 'bg-emerald-300' : 'bg-slate-300'}`}></span>
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 ${
                  language === 'hi'
                    ? 'bg-gradient-to-r from-[#7D2434] via-[#9E394C] to-[#B74B5B] text-white shadow-md'
                    : 'text-[#7D2434] hover:text-[#9E394C] hover:bg-[#FFF2F4]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${language === 'hi' ? 'bg-emerald-300' : 'bg-slate-300'}`}></span>
                <span>हिंदी</span>
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#F0BAC3]">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFF2F4] hover:bg-[#FCEEF0] border border-[#E8BAC3] text-xs sm:text-sm font-bold text-slate-900 transition-colors shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#9E394C] flex items-center justify-center text-xs text-white font-bold">
                    {user.full_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.full_name}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-800 hover:text-[#8C2839] transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-[#9E394C] to-[#B74B5B] hover:from-[#8C2839] hover:to-[#9E394C] text-white shadow-md shadow-[#9E394C]/25 transition-all active:scale-95"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button with both languages */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center rounded-lg bg-white p-0.5 border-2 border-[#D98293] shadow-xs">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-black rounded-md transition-all ${
                  language === 'en' ? 'bg-gradient-to-r from-[#7D2434] to-[#B74B5B] text-white' : 'text-[#7D2434]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 text-xs font-black rounded-md transition-all ${
                  language === 'hi' ? 'bg-gradient-to-r from-[#7D2434] to-[#B74B5B] text-white' : 'text-[#7D2434]'
                }`}
              >
                हिंदी
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#9E394C] hover:bg-[#FFF2F4] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#F0BAC3] px-4 pt-2 pb-4 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            if (link.authOnly && !user) return null;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#FFF2F4] hover:text-[#9E394C]"
              >
                <link.icon className="w-4 h-4 text-[#9E394C]" />
                {link.name}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-amber-900 hover:bg-amber-50"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              {t('adminPortal')}
            </Link>
          )}
          <div className="pt-2 border-t border-[#F8D8DC]">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#FFF2F4] flex items-center justify-between"
                >
                  <span>{user.full_name} ({user.email})</span>
                  <span className="text-xs text-[#9E394C]">{t('settings')}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-rose-700 hover:bg-rose-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-bold rounded-xl bg-[#FFF2F4] text-slate-900 hover:bg-[#FCEEF0] border border-[#E8BAC3]"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-bold rounded-xl bg-gradient-to-r from-[#9E394C] to-[#B74B5B] text-white shadow-sm"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
