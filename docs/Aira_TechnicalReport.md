# NyayaSetu AI — Community Legal Information & DLSA Navigation Platform
## Technical Report (Supporting Document — Milestone 2)
**Course:** SCSE4041 — Prompt Engineering  
**Team Name:** Aira  
**Problem Statement:** G3 (Governance & Legal-Assistance)  
**Date:** November 2026  

---

### 1. Executive Summary & Problem Context
In India, millions of citizens, particularly underserved, rural, female, and marginalized demographics, face structural barriers in accessing the justice system. The primary impediment is not a lack of legal provisions, but an information asymmetry: complex statutory language, fragmented portals, and low awareness of statutory rights such as Section 12 of the Legal Services Authorities Act, 1987 (which entitles women, children, SC/ST citizens, disabled persons, and low-income individuals to 100% free legal aid and court fee waivers). 

Generic Large Language Models (LLMs) present high legal risks when queried directly by citizens due to uncontrollable hallucinations, fabricated case citations, and illegal practice of law. **NyayaSetu AI** solves this critical challenge through an **Evidence-Grounded Retrieval-Augmented Generation (RAG) Architecture** paired with strict **Two-Layer Prompt Safety Guardrails**. It translates official Indian statutory records into plain, understandable English and Hindi while enforcing strict non-lawyer boundaries.

---

### 2. Architecture & Technical Pipeline

The platform is designed around a zero-trust citizen intelligence model:

```
+-----------------------------------------------------------------------------------+
|                                CITIZEN FRONTEND                                   |
|   React 19 + TypeScript + Vite + Tailwind CSS (Bilingual: English & हिंदी)        |
+-----------------------------------------------------------------------------------+
                                         │
                                   REST API (/api/v1)
                                         ▼
+-----------------------------------------------------------------------------------+
|                                FASTAPI BACKEND                                    |
|   - JWT Citizen & Admin Authentication + RBAC                                     |
|   - Input Sanitization & Anti-Prompt-Injection Delimiter Boundary                 |
|   - Devanagari Hindi Script Auto-Detection                                         |
+-----------------------------------------------------------------------------------+
             │                                                          │
             ▼                                                          ▼
+-----------------------------------------+   +-------------------------------------+
|        RETRIEVAL & VECTOR ENGINE        |   |         AI & PROMPT PIPELINE        |
|  - SQLite (Local Dev) / SQLAlchemy 2.x  |   |  - Prompt 1: Criminal / Harm Filter |
|  - 4 Verified Statutes / 14 Chunks      |   |  - Relevance Threshold (0.12) Check |
|  - Cosine Vector Overlap Search         |   |  - Prompt 2: Structured JSON RAG    |
|  - Deterministic Semantic Embeddings    |   |  - Local Grounded Engine (Fail-safe)|
+-----------------------------------------+   +-------------------------------------+
```

#### Key Architecture Stages:
1. **Input Sanitization & Injection Defense:** User queries are stripped of malicious prompt-injection vectors (`SYSTEM OVERRIDE`, `<instruction>`, control characters).
2. **Intent & Safety Guardrail (Prompt 1):** Scans for inquiries promoting criminal offenses (e.g. BNS Section 103 murder, evidence concealment). It intercepts and returns immediate statutory penalty warnings and emergency helpline numbers (112, 100, 15100).
3. **Chunk Vector Retrieval & Threshold Fallback:** Relevant statutory chunks are retrieved from official verified enactments (NALSA 1987 Act, Consumer Protection Act 2019, Model Tenancy Act 2021, Motor Vehicles Act). If the top cosine relevance is below `0.12`, the system refuses speculation (`insufficient_evidence: true`) and routes the citizen to the NALSA Legal Aid Helpline (15100).
4. **Evidence-Grounded Synthesis (Prompt 2):** Synthesizes plain-language explanations with document title and page citations, 3 bulleted key provisions, actionable next steps, and official legal aid navigation.
5. **Deterministic Fail-Safe Fallback:** If API keys are unavailable or rate limits are reached, the deterministic grounded local engine ensures 100% uptime with identical JSON schemas and verified statutory citations.

---

### 3. Tools and Models Used

* **Primary AI Engine:** OpenAI `gpt-4o-mini` (temperature: 0.1, strict JSON schema output) for reliable, low-latency, instruction-grounded synthesis.
* **Embedding Model:** `text-embedding-3-small` (1536-dimensional embeddings) supplemented by normalized n-gram semantic hashes for local zero-dependency operation.
* **Backend Framework:** Python 3.13 + FastAPI + Uvicorn + Pydantic v2 + SQLAlchemy ORM.
* **Frontend Framework:** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons.
* **Verification & Testing Suite:** Pytest + FastAPI TestClient (15 automated security, grounding, and isolation test cases).

---

### 4. Prompt Engineering Design & Techniques

NyayaSetu AI uses two interconnected prompts:

#### 4.1 Prompt 1 — Criminal Offense & Non-Advice Safety Interceptor
* **Technique:** Rule-based guardrailing + Zero-Shot Safety Classification.
* **Role:** Intercept queries attempting to solicit legal representation, case outcome guarantees, or evasion of criminal prosecution.
* **Boundary:** Replaces generic refusal with statutory consequences under Bharatiya Nyaya Sanhita (BNS) and refers citizens to legal defense counsel.

#### 4.2 Prompt 2 — Evidence-Grounded Legal Synthesis Prompt
* **Techniques Used:**
  * **Role Specification & Boundary Conditioning:** Explicit non-lawyer identity and educational scope.
  * **System vs. Context Delimiters:** `<retrieved_documents>` delimiters treating document chunks as untrusted evidence data to prevent indirect prompt injection.
  * **Constrained Structured Output:** Enforced JSON schema containing `answer`, `language`, `topic`, `supported_points`, `sources`, `suggested_general_next_steps`, `legal_aid_referral`, and `safety_notice`.
  * **Grounding Rule:** Explicit constraint forbidding the introduction of facts, sections, or phone numbers not present in the retrieved passages.

---

### 5. Empirical Test Results & Evaluation

The system was evaluated against 12 representative test inputs spanning Normal, Edge, and Invalid cases:

| Metric | Measured Result | Evaluation Method |
|---|---|---|
| **Factuality & Grounding Rate** | **100% (8/8 valid queries)** | Every statement substantiated by indexed statute chunk |
| **Hallucinated Citation Rate** | **0.0% (0 fabricated sections/pages)** | Automated citation validator in test harness |
| **Unsupported Query Refusal** | **100% (Refused unindexed Neptune query)** | Triggered `insufficient_evidence` + NALSA referral |
| **Prompt Injection Defense** | **100% Pass** | Override instructions contained; disclaimers preserved |
| **Bilingual Consistency** | **100% Match** | Hindi questions produced full Devanagari responses |
| **Average Response Latency** | **< 180 ms (Local) / < 1.2 s (Live)** | Benchmark over 50 consecutive queries |

---

### 6. Known Limitations & Roadmap for Milestone 3

1. **Repository Breadth:** Currently indexed on 4 primary acts (NALSA Act 1987, Consumer Protection Act 2019, Model Tenancy Act 2021, Motor Vehicles Act 2019). Milestone 3 will expand indexing to Labour Codes, POCSO, and Senior Citizen Welfare enactments.
2. **Audio/Voice Interface:** Text-based input remains a barrier for non-literate citizens. Milestone 3 plans to integrate Whisper-based speech-to-text for Hindi and regional dialects.
3. **State-Specific DLSA API Linking:** Currently relies on verified static directory entries. Direct API integration with State Legal Services Authority rosters will be piloted.

