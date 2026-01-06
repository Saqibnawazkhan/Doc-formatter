'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, Upload, Wand2, Download, Settings, Zap } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  target?: string; // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface FeatureTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const tourSteps: TourStep[] = [
  {
    title: 'Welcome to Word Formatter!',
    description: 'Let us show you how to format your documents professionally in just a few clicks.',
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    title: 'Upload Your Document',
    description: 'Start by uploading a .docx file. Simply drag and drop or click to browse your files.',
    icon: <Upload className="w-8 h-8" />,
  },
  {
    title: 'Choose Your Style',
    description: 'Select from pre-built templates or customize every aspect of your document formatting.',
    icon: <Wand2 className="w-8 h-8" />,
  },
  {
    title: 'Customize Formatting',
    description: 'Fine-tune fonts, spacing, margins, and more to match your exact requirements.',
    icon: <Settings className="w-8 h-8" />,
  },
  {
    title: 'Download & Done!',
    description: 'Click format, then download your professionally formatted document instantly.',
    icon: <Download className="w-8 h-8" />,
  },
  {
    title: 'Pro Tips',
    description: 'Press "?" anytime for keyboard shortcuts. Use the floating button for quick access to settings.',
    icon: <Zap className="w-8 h-8" />,
  },
];

export default function FeatureTour({ isOpen, onClose, onComplete }: FeatureTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setAnimationDirection('next');
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setAnimationDirection('prev');
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('word-formatter-tour-completed', 'true');
    onComplete?.();
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('word-formatter-tour-completed', 'true');
    onClose();
  };

  const step = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;

  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === 'next' ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Progress bar */}
            <div className="h-1 bg-gray-100">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <AnimatePresence mode="wait" custom={animationDirection}>
                <motion.div
                  key={currentStep}
                  custom={animationDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="text-center"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-xl"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold text-gray-800 mb-3"
                  >
                    {step.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* Step indicators */}
              <div className="flex justify-center space-x-2 mt-8 mb-6">
                {tourSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAnimationDirection(index > currentStep ? 'next' : 'prev');
                      setCurrentStep(index);
                    }}
                    className="focus:outline-none"
                  >
                    <motion.div
                      animate={{
                        scale: index === currentStep ? 1.2 : 1,
                        backgroundColor: index === currentStep ? '#3B82F6' : index < currentStep ? '#93C5FD' : '#E5E7EB',
                      }}
                      className="w-2 h-2 rounded-full"
                    />
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </motion.button>

                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Skip tour
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="flex items-center space-x-1 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span>{isLastStep ? 'Get Started' : 'Next'}</span>
                  {!isLastStep && <ChevronRight className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to manage tour state
export function useTour() {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem('word-formatter-tour-completed');
    if (!tourCompleted) {
      // Show tour after a short delay on first visit
      const timer = setTimeout(() => setShowTour(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => setShowTour(true);
  const endTour = () => setShowTour(false);
  const resetTour = () => {
    localStorage.removeItem('word-formatter-tour-completed');
    setShowTour(true);
  };

  return { showTour, startTour, endTour, resetTour };
}

// Spotlight component for highlighting elements
interface SpotlightProps {
  target: string;
  isActive: boolean;
  children?: React.ReactNode;
}

export function Spotlight({ target, isActive, children }: SpotlightProps) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isActive && target) {
      const element = document.querySelector(target);
      if (element) {
        setRect(element.getBoundingClientRect());
      }
    }
  }, [target, isActive]);

  if (!isActive || !rect) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Overlay with cutout */}
      <svg className="w-full h-full">
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={rect.left - 8}
              y={rect.top - 8}
              width={rect.width + 16}
              height={rect.height + 16}
              rx="8"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.5)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Highlight border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute border-2 border-blue-500 rounded-lg"
        style={{
          left: rect.left - 8,
          top: rect.top - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        }}
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-lg border-2 border-blue-400"
        />
      </motion.div>

      {children}
    </div>
  );
}
