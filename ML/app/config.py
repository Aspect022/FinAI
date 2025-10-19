import os

class Settings:
    PROJECT_NAME: str = "FinAI ML Service"
    VERSION: str = "0.1.0"

    # Model settings
    DEFAULT_SENTIMENT_MODEL: str = "ProsusAI/finbert"
    DEFAULT_TREND_MODEL_PATH: str = "models/trend_model.h5"

    # Database settings (placeholders)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")

    # API settings
    API_V1_STR: str = "/api/v1"

settings = Settings()
