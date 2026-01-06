'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Wand2, Download, CheckCircle, Sparkles } from 'lucide-react';

type LoadingState = 'uploading' | 'processing' | 'formatting' | 'downloading' | 'complete';

interface LoadingOverlayProps {
  isVisible: boolean;
  state?: LoadingState;
  progress?: number;
  message?: string;
}

const stateConfig: Record<LoadingState, {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradient: string;
}> = {
  uploading: {
    icon: <FileText className="w-8 h-8" />,
    title: 'Uploading Document',
    description: 'Securely transferring your file...',
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-blue-600',
  },
  processing: {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Processing Document',
    description: 'Analyzing document structure...',
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-purple-600',
  },
  formatting: {
    icon: <Wand2 className="w-8 h-8" />,
    title: 'Applying Formatting',
    description: 'Transforming your document...',
    color: 'text-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  downloading: {
    icon: <Download className="w-8 h-8" />,
    title: 'Preparing Download',
    description: 'Almost ready...',
    color: 'text-green-500',
    gradient: 'from-green-500 to-emerald-600',
  },
  complete: {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Complete!',
    description: 'Your document is ready',
    color: 'text-green-500',
    gradient: 'from-green-500 to-emerald-600',
  },
};

export default function LoadingOverlay({
  isVisible,
  state = 'processing',
  progress,
  message,
}: LoadingOverlayProps) {
  const config = stateConfig[state];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-center p-8"
          >
            {/* Animated Icon Container */}
            <motion.div
              className="relative w-32 h-32 mx-auto mb-6"
            >
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className={`absolute inset-0 rounded-full border-4 border-dashed ${config.color} opacity-30`}
              />

              {/* Middle ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className={`absolute inset-3 rounded-full border-4 border-dotted ${config.color} opacity-50`}
              />

              {/* Inner circle with icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`absolute inset-6 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-2xl`}
              >
                <motion.div
                  animate={state !== 'complete' ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-white"
                >
                  {config.icon}
                </motion.div>
              </motion.div>

              {/* Floating particles */}
              {state !== 'complete' && [...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${config.gradient}`}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: -4,
                    marginTop: -4,
                  }}
                />
              ))}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              {config.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 mb-6"
            >
              {message || config.description}
            </motion.p>

            {/* Progress Bar */}
            {progress !== undefined && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 240 }}
                className="mx-auto"
              >
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">{progress}%</p>
              </motion.div>
            )}

            {/* Dots animation when no progress */}
            {progress === undefined && state !== 'complete' && (
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className={`w-3 h-3 rounded-full bg-gradient-to-br ${config.gradient}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Compact inline loader
interface InlineLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function InlineLoader({ size = 'md', color = 'blue' }: InlineLoaderProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} border-2 border-${color}-200 border-t-${color}-600 rounded-full`}
    />
  );
}

// Skeleton pulse animation
interface PulseLoaderProps {
  className?: string;
}

export function PulseLoader({ className = '' }: PulseLoaderProps) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`bg-gray-200 rounded ${className}`}
    />
  );
}

// Document processing animation
export function DocumentProcessingAnimation() {
  return (
    <div className="relative w-24 h-32 mx-auto">
      {/* Document base */}
      <motion.div
        className="absolute inset-0 bg-white rounded-lg shadow-lg border border-gray-200"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Document lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="h-2 bg-gray-100 rounded mx-3 mt-3"
            initial={{ width: '0%' }}
            animate={{ width: ['0%', '80%', '60%', '70%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Magic wand */}
      <motion.div
        className="absolute -right-4 -top-4"
        animate={{
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
          <Wand2 className="w-4 h-4 text-white" />
        </div>
      </motion.div>

      {/* Sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * 30],
            y: [0, -20 - i * 10],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            right: i % 2 === 0 ? '0' : 'auto',
            left: i % 2 === 0 ? 'auto' : '0',
            top: '20%',
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </motion.div>
      ))}
    </div>
  );
}
