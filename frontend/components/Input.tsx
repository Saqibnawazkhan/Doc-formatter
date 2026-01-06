'use client';

import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle, Search, X } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'flushed';
  showPasswordToggle?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      size = 'md',
      variant = 'default',
      showPasswordToggle = false,
      clearable = false,
      onClear,
      type = 'text',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const getVariantStyles = () => {
      const baseStyles = `
        w-full rounded-xl transition-all duration-200 outline-none
        ${sizeStyles[size]}
        ${leftIcon ? 'pl-11' : ''}
        ${rightIcon || showPasswordToggle || clearable ? 'pr-11' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
      `;

      const borderStyles = error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
        : success
          ? 'border-green-300 focus:border-green-500 focus:ring-green-100'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100';

      switch (variant) {
        case 'filled':
          return `${baseStyles} bg-gray-100 border-2 border-transparent ${
            isFocused ? 'bg-white border-blue-500' : 'hover:bg-gray-200'
          } ${borderStyles}`;
        case 'flushed':
          return `${baseStyles} border-0 border-b-2 rounded-none px-0 ${borderStyles}`;
        default:
          return `${baseStyles} bg-white border-2 ${borderStyles} focus:ring-4`;
      }
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <motion.label
            initial={false}
            animate={{
              color: isFocused ? '#3B82F6' : error ? '#EF4444' : '#374151',
            }}
            className="block text-sm font-medium mb-2"
          >
            {label}
          </motion.label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <motion.input
            ref={ref}
            type={inputType}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${getVariantStyles()} ${className}`}
            whileFocus={{ scale: 1.01 }}
            {...props}
          />

          {/* Right Side Icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Status Icon */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </motion.div>
              )}
              {success && !error && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password Toggle */}
            {showPasswordToggle && type === 'password' && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </motion.button>
            )}

            {/* Clear Button */}
            {clearable && props.value && (
              <motion.button
                type="button"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClear}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}

            {/* Custom Right Icon */}
            {rightIcon && !showPasswordToggle && !clearable && (
              <span className="text-gray-400">{rightIcon}</span>
            )}
          </div>
        </div>

        {/* Helper/Error/Success Text */}
        <AnimatePresence mode="wait">
          {(error || success || helperText) && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`mt-2 text-sm ${
                error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-500'
              }`}
            >
              {error || success || helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

// Search Input Component
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  loading?: boolean;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  onSearch,
  loading = false,
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full"
              />
            ) : (
              <X className="w-5 h-5" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// Number Input with increment/decrement
interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
}: NumberInputProps) {
  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  return (
    <div className={disabled ? 'opacity-50' : ''}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <span className="text-xl font-bold text-gray-600">-</span>
        </motion.button>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            if (!isNaN(newValue) && newValue >= min && newValue <= max) {
              onChange(newValue);
            }
          }}
          disabled={disabled}
          className="w-20 text-center py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
        />
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <span className="text-xl font-bold text-gray-600">+</span>
        </motion.button>
      </div>
    </div>
  );
}
