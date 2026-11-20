from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import LegalAidDirectoryEntry
from app.schemas import LegalAidDirectoryResponse

router = APIRouter(prefix="/legal-aid", tags=["Legal Aid Navigation"])

@router.get("/search", response_model=List[LegalAidDirectoryResponse])
def search_legal_aid_directory(
    state: Optional[str] = Query(None, description="State name (e.g. Delhi, Maharashtra)"),
    district: Optional[str] = Query(None, description="District name"),
    authority_type: Optional[str] = Query(None, description="NALSA, SLSA, DLSA"),
    db: Session = Depends(get_db)
):
    """
    Search official verified Legal Aid authorities (DLSA / SLSA / NALSA).
    All data is referenced from official state and national portals.
    """
    query = db.query(LegalAidDirectoryEntry)

    if state and state != "All":
        query = query.filter(LegalAidDirectoryEntry.state.ilike(f"%{state.strip()}%"))
    if district and district.strip():
        query = query.filter(LegalAidDirectoryEntry.district.ilike(f"%{district.strip()}%"))
    if authority_type and authority_type != "All":
        query = query.filter(LegalAidDirectoryEntry.authority_type == authority_type)

    return query.order_by(LegalAidDirectoryEntry.state.asc(), LegalAidDirectoryEntry.authority_type.asc()).all()

@router.get("/info")
def get_legal_aid_general_info():
    """Returns official links, national helpline numbers, and eligibility criteria."""
    return {
        "official_portal": "https://nalsa.gov.in/legal-aid/",
        "national_tele_law_portal": "https://www.tele-law.in/",
        "national_helpline": "15100",
        "description": (
            "Under Section 12 of the Legal Services Authorities Act, 1987, free legal services are provided "
            "to eligible citizens including women, children, members of SC/ST, victims of trafficking, "
            "disabled persons, industrial workmen, and persons with annual income below the state statutory threshold."
        ),
        "guidance": (
            "If your local district office is not listed in this community registry, visit https://nalsa.gov.in/legal-aid/ "
            "or visit the front office of your local District Court."
        )
    }

