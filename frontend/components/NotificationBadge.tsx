'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertTriangle, Info, Clock, Trash2 } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationBadgeProps {
  count?: number;
  max?: number;
  showZero?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Simple notification badge
export default function NotificationBadge({
  count = 0,
  max = 99,
  showZero = false,
  size = 'md',
  animate = true,
  className = '',
  children,
}: NotificationBadgeProps) {
  const displayCount = count > max ? `${max}+` : count;
  const showBadge = showZero ? true : count > 0;

  const sizeStyles = {
    sm: 'min-w-4 h-4 text-[10px] -top-1 -right-1',
    md: 'min-w-5 h-5 text-xs -top-2 -right-2',
    lg: 'min-w-6 h-6 text-sm -top-2 -right-2',
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      {children}
      <AnimatePresence>
        {showBadge && (
          <motion.span
            initial={animate ? { scale: 0 } : undefined}
            animate={animate ? { scale: 1 } : undefined}
            exit={animate ? { scale: 0 } : undefined}
            transition={{ type: 'spring', stiffness: 500 }}
            className={`absolute ${sizeStyles[size]} flex items-center justify-center bg-red-500 text-white font-bold rounded-full px-1 pointer-events-none`}
          >
            {displayCount}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dot badge (no number)
interface DotBadgeProps {
  show?: boolean;
  color?: 'red' | 'green' | 'blue' | 'yellow';
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  children: React.ReactNode;
}

export function DotBadge({
  show = true,
  color = 'red',
  pulse = true,
  size = 'md',
  position = 'top-right',
  className = '',
  children,
}: DotBadgeProps) {
  const colorStyles = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
  };

  const sizeStyles = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const positionStyles = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`absolute ${positionStyles[position]} ${sizeStyles[size]} ${colorStyles[color]} rounded-full pointer-events-none`}
          >
            {pulse && (
              <motion.span
                animate={{ scale: [1, 2], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`absolute inset-0 rounded-full ${colorStyles[color]}`}
              />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// Notification dropdown panel
interface NotificationPanelProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const typeStyles: Record<NotificationType, { icon: React.ReactNode; color: string }> = {
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-green-500 bg-green-50',
  },
  error: {
    icon: <AlertTriangle className="w-5 h-5" />,
    color: 'text-red-500 bg-red-50',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    color: 'text-amber-500 bg-amber-50',
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    color: 'text-blue-500 bg-blue-50',
  },
};

export function NotificationPanel({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
}: NotificationPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span className="font-semibold">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-xs text-white/70 hover:text-white transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification, index) => {
                  const style = typeStyles[notification.type];
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${style.color}`}>
                          {style.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 text-sm">
                              {notification.title}
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(notification.id);
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-1 mt-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(notification.timestamp)}</span>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-t">
                <button
                  onClick={onClearAll}
                  className="w-full text-center text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Notification bell button with panel
interface NotificationBellProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationBell({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
      >
        <NotificationBadge count={unreadCount}>
          <Bell className="w-5 h-5" />
        </NotificationBadge>
      </motion.button>

      <NotificationPanel
        notifications={notifications}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMarkAsRead={onMarkAsRead}
        onMarkAllAsRead={onMarkAllAsRead}
        onDelete={onDelete}
        onClearAll={onClearAll}
      />
    </div>
  );
}
