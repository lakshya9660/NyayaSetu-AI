# Changelog — NyayaSetu AI

All notable changes to the NyayaSetu AI project between Milestone 1 and Milestone 2.

## [Milestone 2] - 2026-11-20

### Added
- **Full-Stack Application Architecture:**
  - FastAPI backend serving 14 REST endpoints across `/auth`, `/chat`, `/resources`, `/legal-aid`, `/sources`, and `/admin`.
  - React 19 + TypeScript + Vite frontend styled with a custom Rose Gold & White WCAG-compliant design system.
- **Two-Layer Prompt Safety Guardrails:**
  - `P1_SAFETY_INTERCEPTOR`: Criminal harm filter detecting BNS Section 103 (murder) and Section 238 (evidence concealment), returning statutory warnings and 112/15100 helplines.
  - `P2_GROUNDED_LEGAL_SYNTHESIS`: Strict evidence-grounded prompt wrapped in `<retrieved_documents>` delimiters enforcing a validated Pydantic JSON schema.
- **Vector Retrieval & Threshold Grounding:**
  - 4 verified statutory enactments parsed into 14 vector chunks with metadata tags (Act title, section, page number, official URL).
  - Cosine relevance threshold (0.12) triggering safe refusal (`insufficient_evidence: true`) and NALSA referral for unindexed topics.
- **Bilingual Hindi & English Support:**
  - Automatic Devanagari script detection routing Hindi queries to a dedicated Hindi legal synthesis engine.
  - Full Hindi translations for legal provisions, key points, next steps, and official NALSA navigation.
- **Dual-Engine Fail-Safe Architecture:**
  - Live OpenAI GPT-4o-mini integration with deterministic local RAG fallback ensuring 100% offline uptime.
- **Automated Verification Harness:**
  - `scripts/run_eval.py` executing 15 automated test cases validating grounding, prompt injection defense, user data isolation, and RBAC.

### Changed
- Replaced Milestone 1 single unstructured prompt with an asynchronous multi-stage RAG pipeline.
- Upgraded UI from generic styling to high-contrast Rose Gold & White aesthetic with full accessibility compliance.
- Migrated from mock JSON responses to live database persistence via SQLAlchemy 2.0.

### Fixed
- Fixed prompt injection vulnerability by enforcing `<retrieved_documents>` delimiter boundaries.
- Fixed washed-out contrast on action buttons and subheadings.
- Fixed language dropdown mismatch by implementing automatic script detection.

