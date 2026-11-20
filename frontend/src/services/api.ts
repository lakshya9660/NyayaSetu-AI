import {
  AuthResponse,
  User,
  Conversation,
  ConversationDetail,
  ChatMessage,
  LegalResource,
  LegalAidDirectoryEntry,
  LegalDocument,
  DocumentChunk,
  AdminAnalytics,
  HealthStatus
} from '../types';

const API_BASE = '/api/v1';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('nyayasetu_token') || sessionStorage.getItem('nyayasetu_token');
  }

  setToken(token: string | null, remember: boolean = true) {
    this.token = token;
    if (token) {
      if (remember) {
        localStorage.setItem('nyayasetu_token', token);
      } else {
        sessionStorage.setItem('nyayasetu_token', token);
      }
    } else {
      localStorage.removeItem('nyayasetu_token');
      sessionStorage.removeItem('nyayasetu_token');
    }
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('nyayasetu_token') || sessionStorage.getItem('nyayasetu_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const headers = new Headers(options.headers || {});

    const token = this.getToken();
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        // Fall back to status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
  }

  // Auth
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    this.setToken(res.access_token);
    return res;
  }

  async register(data: { email: string; password: string; full_name: string; preferred_language: string }): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    this.setToken(res.access_token);
    return res;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
    }
  }

  async getMe(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  async updateProfile(data: { full_name?: string; preferred_language?: string }): Promise<User> {
    return this.request<User>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async deleteAccount(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/users/me', {
      method: 'DELETE'
    });
  }

  // Chat
  async getConversations(): Promise<Conversation[]> {
    return this.request<Conversation[]>('/chat/conversations');
  }

  async createConversation(data: { title?: string; topic?: string; language?: string }): Promise<Conversation> {
    return this.request<Conversation>('/chat/conversations', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getConversation(id: string): Promise<ConversationDetail> {
    return this.request<ConversationDetail>(`/chat/conversations/${id}`);
  }

  async deleteConversation(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/chat/conversations/${id}`, {
      method: 'DELETE'
    });
  }

  async sendMessage(conversationId: string, data: { content: string; language?: string; topic?: string }): Promise<ChatMessage> {
    return this.request<ChatMessage>(`/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async sendFeedback(data: { message_id?: string; rating: number; comments?: string }): Promise<any> {
    return this.request('/chat/feedback', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Resources
  async getResources(params?: { category?: string; search?: string; language?: string }): Promise<LegalResource[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.language) query.append('language', params.language);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request<LegalResource[]>(`/resources${qs}`);
  }

  async getResource(id: string): Promise<LegalResource> {
    return this.request<LegalResource>(`/resources/${id}`);
  }

  // Legal Aid Directory
  async searchLegalAid(params?: { state?: string; district?: string; authority_type?: string }): Promise<LegalAidDirectoryEntry[]> {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.district) query.append('district', params.district);
    if (params?.authority_type) query.append('authority_type', params.authority_type);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request<LegalAidDirectoryEntry[]>(`/legal-aid/search${qs}`);
  }

  async getLegalAidInfo(): Promise<{ official_portal: string; national_tele_law_portal: string; national_helpline: string; description: string; guidance: string }> {
    return this.request('/legal-aid/info');
  }

  // Document Sources
  async getSources(): Promise<LegalDocument[]> {
    return this.request<LegalDocument[]>('/sources');
  }

  async getSource(id: string): Promise<LegalDocument> {
    return this.request<LegalDocument>(`/sources/${id}`);
  }

  async getSourceChunks(id: string): Promise<DocumentChunk[]> {
    return this.request<DocumentChunk[]>(`/sources/${id}/chunks`);
  }

  // Admin Portal
  async getAdminDocuments(): Promise<LegalDocument[]> {
    return this.request<LegalDocument[]>('/admin/documents');
  }

  async uploadAdminDocument(formData: FormData): Promise<LegalDocument> {
    return this.request<LegalDocument>('/admin/documents/upload', {
      method: 'POST',
      body: formData
    });
  }

  async deleteAdminDocument(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/admin/documents/${id}`, {
      method: 'DELETE'
    });
  }

  async toggleDocumentApproval(id: string, is_approved: boolean): Promise<LegalDocument> {
    return this.request<LegalDocument>(`/admin/documents/${id}/approval?is_approved=${is_approved}`, {
      method: 'PATCH'
    });
  }

  async createAdminResource(data: any): Promise<LegalResource> {
    return this.request<LegalResource>('/admin/resources', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async deleteAdminResource(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/admin/resources/${id}`, {
      method: 'DELETE'
    });
  }

  async createAdminLegalAid(data: any): Promise<LegalAidDirectoryEntry> {
    return this.request<LegalAidDirectoryEntry>('/admin/legal-aid', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async deleteAdminLegalAid(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/admin/legal-aid/${id}`, {
      method: 'DELETE'
    });
  }

  async getAdminAnalytics(): Promise<AdminAnalytics> {
    return this.request<AdminAnalytics>('/admin/analytics');
  }

  // Health
  async getHealth(): Promise<HealthStatus> {
    return this.request<HealthStatus>('/health');
  }
}

export const api = new ApiService();

