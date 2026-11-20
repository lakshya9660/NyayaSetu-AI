from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

# ================= AUTH & USER =================

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    full_name: str = Field(..., min_length=2, max_length=100)
    preferred_language: str = Field(default="en", pattern="^(en|hi)$")

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    preferred_language: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

TokenResponse.model_rebuild()

class UserUpdateRequest(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    preferred_language: Optional[str] = Field(None, pattern="^(en|hi)$")

# ================= CHAT & RAG =================

class SourceReference(BaseModel):
    document_id: str
    document_title: str
    page: Optional[int] = None
    section: Optional[str] = None
    excerpt: str
    official_url: Optional[str] = None
    relevance_score: Optional[float] = None

class StructuredAIResponse(BaseModel):
    answer: str
    language: str
    topic: str
    supported_points: List[str] = []
    sources: List[SourceReference] = []
    suggested_general_next_steps: List[str] = []
    legal_aid_referral: Optional[str] = None
    insufficient_evidence: bool = False
    safety_notice: str

class ChatMessageRequest(BaseModel):
    content: str = Field(..., min_length=2, max_length=2000)
    language: Optional[str] = Field(default="en", pattern="^(en|hi)$")
    topic: Optional[str] = Field(default="General Legal Information")

class ChatMessageResponse(BaseModel):
    id: str
    conversation_id: str
    sender: str
    content: str
    language: str
    topic: Optional[str] = None
    retrieval_status: Optional[str] = None
    sources_cited: List[SourceReference] = []
    supported_points: List[str] = []
    suggested_next_steps: List[str] = []
    legal_aid_referral: Optional[str] = None
    safety_notice: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationCreateRequest(BaseModel):
    title: Optional[str] = "Legal Inquiry"
    topic: Optional[str] = "General Legal Information"
    language: Optional[str] = "en"

class ConversationResponse(BaseModel):
    id: str
    title: str
    topic: str
    language: str
    created_at: datetime
    updated_at: datetime
    message_count: Optional[int] = 0

    class Config:
        from_attributes = True

class ConversationDetailResponse(BaseModel):
    id: str
    title: str
    topic: str
    language: str
    created_at: datetime
    updated_at: datetime
    messages: List[ChatMessageResponse] = []

    class Config:
        from_attributes = True

# ================= LEGAL DOCUMENTS =================

class DocumentChunkResponse(BaseModel):
    id: str
    chunk_index: int
    content: str
    page_number: Optional[int] = None
    section_title: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class LegalDocumentResponse(BaseModel):
    id: str
    title: str
    publisher: str
    document_type: str
    official_url: str
    file_format: str
    status: str
    is_approved: bool
    verification_date: Optional[str] = None
    total_chunks: int
    created_at: datetime

    class Config:
        from_attributes = True

# ================= LEGAL RESOURCES =================

class LegalResourceResponse(BaseModel):
    id: str
    title: str
    category: str
    description: str
    source_organization: str
    official_url: str
    language: str
    last_verified_date: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class LegalResourceCreateRequest(BaseModel):
    title: str
    category: str
    description: str
    source_organization: str
    official_url: str
    language: str = "both"
    last_verified_date: str

# ================= LEGAL AID DIRECTORY =================

class LegalAidDirectoryResponse(BaseModel):
    id: str
    authority_type: str
    state: str
    district: Optional[str] = None
    office_name: str
    address: str
    contact_number: Optional[str] = None
    official_portal_url: str
    verification_status: str
    last_verified_date: str

    class Config:
        from_attributes = True

class LegalAidDirectoryCreateRequest(BaseModel):
    authority_type: str
    state: str
    district: Optional[str] = None
    office_name: str
    address: str
    contact_number: Optional[str] = None
    official_portal_url: str
    verification_status: str = "verified"
    last_verified_date: str

# ================= FEEDBACK & ANALYTICS =================

class FeedbackCreateRequest(BaseModel):
    message_id: Optional[str] = None
    rating: int = Field(..., ge=-1, le=1)  # -1 or 1
    comments: Optional[str] = None

class FeedbackResponse(BaseModel):
    id: str
    rating: int
    comments: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class AdminAnalyticsResponse(BaseModel):
    total_users: int
    total_conversations: int
    total_documents: int
    total_chunks: int
    total_resources: int
    retrieval_success_rate: float
    refusal_rate: float
    feedback_positive_count: int
    feedback_negative_count: int
    ai_status: str
