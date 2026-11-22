"""
Script to generate the two required Milestone 2 submission PDFs:
1. docs/M2_Aira_NyayaSetuAI.pdf (Milestone 2 Main Document)
2. docs/Aira_TechnicalReport.pdf (Supporting Document)
"""

import os
import re
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Preformatted, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping

# Register Indian language (Devanagari / Hindi) supported system font
try:
    pdfmetrics.registerFont(TTFont('Nirmala', 'C:/Windows/Fonts/Nirmala.ttc', subfontIndex=0))
    pdfmetrics.registerFont(TTFont('Nirmala-Bold', 'C:/Windows/Fonts/Nirmala.ttc', subfontIndex=1))
    addMapping('Nirmala', 0, 0, 'Nirmala')
    addMapping('Nirmala', 1, 0, 'Nirmala-Bold')
    BASE_FONT = 'Nirmala'
    BASE_FONT_BOLD = 'Nirmala-Bold'
except Exception as e:
    print(f"Font registration warning: {e}")
    BASE_FONT = 'Helvetica'
    BASE_FONT_BOLD = 'Helvetica-Bold'


class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont(BASE_FONT, 8.5)
        self.setFillColor(colors.HexColor("#64748b"))
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "NyayaSetu AI — Milestone 2 Submission | Team Aira (SCSE4041)")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(54, 744, 558, 744)
        
        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, page_text)
        self.drawString(54, 36, "Bennett University — School of Computer Science Engineering & Technology")
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(54, 48, 558, 48)
        self.restoreState()


def get_custom_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='DocTitle',
        fontName=BASE_FONT_BOLD,
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#881337'), # Deep Rose
        spaceAfter=10,
        alignment=0
    ))
    styles.add(ParagraphStyle(
        name='DocSubtitle',
        fontName=BASE_FONT,
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#475569'),
        spaceAfter=14
    ))
    styles.add(ParagraphStyle(
        name='Heading1Custom',
        fontName=BASE_FONT_BOLD,
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#9f1239'),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        name='Heading2Custom',
        fontName=BASE_FONT_BOLD,
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#1e293b'),
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        name='BodyCustom',
        fontName=BASE_FONT,
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=5
    ))
    styles.add(ParagraphStyle(
        name='BulletCustom',
        fontName=BASE_FONT,
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor('#1e293b'),
        leftIndent=14,
        spaceAfter=3
    ))
    styles.add(ParagraphStyle(
        name='TableCell',
        fontName=BASE_FONT,
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor('#1e293b')
    ))
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName=BASE_FONT_BOLD,
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#ffffff')
    ))
    styles.add(ParagraphStyle(
        name='CodeSnippet',
        fontName=BASE_FONT, # Use Nirmala so Hindi inside code/JSON renders natively!
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#0f172a')
    ))
    return styles


def sanitize_text(text):
    text = escape(text)
    # Bold **text**
    text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    # Italics *text*
    text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
    # Backtick `code`
    text = re.sub(r'`(.*?)`', r'<font color="#9f1239"><b>\1</b></font>', text)
    return text


def build_table(table_data, col_widths, styles):
    flowable_data = []
    for row_idx, row in enumerate(table_data):
        flowable_row = []
        for cell_text in row:
            if row_idx == 0:
                p = Paragraph(sanitize_text(cell_text), styles['TableHeader'])
            else:
                p = Paragraph(sanitize_text(cell_text), styles['TableCell'])
            flowable_row.append(p)
        flowable_data.append(flowable_row)
    
    t = Table(flowable_data, colWidths=col_widths, repeatRows=1)
    t_style = [
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#9f1239')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
    ]
    for r in range(1, len(table_data)):
        if r % 2 == 0:
            t_style.append(('BACKGROUND', (0, r), (-1, r), colors.HexColor('#f8fafc')))
    t.setStyle(TableStyle(t_style))
    return t


