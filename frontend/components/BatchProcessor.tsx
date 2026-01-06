'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  FileText,
  X,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Loader,
  Download,
  Trash2,
  FolderOpen,
} from 'lucide-react';

type FileStatus = 'pending' | 'processing' | 'completed' | 'failed';

interface BatchFile {
  id: string;
  file: File;
  status: FileStatus;
  progress: number;
  error?: string;
  resultId?: string;
}

interface BatchProcessorProps {
  onProcess?: (files: File[]) => Promise<void>;
  onDownloadAll?: (fileIds: string[]) => void;
  maxFiles?: number;
}

export default function BatchProcessor({
  onProcess,
  onDownloadAll,
  maxFiles = 10,
}: BatchProcessorProps) {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, maxFiles - files.length).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        status: 'pending' as FileStatus,
        progress: 0,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    },
    [files.length, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles,
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
    setIsProcessing(false);
    setIsPaused(false);
  };

  const startProcessing = async () => {
    setIsProcessing(true);
    setIsPaused(false);

    for (const batchFile of files.filter((f) => f.status === 'pending')) {
      if (isPaused) break;

      setFiles((prev) =>
        prev.map((f) =>
          f.id === batchFile.id ? { ...f, status: 'processing' as FileStatus, progress: 0 } : f
        )
      );

      // Simulate processing with progress
      for (let i = 0; i <= 100; i += 10) {
        if (isPaused) break;
        await new Promise((resolve) => setTimeout(resolve, 200));
        setFiles((prev) =>
          prev.map((f) => (f.id === batchFile.id ? { ...f, progress: i } : f))
        );
      }

      // Mark as completed (or failed randomly for demo)
      const success = Math.random() > 0.1;
      setFiles((prev) =>
        prev.map((f) =>
          f.id === batchFile.id
            ? {
                ...f,
                status: success ? ('completed' as FileStatus) : ('failed' as FileStatus),
                progress: 100,
                error: success ? undefined : 'Processing failed',
                resultId: success ? `result-${f.id}` : undefined,
              }
            : f
        )
      );
    }

    setIsProcessing(false);
  };

  const pauseProcessing = () => {
    setIsPaused(true);
  };

  const completedFiles = files.filter((f) => f.status === 'completed');
  const pendingFiles = files.filter((f) => f.status === 'pending');
  const processingFile = files.find((f) => f.status === 'processing');

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-blue-600" />
            Batch Processing
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Format multiple documents at once (up to {maxFiles} files)
          </p>
        </div>
        {files.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {completedFiles.length}/{files.length} completed
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAll}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Dropzone */}
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: files.length >= maxFiles ? 1 : 1.01 }}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${files.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        </motion.div>
        <p className="text-gray-600 font-medium">
          {isDragActive ? 'Drop files here' : 'Drag & drop multiple .docx files'}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          or click to browse ({files.length}/{maxFiles} files)
        </p>
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {files.map((batchFile, index) => (
              <motion.div
                key={batchFile.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl"
              >
                {/* Status Icon */}
                <motion.div
                  animate={batchFile.status === 'processing' ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: batchFile.status === 'processing' ? Infinity : 0, ease: 'linear' }}
                >
                  {getStatusIcon(batchFile.status)}
                </motion.div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{batchFile.file.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatFileSize(batchFile.file.size)}</span>
                    {batchFile.error && (
                      <span className="text-red-500">{batchFile.error}</span>
                    )}
                  </div>
                </div>

                {/* Progress */}
                {batchFile.status === 'processing' && (
                  <div className="w-32">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${batchFile.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">{batchFile.progress}%</p>
                  </div>
                )}

                {/* Actions */}
                {batchFile.status === 'pending' && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFile(batchFile.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}

                {batchFile.status === 'completed' && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Actions */}
      {files.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {pendingFiles.length > 0 && `${pendingFiles.length} files ready to process`}
            {processingFile && ` Processing: ${processingFile.file.name}`}
          </div>
          <div className="flex items-center gap-3">
            {completedFiles.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDownloadAll?.(completedFiles.map((f) => f.resultId!))}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 font-medium"
              >
                <Download className="w-4 h-4" />
                Download All ({completedFiles.length})
              </motion.button>
            )}
            {pendingFiles.length > 0 && (
              <>
                {isProcessing ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={pauseProcessing}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-2 font-medium"
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startProcessing}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 font-medium"
                  >
                    <Play className="w-4 h-4" />
                    Process All
                  </motion.button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
