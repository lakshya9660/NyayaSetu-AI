import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ShieldAlert, ExternalLink, Phone, BookCheck, Lock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#FFFDFE] border-t border-[#F0BAC3] text-slate-700 text-sm">
      {/* Important Legal Disclaimer Banner in Soft Rose-Amber */}
      <div className="bg-[#FFF2F4] border-b border-[#F8D8DC] px-4 py-4 text-[#481822]">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#8C2839] shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed space-y-1">
            <p className="font-bold text-[#6B1B29]">
              IMPORTANT STATUTORY DISCLAIMER / महत्वपूर्ण वैधानिक सूचना:
            </p>
            <p>
              NyayaSetu AI is a public legal information and navigation technology service. It is <strong className="text-[#6B1B29]">NOT a law firm, NOT a lawyer, and DOES NOT provide personalized legal advice or representation</strong>.
              All responses are general information strictly grounded in public official Indian statutes and guidelines. No attorney-client relationship is created.
              If you require actionable advice or are facing court deadlines, consult an advocate or apply for free legal aid through your local District Legal Services Authority (DLSA) or <a href="https://nalsa.gov.in/legal-aid/" target="_blank" rel="noreferrer" className="underline font-bold text-[#8C2839] hover:text-[#5A1C27]">NALSA</a>.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Platform Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8C2839] to-[#B74B5B] flex items-center justify-center text-white shadow-sm">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900">{t('appName')}</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 font-medium">
              Empowering Indian citizens with simple, evidence-grounded legal awareness and navigating them to official legal aid institutions under the Legal Services Authorities Act, 1987.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8C2839] font-bold">
              <BookCheck className="w-4 h-4 text-[#9E394C]" />
              <span>100% Evidence Grounded & Cited</span>
            </div>
          </div>

          {/* Col 2: Official Indian Legal Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Official Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://nalsa.gov.in/legal-aid/" target="_blank" rel="noreferrer" className="hover:text-rosegold-700 flex items-center gap-1 transition-colors">
                  <span>NALSA Legal Aid Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://www.tele-law.in/" target="_blank" rel="noreferrer" className="hover:text-rosegold-700 flex items-center gap-1 transition-colors">
                  <span>Department of Justice Tele-Law</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://consumerhelpline.gov.in/" target="_blank" rel="noreferrer" className="hover:text-rosegold-700 flex items-center gap-1 transition-colors">
                  <span>National Consumer Helpline (NCH)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://edaakhil.nic.in/" target="_blank" rel="noreferrer" className="hover:text-rosegold-700 flex items-center gap-1 transition-colors">
                  <span>e-Daakhil Online Consumer Filing</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://ecourts.gov.in/" target="_blank" rel="noreferrer" className="hover:text-rosegold-700 flex items-center gap-1 transition-colors">
                  <span>eCourts Services Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Citizen Helplines */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Official Helplines</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rosegold-600" />
                <span>NALSA National Legal Aid: <strong className="text-slate-900 font-bold">15100</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rosegold-600" />
                <span>National Consumer Helpline: <strong className="text-slate-900 font-bold">1915</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rosegold-600" />
                <span>National Emergency Number: <strong className="text-slate-900 font-bold">112</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rosegold-600" />
                <span>Women in Distress Helpline: <strong className="text-slate-900 font-bold">1091</strong></span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Privacy */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Platform & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-rosegold-700 transition-colors">About NyayaSetu</Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-rosegold-700 transition-colors">Approved Document Library</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-rosegold-700 transition-colors">Privacy & Retention Policy</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-rosegold-700 transition-colors">Legal Disclaimer & Ethics</Link>
              </li>
              <li className="pt-2 flex items-center gap-1.5 text-slate-500 font-medium">
                <Lock className="w-3 h-3 text-rosegold-600" />
                <span>No Aadhaar or sensitive IDs ever stored</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-rosegold-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {t('appName')} — {t('tagline')}. Open educational initiative.</p>
          <p className="text-rosegold-700 font-medium">Bilingual Support (English & हिन्दी) • Grounded in Indian Law</p>
        </div>
      </div>
    </footer>
  );
};
