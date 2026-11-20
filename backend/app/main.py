import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.core.database import init_db, SessionLocal
from app.core.seed import seed_database
from app.api.v1.health import router as health_router
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.chat import router as chat_router
from app.api.v1.resources import router as resources_router
from app.api.v1.sources import router as sources_router
from app.api.v1.legal_aid import router as legal_aid_router
from app.api.v1.admin import router as admin_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("nyayasetu")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize Database & Seed Baseline Documents
    logger.info("Initializing NyayaSetu database and tables...")
    init_db()
    db = SessionLocal()
    try:
        logger.info("Running baseline data seeding...")
        seed_database(db)
        logger.info("NyayaSetu AI startup complete.")
    finally:
        db.close()
    yield
    # Shutdown
    logger.info("NyayaSetu backend shutting down...")

app = FastAPI(
    title="NyayaSetu AI — Community Legal Information Platform",
    description="Evidence-grounded, citizen-facing legal information assistant and official legal aid navigation API.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS to accept local machine IP and any local network devices (e.g. mobile on Wi-Fi)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"^https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register v1 routes
app.include_router(health_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")
app.include_router(resources_router, prefix="/api/v1")
app.include_router(sources_router, prefix="/api/v1")
app.include_router(legal_aid_router, prefix="/api/v1")
app.include_router(admin_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {
        "message": "Welcome to NyayaSetu AI — Community Legal Information Platform API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/v1/health",
        "disclaimer": "This service provides public legal information only, not personalized legal advice."
    }

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error on path {request.url.path}: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please try again later."}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.BACKEND_HOST, port=settings.BACKEND_PORT, reload=True)

