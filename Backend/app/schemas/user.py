from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    username: Optional[str] = None
    email: Optional[str] = None

class UserInDB(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)