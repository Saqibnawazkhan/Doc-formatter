'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underlined' | 'boxed';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: React.ReactNode;
}

interface TabPanelProps {
  tabId: string;
  activeTab: string;
  children: React.ReactNode;
}

export function TabPanel({ tabId, activeTab, children }: TabPanelProps) {
  if (tabId !== activeTab) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export default function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  children,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tab: Tab) => {
    if (tab.disabled) return;
    setActiveTab(tab.id);
    onChange?.(tab.id);
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
  };

  const getVariantStyles = (tab: Tab, isActive: boolean) => {
    const baseStyles = `
      relative flex items-center gap-2 font-medium transition-all duration-200
      ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${sizeStyles[size]}
      ${fullWidth ? 'flex-1 justify-center' : ''}
    `;

    switch (variant) {
      case 'pills':
        return `${baseStyles} rounded-full ${
          isActive
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100'
        }`;
      case 'underlined':
        return `${baseStyles} border-b-2 ${
          isActive
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
        }`;
      case 'boxed':
        return `${baseStyles} border ${
          isActive
            ? 'bg-white border-gray-200 text-gray-900 shadow-sm -mb-px'
            : 'bg-gray-50 border-transparent text-gray-600 hover:text-gray-800'
        }`;
      default:
        return `${baseStyles} rounded-lg ${
          isActive
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`;
    }
  };

  const getContainerStyles = () => {
    switch (variant) {
      case 'pills':
        return 'bg-gray-100 p-1 rounded-full';
      case 'underlined':
        return 'border-b border-gray-200';
      case 'boxed':
        return 'bg-gray-50 border-b border-gray-200';
      default:
        return 'bg-gray-100 p-1 rounded-xl';
    }
  };

  return (
    <div>
      {/* Tab List */}
      <div className={`flex ${fullWidth ? '' : 'inline-flex'} ${getContainerStyles()}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab)}
              disabled={tab.disabled}
              className={getVariantStyles(tab, isActive)}
              whileHover={{ scale: tab.disabled ? 1 : 1.02 }}
              whileTap={{ scale: tab.disabled ? 1 : 0.98 }}
            >
              {/* Active Indicator for default variant */}
              {variant === 'default' && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Tab Content */}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`
                      px-1.5 py-0.5 text-xs font-bold rounded-full
                      ${isActive
                        ? variant === 'pills' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </span>

              {/* Underline indicator */}
              {variant === 'underlined' && isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      {children && (
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {React.Children.map(children, (child) => {
              if (React.isValidElement<TabPanelProps>(child)) {
                return React.cloneElement(child, { activeTab });
              }
              return child;
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// Vertical Tabs Component
interface VerticalTabsProps extends Omit<TabsProps, 'variant' | 'fullWidth'> {
  children?: React.ReactNode;
}

export function VerticalTabs({ tabs, defaultTab, onChange, size = 'md', children }: VerticalTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tab: Tab) => {
    if (tab.disabled) return;
    setActiveTab(tab.id);
    onChange?.(tab.id);
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-3',
    lg: 'text-lg px-5 py-4',
  };

  return (
    <div className="flex gap-4">
      {/* Tab List */}
      <div className="flex flex-col w-48 flex-shrink-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab)}
              disabled={tab.disabled}
              className={`
                relative flex items-center gap-2 font-medium text-left rounded-lg transition-all
                ${sizeStyles[size]}
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }
              `}
              whileHover={{ x: tab.disabled ? 0 : 2 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="verticalActiveTab"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`
                  ml-auto px-2 py-0.5 text-xs font-bold rounded-full
                  ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}
                `}>
                  {tab.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      {children && (
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {React.Children.map(children, (child) => {
              if (React.isValidElement<TabPanelProps>(child)) {
                return React.cloneElement(child, { activeTab });
              }
              return child;
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
