import re
from typing import List, Dict, Any
from app.rag.document_parser import ParsedPage

DEFAULT_CHUNK_SIZE = 650
DEFAULT_CHUNK_OVERLAP = 120

def chunk_text(
    pages: List[ParsedPage],
    chunk_size: int = DEFAULT_CHUNK_SIZE,
    chunk_overlap: int = DEFAULT_CHUNK_OVERLAP
) -> List[Dict[str, Any]]:
    """
    Split parsed pages into semantically cohesive chunks while preserving
    page number, section headings, and sequence index.
    """
    chunks: List[Dict[str, Any]] = []
    chunk_index = 0

    for page in pages:
        text = page.text.strip()
        if not text:
            continue

        # Split into sentences or lines
        sentences = re.split(r'(?<=[.!?\n])\s+', text)
        current_chunk = []
        current_len = 0

        for sentence in sentences:
            sentence = sentence.strip()
            if not sentence:
                continue

            sentence_len = len(sentence)
            if current_len + sentence_len > chunk_size and current_chunk:
                chunk_str = " ".join(current_chunk)
                chunks.append({
                    "chunk_index": chunk_index,
                    "content": chunk_str,
                    "page_number": page.page_number,
                    "section_title": page.section or f"Page {page.page_number}"
                })
                chunk_index += 1

                # Keep overlap from the end of current_chunk
                overlap_len = 0
                overlap_items = []
                for item in reversed(current_chunk):
                    if overlap_len + len(item) <= chunk_overlap:
                        overlap_items.insert(0, item)
                        overlap_len += len(item)
                    else:
                        break
                current_chunk = overlap_items
                current_len = sum(len(x) for x in current_chunk)

            current_chunk.append(sentence)
            current_len += sentence_len

        if current_chunk:
            chunk_str = " ".join(current_chunk)
            chunks.append({
                "chunk_index": chunk_index,
                "content": chunk_str,
                "page_number": page.page_number,
                "section_title": page.section or f"Page {page.page_number}"
            })
            chunk_index += 1

    return chunks

