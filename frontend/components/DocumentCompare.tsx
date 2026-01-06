'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftRight,
  FileText,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';

interface DocumentCompareProps {
  originalContent: string;
  formattedContent: string;
  originalTitle?: string;
  formattedTitle?: string;
}

export default function DocumentCompare({
  originalContent,
  formattedContent,
  originalTitle = 'Original Document',
  formattedTitle = 'Formatted Document',
}: DocumentCompareProps) {
  const [viewMode, setViewMode] = useState<'split' | 'overlay' | 'slider'>('split');
  const [zoom, setZoom] = useState(100);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showDifferences, setShowDifferences] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 70));

  const originalParagraphs = originalContent.split('\n\n').filter(Boolean);
  const formattedParagraphs = formattedContent.split('\n\n').filter(Boolean);

  return (
    <motion.div
      layout
      className={`bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden ${
        fullscreen ? 'fixed inset-4 z-50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Document Comparison</h3>
            <p className="text-sm text-gray-500">Compare original and formatted versions</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'split', label: 'Split' },
              { id: 'slider', label: 'Slider' },
              { id: 'overlay', label: 'Overlay' },
            ].map((mode) => (
              <motion.button
                key={mode.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setViewMode(mode.id as any)}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                  ${viewMode === mode.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                  }
                `}
              >
                {mode.label}
              </motion.button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomOut}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded"
            >
              <ZoomOut className="w-4 h-4" />
            </motion.button>
            <span className="text-xs text-gray-600 w-10 text-center">{zoom}%</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomIn}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded"
            >
              <ZoomIn className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Show Differences Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDifferences(!showDifferences)}
            className={`
              p-2 rounded-lg transition-colors
              ${showDifferences
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-500'
              }
            `}
            title={showDifferences ? 'Hide differences' : 'Show differences'}
          >
            {showDifferences ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </motion.button>

          {/* Fullscreen Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg"
          >
            {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative" style={{ height: fullscreen ? 'calc(100vh - 200px)' : '500px' }}>
        <AnimatePresence mode="wait">
          {/* Split View */}
          {viewMode === 'split' && (
            <motion.div
              key="split"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full"
            >
              {/* Original Document */}
              <div className="flex-1 border-r border-gray-200 overflow-auto">
                <div className="sticky top-0 bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{originalTitle}</span>
                </div>
                <div className="p-6" style={{ fontSize: `${zoom}%` }}>
                  {originalParagraphs.map((para, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`mb-4 leading-relaxed ${
                        showDifferences && para !== formattedParagraphs[index]
                          ? 'bg-red-50 border-l-4 border-red-300 pl-3 -ml-3'
                          : ''
                      }`}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* Formatted Document */}
              <div className="flex-1 overflow-auto">
                <div className="sticky top-0 bg-blue-50 px-4 py-2 border-b border-blue-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700">{formattedTitle}</span>
                </div>
                <div className="p-6" style={{ fontSize: `${zoom}%` }}>
                  {formattedParagraphs.map((para, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`mb-4 leading-relaxed ${
                        showDifferences && para !== originalParagraphs[index]
                          ? 'bg-green-50 border-l-4 border-green-300 pl-3 -ml-3'
                          : ''
                      }`}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Slider View */}
          {viewMode === 'slider' && (
            <motion.div
              key="slider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full"
            >
              {/* Original (Left Side) */}
              <div className="absolute inset-0 overflow-auto" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                <div className="p-6" style={{ fontSize: `${zoom}%` }}>
                  <div className="text-sm font-medium text-gray-500 mb-4">{originalTitle}</div>
                  {originalParagraphs.map((para, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-gray-600">{para}</p>
                  ))}
                </div>
              </div>

              {/* Formatted (Right Side) */}
              <div className="absolute inset-0 overflow-auto" style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}>
                <div className="p-6 bg-blue-50/30" style={{ fontSize: `${zoom}%` }}>
                  <div className="text-sm font-medium text-blue-600 mb-4">{formattedTitle}</div>
                  {formattedParagraphs.map((para, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-gray-700">{para}</p>
                  ))}
                </div>
              </div>

              {/* Slider Handle */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                onDrag={(_, info) => {
                  const container = info.point.x;
                  const containerWidth = window.innerWidth;
                  const newPosition = Math.max(10, Math.min(90, (container / containerWidth) * 100));
                  setSliderPosition(newPosition);
                }}
                style={{ left: `${sliderPosition}%` }}
                className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize z-10 group"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ChevronLeft className="w-4 h-4 text-blue-500 -ml-0.5" />
                  <ChevronRight className="w-4 h-4 text-blue-500 -mr-0.5" />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Overlay View */}
          {viewMode === 'overlay' && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-auto p-6"
              style={{ fontSize: `${zoom}%` }}
            >
              {formattedParagraphs.map((para, index) => {
                const originalPara = originalParagraphs[index];
                const isDifferent = originalPara !== para;

                return (
                  <div key={index} className="mb-6">
                    {isDifferent && originalPara && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        className="mb-2 text-gray-400 line-through"
                      >
                        {originalPara}
                      </motion.p>
                    )}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`leading-relaxed ${isDifferent ? 'text-green-700 bg-green-50 p-2 rounded-lg -m-2' : ''}`}
                    >
                      {para}
                    </motion.p>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span>Original: {originalParagraphs.length} paragraphs</span>
          <span>Formatted: {formattedParagraphs.length} paragraphs</span>
        </div>
        {showDifferences && (
          <span className="text-blue-600">
            {formattedParagraphs.filter((p, i) => p !== originalParagraphs[i]).length} changes detected
          </span>
        )}
      </div>
    </motion.div>
  );
}
