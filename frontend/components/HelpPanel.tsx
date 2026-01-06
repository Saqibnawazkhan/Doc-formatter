'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  X,
  Upload,
  Wand2,
  Download,
  BookOpen,
  Lightbulb,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Play,
} from 'lucide-react';

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour?: () => void;
}

const faqs = [
  {
    question: 'What file formats are supported?',
    answer: 'Currently, we support .docx (Microsoft Word) files. PDF support is coming soon.',
  },
  {
    question: 'What is the maximum file size?',
    answer: 'The maximum file size is 50MB per document.',
  },
  {
    question: 'Are my documents stored on your servers?',
    answer: 'No, all processing is done locally. Your documents are automatically deleted after formatting is complete.',
  },
  {
    question: 'Can I use custom fonts?',
    answer: 'We support a wide range of common fonts. Custom font support is planned for a future release.',
  },
  {
    question: 'How do I format multiple documents?',
    answer: 'Use the Batch Processing feature to format up to 10 documents at once.',
  },
];

const steps = [
  {
    icon: <Upload className="w-6 h-6" />,
    title: 'Upload Your Document',
    description: 'Drag and drop or click to upload your .docx file',
  },
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: 'Choose Your Style',
    description: 'Select a preset or customize formatting options',
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Download Result',
    description: 'Get your professionally formatted document instantly',
  },
];

const tips = [
  'Use Quick Presets for one-click formatting',
  'Preview your document before downloading',
  'Batch process multiple files at once',
  'Save your favorite formatting settings',
  'Use keyboard shortcuts for faster workflow',
];

export default function HelpPanel({ isOpen, onClose, onStartTour }: HelpPanelProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'tips'>('guide');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Help Center</h2>
                    <p className="text-sm text-blue-100">Learn how to use Word Formatter</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Start Tour Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartTour}
                className="w-full py-3 bg-white text-blue-600 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg"
              >
                <Play className="w-5 h-5" />
                Start Interactive Tour
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'guide', label: 'Guide', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'faq', label: 'FAQ', icon: <MessageCircle className="w-4 h-4" /> },
                { id: 'tips', label: 'Tips', icon: <Lightbulb className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors
                    ${activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }
                  `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'guide' && (
                  <motion.div
                    key="guide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">How It Works</h3>
                    <div className="space-y-4">
                      {steps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md">
                            {step.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <h4 className="font-semibold text-gray-800">{step.title}</h4>
                            </div>
                            <p className="text-gray-600 mt-1">{step.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Video Tutorial Link */}
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      href="#"
                      className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Play className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-purple-800">Watch Video Tutorial</p>
                            <p className="text-sm text-purple-600">2 minutes</p>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-purple-400" />
                      </div>
                    </motion.a>
                  </motion.div>
                )}

                {activeTab === 'faq' && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3"
                  >
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-800">{faq.question}</span>
                          <motion.div
                            animate={{ rotate: expandedFaq === index ? 90 : 0 }}
                            className="text-gray-400"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 text-gray-600 border-t border-gray-100 pt-3">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'tips' && (
                  <motion.div
                    key="tips"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">Pro Tips</h3>
                    {tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl"
                      >
                        <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{tip}</p>
                      </motion.div>
                    ))}

                    {/* Keyboard Shortcuts */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Keyboard Shortcuts</h4>
                      <div className="space-y-2 bg-gray-50 rounded-xl p-4">
                        {[
                          { keys: 'Ctrl + U', action: 'Upload file' },
                          { keys: 'Ctrl + Enter', action: 'Format document' },
                          { keys: 'Ctrl + D', action: 'Download result' },
                          { keys: 'Esc', action: 'Close panels' },
                        ].map((shortcut, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-600">{shortcut.action}</span>
                            <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono text-gray-800">
                              {shortcut.keys}
                            </kbd>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Need more help?{' '}
                  <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
