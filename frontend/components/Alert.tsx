'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';
type AlertSize = 'sm' | 'md' | 'lg';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  size?: AlertSize;
  closable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<AlertVariant, {
  container: string;
  icon: string;
  title: string;
  iconComponent: React.ReactNode;
}> = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    iconComponent: <Info className="w-5 h-5" />,
  },
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-500',
    title: 'text-green-800',
    iconComponent: <CheckCircle className="w-5 h-5" />,
  },
  warning: {
    container: 'bg-amber-50 border-amber-200',
    icon: 'text-amber-500',
    title: 'text-amber-800',
    iconComponent: <AlertTriangle className="w-5 h-5" />,
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-500',
    title: 'text-red-800',
    iconComponent: <AlertCircle className="w-5 h-5" />,
  },
};

const sizeStyles: Record<AlertSize, string> = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-base',
  lg: 'p-5 text-lg',
};

export default function Alert({
  variant = 'info',
  title,
  children,
  size = 'md',
  closable = false,
  onClose,
  icon,
  action,
  className = '',
}: AlertProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const styles = variantStyles[variant];

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`
            flex items-start gap-3 rounded-xl border
            ${styles.container}
            ${sizeStyles[size]}
            ${className}
          `}
        >
          {/* Icon */}
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
            className={`flex-shrink-0 mt-0.5 ${styles.icon}`}
          >
            {icon || styles.iconComponent}
          </motion.span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <p className={`font-semibold mb-1 ${styles.title}`}>{title}</p>
            )}
            <div className="text-gray-700">{children}</div>
            {action && <div className="mt-3">{action}</div>}
          </div>

          {/* Close Button */}
          {closable && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Banner Alert (full-width, top of page)
interface BannerAlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function BannerAlert({
  variant = 'info',
  children,
  closable = false,
  onClose,
  action,
}: BannerAlertProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const styles = variantStyles[variant];

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const gradientStyles: Record<AlertVariant, string> = {
    info: 'from-blue-500 to-blue-600',
    success: 'from-green-500 to-emerald-600',
    warning: 'from-amber-500 to-orange-600',
    error: 'from-red-500 to-rose-600',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`bg-gradient-to-r ${gradientStyles[variant]} text-white overflow-hidden`}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0">{styles.iconComponent}</span>
              <p className="text-sm font-medium">{children}</p>
            </div>
            <div className="flex items-center gap-3">
              {action && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.onClick}
                  className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                >
                  {action.label}
                </motion.button>
              )}
              {closable && (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Inline Alert (minimal style)
interface InlineAlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
}

export function InlineAlert({ variant = 'info', children }: InlineAlertProps) {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center gap-2 text-sm ${styles.title}`}
    >
      <span className={styles.icon}>{styles.iconComponent}</span>
      <span>{children}</span>
    </motion.div>
  );
}

// Callout Component
interface CalloutProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Callout({ variant = 'info', title, children, icon }: CalloutProps) {
  const styles = variantStyles[variant];
  const borderColors: Record<AlertVariant, string> = {
    info: 'border-l-blue-500',
    success: 'border-l-green-500',
    warning: 'border-l-amber-500',
    error: 'border-l-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        ${styles.container} border-l-4 ${borderColors[variant]}
        rounded-r-xl p-4
      `}
    >
      <div className="flex items-start gap-3">
        <span className={`flex-shrink-0 ${styles.icon}`}>
          {icon || styles.iconComponent}
        </span>
        <div>
          {title && (
            <p className={`font-semibold mb-1 ${styles.title}`}>{title}</p>
          )}
          <div className="text-gray-700">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
