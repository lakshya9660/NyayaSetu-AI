import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="citizen", nullable=False)  # "citizen", "admin"
    preferred_language = Column(String(10), default="en", nullable=False)  # "en", "hi"
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    conversations = relationship("Conversation", back_populates="user", cascade="all, delete-orphan")
    feedbacks = relationship("Feedback", back_populates="user")


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    title = Column(String(255), nullable=False, default="Legal Inquiry")
    topic = Column(String(100), default="General Legal Information")
    language = Column(String(10), default="en", nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    user = relationship("User", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan", order_by="Message.created_at")


class Message(Base):
    __tablename__ = "messages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    conversation_id = Column(String(36), ForeignKey("conversations.id", ondelete="CASCADE"), index=True, nullable=False)
    sender = Column(String(20), nullable=False)  # "user" or "assistant"
    content = Column(Text, nullable=False)
    language = Column(String(10), default="en", nullable=False)
    topic = Column(String(100), nullable=True)
    retrieval_status = Column(String(50), nullable=True)  # "grounded", "insufficient_evidence", "demo_mode", "error"
    sources_cited = Column(Text, nullable=True)  # JSON-encoded array of cited chunks
    supported_points = Column(Text, nullable=True)  # JSON-encoded list of bullet points
    suggested_next_steps = Column(Text, nullable=True)  # JSON-encoded list of next steps
    legal_aid_referral = Column(Text, nullable=True)  # JSON-encoded object or string
    created_at = Column(DateTime, default=utc_now, nullable=False)

    conversation = relationship("Conversation", back_populates="messages")


class LegalDocument(Base):
    __tablename__ = "legal_documents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), index=True, nullable=False)
    publisher = Column(String(255), nullable=False)
    document_type = Column(String(100), default="Act", nullable=False)
    official_url = Column(String(500), nullable=False)
    file_path = Column(String(500), nullable=True)
    file_format = Column(String(20), default="txt", nullable=False)
    status = Column(String(50), default="indexed", nullable=False)  # "pending", "processing", "indexed", "failed"
    is_approved = Column(Boolean, default=True, nullable=False)
    verification_date = Column(String(50), nullable=True)
    total_chunks = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    document_id = Column(String(36), ForeignKey("legal_documents.id", ondelete="CASCADE"), index=True, nullable=False)
    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    page_number = Column(Integer, nullable=True)
    section_title = Column(String(255), nullable=True)
    embedding_json = Column(Text, nullable=True)  # JSON array of embedding floats
    created_at = Column(DateTime, default=utc_now, nullable=False)

    document = relationship("LegalDocument", back_populates="chunks")


class LegalResource(Base):
    __tablename__ = "legal_resources"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    category = Column(String(100), index=True, nullable=False)
    description = Column(Text, nullable=False)
    source_organization = Column(String(255), nullable=False)
    official_url = Column(String(500), nullable=False)
    language = Column(String(20), default="both", nullable=False)
    last_verified_date = Column(String(50), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)


class LegalAidDirectoryEntry(Base):
    __tablename__ = "legal_aid_directory"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    authority_type = Column(String(50), nullable=False)  # NALSA, SLSA, DLSA
    state = Column(String(100), index=True, nullable=False)
    district = Column(String(100), index=True, nullable=True)
    office_name = Column(String(255), nullable=False)
    address = Column(Text, nullable=False)
    contact_number = Column(String(100), nullable=True)
    official_portal_url = Column(String(500), nullable=False)
    verification_status = Column(String(50), default="verified", nullable=False)
    last_verified_date = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    message_id = Column(String(36), nullable=True)
    rating = Column(Integer, nullable=False)  # 1 for thumbs up, -1 for thumbs down
    comments = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now, nullable=False)

    user = relationship("User", back_populates="feedbacks")


class DocumentProcessingJob(Base):
    __tablename__ = "document_processing_jobs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    document_id = Column(String(36), nullable=False)
    status = Column(String(50), default="processing", nullable=False)
    progress_percent = Column(Integer, default=0, nullable=False)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

