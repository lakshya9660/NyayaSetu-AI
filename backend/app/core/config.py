import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    APP_ENV: str = "development"
    APP_NAME: str = "NyayaSetu AI"
    SECRET_KEY: str = "nyayasetu-dev-secret-key-32-chars-long-secure-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database
    DATABASE_URL: str = "sqlite:///./nyayasetu.db"

    # AI Configuration
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"
    RAG_RELEVANCE_THRESHOLD: float = 0.12
    RAG_MAX_CHUNKS: int = 4

    # Server & Networking
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000
    FRONTEND_URL: str = "http://localhost:5173"
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"

    # Admin & Seed Defaults
    ADMIN_EMAIL: str = "admin@nyayasetu.org"
    ADMIN_PASSWORD: str = "AdminSecureNyaya2026!"
    DEMO_CITIZEN_EMAIL: str = "citizen@nyayasetu.org"
    DEMO_CITIZEN_PASSWORD: str = "CitizenDemo2026!"

    # Constraints
    MAX_UPLOAD_SIZE_MB: int = 15
    RATE_LIMIT_PER_MINUTE: int = 60

    @property
    def cors_origins(self) -> List[str]:
        if isinstance(self.ALLOWED_ORIGINS, str):
            return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]
        return ["http://localhost:5173"]

    @property
    def is_ai_configured(self) -> bool:
        return bool(self.OPENAI_API_KEY and len(self.OPENAI_API_KEY.strip()) > 10 and not self.OPENAI_API_KEY.startswith("sk-placeholder"))

settings = Settings()
