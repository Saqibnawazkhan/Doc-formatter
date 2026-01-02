import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface UploadResponse {
  file_id: string;
  filename: string;
  size: number;
  message: string;
}

export interface FormatResponse {
  file_id: string;
  original_filename: string;
  formatted_filename: string;
  message: string;
}

export interface PreviewResponse {
  file_id: string;
  content: string;
  page_count: number;
}

export interface FormattingOptions {
  text?: {
    font_family?: string;
    font_size?: number;
    font_color?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    line_spacing?: string;
    text_alignment?: string;
  };
  paragraph?: {
    spacing_before?: number;
    spacing_after?: number;
    indent_left?: number;
    indent_right?: number;
    first_line_indent?: number;
    remove_extra_spaces?: boolean;
    remove_blank_lines?: boolean;
  };
  page?: {
    page_size?: string;
    margin_top?: number;
    margin_bottom?: number;
    margin_left?: number;
    margin_right?: number;
    header_text?: string;
    footer_text?: string;
    page_numbers?: boolean;
    page_number_position?: string;
  };
  structure?: {
    normalize_headings?: boolean;
    create_toc?: boolean;
    heading_font_family?: string;
    h1_size?: number;
    h2_size?: number;
    h3_size?: number;
  };
  cleanup?: {
    remove_inconsistent_fonts?: boolean;
    remove_unnecessary_styles?: boolean;
    clean_copied_text?: boolean;
    fix_alignment_issues?: boolean;
    normalize_formatting?: boolean;
  };
}

export const uploadDocument = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<UploadResponse>('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const formatDocument = async (
  fileId: string,
  options: FormattingOptions
): Promise<FormatResponse> => {
  const response = await api.post<FormatResponse>('/api/format', {
    file_id: fileId,
    options,
  });

  return response.data;
};

export const getPreview = async (fileId: string): Promise<PreviewResponse> => {
  const response = await api.get<PreviewResponse>(`/api/preview/${fileId}`);
  return response.data;
};

export const downloadDocument = (fileId: string): string => {
  return `${API_BASE_URL}/api/download/${fileId}`;
};

export const deleteDocument = async (fileId: string): Promise<void> => {
  await api.delete(`/api/document/${fileId}`);
};

export default api;
