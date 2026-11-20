import React from 'react';
import { ShieldAlert, Scale, CheckCircle, ExternalLink } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFFDFE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Legal Disclaimer & Limitations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understanding the scope and legal boundaries of NyayaSetu AI
          </p>
        </div>

        <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 space-y-1">
              <p className="font-bold">CRITICAL NOTICE / महत्वपूर्ण सूचना:</p>
              <p>
                NyayaSetu AI is an information and navigation tool, NOT a lawyer, NOT a law firm, and NOT a provider of personalized legal advice. Never treat outputs as an official judicial determination or formal legal counsel.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#9E394C]" />
              <span>1. No Attorney-Client Relationship</span>
            </h2>
            <p>
              Using NyayaSetu AI, transmitting inquiries, or receiving grounded explanations does not create an advocate-client relationship under the Advocates Act, 1961. The platform cannot represent you in court, sign affidavits, or calculate statutory limitation periods for appeals.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#9E394C]" />
              <span>2. Evidence-Grounded Scope</span>
            </h2>
            <p>
              NyayaSetu is strictly programmed to answer questions using only the public legal statutes and official guidelines indexed in its repository. If a query falls outside approved sources, the system explicitly reports "Insufficient Verified Information" and points the citizen to NALSA or the Tele-Law helpline.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#9E394C]" />
              <span>3. Where to Find Official Legal Representation</span>
            </h2>
            <p>
              If you need legal representation in court:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-600">
              <li>Apply for free legal aid through your local District Legal Services Authority (DLSA) front office located in your District Court complex.</li>
              <li>Visit the National Legal Services Authority (NALSA) portal at <a href="https://nalsa.gov.in/legal-aid/" target="_blank" rel="noreferrer" className="text-[#8C2839] underline font-semibold">https://nalsa.gov.in/legal-aid/</a>.</li>
              <li>Call the National Legal Aid Toll-Free Helpline at <strong>15100</strong>.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

