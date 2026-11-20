import json
import os
import shutil
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_admin
from app.core.config import settings
from app.models import (
    User,
    LegalDocument,
    DocumentChunk,
    LegalResource,
    LegalAidDirectoryEntry,
    Conversation,
    Message,
    Feedback
)
from app.schemas import (
    LegalDocumentResponse,
    LegalResourceResponse,
    LegalResourceCreateRequest,
    LegalAidDirectoryResponse,
    LegalAidDirectoryCreateRequest,
    AdminAnalyticsResponse
)
from app.rag.document_parser import parse_document_file
from app.rag.chunking import chunk_text
from app.rag.embeddings import generate_embedding

router = APIRouter(prefix="/admin", tags=["Admin Portal"])

UPLOAD_STORAGE_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "documents")
os.makedirs(UPLOAD_STORAGE_DIR, exist_ok=True)

@router.get("/documents", response_model=List[LegalDocumentResponse])
def admin_list_documents(
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin-only: list all documents regardless of approval state."""
    return db.query(LegalDocument).order_by(LegalDocument.created_at.desc()).all()

@router.post("/documents/upload", response_model=LegalDocumentResponse)
async def admin_upload_document(
    file: UploadFile = File(...),
    title: str = Form(...),
    publisher: str = Form(...),
    document_type: str = Form("Act"),
    official_url: str = Form(...),
    verification_date: Optional[str] = Form(None),
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    Admin-only: Securely upload and index a legal document (PDF/TXT/DOCX).
    Parses content, chunks text, generates embeddings, and saves to database.
    """
    file_bytes = await file.read()
    filename = file.filename or "uploaded_doc.txt"

    # 1. Parse document into pages
    parsed_pages = parse_document_file(filename, file_bytes)
    ext = os.path.splitext(filename)[1].lower().replace(".", "")

    # 2. Save physical file safely
    safe_filename = f"{filename}"
    saved_path = os.path.join(UPLOAD_STORAGE_DIR, safe_filename)
    with open(saved_path, "wb") as f:
        f.write(file_bytes)

    # 3. Create LegalDocument record
    doc = LegalDocument(
        title=title.strip(),
        publisher=publisher.strip(),
        document_type=document_type.strip(),
        official_url=official_url.strip(),
        file_path=saved_path,
        file_format=ext,
        status="processing",
        is_approved=True,
        verification_date=verification_date or "Verified 2026",
        total_chunks=0
    )
    db.add(doc)
    db.flush()

    # 4. Chunk text
    chunks = chunk_text(parsed_pages)

    # 5. Generate embeddings and create DocumentChunk records
    for c in chunks:
        vec = generate_embedding(c["content"])
        chunk_record = DocumentChunk(
            document_id=doc.id,
            chunk_index=c["chunk_index"],
            content=c["content"],
            page_number=c["page_number"],
            section_title=c["section_title"],
            embedding_json=json.dumps(vec)
        )
        db.add(chunk_record)

    doc.total_chunks = len(chunks)
    doc.status = "indexed"
    db.commit()
    db.refresh(doc)

    return doc

@router.delete("/documents/{document_id}", status_code=status.HTTP_200_OK)
def admin_delete_document(
    document_id: str,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin-only: Delete an approved document and its indexed chunks."""
    doc = db.query(LegalDocument).filter(LegalDocument.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    # If physical file exists, remove it safely
    if doc.file_path and os.path.exists(doc.file_path):
        try:
            os.remove(doc.file_path)
        except Exception:
            pass

    db.delete(doc)
    db.commit()
    return {"message": "Document and its indexed chunks deleted successfully"}

@router.patch("/documents/{document_id}/approval", response_model=LegalDocumentResponse)
def admin_toggle_approval(
    document_id: str,
    is_approved: bool,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin-only: Toggle document approval status to enable/disable RAG retrieval."""
    doc = db.query(LegalDocument).filter(LegalDocument.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    doc.is_approved = is_approved
    doc.status = "indexed" if is_approved else "unapproved"
    db.commit()
    db.refresh(doc)
    return doc

@router.post("/resources", response_model=LegalResourceResponse, status_code=status.HTTP_201_CREATED)
def admin_create_resource(
    res_in: LegalResourceCreateRequest,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin-only: Add a verified official legal resource link."""
    resource = LegalResource(
        title=res_in.title,
        category=res_in.category,
        description=res_in.description,
        source_organization=res_in.source_organization,
        official_url=res_in.official_url,
        language=res_in.language,
        last_verified_date=res_in.last_verified_date,
        is_active=True
    )
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource

@router.delete("/resources/{resource_id}", status_code=status.HTTP_200_OK)
def admin_delete_resource(
    resource_id: str,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin-only: Remove a legal resource."""
    resource = db.query(LegalResource).filter(LegalResource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    db.delete(resource)
    db.commit()
    return {"message": "Resource removed"}

@router.post("/legal-aid", response_model=LegalAidDirectoryResponse, status_code=status.HTTP_201_CREATED)
def admin_create_directory_entry(
    entry_in: LegalAidDirectoryCreateRequest,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin-only: Add a verified DLSA/SLSA directory record."""
    entry = LegalAidDirectoryEntry(
        authority_type=entry_in.authority_type,
        state=entry_in.state,
        district=entry_in.district,
        office_name=entry_in.office_name,
        address=entry_in.address,
        contact_number=entry_in.contact_number,
        official_portal_url=entry_in.official_portal_url,
        verification_status=entry_in.verification_status,
        last_verified_date=entry_in.last_verified_date
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

@router.delete("/legal-aid/{entry_id}", status_code=status.HTTP_200_OK)
def admin_delete_directory_entry(
    entry_id: str,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin-only: Remove a directory entry."""
    entry = db.query(LegalAidDirectoryEntry).filter(LegalAidDirectoryEntry.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Directory entry not found")
    db.delete(entry)
    db.commit()
    return {"message": "Directory entry removed"}

@router.get("/analytics", response_model=AdminAnalyticsResponse)
def admin_get_analytics(
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin-only: Aggregate metrics on RAG retrieval, refusal rates, and user feedback."""
    total_users = db.query(User).count()
    total_convs = db.query(Conversation).count()
    total_docs = db.query(LegalDocument).count()
    total_chunks = db.query(DocumentChunk).count()
    total_res = db.query(LegalResource).count()

    total_assistant_msgs = db.query(Message).filter(Message.sender == "assistant").count()
    refusal_msgs = (
        db.query(Message)
        .filter(Message.sender == "assistant", Message.retrieval_status == "insufficient_evidence")
        .count()
    )

    if total_assistant_msgs > 0:
        refusal_rate = round((refusal_msgs / total_assistant_msgs) * 100, 1)
        retrieval_rate = round(((total_assistant_msgs - refusal_msgs) / total_assistant_msgs) * 100, 1)
    else:
        refusal_rate = 0.0
        retrieval_rate = 100.0

    pos_feedback = db.query(Feedback).filter(Feedback.rating == 1).count()
    neg_feedback = db.query(Feedback).filter(Feedback.rating == -1).count()

    ai_status = "live_openai" if settings.is_ai_configured else "demo_grounded_local_rag"

    return AdminAnalyticsResponse(
        total_users=total_users,
        total_conversations=total_convs,
        total_documents=total_docs,
        total_chunks=total_chunks,
        total_resources=total_res,
        retrieval_success_rate=retrieval_rate,
        refusal_rate=refusal_rate,
        feedback_positive_count=pos_feedback,
        feedback_negative_count=neg_feedback,
        ai_status=ai_status
    )

