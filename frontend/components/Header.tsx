'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Github, HelpCircle } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(79, 70, 229, 0.4)',
                  '0 0 0 10px rgba(79, 70, 229, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl"
            >
              <FileText className="w-6 h-6 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Word Formatter
              </h1>
              <p className="text-xs text-gray-500">Professional document formatting</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium rounded-lg hover:bg-blue-50"
            >
              <HelpCircle className="w-4 h-4" />
              <span>How it works</span>
            </motion.a>
            <motion.a
              href="https://github.com/Saqibnawazkhan/Doc-formatter"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium rounded-lg hover:bg-gray-100"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              Get Started
            </motion.button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
