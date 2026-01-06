'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  color?: 'blue' | 'green' | 'purple' | 'amber';
  disabled?: boolean;
  marks?: { value: number; label: string }[];
}

const colorConfig = {
  blue: {
    track: 'bg-gradient-to-r from-blue-500 to-blue-600',
    thumb: 'border-blue-500 shadow-blue-500/30',
    hover: 'group-hover:border-blue-600',
  },
  green: {
    track: 'bg-gradient-to-r from-green-500 to-emerald-600',
    thumb: 'border-green-500 shadow-green-500/30',
    hover: 'group-hover:border-green-600',
  },
  purple: {
    track: 'bg-gradient-to-r from-purple-500 to-purple-600',
    thumb: 'border-purple-500 shadow-purple-500/30',
    hover: 'group-hover:border-purple-600',
  },
  amber: {
    track: 'bg-gradient-to-r from-amber-500 to-orange-600',
    thumb: 'border-amber-500 shadow-amber-500/30',
    hover: 'group-hover:border-amber-600',
  },
};

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  valueFormatter = (v) => v.toString(),
  color = 'blue',
  disabled = false,
  marks,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const colorStyles = colorConfig[color];
  const percentage = ((value - min) / (max - min)) * 100;

  const calculateValue = useCallback((clientX: number) => {
    if (!trackRef.current) return value;

    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  }, [min, max, step, value]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    onChange(calculateValue(e.clientX));
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      onChange(calculateValue(e.clientX));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, calculateValue, onChange]);

  return (
    <div className={`w-full ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Header */}
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <motion.span
              key={value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded"
            >
              {valueFormatter(value)}
            </motion.span>
          )}
        </div>
      )}

      {/* Slider Track */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => !isDragging && setShowTooltip(false)}
        className="relative h-6 flex items-center cursor-pointer group"
      >
        {/* Background Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          {/* Active Track */}
          <motion.div
            className={`h-full ${colorStyles.track} rounded-full`}
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Thumb */}
        <motion.div
          className={`
            absolute w-5 h-5 bg-white rounded-full border-2 shadow-lg cursor-grab
            ${colorStyles.thumb} ${colorStyles.hover}
            ${isDragging ? 'cursor-grabbing scale-110' : ''}
            transition-all duration-150
          `}
          style={{ left: `calc(${percentage}% - 10px)` }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.15 }}
        >
          {/* Inner dot */}
          <div className={`absolute inset-2 rounded-full ${colorStyles.track}`} />
        </motion.div>

        {/* Tooltip */}
        {(showTooltip || isDragging) && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-8 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap"
            style={{ left: `calc(${percentage}% - 16px)` }}
          >
            {valueFormatter(value)}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1" />
          </motion.div>
        )}
      </div>

      {/* Marks */}
      {marks && marks.length > 0 && (
        <div className="relative mt-2">
          {marks.map((mark) => {
            const markPercent = ((mark.value - min) / (max - min)) * 100;
            return (
              <div
                key={mark.value}
                className="absolute text-xs text-gray-500 -translate-x-1/2"
                style={{ left: `${markPercent}%` }}
              >
                <div className="w-1 h-1 bg-gray-400 rounded-full mx-auto mb-1" />
                {mark.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Range Slider Component (two thumbs)
interface RangeSliderProps {
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  valueFormatter?: (value: number) => string;
}

export function RangeSlider({
  minValue,
  maxValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  valueFormatter = (v) => v.toString(),
}: RangeSliderProps) {
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">
            {valueFormatter(minValue)} - {valueFormatter(maxValue)}
          </span>
        </div>
      )}

      <div className="relative h-6 flex items-center">
        {/* Background Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full">
          {/* Active Range */}
          <div
            className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>

        {/* Min Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => {
            const newMin = Math.min(Number(e.target.value), maxValue - step);
            onChange(newMin, maxValue);
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-grab"
        />

        {/* Max Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => {
            const newMax = Math.max(Number(e.target.value), minValue + step);
            onChange(minValue, newMax);
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-grab"
        />
      </div>
    </div>
  );
}
