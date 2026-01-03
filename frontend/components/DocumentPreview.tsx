'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Loader, AlertCircle } from 'lucide-react';
import { getPreview, PreviewResponse } from '@/lib/api';

interface DocumentPreviewProps {
  fileId: string | null;
}

export default function DocumentPreview({ fileId }: DocumentPreviewProps) {
  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  if (!fileId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400">
        <FileText className="w-16 h-16 mb-4" />
        <p className="text-lg">Upload a document to see preview</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <Loader className="w-12 h-12 animate-spin mb-4" />
        <p>Loading preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  if (!preview) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <h3 className="font-semibold text-gray-800">Document Preview</h3>
        <span className="text-sm text-gray-500">
          {preview.page_count} section(s)
        </span>
      </div>

      <div className="flex-1 overflow-auto bg-white border rounded-lg p-6 shadow-inner">
        <div className="prose max-w-none">
          {preview.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        This is a text preview. The actual document may contain additional formatting.
      </div>
    </div>
  );
}
