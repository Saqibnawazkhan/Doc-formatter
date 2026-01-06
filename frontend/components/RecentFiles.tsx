'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, Trash2, Download, Eye, MoreVertical, Search, Calendar } from 'lucide-react';

interface RecentFile {
  id: string;
  name: string;
  size: number;
  formattedAt: Date;
  presetUsed?: string;
  status: 'completed' | 'failed' | 'processing';
}

interface RecentFilesProps {
  files?: RecentFile[];
  maxItems?: number;
  onDownload?: (fileId: string) => void;
  onPreview?: (fileId: string) => void;
  onDelete?: (fileId: string) => void;
  onReformat?: (fileId: string) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

export default function RecentFiles({
  files = [],
  maxItems = 5,
  onDownload,
  onPreview,
  onDelete,
  onReformat,
}: RecentFilesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredFiles = files
    .filter((file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, maxItems);

  const statusColors = {
    completed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    processing: 'bg-blue-100 text-blue-700',
  };

  const statusLabels = {
    completed: 'Completed',
    failed: 'Failed',
    processing: 'Processing',
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = () => setActiveMenu(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (files.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center"
        >
          <Clock className="w-8 h-8 text-gray-400" />
        </motion.div>
        <p className="text-gray-600 font-medium">No recent files</p>
        <p className="text-gray-400 text-sm mt-1">Your formatted documents will appear here</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-800">Recent Files</h3>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
            {files.length}
          </span>
        </div>
      </div>

      {/* Search */}
      {files.length > 3 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
          />
        </div>
      )}

      {/* File List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
            >
              {/* File Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{file.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{formatFileSize(file.size)}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatTimeAgo(file.formattedAt)}
                  </span>
                  {file.presetUsed && (
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs">
                      {file.presetUsed}
                    </span>
                  )}
                </div>
              </div>

              {/* Status */}
              <span className={`px-2 py-1 text-xs font-medium rounded-lg ${statusColors[file.status]}`}>
                {statusLabels[file.status]}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1">
                {file.status === 'completed' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onPreview?.(file.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDownload?.(file.id)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  </>
                )}

                {/* More Menu */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === file.id ? null : file.id);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </motion.button>

                  <AnimatePresence>
                    {activeMenu === file.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 mt-1 py-1 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[140px] z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {onReformat && (
                          <button
                            onClick={() => {
                              onReformat(file.id);
                              setActiveMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            Reformat
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => {
                              onDelete(file.id);
                              setActiveMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More */}
      {files.length > maxItems && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
        >
          View all {files.length} files
        </motion.button>
      )}
    </div>
  );
}
