'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-blue-600 to-purple-600 text-white
    hover:from-blue-700 hover:to-purple-700
    shadow-md hover:shadow-lg
    focus:ring-blue-300
  `,
  secondary: `
    bg-gray-100 text-gray-800
    hover:bg-gray-200
    focus:ring-gray-200
  `,
  outline: `
    bg-transparent border-2 border-gray-300 text-gray-700
    hover:bg-gray-50 hover:border-gray-400
    focus:ring-gray-200
  `,
  ghost: `
    bg-transparent text-gray-700
    hover:bg-gray-100
    focus:ring-gray-200
  `,
  danger: `
    bg-gradient-to-r from-red-500 to-rose-600 text-white
    hover:from-red-600 hover:to-rose-700
    shadow-md hover:shadow-lg
    focus:ring-red-300
  `,
  success: `
    bg-gradient-to-r from-green-500 to-emerald-600 text-white
    hover:from-green-600 hover:to-emerald-700
    shadow-md hover:shadow-lg
    focus:ring-green-300
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-xs gap-1.5',
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
  xl: 'px-8 py-4 text-xl gap-3',
};

const iconSizes: Record<ButtonSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? {} : { scale: 1.02 }}
        whileTap={isDisabled ? {} : { scale: 0.98 }}
        disabled={isDisabled}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-200
          focus:outline-none focus:ring-4
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${rounded ? 'rounded-full' : 'rounded-xl'}
          ${fullWidth ? 'w-full' : ''}
          ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader className={iconSizes[size]} />
          </motion.span>
        )}

        {/* Left Icon */}
        {!loading && leftIcon && (
          <span className={iconSizes[size]}>{leftIcon}</span>
        )}

        {/* Button Text */}
        <span>{loading && loadingText ? loadingText : children}</span>

        {/* Right Icon */}
        {!loading && rightIcon && (
          <span className={iconSizes[size]}>{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

// Icon Button Component
interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  icon: React.ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  rounded?: boolean;
  'aria-label': string;
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  loading = false,
  rounded = true,
  disabled,
  className = '',
  ...props
}: IconButtonProps) {
  const isDisabled = disabled || loading;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      whileHover={isDisabled ? {} : { scale: 1.1 }}
      whileTap={isDisabled ? {} : { scale: 0.9 }}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center
        transition-all duration-200
        focus:outline-none focus:ring-4
        ${variantStyles[variant]}
        ${sizeClasses[size]}
        ${rounded ? 'rounded-full' : 'rounded-xl'}
        ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader className={iconClasses[size]} />
        </motion.span>
      ) : (
        <span className={iconClasses[size]}>{icon}</span>
      )}
    </motion.button>
  );
}

// Button Group Component
interface ButtonGroupProps {
  children: React.ReactNode;
  attached?: boolean;
  vertical?: boolean;
}

export function ButtonGroup({ children, attached = false, vertical = false }: ButtonGroupProps) {
  return (
    <div
      className={`
        inline-flex
        ${vertical ? 'flex-col' : 'flex-row'}
        ${attached ? (vertical ? 'divide-y divide-gray-300' : 'divide-x divide-gray-300') : 'gap-2'}
      `}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && attached) {
          return React.cloneElement(child as React.ReactElement<any>, {
            className: `
              ${(child.props as any).className || ''}
              ${!vertical
                ? index === 0
                  ? 'rounded-r-none'
                  : index === React.Children.count(children) - 1
                    ? 'rounded-l-none'
                    : 'rounded-none'
                : index === 0
                  ? 'rounded-b-none'
                  : index === React.Children.count(children) - 1
                    ? 'rounded-t-none'
                    : 'rounded-none'
              }
            `,
          });
        }
        return child;
      })}
    </div>
  );
}

// Floating Button Component
interface FloatingButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  icon: React.ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  pulse?: boolean;
}

export function FloatingButton({
  icon,
  position = 'bottom-right',
  pulse = true,
  className = '',
  ...props
}: FloatingButtonProps) {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {pulse && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-blue-500 rounded-full"
        />
      )}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          relative w-14 h-14 rounded-full
          bg-gradient-to-r from-blue-600 to-purple-600
          text-white shadow-xl hover:shadow-2xl
          flex items-center justify-center
          transition-shadow duration-300
          ${className}
        `}
        {...props}
      >
        {icon}
      </motion.button>
    </div>
  );
}
