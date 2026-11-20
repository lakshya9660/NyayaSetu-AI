import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models import User, Conversation, Message, Feedback
from app.schemas import (
    ConversationResponse,
    ConversationDetailResponse,
    ConversationCreateRequest,
    ChatMessageRequest,
    ChatMessageResponse,
    SourceReference,
    FeedbackCreateRequest,
    FeedbackResponse
)
from app.rag.pipeline import execute_rag_pipeline

router = APIRouter(prefix="/chat", tags=["Chat & Legal Assistant"])

def _format_message_response(msg: Message) -> ChatMessageResponse:
    sources = []
    if msg.sources_cited:
        try:
            raw_sources = json.loads(msg.sources_cited)
            sources = [SourceReference(**s) for s in raw_sources]
        except Exception:
            sources = []

    points = []
    if msg.supported_points:
        try:
            points = json.loads(msg.supported_points)
        except Exception:
            points = []

    next_steps = []
    if msg.suggested_next_steps:
        try:
            next_steps = json.loads(msg.suggested_next_steps)
        except Exception:
            next_steps = []

    safety = (
        "General legal information only. Not legal advice. Consult a qualified advocate or your local DLSA for personalized counsel."
        if msg.language == "en" else
        "सामान्य कानूनी जानकारी। कानूनी सलाह नहीं। व्यक्तिगत मार्गदर्शन के लिए अपने जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।"
    )

    return ChatMessageResponse(
        id=msg.id,
        conversation_id=msg.conversation_id,
        sender=msg.sender,
        content=msg.content,
        language=msg.language,
        topic=msg.topic,
        retrieval_status=msg.retrieval_status,
        sources_cited=sources,
        supported_points=points,
        suggested_next_steps=next_steps,
        legal_aid_referral=msg.legal_aid_referral,
        safety_notice=safety,
        created_at=msg.created_at
    )

@router.get("/conversations", response_model=List[ConversationResponse])
def list_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve all conversations belonging to the authenticated user."""
    convs = (
        db.query(Conversation)
        .filter(Conversation.user_id == current_user.id)
        .order_by(Conversation.updated_at.desc())
        .all()
    )
    result = []
    for c in convs:
        count = db.query(Message).filter(Message.conversation_id == c.id).count()
        result.append(ConversationResponse(
            id=c.id,
            title=c.title,
            topic=c.topic,
            language=c.language,
            created_at=c.created_at,
            updated_at=c.updated_at,
            message_count=count
        ))
    return result

@router.post("/conversations", response_model=ConversationResponse, status_code=status.HTTP_201_CREATED)
def create_conversation(
    conv_in: ConversationCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new legal inquiry conversation."""
    lang = conv_in.language or current_user.preferred_language or "en"
    conv = Conversation(
        user_id=current_user.id,
        title=conv_in.title or "Legal Inquiry",
        topic=conv_in.topic or "General Legal Information",
        language=lang
    )
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return ConversationResponse(
        id=conv.id,
        title=conv.title,
        topic=conv.topic,
        language=conv.language,
        created_at=conv.created_at,
        updated_at=conv.updated_at,
        message_count=0
    )

@router.get("/conversations/{conversation_id}", response_model=ConversationDetailResponse)
def get_conversation(
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve a single conversation and all its messages. Strictly isolates user access."""
    conv = (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id, Conversation.user_id == current_user.id)
        .first()
    )
    if not conv:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found or access denied"
        )

    messages = (
        db.query(Message)
        .filter(Message.conversation_id == conv.id)
        .order_by(Message.created_at.asc())
        .all()
    )

    return ConversationDetailResponse(
        id=conv.id,
        title=conv.title,
        topic=conv.topic,
        language=conv.language,
        created_at=conv.created_at,
        updated_at=conv.updated_at,
        messages=[_format_message_response(m) for m in messages]
    )

@router.delete("/conversations/{conversation_id}", status_code=status.HTTP_200_OK)
def delete_conversation(
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a conversation belonging to current user."""
    conv = (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id, Conversation.user_id == current_user.id)
        .first()
    )
    if not conv:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found or access denied"
        )

    db.delete(conv)
    db.commit()
    return {"message": "Conversation deleted successfully"}

@router.post("/conversations/{conversation_id}/messages", response_model=ChatMessageResponse)
def send_chat_message(
    conversation_id: str,
    msg_in: ChatMessageRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit a legal inquiry question and receive an evidence-grounded response."""
    conv = (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id, Conversation.user_id == current_user.id)
        .first()
    )
    if not conv:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found or access denied"
        )

    is_hindi_detected = any('\u0900' <= char <= '\u097f' for char in msg_in.content) or (msg_in.language == "hi")
    language = "hi" if is_hindi_detected else (msg_in.language or conv.language or current_user.preferred_language or "en")
    topic = msg_in.topic or conv.topic

    # Save citizen question
    user_msg = Message(
        conversation_id=conv.id,
        sender="user",
        content=msg_in.content,
        language=language,
        topic=topic
    )
    db.add(user_msg)
    db.flush()

    # Update conversation title if it was the default
    if conv.title == "Legal Inquiry" or conv.title == "New Legal Inquiry":
        words = msg_in.content.split()
        conv.title = " ".join(words[:6]) + ("..." if len(words) > 6 else "")

    # Execute Grounded RAG Pipeline
    ai_result = execute_rag_pipeline(
        query=msg_in.content,
        language=language,
        topic=topic,
        db=db
    )

    # Determine retrieval status tag
    if ai_result.insufficient_evidence:
        retrieval_status = "insufficient_evidence"
    elif not settings.is_ai_configured:
        retrieval_status = "demo_mode"
    else:
        retrieval_status = "grounded"

    # Save Assistant Response
    assistant_msg = Message(
        conversation_id=conv.id,
        sender="assistant",
        content=ai_result.answer,
        language=ai_result.language or language,
        topic=ai_result.topic,
        retrieval_status=retrieval_status,
        sources_cited=json.dumps([s.model_dump() for s in ai_result.sources]),
        supported_points=json.dumps(ai_result.supported_points),
        suggested_next_steps=json.dumps(ai_result.suggested_general_next_steps),
        legal_aid_referral=ai_result.legal_aid_referral
    )
    db.add(assistant_msg)
    db.commit()
    db.refresh(assistant_msg)

    return _format_message_response(assistant_msg)

@router.post("/feedback", response_model=FeedbackResponse)
def submit_feedback(
    feedback_in: FeedbackCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit quality or safety feedback on an AI response."""
    fb = Feedback(
        user_id=current_user.id,
        message_id=feedback_in.message_id,
        rating=feedback_in.rating,
        comments=feedback_in.comments
    )
    db.add(fb)
    db.commit()
    db.refresh(fb)
    return FeedbackResponse.model_validate(fb)
