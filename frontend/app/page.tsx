'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Wand2, Loader, RefreshCw, Sparkles, CheckCircle } from 'lucide-react';
import { Header, FileUpload, FormattingOptions, DocumentPreview } from '@/components';
import QuickPresets from '@/components/QuickPresets';
import {
  UploadResponse,
  FormattingOptions as FormattingOptionsType,
  formatDocument,
  downloadDocument,
} from '@/lib/api';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
  const [formattedFileId, setFormattedFileId] = useState<string | null>(null);
  const [formatting, setFormatting] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [formattingOptions, setFormattingOptions] = useState<FormattingOptionsType>({});
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handleUploadSuccess = (response: UploadResponse) => {
    setUploadedFile(response);
    setFormattedFileId(null);
    setFormatError(null);
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
  };

  const handleFormat = async () => {
    if (!uploadedFile) return;

    setFormatting(true);
    setFormatError(null);

    try {
      const response = await formatDocument(uploadedFile.file_id, formattingOptions);
      setFormattedFileId(response.file_id);
    } catch (error: any) {
      setFormatError(error.response?.data?.detail || 'Failed to format document');
    } finally {
      setFormatting(false);
    }
  };

  const handleDownload = () => {
    if (!formattedFileId) return;
    const downloadUrl = downloadDocument(formattedFileId);
    window.open(downloadUrl, '_blank');
  };

  const handleReset = () => {
    setUploadedFile(null);
    setFormattedFileId(null);
    setFormatError(null);
    setFormattingOptions({});
    setSelectedPreset(null);
  };

  const handlePresetSelect = (options: FormattingOptionsType) => {
    setFormattingOptions(options);
    // Find which preset was selected
    const presetId = Object.keys(options).length > 0 ? 'custom' : null;
    setSelectedPreset(presetId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Format Your Documents <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Professionally</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your Word document, choose a style, and get a perfectly formatted document in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Upload Document</h2>
                </div>
                {uploadedFile && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-1 rounded-full hover:bg-red-50"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </motion.button>
                )}
              </div>
              <FileUpload
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
              />
            </motion.section>

            {/* Quick Presets Section */}
            <AnimatePresence>
              {uploadedFile && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="card bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-6 overflow-hidden"
                >
                  <QuickPresets
                    onSelectPreset={handlePresetSelect}
                    selectedPreset={selectedPreset}
                  />
                </motion.section>
              )}
            </AnimatePresence>

            {/* Formatting Options Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Customize Formatting</h2>
              </div>
              <FormattingOptions
                options={formattingOptions}
                onChange={setFormattingOptions}
              />
            </motion.section>

            {/* Format Button */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Format & Download</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFormat}
                  disabled={!uploadedFile || formatting}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {formatting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Formatting...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      <span>Format Document</span>
                      <Sparkles className="w-4 h-4 ml-1" />
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {formattedFileId && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Document</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {formatError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center space-x-2"
                  >
                    <span>{formatError}</span>
                  </motion.div>
                )}

                {formattedFileId && !formatError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-green-700 flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-semibold">Document formatted successfully!</p>
                      <p className="text-sm">Click the download button to get your file.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          </div>

          {/* Right Column - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <section className="card h-[600px] sticky top-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl overflow-hidden">
              <DocumentPreview fileId={formattedFileId || uploadedFile?.file_id || null} />
            </section>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>Word Document Formatter - Format your documents professionally</p>
        </div>
      </footer>
    </div>
  );
}
