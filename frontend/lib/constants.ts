// Application constants

// File handling
export const FILE_CONSTANTS = {
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_FILE_SIZE_MB: 50,
  ACCEPTED_FILE_TYPES: ['.docx'],
  ACCEPTED_MIME_TYPES: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  MAX_BATCH_FILES: 10,
};

// Formatting options
export const FONT_FAMILIES = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Calibri', label: 'Calibri' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Palatino Linotype', label: 'Palatino Linotype' },
  { value: 'Garamond', label: 'Garamond' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Lucida Console', label: 'Lucida Console' },
  { value: 'Cambria', label: 'Cambria' },
  { value: 'Century Gothic', label: 'Century Gothic' },
];

export const FONT_SIZES = [
  { value: 8, label: '8 pt' },
  { value: 9, label: '9 pt' },
  { value: 10, label: '10 pt' },
  { value: 11, label: '11 pt' },
  { value: 12, label: '12 pt' },
  { value: 14, label: '14 pt' },
  { value: 16, label: '16 pt' },
  { value: 18, label: '18 pt' },
  { value: 20, label: '20 pt' },
  { value: 24, label: '24 pt' },
  { value: 28, label: '28 pt' },
  { value: 32, label: '32 pt' },
  { value: 36, label: '36 pt' },
  { value: 48, label: '48 pt' },
  { value: 72, label: '72 pt' },
];

export const LINE_SPACINGS = [
  { value: '1.0', label: 'Single' },
  { value: '1.15', label: '1.15' },
  { value: '1.5', label: '1.5' },
  { value: '2.0', label: 'Double' },
  { value: '2.5', label: '2.5' },
  { value: '3.0', label: 'Triple' },
];

export const TEXT_ALIGNMENTS = [
  { value: 'left', label: 'Left', icon: 'AlignLeft' },
  { value: 'center', label: 'Center', icon: 'AlignCenter' },
  { value: 'right', label: 'Right', icon: 'AlignRight' },
  { value: 'justify', label: 'Justify', icon: 'AlignJustify' },
];

export const PAGE_SIZES = [
  { value: 'A4', label: 'A4 (210 x 297 mm)' },
  { value: 'Letter', label: 'Letter (8.5 x 11 in)' },
  { value: 'Legal', label: 'Legal (8.5 x 14 in)' },
  { value: 'A3', label: 'A3 (297 x 420 mm)' },
  { value: 'A5', label: 'A5 (148 x 210 mm)' },
  { value: 'Executive', label: 'Executive (7.25 x 10.5 in)' },
];

export const PAGE_ORIENTATIONS = [
  { value: 'portrait', label: 'Portrait' },
  { value: 'landscape', label: 'Landscape' },
];

export const PAGE_NUMBER_POSITIONS = [
  { value: 'top_left', label: 'Top Left' },
  { value: 'top_center', label: 'Top Center' },
  { value: 'top_right', label: 'Top Right' },
  { value: 'bottom_left', label: 'Bottom Left' },
  { value: 'bottom_center', label: 'Bottom Center' },
  { value: 'bottom_right', label: 'Bottom Right' },
];

export const UNDERLINE_STYLES = [
  { value: 'none', label: 'None' },
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'dash', label: 'Dashed' },
  { value: 'wave', label: 'Wavy' },
  { value: 'thick', label: 'Thick' },
];

export const HIGHLIGHT_COLORS = [
  { value: 'none', label: 'None', color: 'transparent' },
  { value: 'yellow', label: 'Yellow', color: '#FFFF00' },
  { value: 'green', label: 'Green', color: '#00FF00' },
  { value: 'cyan', label: 'Cyan', color: '#00FFFF' },
  { value: 'magenta', label: 'Magenta', color: '#FF00FF' },
  { value: 'blue', label: 'Blue', color: '#0000FF' },
  { value: 'red', label: 'Red', color: '#FF0000' },
];

export const LIST_STYLES = [
  { value: 'none', label: 'None' },
  { value: 'bullet', label: 'Bullet' },
  { value: 'number', label: 'Number' },
  { value: 'letter_lower', label: 'Lowercase Letters' },
  { value: 'letter_upper', label: 'Uppercase Letters' },
  { value: 'roman_lower', label: 'Lowercase Roman' },
  { value: 'roman_upper', label: 'Uppercase Roman' },
];

export const BORDER_STYLES = [
  { value: 'none', label: 'None' },
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'thick', label: 'Thick' },
];

// Preset colors for color pickers
export const PRESET_COLORS = [
  '#000000', '#374151', '#6B7280', '#9CA3AF',
  '#EF4444', '#F97316', '#F59E0B', '#EAB308',
  '#22C55E', '#10B981', '#14B8A6', '#06B6D4',
  '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6',
  '#A855F7', '#D946EF', '#EC4899', '#F43F5E',
];

// API endpoints
export const API_ENDPOINTS = {
  UPLOAD: '/api/upload',
  FORMAT: '/api/format',
  PREVIEW: '/api/preview',
  DOWNLOAD: '/api/download',
  DELETE: '/api/document',
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'word-formatter-theme',
  SETTINGS: 'word-formatter-settings',
  RECENT_FILES: 'word-formatter-recent-files',
  FAVORITE_PRESETS: 'word-formatter-favorite-presets',
  CUSTOM_PRESETS: 'word-formatter-custom-presets',
};

// Toast/notification durations
export const TOAST_DURATIONS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
};

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  UPLOAD: { key: 'u', ctrl: true },
  FORMAT: { key: 'Enter', ctrl: true },
  DOWNLOAD: { key: 'd', ctrl: true },
  SETTINGS: { key: ',', ctrl: true },
  HELP: { key: '/', ctrl: true },
  CLOSE: { key: 'Escape' },
  UNDO: { key: 'z', ctrl: true },
  REDO: { key: 'y', ctrl: true },
};

// Status types
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  PROCESSING: 'processing',
} as const;

// Default formatting options
export const DEFAULT_FORMATTING_OPTIONS = {
  text: {
    font_family: 'Calibri',
    font_size: 11,
    line_spacing: '1.15',
    text_alignment: 'left',
  },
  paragraph: {
    spacing_before: 0,
    spacing_after: 8,
  },
  page: {
    page_size: 'A4',
    margin_top: 1,
    margin_bottom: 1,
    margin_left: 1,
    margin_right: 1,
  },
};

// Error messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: `File too large. Maximum size is ${FILE_CONSTANTS.MAX_FILE_SIZE_MB}MB.`,
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a .docx file.',
  UPLOAD_FAILED: 'Upload failed. Please try again.',
  FORMAT_FAILED: 'Failed to format document. Please try again.',
  DOWNLOAD_FAILED: 'Failed to download document. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  UPLOAD_SUCCESS: 'Document uploaded successfully!',
  FORMAT_SUCCESS: 'Document formatted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  PRESET_SAVED: 'Preset saved successfully!',
};

export default {
  FILE_CONSTANTS,
  FONT_FAMILIES,
  FONT_SIZES,
  LINE_SPACINGS,
  TEXT_ALIGNMENTS,
  PAGE_SIZES,
  PAGE_ORIENTATIONS,
  PAGE_NUMBER_POSITIONS,
  PRESET_COLORS,
  API_ENDPOINTS,
  STORAGE_KEYS,
  KEYBOARD_SHORTCUTS,
  STATUS,
  DEFAULT_FORMATTING_OPTIONS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
