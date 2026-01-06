// Core components
export { default as FileUpload } from './FileUpload';
export { default as FormattingOptions } from './FormattingOptions';
export { default as DocumentPreview } from './DocumentPreview';
export { default as Header } from './Header';

// Preset components
export { default as QuickPresets } from './QuickPresets';

// UI components - Feedback & Notifications
export { default as Tooltip } from './Tooltip';
export { default as Skeleton, DocumentSkeleton, CardSkeleton, PresetSkeleton } from './Skeleton';
export { default as ToastProvider, useToast } from './Toast';
export { default as Alert, BannerAlert, InlineAlert, Callout } from './Alert';
export { default as Modal, ConfirmModal } from './Modal';
export { default as NotificationBadge, DotBadge, NotificationPanel, NotificationBell } from './NotificationBadge';

// UI components - Display
export { default as Badge, StatusBadge, FeatureBadge } from './Badge';
export { default as Avatar, AvatarGroup, AvatarWithName, AvatarBadge } from './Avatar';
export { default as Card, CardHeader, CardBody, CardFooter, FeatureCard, StatCard, ActionCard } from './Card';
export { default as StatsCard, StatsCardCompact } from './StatsCard';
export { default as ProgressSteps } from './ProgressSteps';
export { default as EmptyState, NoDocumentsState, NoSearchResultsState, NoRecentFilesState, UploadPromptState } from './EmptyState';

// UI components - Form Controls
export { default as Input, SearchInput, NumberInput } from './Input';
export { default as Switch, SwitchGroup, InlineSwitch } from './Switch';
export { default as Slider, RangeSlider } from './Slider';
export { default as Select, MultiSelect } from './Select';
export { default as ColorPicker, CompactColorPicker } from './ColorPicker';
export { default as ConfirmDialog, ConfirmDialogProvider, useDialog } from './ConfirmDialog';

// UI components - Navigation & Layout
export { default as Tabs, TabPanel, VerticalTabs } from './Tabs';
export { default as Accordion, FAQAccordion, Collapsible } from './Accordion';
export { default as ScrollToTop, ScrollProgressBar, ScrollIndicator } from './ScrollToTop';

// UI components - Actions
export { default as Button, IconButton, ButtonGroup, FloatingButton } from './Button';
export { default as FloatingActionButton } from './FloatingActionButton';

// Loading & Error States
export { default as LoadingOverlay, InlineLoader, PulseLoader, DocumentProcessingAnimation } from './LoadingOverlay';
export { default as ErrorBoundary, ErrorFallback, InlineError } from './ErrorBoundary';

// Onboarding & Help
export { default as FeatureTour, useTour, Spotlight } from './FeatureTour';
export { default as KeyboardShortcuts, ShortcutKey, useShortcut } from './KeyboardShortcuts';

// Advanced Features
export { default as RecentFiles } from './RecentFiles';
export { default as BatchProcessor } from './BatchProcessor';
export { default as SettingsPanel } from './SettingsPanel';
export { default as HelpPanel } from './HelpPanel';
export { default as DocumentCompare } from './DocumentCompare';

// Utilities & Hooks
export * from '../lib/hooks';
export * from '../lib/animations';
export * from '../lib/theme';
export * from '../lib/constants';
