'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  className = '',
  variant = 'default',
  hoverable = false,
  clickable = false,
  onClick,
  padding = 'md',
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-xl border-0';
      case 'outlined':
        return 'bg-white border-2 border-gray-200 shadow-none';
      case 'gradient':
        return 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg';
      default:
        return 'bg-white border border-gray-200 shadow-md';
    }
  };

  return (
    <motion.div
      whileHover={hoverable ? { y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' } : {}}
      whileTap={clickable ? { scale: 0.98 } : {}}
      onClick={clickable ? onClick : undefined}
      className={`
        rounded-2xl overflow-hidden transition-all duration-300
        ${getVariantStyles()}
        ${paddingStyles[padding]}
        ${hoverable ? 'hover:shadow-xl' : ''}
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

// Card Header Component
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, icon, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon && (
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md"
          >
            {icon}
          </motion.div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// Card Body Component
interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`${className}`}>{children}</div>;
}

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  separator?: boolean;
}

export function CardFooter({ children, className = '', separator = true }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 ${separator ? 'border-t border-gray-100' : ''} ${className}`}>
      {children}
    </div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  onClick?: () => void;
}

export function FeatureCard({
  icon,
  title,
  description,
  color = 'from-blue-500 to-purple-500',
  onClick,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        bg-white p-6 rounded-2xl border border-gray-200 shadow-md
        hover:shadow-xl transition-all duration-300 cursor-pointer
      `}
    >
      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.3 }}
        className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-4`}
      >
        {icon}
      </motion.div>
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Stats Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  change?: { value: number; positive: boolean };
  icon?: React.ReactNode;
  color?: string;
}

export function StatCard({
  label,
  value,
  change,
  icon,
  color = 'from-blue-500 to-blue-600',
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white p-5 rounded-2xl border border-gray-200 shadow-md"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {icon && (
          <div className={`w-8 h-8 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-white`}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <motion.span
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold text-gray-900"
        >
          {value}
        </motion.span>
        {change && (
          <span
            className={`text-sm font-medium ${
              change.positive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change.positive ? '+' : ''}{change.value}%
          </span>
        )}
      </div>
    </motion.div>
  );
}

// Action Card with dropdown menu
interface ActionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: { label: string; onClick: () => void }[];
  children?: React.ReactNode;
}

export function ActionCard({ title, description, icon, actions, children }: ActionCardProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-md relative">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
        </div>
        {actions && actions.length > 0 && (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 mt-1 py-1 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[120px] z-10"
              >
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {action.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
