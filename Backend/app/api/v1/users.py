from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import database, crud
from app.schemas.user import UserCreate, UserInDB

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserInDB)
def create_user(user: UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@router.get("/{user_id}", response_model=UserInDB)
def read_user(user_id: int, db: Session = Depends(database.get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user