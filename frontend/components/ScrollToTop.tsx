'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ChevronUp, Rocket, Sparkles } from 'lucide-react';

type ScrollToTopVariant = 'default' | 'minimal' | 'rocket' | 'gradient';

interface ScrollToTopProps {
  threshold?: number;
  variant?: ScrollToTopVariant;
  position?: 'left' | 'right';
  showProgress?: boolean;
  smooth?: boolean;
  className?: string;
}

export default function ScrollToTop({
  threshold = 300,
  variant = 'default',
  position = 'right',
  showProgress = false,
  smooth = true,
  className = '',
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setIsVisible(scrolled > threshold);
      setScrollProgress(Math.min((scrolled / docHeight) * 100, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const positionClasses = {
    left: 'left-6',
    right: 'right-6',
  };

  const variants = {
    default: (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className={`
          w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200
          flex items-center justify-center text-gray-700 hover:text-blue-600
          hover:shadow-xl transition-shadow
          ${className}
        `}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    ),
    minimal: (
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className={`
          w-10 h-10 rounded-lg bg-gray-900/80 backdrop-blur-sm
          flex items-center justify-center text-white
          hover:bg-gray-900 transition-colors
          ${className}
        `}
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    ),
    rocket: (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, y: -10 }}
        onClick={scrollToTop}
        className={`
          w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500
          shadow-lg flex items-center justify-center text-white
          hover:shadow-xl transition-shadow group
          ${className}
        `}
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Rocket className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform" />
        </motion.div>
        {/* Exhaust particles */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </motion.div>
      </motion.button>
    ),
    gradient: (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className={`
          w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500
          shadow-lg flex items-center justify-center text-white
          hover:shadow-xl hover:from-blue-600 hover:to-purple-600 transition-all
          ${className}
        `}
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.div>
      </motion.button>
    ),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed bottom-6 ${positionClasses[position]} z-40`}
        >
          {/* Progress ring */}
          {showProgress && (
            <svg
              className="absolute inset-0 -rotate-90"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-200"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="url(#progress-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={138.2}
                strokeDashoffset={138.2 - (138.2 * scrollProgress) / 100}
              />
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          )}
          {variants[variant]}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Scroll progress bar
interface ScrollProgressBarProps {
  position?: 'top' | 'bottom';
  height?: number;
  gradient?: string;
  showPercentage?: boolean;
}

export function ScrollProgressBar({
  position = 'top',
  height = 3,
  gradient = 'from-blue-500 via-purple-500 to-pink-500',
  showPercentage = false,
}: ScrollProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min((scrolled / docHeight) * 100, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 z-50 ${position === 'top' ? 'top-0' : 'bottom-0'}`}
      style={{ height: `${height}px` }}
    >
      <motion.div
        className={`h-full bg-gradient-to-r ${gradient}`}
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
      {showPercentage && progress > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`absolute ${position === 'top' ? 'top-2' : 'bottom-2'} right-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-full`}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  );
}

// Scroll indicator for sections
interface ScrollIndicatorProps {
  sections: { id: string; label: string }[];
  activeSection?: string;
  onSectionClick?: (id: string) => void;
}

export function ScrollIndicator({
  sections,
  activeSection,
  onSectionClick,
}: ScrollIndicatorProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 space-y-3">
      {sections.map((section) => (
        <motion.button
          key={section.id}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const element = document.getElementById(section.id);
            element?.scrollIntoView({ behavior: 'smooth' });
            onSectionClick?.(section.id);
          }}
          className="group flex items-center justify-end"
        >
          {/* Label tooltip */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap"
          >
            {section.label}
          </motion.span>

          {/* Dot */}
          <motion.div
            animate={{
              scale: activeSection === section.id ? 1.3 : 1,
              backgroundColor: activeSection === section.id ? '#3B82F6' : '#D1D5DB',
            }}
            className="w-3 h-3 rounded-full"
          />
        </motion.button>
      ))}
    </div>
  );
}
