from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import get_db
from app.core.config import settings
from app.models import LegalDocument, DocumentChunk

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("")
def get_health_status(db: Session = Depends(get_db)):
    """Health check endpoint disclosing system and AI operational status."""
    db_status = "connected"
    total_docs = 0
    total_chunks = 0
    try:
        # Check DB connectivity
        db.execute(text("SELECT 1"))
        total_docs = db.query(LegalDocument).filter(LegalDocument.status == "indexed").count()
        total_chunks = db.query(DocumentChunk).count()
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    ai_mode = "live_openai" if settings.is_ai_configured else "demo_grounded_local_rag"

    return {
        "status": "healthy" if db_status == "connected" else "degraded",
        "app_name": settings.APP_NAME,
        "environment": settings.APP_ENV,
        "database": db_status,
        "total_indexed_documents": total_docs,
        "total_indexed_chunks": total_chunks,
        "ai_engine": {
            "mode": ai_mode,
            "is_live_key_configured": settings.is_ai_configured,
            "model": settings.OPENAI_MODEL if settings.is_ai_configured else "deterministic-grounded-local",
            "threshold": settings.RAG_RELEVANCE_THRESHOLD
        }
    }

