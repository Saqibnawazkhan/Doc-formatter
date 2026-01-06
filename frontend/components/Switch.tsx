'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'amber';
}

const sizeConfig = {
  sm: {
    track: 'w-8 h-4',
    thumb: 'w-3 h-3',
    translate: 16,
    offset: 2,
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5',
    translate: 20,
    offset: 2,
  },
  lg: {
    track: 'w-14 h-7',
    thumb: 'w-6 h-6',
    translate: 28,
    offset: 2,
  },
};

const colorConfig = {
  blue: {
    active: 'bg-gradient-to-r from-blue-500 to-blue-600',
    glow: 'shadow-blue-500/50',
  },
  green: {
    active: 'bg-gradient-to-r from-green-500 to-emerald-600',
    glow: 'shadow-green-500/50',
  },
  purple: {
    active: 'bg-gradient-to-r from-purple-500 to-purple-600',
    glow: 'shadow-purple-500/50',
  },
  amber: {
    active: 'bg-gradient-to-r from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/50',
  },
};

export default function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  color = 'blue',
}: SwitchProps) {
  const sizeStyles = sizeConfig[size];
  const colorStyles = colorConfig[color];

  return (
    <label
      className={`
        flex items-start gap-3 cursor-pointer select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Switch Track */}
      <motion.button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        className={`
          relative inline-flex flex-shrink-0 rounded-full
          transition-colors duration-300 ease-in-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
          ${sizeStyles.track}
          ${checked ? `${colorStyles.active} ${colorStyles.glow} shadow-md` : 'bg-gray-200'}
        `}
      >
        {/* Switch Thumb */}
        <motion.span
          initial={false}
          animate={{
            x: checked ? sizeStyles.translate : sizeStyles.offset,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className={`
            absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md
            flex items-center justify-center
            ${sizeStyles.thumb}
          `}
        >
          {/* Icon inside thumb when active */}
          {checked && size !== 'sm' && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-2.5 h-2.5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </motion.svg>
          )}
        </motion.span>
      </motion.button>

      {/* Label & Description */}
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className={`font-medium text-gray-700 ${size === 'sm' ? 'text-sm' : ''}`}>
              {label}
            </span>
          )}
          {description && (
            <span className="text-sm text-gray-500">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}

// Switch Group Component
interface SwitchGroupProps {
  label?: string;
  children: React.ReactNode;
}

export function SwitchGroup({ label, children }: SwitchGroupProps) {
  return (
    <div className="space-y-4">
      {label && (
        <h3 className="font-semibold text-gray-800 mb-3">{label}</h3>
      )}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

// Inline Switch for compact layouts
interface InlineSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  leftLabel: string;
  rightLabel: string;
  disabled?: boolean;
}

export function InlineSwitch({
  checked,
  onChange,
  leftLabel,
  rightLabel,
  disabled = false,
}: InlineSwitchProps) {
  return (
    <div className={`flex items-center gap-3 ${disabled ? 'opacity-50' : ''}`}>
      <span className={`text-sm ${!checked ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
        {leftLabel}
      </span>
      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        size="sm"
      />
      <span className={`text-sm ${checked ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
        {rightLabel}
      </span>
    </div>
  );
}
