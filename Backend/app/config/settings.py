import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "FinAI"
    PROJECT_VERSION: str = "0.1.0"
    PROJECT_DESCRIPTION: str = "Financial AI Backend API"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"

settings = Settings()