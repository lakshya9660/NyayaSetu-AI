import React from 'react';
import { Scale, ShieldCheck, HeartHandshake, Compass, Lock, ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFFDFE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2F4] text-[#8C2839] text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-[#9E394C]" />
            <span>Community Legal Information Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About NyayaSetu AI
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between complex legal statutes and everyday Indian citizens through evidence-grounded AI and official legal aid navigation.
          </p>
        </div>

        <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#9E394C]" />
              <span>Our Purpose & Founding Ethos</span>
            </h2>
            <p>
              In India, legal provisions are often written in archaic or dense terminology, making it difficult for ordinary citizens to understand their fundamental consumer rights, tenancy protections, or entitlements to free legal aid.
            </p>
            <p>
              NyayaSetu AI (न्यायसेतु - "Bridge to Justice") was engineered as an open community public information system. Its purpose is to explain verified statutes in simple, accessible English and Hindi while strictly adhering to safety principles: <strong>zero hallucinations, exact document citations, and transparent referral to official legal-aid institutions</strong>.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#9E394C]" />
              <span>Legal Services Authorities Act, 1987</span>
            </h2>
            <p>
              A cornerstone of Indian justice is Section 12 of the Legal Services Authorities Act, 1987, which provides that women, children, members of SC/ST, disabled persons, and low-income citizens are entitled to free legal aid, counsel, and court fee waivers.
            </p>
            <p>
              NyayaSetu guides eligible citizens directly to their local District Legal Services Authority (DLSA) front office or the official NALSA portal (<a href="https://nalsa.gov.in/legal-aid/" target="_blank" rel="noreferrer" className="text-[#8C2839] underline font-semibold">nalsa.gov.in</a>), ensuring that constitutional rights are accessible on the ground.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#9E394C]" />
              <span>Responsible AI & Data Privacy</span>
            </h2>
            <p>
              We believe legal-tech must put citizen privacy first. NyayaSetu AI:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-xs sm:text-sm">
              <li>Never requests or stores Aadhaar numbers, biometric data, or private case files.</li>
              <li>Treats user inputs and uploaded documents as strictly untrusted content.</li>
              <li>Refuses to speculate when official statutory evidence is unavailable.</li>
              <li>Maintains user isolation so private inquiries are never leaked to other users.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

