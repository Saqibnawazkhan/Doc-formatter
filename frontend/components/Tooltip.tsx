'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function Tooltip({ content, children, position = 'top', delay = 300 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const positionStyles = {
    top: {
      className: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      initial: { opacity: 0, y: 5, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 5, scale: 0.95 },
    },
    bottom: {
      className: 'top-full left-1/2 -translate-x-1/2 mt-2',
      initial: { opacity: 0, y: -5, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -5, scale: 0.95 },
    },
    left: {
      className: 'right-full top-1/2 -translate-y-1/2 mr-2',
      initial: { opacity: 0, x: 5, scale: 0.95 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 5, scale: 0.95 },
    },
    right: {
      className: 'left-full top-1/2 -translate-y-1/2 ml-2',
      initial: { opacity: 0, x: -5, scale: 0.95 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -5, scale: 0.95 },
    },
  };

  const currentPosition = positionStyles[position];

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={currentPosition.initial}
            animate={currentPosition.animate}
            exit={currentPosition.exit}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 ${currentPosition.className}`}
          >
            <div className="px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
              {content}
              <div
                className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                  position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
                  position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
                  position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
                  'right-full top-1/2 -translate-y-1/2 -mr-1'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
