'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Loader, AlertCircle, Eye, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { getPreview, PreviewResponse } from '@/lib/api';

interface DocumentPreviewProps {
  fileId: string | null;
}

export default function DocumentPreview({ fileId }: DocumentPreviewProps) {
  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (!fileId) {
      setPreview(null);
      return;
    }

    const fetchPreview = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPreview(fileId);
        setPreview(data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to load preview');
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [fileId]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 70));

  if (!fileId) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col items-center justify-center text-gray-400 p-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
          >
            <Eye className="w-4 h-4 text-blue-500" />
          </motion.div>
        </motion.div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Document Preview</h3>
        <p className="text-gray-400 text-center">Upload a document to see a live preview of your content</p>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col items-center justify-center text-gray-500 p-6"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <FileText className="w-6 h-6 text-blue-600" />
          </motion.div>
        </div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-4 text-gray-600 font-medium"
        >
          Loading preview...
        </motion.p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-red-500 p-6"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
        >
          <AlertCircle className="w-8 h-8" />
        </motion.div>
        <p className="font-semibold text-lg mb-1">Preview Error</p>
        <p className="text-red-400 text-sm text-center">{error}</p>
      </motion.div>
    );
  }

  if (!preview) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800">Preview</h3>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomOut}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </motion.button>
          <span className="text-xs text-gray-500 font-medium w-10 text-center">{zoom}%</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomIn}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Preview Content */}
      <motion.div
        layout
        className="flex-1 overflow-auto bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-inner"
        style={{ fontSize: `${zoom}%` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={fileId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="prose max-w-none"
          >
            {preview.content.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="mb-4 text-gray-700 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 flex items-center justify-between text-xs text-gray-500"
      >
        <span className="flex items-center space-x-1">
          <FileText className="w-3 h-3" />
          <span>{preview.page_count} section(s)</span>
        </span>
        <span className="italic">Text preview - actual document may vary</span>
      </motion.div>
    </motion.div>
  );
}
