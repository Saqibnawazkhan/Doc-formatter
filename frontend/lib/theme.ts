// Theme configuration for the application

// Color palette
export const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  purple: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
  },
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

// Gradient configurations
export const gradients = {
  primary: 'from-blue-600 to-purple-600',
  primaryHover: 'from-blue-700 to-purple-700',
  secondary: 'from-gray-600 to-gray-800',
  success: 'from-green-500 to-emerald-600',
  warning: 'from-amber-500 to-orange-600',
  danger: 'from-red-500 to-rose-600',
  info: 'from-cyan-500 to-blue-600',
  purple: 'from-purple-500 to-violet-600',
  pink: 'from-pink-500 to-rose-600',
  sunset: 'from-orange-500 to-red-600',
  ocean: 'from-blue-500 to-teal-500',
  forest: 'from-green-600 to-emerald-700',
  night: 'from-indigo-900 to-purple-900',
};

// Shadow configurations
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  glow: '0 0 20px rgba(59, 130, 246, 0.5)',
  glowPurple: '0 0 20px rgba(168, 85, 247, 0.5)',
  glowGreen: '0 0 20px rgba(16, 185, 129, 0.5)',
};

// Border radius configurations
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// Spacing scale
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

// Typography configurations
export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Animation durations
export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
  slowest: 1000,
};

// Transition timings
export const easings = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear',
};

// Component-specific theme configurations
export const components = {
  button: {
    sizes: {
      xs: { padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: '1.75rem' },
      sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem', height: '2rem' },
      md: { padding: '0.5rem 1rem', fontSize: '1rem', height: '2.5rem' },
      lg: { padding: '0.625rem 1.25rem', fontSize: '1.125rem', height: '3rem' },
      xl: { padding: '0.75rem 1.5rem', fontSize: '1.25rem', height: '3.5rem' },
    },
  },
  input: {
    sizes: {
      sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
      md: { padding: '0.5rem 1rem', fontSize: '1rem' },
      lg: { padding: '0.625rem 1.25rem', fontSize: '1.125rem' },
    },
  },
  card: {
    variants: {
      default: 'bg-white border border-gray-200 shadow-md rounded-2xl',
      elevated: 'bg-white shadow-xl rounded-2xl',
      outlined: 'bg-white border-2 border-gray-200 rounded-2xl',
      gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg rounded-2xl',
    },
  },
};

// Export a function to get CSS variables
export const getCSSVariables = () => ({
  '--color-primary': colors.primary[500],
  '--color-primary-light': colors.primary[100],
  '--color-primary-dark': colors.primary[700],
  '--color-success': colors.success[500],
  '--color-warning': colors.warning[500],
  '--color-error': colors.error[500],
  '--shadow-sm': shadows.sm,
  '--shadow-md': shadows.md,
  '--shadow-lg': shadows.lg,
  '--radius-lg': borderRadius.lg,
  '--radius-xl': borderRadius.xl,
  '--radius-2xl': borderRadius['2xl'],
});

export default {
  colors,
  gradients,
  shadows,
  borderRadius,
  spacing,
  typography,
  breakpoints,
  zIndex,
  durations,
  easings,
  components,
};
