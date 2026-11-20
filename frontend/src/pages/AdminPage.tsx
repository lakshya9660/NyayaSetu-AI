import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Upload,
  FileText,
  Trash2,
  CheckCircle,
  XCircle,
  Layers,
  BarChart3,
  Building,
  Plus,
  AlertCircle,
  ExternalLink,
  Loader2,
  Cpu
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { LegalDocument, AdminAnalytics, LegalResource, LegalAidDirectoryEntry } from '../types';

export const AdminPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'documents' | 'directory' | 'analytics'>('documents');
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Document Upload Form State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [docTitle, setDocTitle] = useState('');
  const [docPublisher, setDocPublisher] = useState('');
  const [docType, setDocType] = useState('Act Excerpt');
  const [docUrl, setDocUrl] = useState('');
  const [docVerifyDate, setDocVerifyDate] = useState('October 2026');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Directory Add Form State
  const [aidState, setAidState] = useState('Delhi');
  const [aidDistrict, setAidDistrict] = useState('');
  const [aidType, setAidType] = useState('DLSA');
  const [aidName, setAidName] = useState('');
  const [aidAddress, setAidAddress] = useState('');
  const [aidPhone, setAidPhone] = useState('');
  const [aidUrl, setAidUrl] = useState('https://nalsa.gov.in/legal-aid/');
  const [savingEntry, setSavingEntry] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    loadAdminData();
  }, [isAdmin]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [docs, stats] = await Promise.all([
        api.getAdminDocuments(),
        api.getAdminAnalytics()
      ]);
      setDocuments(docs);
      setAnalytics(stats);
    } catch (err) {
      console.warn("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError("Please select a document file (.pdf, .txt, .docx).");
      return;
    }
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('title', docTitle);
    formData.append('publisher', docPublisher);
    formData.append('document_type', docType);
    formData.append('official_url', docUrl);
    formData.append('verification_date', docVerifyDate);

    try {
      const newDoc = await api.uploadAdminDocument(formData);
      setUploadSuccess(`Document '${newDoc.title}' uploaded and indexed successfully into ${newDoc.total_chunks} chunks.`);
      setUploadFile(null);
      setDocTitle('');
      setDocPublisher('');
      setDocUrl('');
      loadAdminData();
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove '${title}' and all its indexed chunks?`)) return;
    try {
      await api.deleteAdminDocument(id);
      setDocuments(documents.filter(d => d.id !== id));
      loadAdminData();
    } catch (err: any) {
      alert("Failed to delete document: " + err.message);
    }
  };

  const handleToggleApproval = async (id: string, currentApproval: boolean) => {
    try {
      const updated = await api.toggleDocumentApproval(id, !currentApproval);
      setDocuments(documents.map(d => d.id === id ? updated : d));
    } catch (err: any) {
      alert("Failed to update approval: " + err.message);
    }
  };

  const handleAddDirectoryEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEntry(true);
    try {
      await api.createAdminLegalAid({
        authority_type: aidType,
        state: aidState,
        district: aidDistrict || undefined,
        office_name: aidName,
        address: aidAddress,
        contact_number: aidPhone || undefined,
        official_portal_url: aidUrl,
        verification_status: "verified",
        last_verified_date: "October 2026"
      });
      alert("Legal aid entry registered successfully!");
      setAidName('');
      setAidAddress('');
      setAidPhone('');
      setAidDistrict('');
    } catch (err: any) {
      alert("Failed to register entry: " + err.message);
    } finally {
      setSavingEntry(false);
    }
  };

  // Recharts Chart Data
  const retrievalChartData = analytics ? [
    { name: 'Grounded Evidence Retrieved', value: analytics.retrieval_success_rate, color: '#0d9488' },
    { name: 'Refusal (Insufficient Evidence)', value: analytics.refusal_rate, color: '#f59e0b' }
  ] : [];

  return (
    <div className="min-h-screen bg-[#FFFDFE] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-[#7D2434] via-[#9E394C] to-[#681C2A] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Restricted System Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              NyayaSetu Governance Console
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Manage approved statutory documents, vector indexing, and citizen safety metrics.
            </p>
          </div>

          <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-xs flex items-center gap-2">
            <Cpu className="w-4 h-4 text-teal-400" />
            <div>
              <p className="text-slate-400 text-[10px]">ACTIVE ENGINE</p>
              <p className="font-bold text-white uppercase">{analytics?.ai_status || 'Local RAG Engine'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#F0BAC3] gap-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'documents'
                ? 'border-b-2 border-teal-600 text-[#8C2839]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Document Ingestion & Indexing</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('directory')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'directory'
                ? 'border-b-2 border-teal-600 text-[#8C2839]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Directory & Legal Aid Management</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'border-b-2 border-teal-600 text-[#8C2839]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Retrieval & Safety Analytics</span>
          </button>
        </div>

        {/* TAB 1: DOCUMENT INGESTION */}
        {activeTab === 'documents' && (
          <div className="space-y-8">
            {/* Upload Document Form */}
            <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#9E394C]" />
                <span>Ingest & Index New Official Legal Document</span>
              </h3>

              {uploadSuccess && (
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-xs text-teal-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#9E394C] shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              {uploadError && (
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              <form onSubmit={handleFileUpload} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Document Title
                    </label>
                    <input
                      type="text"
                      required
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      placeholder="e.g. Legal Services Authorities Act, 1987"
                      className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Publisher / Authority
                    </label>
                    <input
                      type="text"
                      required
                      value={docPublisher}
                      onChange={(e) => setDocPublisher(e.target.value)}
                      placeholder="e.g. National Legal Services Authority (NALSA)"
                      className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Source URL
                    </label>
                    <input
                      type="url"
                      required
                      value={docUrl}
                      onChange={(e) => setDocUrl(e.target.value)}
                      placeholder="https://nalsa.gov.in/legal-aid/"
                      className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Document Classification
                    </label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="Statute Excerpt">Statute Excerpt</option>
                      <option value="Statutory Rules">Statutory Rules</option>
                      <option value="Government Notification">Government Notification</option>
                      <option value="Official Handbook">Official Handbook</option>
                    </select>
                  </div>
                </div>

                {/* File picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select File (.pdf, .txt, .docx — Max 15MB)
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.txt,.docx"
                    onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-[#FFFDFE] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#9E394C] file:text-white hover:file:bg-teal-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Uploaded documents are parsed, divided into ~600-character semantically bounded passages, and vector-embedded.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 bg-[#9E394C] hover:bg-teal-500 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing & Embedding Document...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload & Index Document</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Approved Documents Table */}
            <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                <span>Indexed Legal Documents ({documents.length})</span>
                <span className="text-xs font-normal text-slate-500">Active in Vector Search</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-[#FFFDFE] text-slate-700 font-bold border-b border-[#F0BAC3]">
                    <tr>
                      <th className="p-3">Title & Publisher</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Format</th>
                      <th className="p-3">Chunks</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-[#FFFDFE]/80">
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{doc.title}</p>
                          <p className="text-[11px] text-slate-400">{doc.publisher}</p>
                        </td>
                        <td className="p-3 font-medium">{doc.document_type}</td>
                        <td className="p-3 uppercase font-mono">{doc.file_format}</td>
                        <td className="p-3 font-semibold text-[#8C2839]">{doc.total_chunks}</td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => handleToggleApproval(doc.id, doc.is_approved)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              doc.is_approved
                                ? 'bg-teal-50 text-teal-800 border border-teal-200'
                                : 'bg-slate-100 text-slate-500 border border-[#F0BAC3]'
                            }`}
                          >
                            {doc.is_approved ? 'Approved' : 'Disabled'}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteDocument(doc.id, doc.title)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                            title="Remove document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIRECTORY & RESOURCES */}
        {activeTab === 'directory' && (
          <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-[#9E394C]" />
              <span>Add Verified Legal Aid Authority / DLSA Record</span>
            </h3>

            <form onSubmit={handleAddDirectoryEntry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={aidState}
                    onChange={(e) => setAidState(e.target.value)}
                    placeholder="e.g. Delhi, Maharashtra"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    value={aidDistrict}
                    onChange={(e) => setAidDistrict(e.target.value)}
                    placeholder="e.g. Central Delhi"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Authority Type</label>
                  <select
                    value={aidType}
                    onChange={(e) => setAidType(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white"
                  >
                    <option value="DLSA">District Authority (DLSA)</option>
                    <option value="SLSA">State Authority (SLSA)</option>
                    <option value="NALSA">National Authority (NALSA)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Office Name</label>
                  <input
                    type="text"
                    required
                    value={aidName}
                    onChange={(e) => setAidName(e.target.value)}
                    placeholder="e.g. DLSA South District Front Office"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    value={aidPhone}
                    onChange={(e) => setAidPhone(e.target.value)}
                    placeholder="e.g. 011-29562440 or 15100"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Address Details</label>
                <textarea
                  required
                  rows={2}
                  value={aidAddress}
                  onChange={(e) => setAidAddress(e.target.value)}
                  placeholder="Official address in district court complex..."
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={savingEntry}
                className="px-5 py-2.5 bg-[#9E394C] hover:bg-teal-500 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Save Directory Entry</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: SYSTEM & RETRIEVAL ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-[#F0BAC3] rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Registered Users</span>
                <p className="text-2xl font-bold text-slate-900">{analytics?.total_users || 0}</p>
              </div>
              <div className="bg-white border border-[#F0BAC3] rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Conversations</span>
                <p className="text-2xl font-bold text-slate-900">{analytics?.total_conversations || 0}</p>
              </div>
              <div className="bg-white border border-[#F0BAC3] rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Indexed Chunks</span>
                <p className="text-2xl font-bold text-[#8C2839]">{analytics?.total_chunks || 0}</p>
              </div>
              <div className="bg-white border border-[#F0BAC3] rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Helpful Feedback</span>
                <p className="text-2xl font-bold text-emerald-600">+{analytics?.feedback_positive_count || 0}</p>
              </div>
            </div>

            {/* Recharts Pie Chart: Retrieval Success vs Safe Refusal */}
            <div className="bg-white border border-[#F0BAC3] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#9E394C]" />
                <span>RAG Retrieval Fidelity & Safe Refusal Metrics</span>
              </h3>
              <p className="text-xs text-slate-500">
                Measures the percentage of citizen inquiries with verified statutory grounding vs questions triggering the safe insufficient-evidence state.
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={retrievalChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }: any) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                      {retrievalChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
