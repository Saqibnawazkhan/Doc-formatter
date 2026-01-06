'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Search } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  error?: string;
  helperText?: string;
}

export default function Select({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option',
  disabled = false,
  searchable = false,
  error,
  helperText,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchQuery
    ? options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opt.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (option: Option) => {
    if (option.disabled) return;
    onChange(option.value);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className={`relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      )}

      {/* Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        whileTap={{ scale: disabled ? 1 : 0.99 }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-2 px-4 py-3 bg-white border rounded-xl shadow-sm
          transition-all duration-200
          ${error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : isOpen
              ? 'border-blue-500 ring-2 ring-blue-100'
              : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {selectedOption?.icon && (
            <span className="flex-shrink-0">{selectedOption.icon}</span>
          )}
          <span className={`truncate ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.button>

      {/* Error or Helper Text */}
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="max-h-64 overflow-y-auto py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-left
                      transition-colors duration-150
                      ${option.disabled
                        ? 'opacity-50 cursor-not-allowed bg-gray-50'
                        : 'hover:bg-gray-50 cursor-pointer'
                      }
                      ${option.value === value ? 'bg-blue-50' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {option.icon && (
                        <span className="flex-shrink-0">{option.icon}</span>
                      )}
                      <div className="overflow-hidden">
                        <p className={`font-medium truncate ${option.value === value ? 'text-blue-700' : 'text-gray-900'}`}>
                          {option.label}
                        </p>
                        {option.description && (
                          <p className="text-sm text-gray-500 truncate">{option.description}</p>
                        )}
                      </div>
                    </div>
                    {option.value === value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0"
                      >
                        <Check className="w-5 h-5 text-blue-600" />
                      </motion.div>
                    )}
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Multi-select component
interface MultiSelectProps {
  values: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  maxItems?: number;
}

export function MultiSelect({
  values,
  onChange,
  options,
  label,
  placeholder = 'Select options',
  disabled = false,
  maxItems,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((opt) => values.includes(opt.value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (option: Option) => {
    if (option.disabled) return;

    if (values.includes(option.value)) {
      onChange(values.filter((v) => v !== option.value));
    } else if (!maxItems || values.length < maxItems) {
      onChange([...values, option.value]);
    }
  };

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(values.filter((v) => v !== value));
  };

  return (
    <div ref={containerRef} className={`relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      )}

      {/* Trigger */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.99 }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full min-h-[48px] flex flex-wrap items-center gap-2 px-3 py-2 bg-white border rounded-xl shadow-sm
          transition-all duration-200
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          selectedOptions.map((option) => (
            <motion.span
              key={option.value}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg"
            >
              {option.label}
              <button
                type="button"
                onClick={(e) => handleRemove(option.value, e)}
                className="p-0.5 hover:bg-blue-200 rounded"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.span>
          ))
        )}
        <ChevronDown className={`ml-auto w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 max-h-64 overflow-y-auto py-1"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleToggle(option)}
                disabled={option.disabled}
                className={`
                  w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <span className="font-medium text-gray-900">{option.label}</span>
                <div className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  ${values.includes(option.value)
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300'
                  }
                `}>
                  {values.includes(option.value) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
