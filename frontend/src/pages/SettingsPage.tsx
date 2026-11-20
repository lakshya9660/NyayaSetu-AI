import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Globe,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  Check,
  Lock,
  Mail,
  Scale
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';

export const SettingsPage: React.FC = () => {
  const { user, logout, refreshUser } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [preferredLang, setPreferredLang] = useState<'en' | 'hi'>(user?.preferred_language || 'en');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      await api.updateProfile({
        full_name: fullName,
        preferred_language: preferredLang
      });
      setLanguage(preferredLang);
      await refreshUser();
      setSuccessMsg(language === 'hi' ? 'प्राथमिकताएं सफलतापूर्वक सहेजी गईं।' : 'Profile and preferences updated successfully.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update preferences.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = prompt(
      "CAUTION: Deleting your account will permanently delete all your conversation history and preferences. Type 'DELETE' to confirm:"
    );
    if (confirmation !== 'DELETE') return;

    setDeleting(true);
    try {
      await api.deleteAccount();
      await logout();
      navigate('/');
    } catch (err: any) {
      alert("Failed to delete account: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFE] py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {t('setHeading')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t('setSub')}
          </p>
        </div>

        {/* Profile & Language Preferences Card in Rose Gold & White */}
        <div className="bg-white border border-[#F0BAC3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-[#FCEEF0]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9E394C] to-[#B74B5B] text-white flex items-center justify-center font-black text-xl shadow-md shadow-[#9E394C]/25">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">{user?.full_name}</h2>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 font-medium">
                <Mail className="w-3.5 h-3.5 text-[#9E394C]" />
                <span>{user?.email}</span>
                <span>•</span>
                <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF2F4] text-[#8C2839] border border-[#F8D8DC]">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {successMsg && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                {t('setName')}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-sm border border-[#E8BAC3] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-900 bg-[#FFFDFE]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                {t('setDefaultLang')}
              </label>
              <p className="text-[11px] text-slate-500 mb-3">
                {t('setLangHint')}
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setPreferredLang('en')}
                  className={`p-3 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    preferredLang === 'en'
                      ? 'border-[#9E394C] bg-[#FFF2F4] text-[#7D2434] shadow-sm'
                      : 'border-[#E8BAC3] hover:bg-[#FFFDFE] text-slate-700'
                  }`}
                >
                  <Globe className="w-4 h-4 text-[#9E394C]" />
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredLang('hi')}
                  className={`p-3 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    preferredLang === 'hi'
                      ? 'border-[#9E394C] bg-[#FFF2F4] text-[#7D2434] shadow-sm'
                      : 'border-[#E8BAC3] hover:bg-[#FFFDFE] text-slate-700'
                  }`}
                >
                  <Globe className="w-4 h-4 text-[#9E394C]" />
                  <span>हिंदी (Hindi)</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-gradient-to-r from-[#9E394C] to-[#B74B5B] hover:from-[#8C2839] hover:to-[#9E394C] text-white font-black text-xs rounded-xl shadow-md shadow-[#9E394C]/25 transition-all active:scale-95 disabled:opacity-50"
            >
              {saving ? t('setSaving') : t('setSave')}
            </button>
          </form>
        </div>

        {/* Privacy & Data Retention Accordion in Rose Gold & White */}
        <div className="bg-white border border-[#F0BAC3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 text-xs text-slate-700">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#681C2A] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#9E394C]" />
            <span>{t('setPrivacyHeading')}</span>
          </h3>
          <ul className="space-y-2 text-slate-600 leading-relaxed font-medium">
            <li className="flex items-start gap-2">
              <span className="text-[#9E394C] font-black">•</span>
              <span><strong>Zero Aadhaar / Identity Storage:</strong> NyayaSetu never requests, validates, or archives Aadhaar, PAN, or biometrics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9E394C] font-black">•</span>
              <span><strong>Isolated Sessions:</strong> Your legal queries are protected by row-level user authorization. Other citizens can never see your questions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9E394C] font-black">•</span>
              <span><strong>Right to Erasure:</strong> You can delete any individual chat from the sidebar or wipe your entire profile below.</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-[#FCEEF0] flex flex-wrap items-center justify-between gap-3">
            <span className="text-slate-500 font-semibold">Danger Zone / खाता नियंत्रण:</span>
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="px-4 py-2 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-black transition-colors flex items-center gap-1.5 active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>{deleting ? 'Deleting...' : t('setDelAccount')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
