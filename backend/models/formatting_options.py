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
    TAHOMA = "Tahoma"
    TREBUCHET_MS = "Trebuchet MS"
    PALATINO = "Palatino Linotype"
    GARAMOND = "Garamond"
    COMIC_SANS = "Comic Sans MS"
    IMPACT = "Impact"
    LUCIDA_CONSOLE = "Lucida Console"
    CAMBRIA = "Cambria"
    CENTURY_GOTHIC = "Century Gothic"


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
    TWO_POINT_FIVE = "2.5"
    TRIPLE = "3.0"


class PageSize(str, Enum):
    A4 = "A4"
    LETTER = "Letter"
    LEGAL = "Legal"
    A3 = "A3"
    A5 = "A5"
    EXECUTIVE = "Executive"


class PageNumberPosition(str, Enum):
    TOP_LEFT = "top_left"
    TOP_CENTER = "top_center"
    TOP_RIGHT = "top_right"
    BOTTOM_LEFT = "bottom_left"
    BOTTOM_CENTER = "bottom_center"
    BOTTOM_RIGHT = "bottom_right"


class UnderlineStyle(str, Enum):
    NONE = "none"
    SINGLE = "single"
    DOUBLE = "double"
    DOTTED = "dotted"
    DASHED = "dash"
    WAVY = "wave"
    THICK = "thick"


class HighlightColor(str, Enum):
    NONE = "none"
    YELLOW = "yellow"
    GREEN = "green"
    CYAN = "cyan"
    MAGENTA = "magenta"
    BLUE = "blue"
    RED = "red"
    DARK_BLUE = "darkBlue"
    DARK_CYAN = "darkCyan"
    DARK_GREEN = "darkGreen"
    DARK_MAGENTA = "darkMagenta"
    DARK_RED = "darkRed"
    DARK_YELLOW = "darkYellow"
    GRAY_25 = "lightGray"
    GRAY_50 = "darkGray"
    BLACK = "black"


class ListStyle(str, Enum):
    NONE = "none"
    BULLET = "bullet"
    NUMBER = "number"
    LETTER_LOWER = "letter_lower"
    LETTER_UPPER = "letter_upper"
    ROMAN_LOWER = "roman_lower"
    ROMAN_UPPER = "roman_upper"


class BorderStyle(str, Enum):
    NONE = "none"
    SINGLE = "single"
    DOUBLE = "double"
    DOTTED = "dotted"
    DASHED = "dashed"
    THICK = "thick"


class TextFormattingOptions(BaseModel):
    font_family: Optional[FontFamily] = None
    font_size: Optional[int] = None
    font_color: Optional[str] = None
    bold: Optional[bool] = None
    italic: Optional[bool] = None
    underline: Optional[bool] = None
    underline_style: Optional[UnderlineStyle] = None
    strikethrough: Optional[bool] = None
    double_strikethrough: Optional[bool] = None
    superscript: Optional[bool] = None
    subscript: Optional[bool] = None
    all_caps: Optional[bool] = None
    small_caps: Optional[bool] = None
    highlight_color: Optional[HighlightColor] = None
    character_spacing: Optional[float] = None  # in points
    line_spacing: Optional[LineSpacing] = None
    text_alignment: Optional[TextAlignment] = None


class ParagraphFormattingOptions(BaseModel):
    # Spacing - with sensible defaults
    spacing_before: Optional[int] = 0  # Default 0pt
    spacing_after: Optional[int] = 8  # Default 8pt (standard Word default)
    # Indentation
    indent_left: Optional[float] = 0  # Default 0 inches
    indent_right: Optional[float] = 0  # Default 0 inches
    first_line_indent: Optional[float] = 0  # Default 0 inches
    hanging_indent: Optional[float] = None  # For hanging indent
    # List formatting
    list_style: Optional[ListStyle] = None
    list_level: Optional[int] = None  # 0-8 for nested lists
    # Borders
    border_style: Optional[BorderStyle] = None
    border_color: Optional[str] = None
    border_width: Optional[float] = None  # in points
    # Background
    background_color: Optional[str] = None
    shading_pattern: Optional[str] = None
    # Other options
    keep_lines_together: Optional[bool] = None
    keep_with_next: Optional[bool] = None
    page_break_before: Optional[bool] = None
    widow_control: Optional[bool] = None
    # Cleanup
    remove_extra_spaces: Optional[bool] = None
    remove_blank_lines: Optional[bool] = None


class PageFormattingOptions(BaseModel):
    page_size: Optional[PageSize] = None
    custom_width: Optional[float] = None  # in inches
    custom_height: Optional[float] = None  # in inches
    orientation: Optional[str] = None  # "portrait" or "landscape"
    margin_top: Optional[float] = None
    margin_bottom: Optional[float] = None
    margin_left: Optional[float] = None
    margin_right: Optional[float] = None
    gutter: Optional[float] = None  # for binding
    header_text: Optional[str] = None
    footer_text: Optional[str] = None
    header_distance: Optional[float] = None
    footer_distance: Optional[float] = None
    page_numbers: Optional[bool] = None
    page_number_position: Optional[PageNumberPosition] = None
    page_number_format: Optional[str] = None  # "1", "i", "I", "a", "A"
    different_first_page: Optional[bool] = None
    different_odd_even: Optional[bool] = None
    page_border_style: Optional[BorderStyle] = None
    page_border_color: Optional[str] = None
    columns: Optional[int] = None  # number of columns
    column_spacing: Optional[float] = None


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
