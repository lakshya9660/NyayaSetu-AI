# NyayaSetu AI Codebase Directory

This repository hosts the full-stack architecture of NyayaSetu AI across the following modules:

- `backend/app/api/v1/`: FastAPI REST endpoints (`chat.py`, `auth.py`, `resources.py`, `legal_aid.py`, `sources.py`, `admin.py`)
- `backend/app/rag/`: Retrieval-Augmented Generation pipeline (`pipeline.py`, `retriever.py`, `chunking.py`, `embeddings.py`)
- `backend/app/models/`: SQLAlchemy 2.0 database models (`user.py`, `document.py`, `dlsa.py`, `message.py`)
- `frontend/src/`: React 19 + TypeScript + Vite UI (`pages/`, `components/`, `contexts/`)
- `space.py`: Hugging Face Space Gradio & FastAPI deployment harness