def parse_and_build_pdf(md_path, pdf_path, is_main_doc=True):
    styles = get_custom_styles()
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    story = []
    in_code_block = False
    code_lines = []
    in_table = False
    table_rows = []
    
    i = 0
    while i < len(lines):
        line = lines[i].rstrip('\r\n')
        
        # Check code block fences
        if line.startswith('```'):
            if in_code_block:
                code_text = "\n".join(code_lines)
                story.append(Spacer(1, 4))
                p = Preformatted(code_text, styles['CodeSnippet'])
                t = Table([[p]], colWidths=[504])
                t.setStyle(TableStyle([
                    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
                    ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
                    ('TOPPADDING', (0,0), (-1,-1), 4),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
                    ('LEFTPADDING', (0,0), (-1,-1), 6),
                    ('RIGHTPADDING', (0,0), (-1,-1), 6),
                ]))
                story.append(t)
                story.append(Spacer(1, 4))
                in_code_block = False
                code_lines = []
            else:
                in_code_block = True
                code_lines = []
            i += 1
            continue
            
        if in_code_block:
            code_lines.append(line)
            i += 1
            continue
            
        # Check markdown table
        if line.startswith('|') and line.endswith('|'):
            # Check if separator row
            if re.match(r'^\|[\s\-:]+(\|[\s\-:]+)+\|$', line):
                i += 1
                continue
            cells = [c.strip() for c in line.strip('|').split('|')]
            table_rows.append(cells)
            in_table = True
            i += 1
            continue
        elif in_table:
            # Table ended
            num_cols = len(table_rows[0])
            total_width = 504
            col_width = total_width / num_cols
            col_widths = [col_width] * num_cols
            if num_cols == 4:
                col_widths = [115, 185, 64, 140]
            elif num_cols == 6:
                # Test table or Contribution table
                if table_rows[0][0].lower().startswith('test'):
                    col_widths = [32, 130, 48, 140, 114, 40]
                else:
                    col_widths = [85, 75, 80, 134, 90, 40]
            story.append(Spacer(1, 4))
            story.append(build_table(table_rows, col_widths, styles))
            story.append(Spacer(1, 4))
            table_rows = []
            in_table = False
            
        line_stripped = line.strip()
        if not line_stripped:
            i += 1
            continue
            
        if line_stripped == '---':
            story.append(Spacer(1, 4))
            story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#fda4af'), spaceBefore=4, spaceAfter=6))
            i += 1
            continue
            
        # Headings
        if line_stripped.startswith('# '):
            title_text = line_stripped[2:]
            story.append(Paragraph(sanitize_text(title_text), styles['DocTitle']))
        elif line_stripped.startswith('## '):
            h1_text = line_stripped[3:]
            story.append(Paragraph(sanitize_text(h1_text), styles['Heading1Custom']))
        elif line_stripped.startswith('### '):
            h2_text = line_stripped[4:]
            story.append(Paragraph(sanitize_text(h2_text), styles['Heading2Custom']))
        elif line_stripped.startswith('#### '):
            h3_text = line_stripped[5:]
            p = Paragraph(f"<b>{sanitize_text(h3_text)}</b>", styles['BodyCustom'])
            story.append(p)
        elif line_stripped.startswith('* ') or line_stripped.startswith('- '):
            bullet_text = line_stripped[2:]
            story.append(Paragraph(f"• {sanitize_text(bullet_text)}", styles['BulletCustom']))
        elif re.match(r'^\d+\.\s', line_stripped):
            story.append(Paragraph(sanitize_text(line_stripped), styles['BulletCustom']))
        else:
            story.append(Paragraph(sanitize_text(line_stripped), styles['BodyCustom']))
            
        i += 1
        
    if in_table and table_rows:
        num_cols = len(table_rows[0])
        col_width = 504 / num_cols
        col_widths = [col_width] * num_cols
        if num_cols == 6:
            col_widths = [85, 75, 80, 134, 90, 40]
        story.append(build_table(table_rows, col_widths, styles))
        
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {pdf_path} (Size: {os.path.getsize(pdf_path)} bytes)")

if __name__ == '__main__':
    docs_dir = os.path.join(os.getcwd(), 'docs')
    m2_md = os.path.join(docs_dir, 'M2_Aira_NyayaSetuAI.md')
    m2_pdf = os.path.join(docs_dir, 'M2_Aira_NyayaSetuAI.pdf')
    
    tech_md = os.path.join(docs_dir, 'Aira_TechnicalReport.md')
    tech_pdf = os.path.join(docs_dir, 'Aira_TechnicalReport.pdf')
    
    parse_and_build_pdf(m2_md, m2_pdf, is_main_doc=True)
    parse_and_build_pdf(tech_md, tech_pdf, is_main_doc=False)
