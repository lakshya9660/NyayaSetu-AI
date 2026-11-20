export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'citizen' | 'admin';
  preferred_language: 'en' | 'hi';
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface SourceReference {
  document_id: string;
  document_title: string;
  page?: number | null;
  section?: string | null;
  excerpt: string;
  official_url?: string | null;
  relevance_score?: number | null;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender: 'user' | 'assistant';
  content: string;
  language: string;
  topic?: string | null;
  retrieval_status?: 'grounded' | 'insufficient_evidence' | 'demo_mode' | 'error' | null;
  sources_cited: SourceReference[];
  supported_points: string[];
  suggested_next_steps: string[];
  legal_aid_referral?: string | null;
  safety_notice?: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  title: string;
  topic: string;
  language: string;
  created_at: string;
  updated_at: string;
  message_count?: number;
}

export interface ConversationDetail extends Conversation {
  messages: ChatMessage[];
}

export interface LegalResource {
  id: string;
  title: string;
  category: string;
  description: string;
  source_organization: string;
  official_url: string;
  language: string;
  last_verified_date: string;
  is_active: boolean;
  created_at: string;
}

export interface LegalAidDirectoryEntry {
  id: string;
  authority_type: string;
  state: string;
  district?: string | null;
  office_name: string;
  address: string;
  contact_number?: string | null;
  official_portal_url: string;
  verification_status: string;
  last_verified_date: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  publisher: string;
  document_type: string;
  official_url: string;
  file_format: string;
  status: string;
  is_approved: boolean;
  verification_date?: string | null;
  total_chunks: number;
  created_at: string;
}

export interface DocumentChunk {
  id: string;
  chunk_index: number;
  content: string;
  page_number?: number | null;
  section_title?: string | null;
  created_at: string;
}

export interface AdminAnalytics {
  total_users: number;
  total_conversations: number;
  total_documents: number;
  total_chunks: number;
  total_resources: number;
  retrieval_success_rate: number;
  refusal_rate: number;
  feedback_positive_count: number;
  feedback_negative_count: number;
  ai_status: string;
}

export interface HealthStatus {
  status: string;
  app_name: string;
  environment: string;
  database: string;
  total_indexed_documents: number;
  total_indexed_chunks: number;
  ai_engine: {
    mode: string;
    is_live_key_configured: boolean;
    model: string;
    threshold: number;
  };
}
