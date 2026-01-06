'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
  copied: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      copied: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  copyErrorDetails = async () => {
    const { error, errorInfo } = this.state;
    const details = `
Error: ${error?.message}
Stack: ${error?.stack}
Component Stack: ${errorInfo?.componentStack}
    `.trim();

    try {
      await navigator.clipboard.writeText(details);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  render() {
    const { hasError, error, errorInfo, showDetails, copied } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
                className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
              >
                <AlertTriangle className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h1>
              <p className="text-white/80">Don't worry, we're on it. Try refreshing or go back home.</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Error message */}
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Bug className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-red-700">Error Message</p>
                    <p className="text-sm text-red-600 mt-1">{error?.message || 'An unexpected error occurred'}</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleRetry}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Try Again</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleGoHome}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Go Home</span>
                </motion.button>
              </div>

              {/* Technical details toggle */}
              <button
                onClick={this.toggleDetails}
                className="w-full flex items-center justify-between py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <span>Technical Details</span>
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Technical details */}
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <div className="relative">
                    <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl text-xs overflow-x-auto max-h-48 overflow-y-auto">
                      <code>
                        {`Error: ${error?.message}\n\n`}
                        {`Stack Trace:\n${error?.stack}\n\n`}
                        {errorInfo?.componentStack && `Component Stack:\n${errorInfo.componentStack}`}
                      </code>
                    </pre>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={this.copyErrorDetails}
                      className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      title="Copy error details"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-300" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t text-center">
              <p className="text-sm text-gray-500">
                If this problem persists, please{' '}
                <a
                  href="https://github.com/Saqibnawazkhan/Doc-formatter/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  report an issue
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return children;
  }
}

// Functional wrapper with hook support
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-700">Something went wrong</h3>
          <p className="text-sm text-red-600 mt-1">{error.message}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetErrorBoundary}
            className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Try again
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Simple inline error display
interface InlineErrorProps {
  message: string;
  onRetry?: () => void;
}

export function InlineError({ message, onRetry }: InlineErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
    >
      <div className="flex items-center space-x-2 text-red-700">
        <AlertTriangle className="w-4 h-4" />
        <span className="text-sm">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="p-1 text-red-600 hover:text-red-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}
