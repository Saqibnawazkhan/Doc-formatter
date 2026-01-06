'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  showBorder?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-xs', status: 'w-1.5 h-1.5 border' },
  sm: { container: 'w-8 h-8', text: 'text-sm', status: 'w-2 h-2 border' },
  md: { container: 'w-10 h-10', text: 'text-base', status: 'w-2.5 h-2.5 border-2' },
  lg: { container: 'w-12 h-12', text: 'text-lg', status: 'w-3 h-3 border-2' },
  xl: { container: 'w-16 h-16', text: 'text-xl', status: 'w-4 h-4 border-2' },
  '2xl': { container: 'w-24 h-24', text: 'text-3xl', status: 'w-5 h-5 border-2' },
};

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-amber-500',
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getColorFromName = (name: string): string => {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-amber-500 to-amber-600',
    'from-rose-500 to-rose-600',
    'from-cyan-500 to-cyan-600',
    'from-indigo-500 to-indigo-600',
    'from-emerald-500 to-emerald-600',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function Avatar({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  status,
  showBorder = false,
  onClick,
  className = '',
}: AvatarProps) {
  const styles = sizeStyles[size];
  const [imageError, setImageError] = React.useState(false);

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      );
    }

    if (name) {
      return (
        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getColorFromName(name)} text-white font-semibold ${styles.text}`}
        >
          {getInitials(name)}
        </div>
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
        <User className="w-1/2 h-1/2" />
      </div>
    );
  };

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`
        relative inline-flex rounded-full overflow-hidden
        ${styles.container}
        ${showBorder ? 'ring-2 ring-white shadow-md' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {renderContent()}

      {/* Status Indicator */}
      {status && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`
            absolute bottom-0 right-0 rounded-full border-white
            ${styles.status}
            ${statusColors[status]}
          `}
        />
      )}
    </motion.div>
  );
}

// Avatar Group Component
interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    name?: string;
    alt?: string;
  }>;
  max?: number;
  size?: AvatarSize;
  showOverflow?: boolean;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  showOverflow = true,
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const styles = sizeStyles[size];

  return (
    <div className="flex -space-x-3">
      {displayAvatars.map((avatar, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{ zIndex: displayAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            name={avatar.name}
            alt={avatar.alt}
            size={size}
            showBorder
          />
        </motion.div>
      ))}

      {/* Overflow Indicator */}
      {showOverflow && overflow > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: max * 0.1 }}
          className={`
            relative inline-flex items-center justify-center rounded-full
            bg-gray-200 text-gray-600 font-semibold ring-2 ring-white
            ${styles.container} ${styles.text}
          `}
        >
          +{overflow}
        </motion.div>
      )}
    </div>
  );
}

// Avatar with Name
interface AvatarWithNameProps {
  src?: string;
  name: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: AvatarStatus;
  onClick?: () => void;
}

export function AvatarWithName({
  src,
  name,
  subtitle,
  size = 'md',
  status,
  onClick,
}: AvatarWithNameProps) {
  const textSizes = {
    sm: { name: 'text-sm', subtitle: 'text-xs' },
    md: { name: 'text-base', subtitle: 'text-sm' },
    lg: { name: 'text-lg', subtitle: 'text-base' },
  };

  return (
    <motion.div
      whileHover={onClick ? { x: 2 } : {}}
      onClick={onClick}
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <Avatar src={src} name={name} size={size} status={status} />
      <div>
        <p className={`font-medium text-gray-900 ${textSizes[size].name}`}>{name}</p>
        {subtitle && (
          <p className={`text-gray-500 ${textSizes[size].subtitle}`}>{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

// Avatar Badge
interface AvatarBadgeProps {
  children: React.ReactNode;
  badge?: React.ReactNode;
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

export function AvatarBadge({
  children,
  badge,
  position = 'bottom-right',
}: AvatarBadgeProps) {
  const positionClasses = {
    'top-right': '-top-1 -right-1',
    'bottom-right': '-bottom-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-left': '-bottom-1 -left-1',
  };

  return (
    <div className="relative inline-block">
      {children}
      {badge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute ${positionClasses[position]}`}
        >
          {badge}
        </motion.div>
      )}
    </div>
  );
}
