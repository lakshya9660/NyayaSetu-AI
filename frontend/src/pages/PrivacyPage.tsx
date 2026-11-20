import React from 'react';
import { ShieldCheck, Lock, Trash2, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFFDFE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy & Data Retention
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Last Updated: October 2026 • Strict adherence to citizen data protection
          </p>
        </div>

        <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#9E394C]" />
              <span>1. Information We Do NOT Collect</span>
            </h2>
            <p>
              NyayaSetu AI is committed to minimal data collection. We explicitly <strong>do not collect, request, or store</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-600">
              <li>Aadhaar numbers or UIDAI biometric data</li>
              <li>PAN card numbers, passport numbers, or driver's licenses</li>
              <li>Bank account details, UPI PINs, or financial information</li>
              <li>Confidential personal court records or sensitive case affidavits</li>
            </ul>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-[#9E394C]" />
              <span>2. How Conversation Data Is Handled</span>
            </h2>
            <p>
              When an authenticated citizen asks a legal question, the text is processed by our grounded retrieval engine solely to identify relevant statutory passages. Conversations are stored in an encrypted database strictly tied to your account ID.
            </p>
            <p>
              Other users or public visitors cannot view or search your inquiries. You can permanently delete any conversation at any time directly from the chat interface or delete your entire account in Settings.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#9E394C]" />
              <span>3. Data Retention & Account Deletion</span>
            </h2>
            <p>
              We believe in the citizen's right to digital erasure. If you delete an inquiry or delete your account, all associated database records and vector session traces are permanently removed.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#9E394C]" />
              <span>4. Untrusted Content & Safety Controls</span>
            </h2>
            <p>
              All user inquiries and uploaded documents are treated as untrusted data. Instructions embedded within uploaded documents or queries cannot alter system security parameters or system prompts.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

