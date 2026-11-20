from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import LegalResource
from app.schemas import LegalResourceResponse

router = APIRouter(prefix="/resources", tags=["Legal Resources"])

@router.get("", response_model=List[LegalResourceResponse])
def get_legal_resources(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search keyword in title or description"),
    language: Optional[str] = Query(None, description="Filter by language (en, hi, both)"),
    db: Session = Depends(get_db)
):
    """Retrieve verified official legal resources with optional category and search filters."""
    query = db.query(LegalResource).filter(LegalResource.is_active == True)

    if category and category != "All":
        query = query.filter(LegalResource.category == category)
    if language and language != "all":
        query = query.filter((LegalResource.language == language) | (LegalResource.language == "both"))
    if search:
        search_fmt = f"%{search.strip()}%"
        query = query.filter(
            (LegalResource.title.ilike(search_fmt)) |
            (LegalResource.description.ilike(search_fmt)) |
            (LegalResource.source_organization.ilike(search_fmt))
        )

    return query.order_by(LegalResource.created_at.desc()).all()

@router.get("/{resource_id}", response_model=LegalResourceResponse)
def get_resource_details(resource_id: str, db: Session = Depends(get_db)):
    """Retrieve single verified legal resource."""
    resource = db.query(LegalResource).filter(LegalResource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
    return resource

