'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, Wand2, Download, Settings, X, HelpCircle } from 'lucide-react';

interface ActionItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}

interface FloatingActionButtonProps {
  onUpload?: () => void;
  onFormat?: () => void;
  onDownload?: () => void;
  onSettings?: () => void;
  onHelp?: () => void;
  disabled?: {
    upload?: boolean;
    format?: boolean;
    download?: boolean;
  };
}

export default function FloatingActionButton({
  onUpload,
  onFormat,
  onDownload,
  onSettings,
  onHelp,
  disabled = {},
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions: ActionItem[] = [
    {
      id: 'upload',
      icon: <Upload className="w-5 h-5" />,
      label: 'Upload Document',
      color: 'from-blue-500 to-blue-600',
      onClick: () => {
        onUpload?.();
        setIsOpen(false);
      },
    },
    {
      id: 'format',
      icon: <Wand2 className="w-5 h-5" />,
      label: 'Format Now',
      color: 'from-purple-500 to-purple-600',
      onClick: () => {
        onFormat?.();
        setIsOpen(false);
      },
    },
    {
      id: 'download',
      icon: <Download className="w-5 h-5" />,
      label: 'Download',
      color: 'from-green-500 to-green-600',
      onClick: () => {
        onDownload?.();
        setIsOpen(false);
      },
    },
    {
      id: 'settings',
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      color: 'from-gray-500 to-gray-600',
      onClick: () => {
        onSettings?.();
        setIsOpen(false);
      },
    },
    {
      id: 'help',
      icon: <HelpCircle className="w-5 h-5" />,
      label: 'Help',
      color: 'from-amber-500 to-amber-600',
      onClick: () => {
        onHelp?.();
        setIsOpen(false);
      },
    },
  ];

  const isActionDisabled = (actionId: string) => {
    switch (actionId) {
      case 'upload':
        return disabled.upload;
      case 'format':
        return disabled.format;
      case 'download':
        return disabled.download;
      default:
        return false;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Action Items */}
      <div className="relative flex flex-col-reverse items-center gap-3">
        <AnimatePresence>
          {isOpen &&
            actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { delay: index * 0.05 },
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                  transition: { delay: (actions.length - index) * 0.03 },
                }}
                className="flex items-center gap-3"
              >
                {/* Label */}
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap"
                >
                  {action.label}
                </motion.span>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: isActionDisabled(action.id) ? 1 : 1.1 }}
                  whileTap={{ scale: isActionDisabled(action.id) ? 1 : 0.9 }}
                  onClick={action.onClick}
                  disabled={isActionDisabled(action.id)}
                  className={`
                    w-12 h-12 rounded-full bg-gradient-to-br ${action.color}
                    flex items-center justify-center text-white shadow-lg
                    transition-all duration-200
                    ${isActionDisabled(action.id) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
                  `}
                >
                  {action.icon}
                </motion.button>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white
            transition-all duration-300
            ${isOpen
              ? 'bg-gradient-to-br from-red-500 to-rose-600'
              : 'bg-gradient-to-br from-blue-600 to-purple-600'
            }
          `}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Pulse Animation for main button when closed */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
}
