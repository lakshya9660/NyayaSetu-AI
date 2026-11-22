import os
import sys
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import gradio as gr
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

# Initialize SQLite database and seed baseline records
init_db()
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

try:
    import spaces
    HAS_SPACES = True
except ImportError:
    HAS_SPACES = False

def gpu_wrapper(func):
    if HAS_SPACES:
        return spaces.GPU(func)
    return func

# Define query handler
@gpu_wrapper
def query_nyayasetu(question: str):
    if not question.strip():
        return "Please enter a valid legal question."
    try:
        from app.services.rag_service import rag_service
        db_sess = SessionLocal()
        try:
            res = rag_service.answer_query(db_sess, question, language="en")
            answer = f"### ⚖️ NyayaSetu Grounded Response\n\n{res.get('answer', '')}\n\n"
            citations = res.get('citations', [])
            if citations:
                answer += "#### 📚 Official Statutory Citations:\n"
                for c in citations:
                    answer += f"- **{c.get('source_title', 'Act')}** (Section {c.get('section', 'N/A')}, p. {c.get('page_number', 'N/A')}): [Official Portal]({c.get('source_url', '#')})\n"
            return answer
        finally:
            db_sess.close()
    except Exception as e:
        return f"Error processing query: {str(e)}"

# Gradio Interface
with gr.Blocks(title="NyayaSetu AI — Grounded Legal Platform") as demo:
    gr.Markdown("# ⚖️ NyayaSetu AI (न्यायसेतु)")
    gr.Markdown(
        "**Full-Stack Evidence-Grounded Legal Information & DLSA Navigation Platform**\n\n"
        "🏛️ Powered by FastAPI Backend, SQLite Database, and Grounded Statutory RAG Engine.\n\n"
        "---"
    )
    with gr.Row():
        with gr.Column(scale=2):
            q_input = gr.Textbox(
                label="Ask a Legal Question (English or Hindi)",
                placeholder="e.g., What are my rights as a tenant under Model Tenancy Act? or Who is eligible for free legal aid under Section 12?",
                lines=3
            )
            btn = gr.Button("Submit Legal Inquiry", variant="primary")
        with gr.Column(scale=3):
            output = gr.Markdown(label="Verified Answer & Citations")

    btn.click(fn=query_nyayasetu, inputs=q_input, outputs=output)

# Initialize FastAPI application with CORS
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

fastapi_app = FastAPI(title="NyayaSetu AI Backend", docs_url="/api/docs", openapi_url="/api/openapi.json")

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all FastAPI API routes
fastapi_app.include_router(health_router, prefix="/api/v1")
fastapi_app.include_router(auth_router, prefix="/api/v1")
fastapi_app.include_router(users_router, prefix="/api/v1")
fastapi_app.include_router(chat_router, prefix="/api/v1")
fastapi_app.include_router(resources_router, prefix="/api/v1")
fastapi_app.include_router(sources_router, prefix="/api/v1")
fastapi_app.include_router(legal_aid_router, prefix="/api/v1")
fastapi_app.include_router(admin_router, prefix="/api/v1")

# Mount Gradio Blocks on the root FastAPI app
app = gr.mount_gradio_app(fastapi_app, demo, path="/")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
