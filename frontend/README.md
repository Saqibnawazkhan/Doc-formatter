# Word Document Formatter - Frontend

A modern, animated, and user-friendly web application for formatting Word documents professionally.

## Features

### Core Functionality
- **Document Upload**: Drag-and-drop or click to upload .docx files
- **Quick Presets**: 12 pre-built formatting templates (Professional, Academic, Report, etc.)
- **Custom Formatting**: Fine-tune every aspect of document formatting
- **Live Preview**: See changes before downloading
- **Instant Download**: Get your formatted document immediately

### UI Components Library

#### Feedback & Notifications
- `Toast` - Toast notifications with auto-dismiss
- `Alert` - Alert banners with variants (info, success, warning, error)
- `Modal` - Modal dialogs with animations
- `NotificationBadge` - Notification badges and panel
- `Tooltip` - Hover tooltips with positioning

#### Display Components
- `Badge` - Status and feature badges
- `Avatar` - User avatars with groups
- `Card` - Flexible card components
- `StatsCard` - Statistics display cards
- `ProgressSteps` - Step progress indicators
- `EmptyState` - Empty state placeholders

#### Form Controls
- `Input` - Text, search, and number inputs
- `Switch` - Toggle switches
- `Slider` - Range sliders
- `Select` - Dropdown selects with multi-select
- `ColorPicker` - Color selection tool
- `ConfirmDialog` - Confirmation dialogs

#### Navigation & Layout
- `Tabs` - Tab navigation
- `Accordion` - Collapsible sections
- `ScrollToTop` - Scroll to top button
- `ScrollProgressBar` - Reading progress indicator

#### Actions
- `Button` - Buttons with variants
- `FloatingActionButton` - FAB with expandable actions

#### Loading & Error States
- `LoadingOverlay` - Full-screen loading animations
- `Skeleton` - Loading skeletons
- `ErrorBoundary` - Error catching and display

#### Onboarding & Help
- `FeatureTour` - First-time user onboarding
- `KeyboardShortcuts` - Keyboard shortcuts manager
- `HelpPanel` - Help center with FAQ

### Advanced Features
- `BatchProcessor` - Process multiple files at once
- `RecentFiles` - File history tracking
- `SettingsPanel` - User preferences
- `DocumentCompare` - Compare original vs formatted

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── index.ts         # Component exports
│   ├── FileUpload.tsx   # File upload component
│   ├── FormattingOptions.tsx
│   ├── DocumentPreview.tsx
│   ├── QuickPresets.tsx
│   ├── Header.tsx
│   ├── Toast.tsx
│   ├── Modal.tsx
│   └── ... (40+ components)
├── lib/
│   ├── api.ts           # API functions
│   ├── hooks.ts         # Custom React hooks
│   ├── animations.ts    # Framer Motion variants
│   ├── theme.ts         # Theme configuration
│   └── constants.ts     # App constants
└── public/
    └── ...
```

## Custom Hooks

```typescript
import {
  useKeyboardShortcut,
  useLocalStorage,
  useDebounce,
  useClickOutside,
  useWindowSize,
  useMediaQuery,
  useCopyToClipboard,
  useAsync,
  useDropzone,
  useScrollPosition,
  useInView
} from '@/components';
```

## Animation Presets

```typescript
import {
  fadeIn,
  fadeInUp,
  scaleIn,
  slideInFromRight,
  staggerContainer,
  pulse,
  float,
  modalBackdrop
} from '@/components';
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `?` | Show keyboard shortcuts |
| `Ctrl + U` | Upload document |
| `Ctrl + Enter` | Format document |
| `Ctrl + D` | Download document |
| `Ctrl + ,` | Open settings |
| `Escape` | Close modal |

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for any purpose.

---

Built with Next.js, Tailwind CSS, and Framer Motion
