from fastapi import APIRouter
from app.api.v1 import users

api_router = APIRouter()
api_router.include_router(users.router)

# Add more routers here as they are created
# api_router.include_router(items.router, prefix="/items", tags=["items"])