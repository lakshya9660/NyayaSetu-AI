from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import LegalDocument, DocumentChunk
from app.schemas import LegalDocumentResponse, DocumentChunkResponse

router = APIRouter(prefix="/sources", tags=["Document Sources"])

@router.get("", response_model=List[LegalDocumentResponse])
def get_approved_sources(db: Session = Depends(get_db)):
    """List all publicly approved, indexed legal documents used by the AI RAG engine."""
    docs = (
        db.query(LegalDocument)
        .filter(LegalDocument.is_approved == True, LegalDocument.status == "indexed")
        .order_by(LegalDocument.title.asc())
        .all()
    )
    return docs

@router.get("/{document_id}", response_model=LegalDocumentResponse)
def get_source_detail(document_id: str, db: Session = Depends(get_db)):
    """Retrieve details of a specific legal document."""
    doc = db.query(LegalDocument).filter(LegalDocument.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source document not found")
    return doc

@router.get("/{document_id}/chunks", response_model=List[DocumentChunkResponse])
def get_source_chunks(document_id: str, db: Session = Depends(get_db)):
    """Inspect the indexed text passages for complete transparency and auditability."""
    doc = db.query(LegalDocument).filter(LegalDocument.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source document not found")
    chunks = (
        db.query(DocumentChunk)
        .filter(DocumentChunk.document_id == document_id)
        .order_by(DocumentChunk.chunk_index.asc())
        .all()
    )
    return chunks

