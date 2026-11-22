import os
import sys
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import gradio as gr

try:
    import spaces
    HAS_SPACES = True
except ImportError:
    HAS_SPACES = False

def gpu_wrapper(func):
    if HAS_SPACES:
        return spaces.GPU(func)
    return func

# Define a companion Gradio UI for quick evaluation and testing
@gpu_wrapper
def query_nyayasetu(question: str):
    if not question.strip():
        return "Please enter a valid legal question."
    try:
        from app.services.rag_service import rag_service
        from app.core.database import SessionLocal
        db = SessionLocal()
        try:
            res = rag_service.answer_query(db, question, language="en")
            answer = f"### ⚖️ NyayaSetu Grounded Response\n\n{res.get('answer', '')}\n\n"
            citations = res.get('citations', [])
            if citations:
                answer += "#### 📚 Official Statutory Citations:\n"
                for c in citations:
                    answer += f"- **{c.get('source_title', 'Act')}** (Section {c.get('section', 'N/A')}, p. {c.get('page_number', 'N/A')}): [Official Portal]({c.get('source_url', '#')})\n"
            return answer
        finally:
            db.close()
    except Exception as e:
        return f"Error processing query: {str(e)}"

# Gradio Interface
with gr.Blocks(title="NyayaSetu AI — Grounded Legal Platform") as demo:
    gr.Markdown("# ⚖️ NyayaSetu AI (न्यायसेतु)")
    gr.Markdown(
        "**Full-Stack Evidence-Grounded Legal Information & DLSA Navigation Platform**\n\n"
        "🌐 **[Click here to open the Full React Web Portal](/)**\n\n"
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

# Mount Gradio app onto FastAPI at /gradio
# "/" serves the React SPA, "/api/v1" serves FastAPI endpoints & SQLite DB, and "/gradio" serves Gradio
app = gr.mount_gradio_app(fastapi_app, demo, path="/gradio")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 7860))
    uvicorn.run(app, host="0.0.0.0", port=port)
