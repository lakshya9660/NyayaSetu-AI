import json
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models import LegalDocument, DocumentChunk
from app.rag.embeddings import generate_embedding, cosine_similarity, _tokenize
from app.core.config import settings

def retrieve_relevant_chunks(
    query: str,
    db: Session,
    top_k: int = None,
    threshold: float = None
) -> List[Dict[str, Any]]:
    """
    Search approved indexed legal documents for relevant chunks using vector similarity.
    Applies configurable relevance threshold.
    """
    if top_k is None:
        top_k = settings.RAG_MAX_CHUNKS
    if threshold is None:
        threshold = settings.RAG_RELEVANCE_THRESHOLD

    # Generate query embedding and query tokens
    query_vector = generate_embedding(query)
    query_tokens = set(_tokenize(query))

    # Query all chunks from approved documents
    records = (
        db.query(DocumentChunk, LegalDocument)
        .join(LegalDocument, DocumentChunk.document_id == LegalDocument.id)
        .filter(
            LegalDocument.is_approved == True,
            LegalDocument.status == "indexed"
        )
        .all()
    )

    scored_chunks = []
    for chunk, doc in records:
        if not chunk.embedding_json:
            continue

        # Lexical guard: require at least one token or root overlap to avoid false positive hash collisions
        chunk_content_lower = chunk.content.lower()
        has_overlap = any(
            token in chunk_content_lower for token in query_tokens
        )
        if not has_overlap and query_tokens:
            continue

        try:
            chunk_vector = json.loads(chunk.embedding_json)
        except Exception:
            continue

        score = cosine_similarity(query_vector, chunk_vector)
        if score >= threshold:
            scored_chunks.append({
                "chunk_id": chunk.id,
                "document_id": doc.id,
                "document_title": doc.title,
                "page_number": chunk.page_number,
                "section_title": chunk.section_title or "General",
                "content": chunk.content,
                "official_url": doc.official_url,
                "score": round(score, 4)
            })

    # Sort descending by similarity score
    scored_chunks.sort(key=lambda x: x["score"], reverse=True)
    return scored_chunks[:top_k]

