import math
import re
import json
import hashlib
from typing import List
import numpy as np
from app.core.config import settings

EMBEDDING_DIM = 256

HINDI_LEGAL_GLOSSARY = {
    "कानूनी सहायता": "legal aid legal services",
    "विधिक सहायता": "legal aid legal services nalsa dlsa",
    "मुफ्त": "free entitlement",
    "उपभोक्ता": "consumer protection rights commission",
    "किराया": "rent tenancy landlord agreement",
    "किरायेदार": "tenant tenancy rent",
    "मकान मालिक": "landlord premises rent",
    "धारा 12": "section 12 legal services",
    "अधिनियम": "act legislation",
    "महिला": "woman women",
    "अदालत": "court commission lok adalat",
    "हेलमेट": "helmet protective headgear two wheeler motor vehicles",
    "चालान": "challan fine penalty traffic violation",
    "ट्रैफिक": "traffic motor vehicle road safety",
    "घरेलू हिंसा": "domestic violence cruelty pwdva",
    "थप्पड़": "slap slapping assault physical abuse violence hurt",
    "मारपीट": "beating assault physical abuse violence hurt",
    "पति": "husband spouse domestic cruelty",
    "दहेज": "dowry cruelty harassment",
    "ससुराल": "in-laws matrimonial home shared household",
    "एफआईआर": "fir police complaint zero fir",
    "चेक": "cheque dishonour 138 negotiable",
    "जमानत": "bail arrest custody",
    "वरिष्ठ नागरिक": "senior citizen elderly parents maintenance 2007",
    "बुजुर्ग": "senior citizen elderly parents maintenance 2007",
    "माता पिता": "parents maintenance senior citizens 2007",
    "संपत्ति": "property ownership possession injunction 1963",
    "जमीन": "property land ownership possession injunction",
    "मकान": "house property residence possession",
    "कब्जा": "possession trespass dispossession injunction",
    "भाई": "brother relative family property dispute"
}

STOPWORDS = {
    'what', 'is', 'are', 'the', 'a', 'an', 'in', 'on', 'of', 'to', 'for', 'can', 'how', 'do', 'does',
    'and', 'or', 'by', 'at', 'with', 'from', 'as', 'this', 'that', 'it', 'under', 'my', 'your', 'i', 'you'
}

def _stem(word: str) -> str:
    """Lightweight rule-based English suffix stemming."""
    if len(word) > 4:
        for suffix in ['ing', 'ies', 'es', 'ed', 's']:
            if word.endswith(suffix) and len(word) - len(suffix) >= 3:
                return word[:-len(suffix)]
    return word

def _tokenize(text: str) -> List[str]:
    """Tokenize English and Hindi/Unicode text cleanly with cross-lingual expansion and stemming."""
    clean_text = text.lower()
    
    # Expand Hindi legal concepts to match statutory English/Hindi equivalents
    expanded_text = clean_text
    for hi_term, en_equiv in HINDI_LEGAL_GLOSSARY.items():
        if hi_term in clean_text:
            expanded_text += f" {en_equiv}"
            
    # Match alphanumeric words or unicode word characters
    words = re.findall(r'[\w\u0900-\u097F]+', expanded_text)
    tokens = []
    for w in words:
        if w in STOPWORDS:
            continue
        tokens.append(_stem(w))
    return tokens

def generate_local_embedding(text: str, dim: int = EMBEDDING_DIM) -> List[float]:
    """
    Deterministic semantic n-gram feature hashing with TF weighting, subwords, and L2 normalization.
    Allows zero-dependency offline similarity search with strong keyword and semantic alignment.
    """
    tokens = _tokenize(text)
    if not tokens:
        return [0.0] * dim

    vec = np.zeros(dim, dtype=np.float32)

    # 1. Word tokens with TF weighting
    for token in tokens:
        h = int(hashlib.md5(token.encode('utf-8')).hexdigest(), 16)
        idx = h % dim
        sign = 1.0 if ((h >> 8) & 1) == 0 else -1.0
        vec[idx] += sign * (1.0 + math.log(len(token)))

    # 2. Subword 3-grams from significant tokens (reduces noise across whole document)
    for token in tokens:
        if len(token) >= 4:
            for i in range(len(token) - 2):
                ngram = token[i:i+3]
                h = int(hashlib.md5(ngram.encode('utf-8')).hexdigest(), 16)
                idx = h % dim
                vec[idx] += 0.3

    # 3. L2 Normalize
    norm = np.linalg.norm(vec)
    if norm > 0:
        vec = vec / norm

    return vec.tolist()

def generate_embedding(text: str) -> List[float]:
    """
    Generate embedding using OpenAI if configured; otherwise use deterministic local fallback.
    """
    clean_text = text.strip()
    if not clean_text:
        return [0.0] * EMBEDDING_DIM

    if settings.is_ai_configured:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.embeddings.create(
                input=clean_text[:8000],
                model=settings.OPENAI_EMBEDDING_MODEL
            )
            return response.data[0].embedding
        except Exception as e:
            # Fall back to local embedding if API call fails
            print(f"[Warning] OpenAI embedding failed ({e}); falling back to local deterministic embedding.")
            return generate_local_embedding(clean_text)
    else:
        return generate_local_embedding(clean_text)

def cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
    """Calculate cosine similarity between two float vectors."""
    if not vec_a or not vec_b or len(vec_a) != len(vec_b):
        return 0.0
    a = np.array(vec_a, dtype=np.float32)
    b = np.array(vec_b, dtype=np.float32)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(np.dot(a, b) / (norm_a * norm_b))
