'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Upload, Search, FolderOpen, Inbox, Clock,
  FileQuestion, Settings, Star, Filter, LucideIcon
} from 'lucide-react';

type EmptyStateVariant =
  | 'no-files'
  | 'no-results'
  | 'no-recent'
  | 'no-favorites'
  | 'no-presets'
  | 'upload-prompt'
  | 'empty-folder'
  | 'no-settings'
  | 'custom';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const variantConfig: Record<EmptyStateVariant, {
  icon: LucideIcon;
  title: string;
  description: string;
}> = {
  'no-files': {
    icon: FileText,
    title: 'No Documents',
    description: 'Upload a document to get started with formatting',
  },
  'no-results': {
    icon: Search,
    title: 'No Results Found',
    description: 'Try adjusting your search or filter criteria',
  },
  'no-recent': {
    icon: Clock,
    title: 'No Recent Files',
    description: 'Your recently formatted documents will appear here',
  },
  'no-favorites': {
    icon: Star,
    title: 'No Favorites',
    description: 'Star your favorite presets to see them here',
  },
  'no-presets': {
    icon: Filter,
    title: 'No Custom Presets',
    description: 'Create custom formatting presets to use them again',
  },
  'upload-prompt': {
    icon: Upload,
    title: 'Ready to Format',
    description: 'Drag and drop a .docx file or click to browse',
  },
  'empty-folder': {
    icon: FolderOpen,
    title: 'Empty Folder',
    description: 'This folder is empty',
  },
  'no-settings': {
    icon: Settings,
    title: 'No Settings Configured',
    description: 'Configure your preferences to get started',
  },
  'custom': {
    icon: FileQuestion,
    title: 'Nothing Here',
    description: 'This section is empty',
  },
};

const sizeConfig = {
  sm: {
    container: 'py-6',
    icon: 'w-12 h-12',
    iconContainer: 'w-16 h-16',
    title: 'text-base',
    description: 'text-sm',
    button: 'px-3 py-1.5 text-sm',
  },
  md: {
    container: 'py-10',
    icon: 'w-16 h-16',
    iconContainer: 'w-24 h-24',
    title: 'text-lg',
    description: 'text-base',
    button: 'px-4 py-2 text-sm',
  },
  lg: {
    container: 'py-16',
    icon: 'w-20 h-20',
    iconContainer: 'w-32 h-32',
    title: 'text-xl',
    description: 'text-base',
    button: 'px-6 py-3 text-base',
  },
};

export default function EmptyState({
  variant = 'custom',
  title,
  description,
  icon,
  action,
  secondaryAction,
  size = 'md',
  animated = true,
  className = '',
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const sizes = sizeConfig[size];
  const Icon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, delay: 0.2 },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      variants={animated ? containerVariants : undefined}
      initial={animated ? 'hidden' : undefined}
      animate={animated ? 'visible' : undefined}
      className={`flex flex-col items-center justify-center text-center ${sizes.container} ${className}`}
    >
      {/* Icon */}
      <motion.div
        variants={animated ? iconVariants : undefined}
        animate={animated ? 'animate' : undefined}
        {...(animated && { variants: floatVariants })}
        className={`${sizes.iconContainer} mb-6 relative`}
      >
        {/* Background circles */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full" />
        <motion.div
          animate={animated ? { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={`${sizes.icon} text-gray-400`} />
        </div>

        {/* Decorative dots */}
        {animated && (
          <>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full"
            />
          </>
        )}
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={animated ? { opacity: 0, y: 10 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.3 }}
        className={`${sizes.title} font-semibold text-gray-700 mb-2`}
      >
        {displayTitle}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={animated ? { opacity: 0, y: 10 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.4 }}
        className={`${sizes.description} text-gray-500 max-w-sm mb-6`}
      >
        {displayDescription}
      </motion.p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <motion.div
          initial={animated ? { opacity: 0, y: 10 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          {action && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className={`${sizes.button} flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow`}
            >
              {action.icon && <action.icon className="w-4 h-4" />}
              <span>{action.label}</span>
            </motion.button>
          )}
          {secondaryAction && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={secondaryAction.onClick}
              className={`${sizes.button} text-gray-600 hover:text-gray-800 transition-colors`}
            >
              {secondaryAction.label}
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Specific empty state components for common use cases
export function NoDocumentsState({ onUpload }: { onUpload: () => void }) {
  return (
    <EmptyState
      variant="no-files"
      action={{
        label: 'Upload Document',
        onClick: onUpload,
        icon: Upload,
      }}
    />
  );
}

export function NoSearchResultsState({ onClear }: { onClear: () => void }) {
  return (
    <EmptyState
      variant="no-results"
      action={{
        label: 'Clear Search',
        onClick: onClear,
        icon: Search,
      }}
    />
  );
}

export function NoRecentFilesState() {
  return <EmptyState variant="no-recent" size="sm" />;
}

export function UploadPromptState({ onUpload }: { onUpload: () => void }) {
  return (
    <EmptyState
      variant="upload-prompt"
      action={{
        label: 'Choose File',
        onClick: onUpload,
        icon: Upload,
      }}
      size="lg"
    />
  );
}
