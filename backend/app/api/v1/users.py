from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models import User
from app.schemas import UserResponse, UserUpdateRequest

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
def get_user_profile(current_user: User = Depends(get_current_user)):
    """Get current logged-in user profile."""
    return UserResponse.model_validate(current_user)

@router.patch("/me", response_model=UserResponse)
def update_user_profile(
    update_in: UserUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update profile information such as preferred language or name."""
    if update_in.full_name is not None:
        current_user.full_name = update_in.full_name
    if update_in.preferred_language is not None:
        current_user.preferred_language = update_in.preferred_language

    db.commit()
    db.refresh(current_user)
    return UserResponse.model_validate(current_user)

@router.delete("/me", status_code=status.HTTP_200_OK)
def delete_user_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Permanently delete user account and all associated personal conversations."""
    db.delete(current_user)
    db.commit()
    return {"message": "Account and associated data deleted successfully"}

