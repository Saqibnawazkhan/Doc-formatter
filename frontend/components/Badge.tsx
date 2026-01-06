'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock, Loader, Star, Zap, Shield, Crown } from 'lucide-react';

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'premium' | 'new';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  dot?: boolean;
  pulse?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  default: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
  },
  success: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  premium: {
    bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
    text: 'text-amber-700',
    border: 'border-amber-300',
  },
  new: {
    bg: 'bg-gradient-to-r from-purple-50 to-pink-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-gray-500',
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
  premium: 'bg-amber-500',
  new: 'bg-purple-500',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  dot = false,
  pulse = false,
  removable = false,
  onRemove,
}: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full border
        ${styles.bg} ${styles.text} ${styles.border} ${sizeStyles[size]}
      `}
    >
      {/* Dot indicator */}
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`} />
        </span>
      )}

      {/* Icon */}
      {icon && <span className="flex-shrink-0">{icon}</span>}

      {/* Content */}
      <span>{children}</span>

      {/* Remove button */}
      {removable && onRemove && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </motion.button>
      )}
    </motion.span>
  );
}

// Status Badge with icons
interface StatusBadgeProps {
  status: 'pending' | 'processing' | 'success' | 'error';
  text?: string;
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  const configs: Record<string, { variant: BadgeVariant; icon: React.ReactNode; label: string }> = {
    pending: {
      variant: 'warning',
      icon: <Clock className="w-3 h-3" />,
      label: 'Pending',
    },
    processing: {
      variant: 'info',
      icon: <Loader className="w-3 h-3 animate-spin" />,
      label: 'Processing',
    },
    success: {
      variant: 'success',
      icon: <Check className="w-3 h-3" />,
      label: 'Complete',
    },
    error: {
      variant: 'error',
      icon: <X className="w-3 h-3" />,
      label: 'Failed',
    },
  };

  const config = configs[status];

  return (
    <Badge variant={config.variant} icon={config.icon} dot pulse={status === 'processing'}>
      {text || config.label}
    </Badge>
  );
}

// Feature Badge
interface FeatureBadgeProps {
  type: 'new' | 'pro' | 'beta' | 'popular' | 'recommended';
}

export function FeatureBadge({ type }: FeatureBadgeProps) {
  const configs: Record<string, { variant: BadgeVariant; icon: React.ReactNode; label: string }> = {
    new: {
      variant: 'new',
      icon: <Zap className="w-3 h-3" />,
      label: 'New',
    },
    pro: {
      variant: 'premium',
      icon: <Crown className="w-3 h-3" />,
      label: 'Pro',
    },
    beta: {
      variant: 'info',
      icon: <Shield className="w-3 h-3" />,
      label: 'Beta',
    },
    popular: {
      variant: 'success',
      icon: <Star className="w-3 h-3" />,
      label: 'Popular',
    },
    recommended: {
      variant: 'premium',
      icon: <Star className="w-3 h-3 fill-current" />,
      label: 'Recommended',
    },
  };

  const config = configs[type];

  return (
    <Badge variant={config.variant} icon={config.icon} size="sm">
      {config.label}
    </Badge>
  );
}
