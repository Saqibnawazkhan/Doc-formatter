'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Settings, Wand2, Download, Check } from 'lucide-react';

type StepStatus = 'pending' | 'current' | 'completed';

interface Step {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface ProgressStepsProps {
  steps?: { label: string; description: string }[];
  currentStep: number;
  variant?: 'horizontal' | 'vertical';
}

const steps: Step[] = [
  {
    id: 'upload',
    label: 'Upload',
    description: 'Upload your document',
    icon: <Upload className="w-5 h-5" />,
  },
  {
    id: 'configure',
    label: 'Configure',
    description: 'Choose formatting options',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: 'format',
    label: 'Format',
    description: 'Apply formatting',
    icon: <Wand2 className="w-5 h-5" />,
  },
  {
    id: 'download',
    label: 'Download',
    description: 'Get your document',
    icon: <Download className="w-5 h-5" />,
  },
];

export default function ProgressSteps({ steps: externalSteps, currentStep, variant = 'horizontal' }: ProgressStepsProps) {
  // Use external steps if provided, otherwise use default internal steps
  const displaySteps = externalSteps
    ? externalSteps.map((s, i) => ({
        id: `step-${i}`,
        label: s.label,
        description: s.description,
        icon: i === 0 ? <Upload className="w-5 h-5" />
            : i === 1 ? <Settings className="w-5 h-5" />
            : i === 2 ? <Wand2 className="w-5 h-5" />
            : <Download className="w-5 h-5" />
      }))
    : steps;
  const getStepStatus = (stepIndex: number): StepStatus => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  if (variant === 'vertical') {
    return (
      <div className="flex flex-col gap-4">
        {displaySteps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: status === 'current' ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 1, repeat: status === 'current' ? Infinity : 0 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300 shadow-md
                    ${status === 'completed'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                      : status === 'current'
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white ring-4 ring-blue-200'
                        : 'bg-gray-200 text-gray-400'
                    }
                  `}
                >
                  {status === 'completed' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    step.icon
                  )}
                </motion.div>
                {index < displaySteps.length - 1 && (
                  <div className={`w-0.5 h-16 mt-2 transition-colors duration-300 ${
                    status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>

              {/* Step Content */}
              <div className="pt-1">
                <p className={`font-semibold ${
                  status === 'pending' ? 'text-gray-400' : 'text-gray-800'
                }`}>
                  {step.label}
                </p>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress Line Background */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full" />

        {/* Progress Line Fill */}
        <motion.div
          className="absolute top-5 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (displaySteps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {displaySteps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col items-center z-10"
            >
              {/* Step Circle */}
              <motion.div
                animate={{
                  scale: status === 'current' ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 1, repeat: status === 'current' ? Infinity : 0 }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300 shadow-md
                  ${status === 'completed'
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                    : status === 'current'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white ring-4 ring-blue-200'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }
                `}
              >
                {status === 'completed' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  step.icon
                )}
              </motion.div>

              {/* Step Label */}
              <div className="mt-3 text-center">
                <p className={`font-medium text-sm ${
                  status === 'pending' ? 'text-gray-400' : 'text-gray-800'
                }`}>
                  {step.label}
                </p>
                <p className="text-xs text-gray-500 hidden sm:block max-w-[100px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
