import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

from app.core.database import SessionLocal
from app.rag.retriever import retrieve_relevant_chunks

db = SessionLocal()
queries = [
    'what is drive without helmet',
    'penalty for driving without helmet',
    'riding two wheeler without helmet fine',
    'helmet challan',
    'बिना हेलमेट चालान'
]

for q in queries:
    res = retrieve_relevant_chunks(q, db, threshold=0.0)
    print(f"\nQuery: '{q}'")
    for r in res[:2]:
        print(f"   Score: {r['score']} | {r['document_title'][:60]}... | {r['section_title']}")
