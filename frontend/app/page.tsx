'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Wand2, Loader, RefreshCw, Sparkles, CheckCircle,
  Settings, HelpCircle, History, Zap, FileText, Star
} from 'lucide-react';
import {
  Header, FileUpload, FormattingOptions, DocumentPreview,
  ToastProvider, useToast, ProgressSteps, FloatingActionButton,
  Tooltip, Modal
} from '@/components';
import QuickPresets from '@/components/QuickPresets';
import SettingsPanel from '@/components/SettingsPanel';
import HelpPanel from '@/components/HelpPanel';
import RecentFiles from '@/components/RecentFiles';
import {
  UploadResponse,
  FormattingOptions as FormattingOptionsType,
  formatDocument,
  downloadDocument,
} from '@/lib/api';

// Main content wrapped with Toast context
function HomeContent() {
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
  const [formattedFileId, setFormattedFileId] = useState<string | null>(null);
  const [formatting, setFormatting] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [formattingOptions, setFormattingOptions] = useState<FormattingOptionsType>({});
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [recentFiles, setRecentFiles] = useState<any[]>([]);
  const { addToast } = useToast();

  // Current step for progress indicator
  const currentStep = !uploadedFile ? 0 : !formattedFileId ? 1 : 2;

  const steps = [
    { label: 'Upload', description: 'Upload your document' },
    { label: 'Format', description: 'Choose formatting options' },
    { label: 'Download', description: 'Get your formatted file' },
  ];

  // Load recent files from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('word-formatter-recent-files');
    if (saved) {
      try {
        setRecentFiles(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent files');
      }
    }
  }, []);

  // Save to recent files
  const saveToRecent = (file: UploadResponse) => {
    const newFile = {
      id: file.file_id,
      name: file.filename,
      date: new Date().toISOString(),
      size: file.size,
    };
    const updated = [newFile, ...recentFiles.filter(f => f.id !== file.file_id)].slice(0, 10);
    setRecentFiles(updated);
    localStorage.setItem('word-formatter-recent-files', JSON.stringify(updated));
  };

  const handleUploadSuccess = (response: UploadResponse) => {
    setUploadedFile(response);
    setFormattedFileId(null);
    setFormatError(null);
    saveToRecent(response);
    addToast({
      type: 'success',
      title: 'Upload Successful',
      message: `${response.filename} is ready for formatting`,
      duration: 4000,
    });
  };

  const handleUploadError = (error: string) => {
    addToast({
      type: 'error',
      title: 'Upload Failed',
      message: error,
      duration: 5000,
    });
  };

  const handleFormat = async () => {
    if (!uploadedFile) return;

    setFormatting(true);
    setFormatError(null);

    try {
      const response = await formatDocument(uploadedFile.file_id, formattingOptions);
      setFormattedFileId(response.file_id);
      addToast({
        type: 'success',
        title: 'Formatting Complete',
        message: 'Your document has been formatted successfully!',
        duration: 4000,
      });
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Failed to format document';
      setFormatError(errorMsg);
      addToast({
        type: 'error',
        title: 'Formatting Failed',
        message: errorMsg,
        duration: 5000,
      });
    } finally {
      setFormatting(false);
    }
  };

  const handleDownload = () => {
    if (!formattedFileId) return;
    const downloadUrl = downloadDocument(formattedFileId);
    window.open(downloadUrl, '_blank');
    addToast({
      type: 'info',
      title: 'Download Started',
      message: 'Your document is being downloaded',
      duration: 3000,
    });
  };

  const handleReset = () => {
    setUploadedFile(null);
    setFormattedFileId(null);
    setFormatError(null);
    setFormattingOptions({});
    setSelectedPreset(null);
    addToast({
      type: 'info',
      title: 'Reset Complete',
      message: 'Ready for a new document',
      duration: 2000,
    });
  };

  const handlePresetSelect = (options: FormattingOptionsType) => {
    setFormattingOptions(options);
    setSelectedPreset('custom');
    addToast({
      type: 'success',
      title: 'Preset Applied',
      message: 'Formatting options updated',
      duration: 2000,
    });
  };

  const floatingActions = [
    { icon: Settings, label: 'Settings', onClick: () => setShowSettings(true) },
    { icon: HelpCircle, label: 'Help', onClick: () => setShowHelp(true) },
    { icon: History, label: 'Recent Files', onClick: () => setShowHistory(true) },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Zap className="w-4 h-4" />
            <span>Fast & Professional Document Formatting</span>
            <Star className="w-4 h-4 text-yellow-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Format Your Documents{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Professionally
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your Word document, choose a style, and get a perfectly formatted document in seconds.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <ProgressSteps steps={steps} currentStep={currentStep} />
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
                  <motion.div
                    animate={currentStep === 0 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${
                      currentStep >= 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Upload Document</h2>
                    <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                  </div>
                </div>
                {uploadedFile && (
                  <Tooltip content="Start over with a new document">
                    <motion.button
                      whileHover={{ scale: 1.05, rotate: 180 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-2 rounded-xl hover:bg-red-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset</span>
                    </motion.button>
                  </Tooltip>
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
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
                <motion.div
                  animate={currentStep === 1 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${
                    currentStep >= 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <Wand2 className="w-5 h-5" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Customize Formatting</h2>
                  <p className="text-sm text-gray-500">Fine-tune your document style</p>
                </div>
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
                <motion.div
                  animate={currentStep === 2 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${
                    currentStep >= 2 ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gray-300'
                  }`}
                >
                  <Download className="w-5 h-5" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Format & Download</h2>
                  <p className="text-sm text-gray-500">Process and download your document</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Tooltip content={!uploadedFile ? 'Upload a document first' : 'Apply formatting to your document'}>
                  <motion.button
                    whileHover={{ scale: uploadedFile && !formatting ? 1.02 : 1 }}
                    whileTap={{ scale: uploadedFile && !formatting ? 0.98 : 1 }}
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
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </motion.button>
                </Tooltip>

                <AnimatePresence>
                  {formattedFileId && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -20 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Document</span>
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {formatError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center space-x-2"
                  >
                    <span>{formatError}</span>
                  </motion.div>
                )}

                {formattedFileId && !formatError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-green-700 flex items-center space-x-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </motion.div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              Word Document Formatter - Format your documents professionally
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <button
                onClick={() => setShowHelp(true)}
                className="hover:text-blue-600 transition-colors"
              >
                Help
              </button>
              <span>•</span>
              <button
                onClick={() => setShowSettings(true)}
                className="hover:text-blue-600 transition-colors"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton actions={floatingActions} />

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
        size="lg"
      >
        <SettingsPanel />
      </Modal>

      {/* Help Modal */}
      <Modal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title="Help Center"
        size="lg"
      >
        <HelpPanel />
      </Modal>

      {/* Recent Files Modal */}
      <Modal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        title="Recent Files"
        size="md"
      >
        <RecentFiles
          files={recentFiles}
          onSelectFile={(file) => {
            setShowHistory(false);
            addToast({
              type: 'info',
              title: 'File Selected',
              message: `Loading ${file.name}...`,
              duration: 2000,
            });
          }}
          onDeleteFile={(id) => {
            const updated = recentFiles.filter(f => f.id !== id);
            setRecentFiles(updated);
            localStorage.setItem('word-formatter-recent-files', JSON.stringify(updated));
          }}
        />
      </Modal>
    </div>
  );
}

// Wrap with ToastProvider
export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}
