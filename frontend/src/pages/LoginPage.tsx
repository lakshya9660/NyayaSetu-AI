import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
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
          Sign In to Your Account
        </h2>
        <p className="text-xs text-slate-500">
          Access your grounded legal conversations and saved resources
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#F0BAC3] rounded-3xl sm:px-10 space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                Password
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9E394C] to-[#B74B5B] hover:from-[#7D2434] hover:to-[#9E394C] text-white font-bold text-xs shadow-md shadow-[#9E394C]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer"
            >
              {loading ? 'Signing In...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Buttons */}
          <div className="pt-2 border-t border-[#FCEEF0]">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
              Quick Development Demo Credentials:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('citizen@nyayasetu.org', 'CitizenDemo2026!')}
                className="py-2 px-2 rounded-xl border border-[#F0BAC3] bg-[#FFF2F4] hover:bg-[#FCEEF0] text-[11px] font-bold text-[#8C2839] transition-colors"
              >
                Demo Citizen
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin@nyayasetu.org', 'AdminSecureNyaya2026!')}
                className="py-2 px-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-[11px] font-bold text-amber-900 transition-colors"
              >
                System Admin
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-[#FCEEF0]">
            <span>Don't have an account yet? </span>
            <Link to="/register" className="font-bold text-[#9E394C] hover:text-[#7D2434] underline">
              Create citizen account
            </Link>
          </div>
        </div>

        {/* Disclaimer footer */}
        <p className="text-center text-[11px] text-slate-400 mt-6 px-4">
          By signing in, you acknowledge that NyayaSetu provides general public legal information and is not a provider of personalized legal advice.
        </p>
      </div>
    </div>
  );
};

