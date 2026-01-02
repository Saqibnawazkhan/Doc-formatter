'use client';

import React from 'react';
import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Word Formatter</h1>
              <p className="text-xs text-gray-500">Format documents professionally</p>
            </div>
          </div>

          <nav className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              How it works
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              Templates
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
