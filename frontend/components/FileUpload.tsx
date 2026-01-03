'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { cn, formatFileSize, validateFileType, validateFileSize } from '@/lib/utils';
import { uploadDocument, UploadResponse } from '@/lib/api';

interface FileUploadProps {
  onUploadSuccess: (response: UploadResponse) => void;
  onUploadError: (error: string) => void;
}

export default function FileUpload({ onUploadSuccess, onUploadError }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      if (!selectedFile) return;

      // Validate file type
      if (!validateFileType(selectedFile)) {
        setErrorMessage('Invalid file type. Please upload a .docx file.');
        setUploadStatus('error');
        onUploadError('Invalid file type');
        return;
      }

      // Validate file size
      if (!validateFileSize(selectedFile, 50)) {
        setErrorMessage('File too large. Maximum size is 50MB.');
        setUploadStatus('error');
        onUploadError('File too large');
        return;
      }

      setFile(selectedFile);
      setUploadStatus('idle');
      setErrorMessage('');
      setUploading(true);
      setUploadProgress(0);

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 10;
          });
        }, 100);

        const response = await uploadDocument(selectedFile);

        clearInterval(progressInterval);
        setUploadProgress(100);
        setUploadStatus('success');
        onUploadSuccess(response);
      } catch (error: any) {
        setUploadStatus('error');
        const message = error.response?.data?.detail || 'Upload failed. Please try again.';
        setErrorMessage(message);
        onUploadError(message);
      } finally {
        setUploading(false);
      }
    },
    [onUploadSuccess, onUploadError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    disabled: uploading,
  });

  const removeFile = () => {
    setFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setErrorMessage('');
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200',
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50',
          uploading && 'pointer-events-none opacity-60'
        )}
      >
        <input {...getInputProps()} />

        {!file ? (
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop your file here' : 'Drag & drop your Word document'}
            </p>
            <p className="text-sm text-gray-500 mb-4">or click to browse</p>
            <p className="text-xs text-gray-400">Supported format: .docx (max 50MB)</p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <File className="w-10 h-10 text-primary-500" />
              <div className="text-left">
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>

            {uploadStatus === 'success' && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
            {uploadStatus === 'error' && (
              <AlertCircle className="w-6 h-6 text-red-500" />
            )}

            {!uploading && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success Message */}
      {uploadStatus === 'success' && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-green-700">File uploaded successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {uploadStatus === 'error' && errorMessage && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
