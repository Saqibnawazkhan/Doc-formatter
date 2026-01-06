'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'wave',
}: SkeletonProps) {
  const baseStyles = 'bg-gray-200 relative overflow-hidden';

  const variantStyles = {
    text: 'rounded h-4 w-full',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={style}
    >
      {animation === 'wave' && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
          animate={{ translateX: ['0%', '200%'] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
      {animation === 'pulse' && (
        <motion.div
          className="absolute inset-0 bg-gray-300"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
}

// Preset skeleton components
export function DocumentSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center space-x-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton height={14} />
        <Skeleton height={14} />
        <Skeleton width="80%" height={14} />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton variant="rounded" width={120} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </div>
      <div className="space-y-3">
        <Skeleton height={16} />
        <Skeleton height={16} />
        <Skeleton width="70%" height={16} />
      </div>
      <Skeleton variant="rounded" height={48} />
    </div>
  );
}

export function PresetSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl p-4 space-y-3"
        >
          <div className="flex items-center space-x-3">
            <Skeleton variant="rounded" width={40} height={40} />
            <div className="flex-1 space-y-1">
              <Skeleton width="70%" height={14} />
              <Skeleton width="50%" height={10} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
