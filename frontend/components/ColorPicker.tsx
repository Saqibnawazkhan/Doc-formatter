'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, ChevronDown } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  presetColors?: string[];
  showCustomInput?: boolean;
  disabled?: boolean;
}

const defaultPresetColors = [
  '#000000', '#374151', '#6B7280', '#9CA3AF',
  '#EF4444', '#F97316', '#F59E0B', '#EAB308',
  '#22C55E', '#10B981', '#14B8A6', '#06B6D4',
  '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6',
  '#A855F7', '#D946EF', '#EC4899', '#F43F5E',
];

export default function ColorPicker({
  value,
  onChange,
  label,
  presetColors = defaultPresetColors,
  showCustomInput = true,
  disabled = false,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCustomColor(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorSelect = (color: string) => {
    onChange(color);
    setCustomColor(color);
    setIsOpen(false);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      onChange(newColor);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      )}

      {/* Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 rounded-md shadow-inner border border-gray-200"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm text-gray-700 font-mono">{value.toUpperCase()}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 p-4"
          >
            {/* Preset Colors Grid */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {presetColors.map((color) => (
                <motion.button
                  key={color}
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleColorSelect(color)}
                  className={`
                    relative w-8 h-8 rounded-lg shadow-md transition-all
                    ${value === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                  `}
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  {value === color && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Check className={`w-4 h-4 ${isLightColor(color) ? 'text-gray-800' : 'text-white'}`} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Custom Color Input */}
            {showCustomInput && (
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Custom Color</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => handleColorSelect(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={handleCustomColorChange}
                    placeholder="#000000"
                    className="flex-1 px-3 py-2 text-sm font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function to determine if a color is light
function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

// Compact color picker for inline use
interface CompactColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  colors?: string[];
}

export function CompactColorPicker({
  value,
  onChange,
  colors = ['#000000', '#EF4444', '#F59E0B', '#22C55E', '#3B82F6', '#8B5CF6'],
}: CompactColorPickerProps) {
  return (
    <div className="flex items-center gap-1.5">
      {colors.map((color) => (
        <motion.button
          key={color}
          type="button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(color)}
          className={`
            w-6 h-6 rounded-full shadow-sm transition-all
            ${value === color ? 'ring-2 ring-offset-1 ring-blue-500' : ''}
          `}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
