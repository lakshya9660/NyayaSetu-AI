---
title: NyayaSetu AI
emoji: ⚖️
colorFrom: pink
colorTo: red
sdk: gradio
app_file: space.py
pinned: false
---

# NyayaSetu AI — Community Legal Information & DLSA Navigation Platform

[![Backend Tests](https://img.shields.io/badge/pytest-22%20passed-emerald)](backend/app/tests)
[![Evaluation](https://img.shields.io/badge/eval-15%2F15%20passed%20(100%25)-teal)](scripts/run_eval.py)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

### 📌 SCSE4041 Prompt Engineering — Milestone 2
* **Team ID:** T23
* **Team Name:** Aira
* **Batch:** B26, 29 and 30
* **Faculty:** Dr. Saurabh R Srivastava
* **Live Prototype Link:** [https://nyasetu.netlify.app/chat](https://nyasetu.netlify.app/chat)
* **GitHub Repository:** [https://github.com/lakshya9660/NyayaSetu-AI](https://github.com/lakshya9660/NyayaSetu-AI)
* **Team Members:**
  1. `S24CSEU0063` — Lakshya Pratap Singh (Team Leader)
  2. `S24CSEU0606` — Nishika Upadhyay
  3. `S24CSEU0687` — Jhanvi Bhat
  4. `S24CSEU0072` — Tanvi Agrawal
  5. `S24CSEU2660` — Niharika .

---

**NyayaSetu AI (न्यायसेतु)** is a full-stack, evidence-grounded legal information platform designed to help Indian citizens understand publicly available, verified legal information and locate District Legal Services Authorities (DLSA). Users can ask legal questions in simple English or everyday Hindi and receive understandable explanations strictly grounded in official documents with verifiable page and section citations.

> **Statutory Notice:** NyayaSetu AI is an information and navigation tool, **NOT a lawyer and NOT a provider of personalized legal advice**. It never guarantees case outcomes, invents provisions, or claims official government affiliation.

---

## Key Features

1. **Evidence-Grounded RAG Pipeline**: Never hallucinates laws. Every answer is substantiated directly by approved Indian statutory documents.
2. **Page & Section Citations**: Displays exact document titles, page numbers, and verified links to official government portals (`.gov.in`, `.nic.in`).
3. **Safe Refusal (Insufficient Evidence)**: If verified legal records do not substantiate an answer, the system explicitly refuses to speculate and refers the citizen to NALSA (15100).
4. **Bilingual Support (English & हिन्दी)**: Native query understanding and response synthesis in both languages.
5. **Prompt Injection & Untrusted Data Immunity**: User queries and uploaded documents are isolated in strict boundaries; embedded instructions cannot override system constraints.
6. **Official DLSA Legal Aid Locator**: Interactive directory connecting eligible citizens to District and State Legal Services Authorities under Section 12 of the Legal Services Authorities Act, 1987.
7. **Dual-Mode AI Engine**:
   - **Live OpenAI Mode**: Powered by `gpt-4o-mini` with structured JSON output and `text-embedding-3-small`.
   - **Deterministic Grounded Local Mode**: Fully functional offline demo mode using semantic n-gram vector embeddings and grounded passage synthesis with transparent badging.
8. **Admin Governance Console**: Protected interface for uploading acts (.pdf, .txt, .docx), inspecting indexed chunks, toggling approval, and monitoring retrieval success rates.
9. **Zero Aadhaar / Sensitive ID Policy**: Strictly prohibits the collection of Aadhaar numbers, biometric data, or private case files.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router v7, TanStack Query, Recharts.
- **Backend**: Python 3.12+, FastAPI, SQLAlchemy 2.x, Alembic, Pydantic v2, PyJWT, bcrypt, pypdf, python-docx.
- **Vector Storage**: Cosine vector similarity engine supporting SQLite for zero-setup local dev and PostgreSQL/pgvector for production.
- **Testing**: Pytest, Pytest-Asyncio, HTTPX TestClient, custom 15-scenario evaluation harness.

---

## Quick Start (Local Development)

### Prerequisites
- Python 3.12 or 3.13
- Node.js 20+ and npm

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start FastAPI server (runs on http://127.0.0.1:8000)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install packages
npm install

# Start Vite development server (runs on http://localhost:5173)
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Default Development Accounts

For testing and demonstration, baseline accounts are seeded automatically on first run:

| Role | Email | Password |
|---|---|---|
| **Demo Citizen** | `citizen@nyayasetu.org` | `CitizenDemo2026!` |
| **System Admin** | `admin@nyayasetu.org` | `AdminSecureNyaya2026!` |

*(Quick-login buttons are also available directly on the `/login` page for fast evaluation.)*

---

## Environment Configuration

Copy `.env.example` to `backend/.env`:

```ini
APP_ENV=development
APP_NAME="NyayaSetu AI"
SECRET_KEY=nyayasetu-dev-secret-key-32-chars-long-secure-2026
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Database
DATABASE_URL=sqlite:///./nyayasetu.db

# AI Engine Configuration
# (Leave blank for deterministic grounded local demo mode)
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
RAG_RELEVANCE_THRESHOLD=0.20
RAG_MAX_CHUNKS=4

# Server & CORS
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Configuring Live OpenAI
To use live OpenAI instead of the local deterministic engine, simply set:
```bash
OPENAI_API_KEY=sk-...your-actual-key...
```
The application will automatically detect the key, switch to live mode, and update the mode badge in the UI.

---

## Running Automated Tests & Evaluation

### Run Pytest Backend Suite (22 Tests)
```bash
cd backend
pytest -v
```
*Output: 22 passed in ~5 seconds.*

### Run 15-Scenario Legal Safety Evaluation Harness
```bash
python scripts/run_eval.py
```
*Output: 15/15 PASSED (100.0%) covering groundings, citations, refusal behavior, Hindi queries, isolation, and prompt injection defense.*

### Run Frontend Production Build
```bash
cd frontend
npm run build
```
*Output: Built in ~1.1s with 0 TypeScript errors.*

---

## Docker Deployment

To launch the full stack with Docker Compose:

```bash
docker-compose up --build
```
- Frontend: `http://localhost:5173`
- Backend API & OpenAPI Docs: `http://localhost:8000/docs`

---

## Verified Seed Documents

1. **The Legal Services Authorities Act, 1987 (Sections 12 & 13)**: Free legal services criteria for women, children, SC/ST, disabled persons, and low-income citizens.
2. **The Consumer Protection Act, 2019**: Citizen rights against defective goods, misleading advertisements, and e-Daakhil filing.
3. **The Model Tenancy Act, 2021**: Mandatory rent agreements, 2-month residential security deposit caps, essential supply protections, and eviction rules.
4. **Official DLSA/SLSA Directory**: Verified contact numbers and links for NALSA (New Delhi), DSLSA (Delhi), MSLSA (Mumbai), KSLSA (Bengaluru), and UPSLSA (Lucknow).

