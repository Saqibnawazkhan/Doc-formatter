'use client';

import React, { useState, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, HelpCircle, X, Loader } from 'lucide-react';

type DialogType = 'info' | 'warning' | 'danger' | 'success' | 'question';

interface DialogConfig {
  type?: DialogType;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDestructive?: boolean;
  showCancel?: boolean;
  loading?: boolean;
}

interface DialogContextType {
  confirm: (config: DialogConfig) => Promise<boolean>;
  alert: (config: Omit<DialogConfig, 'showCancel' | 'cancelLabel'>) => Promise<void>;
}

const DialogContext = createContext<DialogContextType | null>(null);

const typeConfig: Record<DialogType, {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}> = {
  info: {
    icon: <Info className="w-6 h-6" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  warning: {
    icon: <AlertTriangle className="w-6 h-6" />,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  danger: {
    icon: <AlertTriangle className="w-6 h-6" />,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  success: {
    icon: <CheckCircle className="w-6 h-6" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  question: {
    icon: <HelpCircle className="w-6 h-6" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
};

interface DialogState extends DialogConfig {
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
}

export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmLabel: 'OK',
    cancelLabel: 'Cancel',
    confirmDestructive: false,
    showCancel: true,
    loading: false,
    resolve: null,
  });

  const confirm = useCallback((config: DialogConfig): Promise<boolean> => {
    return new Promise((resolve) => {
      setDialog({
        ...config,
        isOpen: true,
        showCancel: config.showCancel ?? true,
        confirmLabel: config.confirmLabel ?? 'Confirm',
        cancelLabel: config.cancelLabel ?? 'Cancel',
        resolve,
      });
    });
  }, []);

  const alert = useCallback((config: Omit<DialogConfig, 'showCancel' | 'cancelLabel'>): Promise<void> => {
    return new Promise((resolve) => {
      setDialog({
        ...config,
        isOpen: true,
        showCancel: false,
        confirmLabel: config.confirmLabel ?? 'OK',
        cancelLabel: 'Cancel',
        resolve: () => resolve(),
      });
    });
  }, []);

  const handleConfirm = () => {
    dialog.resolve?.(true);
    setDialog(prev => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    dialog.resolve?.(false);
    setDialog(prev => ({ ...prev, isOpen: false }));
  };

  const config = typeConfig[dialog.type || 'info'];

  return (
    <DialogContext.Provider value={{ confirm, alert }}>
      {children}

      <AnimatePresence>
        {dialog.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={dialog.showCancel ? handleCancel : undefined}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
                    className={`flex-shrink-0 w-12 h-12 rounded-full ${config.iconBg} ${config.iconColor} flex items-center justify-center`}
                  >
                    {config.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {dialog.title}
                    </h3>
                    <p className="text-gray-600">
                      {dialog.message}
                    </p>
                  </div>

                  {/* Close button */}
                  {dialog.showCancel && (
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCancel}
                      className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                {dialog.showCancel && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    {dialog.cancelLabel}
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  disabled={dialog.loading}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2 ${
                    dialog.confirmDestructive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                  } ${dialog.loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {dialog.loading && <Loader className="w-4 h-4 animate-spin" />}
                  <span>{dialog.confirmLabel}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a ConfirmDialogProvider');
  }
  return context;
}

// Standalone confirm dialog component
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  type?: DialogType;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDestructive?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  type = 'question',
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmDestructive = false,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);
  const config = typeConfig[type];

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Confirm action failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6 pb-4">
              <div className="flex items-start space-x-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
                  className={`flex-shrink-0 w-12 h-12 rounded-full ${config.iconBg} ${config.iconColor} flex items-center justify-center`}
                >
                  {config.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600">{message}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                {cancelLabel}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={loading}
                className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2 ${
                  confirmDestructive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                } ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                <span>{confirmLabel}</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
