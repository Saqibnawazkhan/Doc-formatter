'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, Command, X } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
  action: () => void;
}

interface KeyboardShortcutsProps {
  shortcuts: Shortcut[];
  enabled?: boolean;
}

// Keyboard Shortcuts Manager
export default function KeyboardShortcuts({ shortcuts, enabled = true }: KeyboardShortcutsProps) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Show help modal with ?
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowHelp(true);
        return;
      }

      // Check each shortcut
      shortcuts.forEach(shortcut => {
        const keys = shortcut.keys.map(k => k.toLowerCase());
        const pressedKeys: string[] = [];

        if (e.ctrlKey || e.metaKey) pressedKeys.push('ctrl');
        if (e.shiftKey) pressedKeys.push('shift');
        if (e.altKey) pressedKeys.push('alt');
        pressedKeys.push(e.key.toLowerCase());

        const match = keys.every(k => pressedKeys.includes(k)) &&
                     pressedKeys.every(k => keys.includes(k));

        if (match) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);

  return (
    <AnimatePresence>
      {showHelp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowHelp(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Keyboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Keyboard Shortcuts</h2>
                  <p className="text-white/70 text-sm">Press ? anytime to show</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowHelp(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Shortcuts List */}
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {shortcuts.map((shortcut, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-700">{shortcut.description}</span>
                  <div className="flex items-center space-x-1">
                    {shortcut.keys.map((key, i) => (
                      <React.Fragment key={i}>
                        <kbd className="px-2 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 shadow-sm">
                          {key === 'ctrl' ? (
                            <span className="flex items-center space-x-1">
                              <Command className="w-3 h-3" />
                            </span>
                          ) : key}
                        </kbd>
                        {i < shortcut.keys.length - 1 && (
                          <span className="text-gray-400 text-sm">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 text-center">
              <p className="text-sm text-gray-500">
                Press <kbd className="px-1.5 py-0.5 bg-white rounded border text-xs">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Shortcut key display component
interface ShortcutKeyProps {
  keys: string[];
  size?: 'sm' | 'md' | 'lg';
}

export function ShortcutKey({ keys, size = 'md' }: ShortcutKeyProps) {
  const sizeStyles = {
    sm: 'px-1 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <div className="flex items-center space-x-1">
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          <kbd className={`${sizeStyles[size]} bg-gray-100 text-gray-600 font-medium rounded border border-gray-200`}>
            {key === 'ctrl' ? '⌘' : key}
          </kbd>
          {i < keys.length - 1 && <span className="text-gray-400">+</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// Hook for easy shortcut registration
export function useShortcut(keys: string[], callback: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const pressedKeys: string[] = [];

      if (e.ctrlKey || e.metaKey) pressedKeys.push('ctrl');
      if (e.shiftKey) pressedKeys.push('shift');
      if (e.altKey) pressedKeys.push('alt');
      pressedKeys.push(e.key.toLowerCase());

      const targetKeys = keys.map(k => k.toLowerCase());
      const match = targetKeys.every(k => pressedKeys.includes(k)) &&
                   pressedKeys.every(k => targetKeys.includes(k));

      if (match) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, callback, enabled]);
}
