from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class FontFamily(str, Enum):
    ARIAL = "Arial"
    TIMES_NEW_ROMAN = "Times New Roman"
    CALIBRI = "Calibri"
    GEORGIA = "Georgia"
    VERDANA = "Verdana"
    HELVETICA = "Helvetica"
    COURIER_NEW = "Courier New"


class TextAlignment(str, Enum):
    LEFT = "left"
    CENTER = "center"
    RIGHT = "right"
    JUSTIFY = "justify"


class LineSpacing(str, Enum):
    SINGLE = "1.0"
    ONE_POINT_FIFTEEN = "1.15"
    ONE_POINT_FIVE = "1.5"
    DOUBLE = "2.0"


class PageSize(str, Enum):
    A4 = "A4"
    LETTER = "Letter"


class PageNumberPosition(str, Enum):
    TOP_LEFT = "top_left"
    TOP_CENTER = "top_center"
    TOP_RIGHT = "top_right"
    BOTTOM_LEFT = "bottom_left"
    BOTTOM_CENTER = "bottom_center"
    BOTTOM_RIGHT = "bottom_right"


class TextFormattingOptions(BaseModel):
    font_family: Optional[FontFamily] = None
    font_size: Optional[int] = None
    font_color: Optional[str] = None
    bold: Optional[bool] = None
    italic: Optional[bool] = None
    underline: Optional[bool] = None
    line_spacing: Optional[LineSpacing] = None
    text_alignment: Optional[TextAlignment] = None


class ParagraphFormattingOptions(BaseModel):
    spacing_before: Optional[int] = None
    spacing_after: Optional[int] = None
    indent_left: Optional[float] = None
    indent_right: Optional[float] = None
    first_line_indent: Optional[float] = None
    remove_extra_spaces: Optional[bool] = None
    remove_blank_lines: Optional[bool] = None


class PageFormattingOptions(BaseModel):
    page_size: Optional[PageSize] = None
    margin_top: Optional[float] = None
    margin_bottom: Optional[float] = None
    margin_left: Optional[float] = None
    margin_right: Optional[float] = None
    header_text: Optional[str] = None
    footer_text: Optional[str] = None
    page_numbers: Optional[bool] = None
    page_number_position: Optional[PageNumberPosition] = None


class DocumentStructureOptions(BaseModel):
    normalize_headings: Optional[bool] = None
    create_toc: Optional[bool] = None
    heading_font_family: Optional[FontFamily] = None
    h1_size: Optional[int] = None
    h1_color: Optional[str] = None
    h1_bold: Optional[bool] = None
    h2_size: Optional[int] = None
    h2_color: Optional[str] = None
    h2_bold: Optional[bool] = None
    h3_size: Optional[int] = None
    h3_color: Optional[str] = None
    h3_bold: Optional[bool] = None


class CleanupOptions(BaseModel):
    remove_inconsistent_fonts: Optional[bool] = None
    remove_unnecessary_styles: Optional[bool] = None
    clean_copied_text: Optional[bool] = None
    fix_alignment_issues: Optional[bool] = None
    normalize_formatting: Optional[bool] = None


class FormattingOptions(BaseModel):
    text: Optional[TextFormattingOptions] = None
    paragraph: Optional[ParagraphFormattingOptions] = None
    page: Optional[PageFormattingOptions] = None
    structure: Optional[DocumentStructureOptions] = None
    cleanup: Optional[CleanupOptions] = None


class FormatRequest(BaseModel):
    file_id: str
    options: FormattingOptions


class UploadResponse(BaseModel):
    file_id: str
    filename: str
    size: int
    message: str


class FormatResponse(BaseModel):
    file_id: str
    original_filename: str
    formatted_filename: str
    message: str


class PreviewResponse(BaseModel):
    file_id: str
    content: str
    page_count: int
