import React, { useState, useEffect } from 'react';
import {
  FileText,
  ExternalLink,
  ShieldCheck,
  Building,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  BookOpen,
  Calendar
} from 'lucide-react';
import { api } from '../services/api';
import { LegalDocument, DocumentChunk } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const SourcesPage: React.FC = () => {
  const { t } = useLanguage();
  const [sources, setSources] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);
  const [chunks, setChunks] = useState<DocumentChunk[]>([]);
  const [loadingChunks, setLoadingChunks] = useState(false);

  useEffect(() => {
    api.getSources()
      .then(setSources)
      .catch((err) => console.warn("Failed to load sources:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleInspectChunks = async (doc: LegalDocument) => {
    setSelectedDoc(doc);
    setLoadingChunks(true);
    try {
      const data = await api.getSourceChunks(doc.id);
      setChunks(data);
    } catch (err) {
      console.error("Failed to load document chunks:", err);
      setChunks([]);
    } finally {
      setLoadingChunks(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFE] py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner - Radiant Rose Gold Gradient */}
        <div className="bg-gradient-to-r from-[#7D2434] via-[#9E394C] to-[#681C2A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D98293]/40 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-xs border border-white/30">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-200" />
            <span>{t('srcBadge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {t('srcTitle')}
          </h1>

          <p className="text-rose-100 text-xs sm:text-sm max-w-3xl leading-relaxed font-medium">
            {t('srcSubtitle')}
          </p>
        </div>

        {/* Sources Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
            <span>{sources.length} {t('srcTotalDocs')}</span>
            <span className="text-[#8C2839]">Only admin-approved statutes can be queried</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-[#F0BAC3]">
              Loading approved document library...
            </div>
          ) : sources.length === 0 ? (
            <div className="bg-white border border-dashed border-[#F0BAC3] rounded-2xl p-10 text-center">
              <p className="text-xs text-slate-500">No approved documents currently indexed.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sources.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-[#F0BAC3] rounded-2xl p-6 shadow-sm hover:border-[#D98293] hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF2F4] text-[#8C2839] border border-[#F8D8DC]">
                        {doc.document_type}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono">
                        {doc.file_format.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Approved & Indexed
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {doc.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {doc.publisher}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#8C2839]">
                        <Layers className="w-3.5 h-3.5" />
                        {doc.total_chunks} {t('srcTotalChunks')}
                      </span>
                      {doc.verification_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {doc.verification_date}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleInspectChunks(doc)}
                      className="px-4 py-2 rounded-xl bg-[#FFF2F4] hover:bg-[#FCEEF0] border border-[#E8BAC3] text-[#7D2434] font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#9E394C]" />
                      <span>{t('srcInspectChunks')} ({doc.total_chunks})</span>
                    </button>
                    <a
                      href={doc.official_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9E394C] to-[#B74B5B] hover:from-[#7D2434] hover:to-[#9E394C] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#9E394C]/25"
                    >
                      <span>Official Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal: Chunk Inspection Drawer */}
        {selectedDoc && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#F0BAC3] overflow-hidden">
              {/* Modal Header */}
              <div className="p-6 border-b border-[#FCEEF0] flex items-start justify-between gap-4 bg-[#FFFDFE]">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9E394C]">
                    Statutory Passage Inspector
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedDoc.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Showing verified text segments indexed into vector storage
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-[#FFF2F4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {loadingChunks ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    Retrieving indexed chunks...
                  </div>
                ) : chunks.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    No chunks found for this document.
                  </div>
                ) : (
                  chunks.map((chunk) => (
                    <div
                      key={chunk.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-700">
                          Chunk #{chunk.chunk_index + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          {chunk.page_number && (
                            <span className="bg-slate-100 px-2 py-0.5 rounded font-mono">
                              Page {chunk.page_number}
                            </span>
                          )}
                          {chunk.section_title && (
                            <span className="bg-slate-100 px-2 py-0.5 rounded">
                              {chunk.section_title}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="font-serif leading-relaxed text-slate-800 text-xs sm:text-sm whitespace-pre-wrap">
                        {chunk.content}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

