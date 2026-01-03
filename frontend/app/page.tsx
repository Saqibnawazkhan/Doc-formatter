'use client';

import React, { useState } from 'react';
import { Download, Wand2, Loader, RefreshCw } from 'lucide-react';
import { Header, FileUpload, FormattingOptions, DocumentPreview } from '@/components';
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
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <section className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  1. Upload Document
                </h2>
                {uploadedFile && (
                  <button
                    onClick={handleReset}
                    className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
              <FileUpload
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
              />
            </section>

            {/* Formatting Options Section */}
            <section className="card">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                2. Select Formatting Options
              </h2>
              <FormattingOptions
                options={formattingOptions}
                onChange={setFormattingOptions}
              />
            </section>

            {/* Format Button */}
            <section className="card">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                3. Format & Download
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleFormat}
                  disabled={!uploadedFile || formatting}
                  className="btn-primary flex items-center justify-center space-x-2 py-3 px-6"
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
                    </>
                  )}
                </button>

                {formattedFileId && (
                  <button
                    onClick={handleDownload}
                    className="btn-secondary flex items-center justify-center space-x-2 py-3 px-6 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Formatted Document</span>
                  </button>
                )}
              </div>

              {formatError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {formatError}
                </div>
              )}

              {formattedFileId && !formatError && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Document formatted successfully! Click the download button to get your file.
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-1">
            <section className="card h-[600px] sticky top-8">
              <DocumentPreview fileId={formattedFileId || uploadedFile?.file_id || null} />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>Word Document Formatter - Format your documents professionally</p>
        </div>
      </footer>
    </div>
  );
}
