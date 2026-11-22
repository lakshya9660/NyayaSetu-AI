FROM python:3.11-slim

# Create user with UID 1000 for Hugging Face Spaces compatibility
RUN useradd -m -u 1000 user

WORKDIR /app

# Install minimal build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application
COPY backend ./backend

# Copy compiled frontend SPA
COPY frontend/dist ./frontend/dist

# Ensure full read/write permissions for user 1000 to manage SQLite and cache
RUN chown -R user:user /app && chmod -R 777 /app

USER user

# Expose port 7860 (Hugging Face default) and 8000
EXPOSE 7860
EXPOSE 8000

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV AI_MODE=demo_grounded_local_rag
ENV DATABASE_URL=sqlite:////app/nyayasetu.db

# Default startup command (adapts to $PORT if provided, defaults to 7860)
CMD ["sh", "-c", "uvicorn app.main:app --app-dir backend --host 0.0.0.0 --port ${PORT:-7860}"]
