'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

type ModalVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  variant?: ModalVariant;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  footer?: React.ReactNode;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

const variantIcons: Record<ModalVariant, React.ReactNode> = {
  default: null,
  success: <CheckCircle className="w-6 h-6 text-green-500" />,
  error: <AlertCircle className="w-6 h-6 text-red-500" />,
  warning: <AlertTriangle className="w-6 h-6 text-amber-500" />,
  info: <Info className="w-6 h-6 text-blue-500" />,
};

const variantColors: Record<ModalVariant, string> = {
  default: 'from-gray-50 to-white',
  success: 'from-green-50 to-white',
  error: 'from-red-50 to-white',
  warning: 'from-amber-50 to-white',
  info: 'from-blue-50 to-white',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  variant = 'default',
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  footer,
}: ModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`
              relative w-full ${sizeClasses[size]}
              bg-gradient-to-b ${variantColors[variant]}
              rounded-2xl shadow-2xl overflow-hidden
            `}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {variantIcons[variant] && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
                    >
                      {variantIcons[variant]}
                    </motion.div>
                  )}
                  <div>
                    {title && (
                      <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold text-gray-900"
                      >
                        {title}
                      </motion.h2>
                    )}
                    {description && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-gray-500 mt-1"
                      >
                        {description}
                      </motion.p>
                    )}
                  </div>
                </div>
                {showCloseButton && (
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            )}

            {/* Content */}
            {children && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6"
              >
                {children}
              </motion.div>
            )}

            {/* Footer */}
            {footer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100"
              >
                {footer}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Confirmation Modal Helper
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
}: ConfirmModalProps) {
  const modalVariant = variant === 'danger' ? 'error' : variant;
  const buttonColors = {
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
    info: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={modalVariant}
      size="sm"
      footer={
        <>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            {cancelText}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-lg font-medium ${buttonColors[variant]} shadow-md`}
          >
            {confirmText}
          </motion.button>
        </>
      }
    >
      <p className="text-gray-600">{message}</p>
    </Modal>
  );
}
