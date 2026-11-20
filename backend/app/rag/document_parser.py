import os
import io
from typing import List, Dict, Any, Tuple
from fastapi import HTTPException, UploadFile
import pypdf
import docx

ALLOWED_EXTENSIONS = {".txt", ".pdf", ".docx"}
MAX_FILE_BYTES = 15 * 1024 * 1024  # 15 MB

class ParsedPage:
    def __init__(self, text: str, page_number: int, section: str = ""):
        self.text = text
        self.page_number = page_number
        self.section = section

def validate_uploaded_file(filename: str, file_bytes: bytes) -> str:
    """Validate file extension and size safely."""
    if not filename:
        raise HTTPException(status_code=400, detail="Invalid filename")
    
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{ext}'. Allowed extensions are: .pdf, .txt, .docx"
        )
    
    if len(file_bytes) > MAX_FILE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"File exceeds maximum allowed size of {MAX_FILE_BYTES // (1024 * 1024)} MB"
        )
    
    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="File is empty")
    
    return ext

def parse_txt_content(content_bytes: bytes) -> List[ParsedPage]:
    """Parse TXT content into pages/sections."""
    try:
        text = content_bytes.decode("utf-8")
    except UnicodeDecodeError:
        try:
            text = content_bytes.decode("latin-1")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to decode text file: {str(e)}")
    
    # Split by section headers or blank lines into logical blocks if large
    paragraphs = text.split("\n\n")
    pages: List[ParsedPage] = []
    current_block = []
    current_length = 0
    page_num = 1
    
    for p in paragraphs:
        p_clean = p.strip()
        if not p_clean:
            continue
        current_block.append(p_clean)
        current_length += len(p_clean)
        if current_length > 1500:
            pages.append(ParsedPage("\n\n".join(current_block), page_num))
            page_num += 1
            current_block = []
            current_length = 0
            
    if current_block:
        pages.append(ParsedPage("\n\n".join(current_block), page_num))
        
    if not pages:
        pages.append(ParsedPage(text, 1))
        
    return pages

def parse_pdf_content(content_bytes: bytes) -> List[ParsedPage]:
    """Parse PDF file with accurate page numbers using pypdf."""
    pages: List[ParsedPage] = []
    try:
        reader = pypdf.PdfReader(io.BytesIO(content_bytes))
        for idx, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            text_clean = text.strip()
            if text_clean:
                pages.append(ParsedPage(text_clean, page_number=idx + 1))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse PDF document: {str(e)}")
    
    if not pages:
        raise HTTPException(status_code=400, detail="No readable text found in PDF document")
    return pages

def parse_docx_content(content_bytes: bytes) -> List[ParsedPage]:
    """Parse DOCX file with headings and paragraph structures."""
    try:
        doc = docx.Document(io.BytesIO(content_bytes))
        pages: List[ParsedPage] = []
        current_heading = "General"
        current_block = []
        page_num = 1
        
        for p in doc.paragraphs:
            text = p.text.strip()
            if not text:
                continue
            if p.style and "Heading" in p.style.name:
                if current_block:
                    pages.append(ParsedPage("\n".join(current_block), page_num, section=current_heading))
                    page_num += 1
                    current_block = []
                current_heading = text
            else:
                current_block.append(text)
                
        if current_block:
            pages.append(ParsedPage("\n".join(current_block), page_num, section=current_heading))
            
        if not pages:
            raise HTTPException(status_code=400, detail="No readable text found in DOCX document")
        return pages
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse DOCX document: {str(e)}")

def parse_document_file(filename: str, content_bytes: bytes) -> List[ParsedPage]:
    """Universal parser returning parsed pages with metadata."""
    ext = validate_uploaded_file(filename, content_bytes)
    if ext == ".pdf":
        return parse_pdf_content(content_bytes)
    elif ext == ".docx":
        return parse_docx_content(content_bytes)
    else:
        return parse_txt_content(content_bytes)

