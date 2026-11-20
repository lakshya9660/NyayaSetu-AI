import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Lock, Mail, User as UserIcon, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<'en' | 'hi'>('en');
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreedToDisclaimer) {
      setError('You must acknowledge the legal information disclaimer to proceed.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register({
        full_name: fullName,
        email,
        password,
        preferred_language: preferredLanguage
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFE] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9E394C] to-[#B74B5B] flex items-center justify-center text-white shadow-md shadow-[#9E394C]/25">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">NyayaSetu AI</span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Create Citizen Account
        </h2>
        <p className="text-xs text-slate-500">
          Access personalized language preferences and save your legal inquiries
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#F0BAC3] rounded-3xl sm:px-10 space-y-5">
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#E8BAC3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-900 bg-[#FFFDFE]"
                />
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.org"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#E8BAC3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-900 bg-[#FFFDFE]"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password (min 8 characters)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-xs border border-[#E8BAC3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E394C]/30 text-slate-900 bg-[#FFFDFE]"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Legal Response Language
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPreferredLanguage('en')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    preferredLanguage === 'en'
                      ? 'border-[#9E394C] bg-[#FFF2F4] text-[#8C2839] shadow-xs'
                      : 'border-[#F0BAC3] bg-white text-slate-600 hover:bg-[#FFFDFE]'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredLanguage('hi')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    preferredLanguage === 'hi'
                      ? 'border-[#9E394C] bg-[#FFF2F4] text-[#8C2839] shadow-xs'
                      : 'border-[#F0BAC3] bg-white text-slate-600 hover:bg-[#FFFDFE]'
                  }`}
                >
                  हिंदी (Hindi)
                </button>
              </div>
            </div>

            {/* Statutory Disclaimer Acknowledgement */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreedToDisclaimer}
                  onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#9E394C] focus:ring-[#9E394C] border-[#E8BAC3]"
                />
                <span className="text-xs text-slate-600 leading-tight">
                  I understand that <strong className="text-slate-900">NyayaSetu AI is an information tool, NOT a lawyer</strong>, and does NOT provide personalized legal advice or predict judicial outcomes.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9E394C] to-[#B74B5B] hover:from-[#7D2434] hover:to-[#9E394C] text-white font-bold text-xs shadow-md shadow-[#9E394C]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-[#FCEEF0]">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-[#9E394C] hover:text-[#7D2434] underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

