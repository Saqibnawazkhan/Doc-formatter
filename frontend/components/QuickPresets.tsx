'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  GraduationCap,
  Briefcase,
  BookOpen,
  Newspaper,
  Sparkles,
} from 'lucide-react';
import { FormattingOptions } from '@/lib/api';

interface PresetConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  options: FormattingOptions;
}

const presets: PresetConfig[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean business documents',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600',
    options: {
      text: {
        font_family: 'Calibri',
        font_size: 11,
        line_spacing: '1.15',
        text_alignment: 'justify',
      },
      paragraph: {
        spacing_before: 0,
        spacing_after: 8,
      },
      page: {
        margin_top: 1,
        margin_bottom: 1,
        margin_left: 1,
        margin_right: 1,
      },
      structure: {
        normalize_headings: true,
        h1_size: 16,
        h1_bold: true,
        h2_size: 14,
        h2_bold: true,
        h3_size: 12,
        h3_bold: true,
      },
    },
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'APA/MLA style papers',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-600',
    options: {
      text: {
        font_family: 'Times New Roman',
        font_size: 12,
        line_spacing: '2.0',
        text_alignment: 'left',
      },
      paragraph: {
        spacing_before: 0,
        spacing_after: 0,
        first_line_indent: 0.5,
      },
      page: {
        margin_top: 1,
        margin_bottom: 1,
        margin_left: 1,
        margin_right: 1,
      },
      structure: {
        normalize_headings: true,
        h1_size: 14,
        h1_bold: true,
        h2_size: 12,
        h2_bold: true,
      },
    },
  },
  {
    id: 'report',
    name: 'Report',
    description: 'Formal reports & proposals',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600',
    options: {
      text: {
        font_family: 'Arial',
        font_size: 11,
        line_spacing: '1.5',
        text_alignment: 'justify',
      },
      paragraph: {
        spacing_before: 6,
        spacing_after: 6,
      },
      page: {
        margin_top: 1,
        margin_bottom: 1,
        margin_left: 1.25,
        margin_right: 1,
        page_numbers: true,
        page_number_position: 'bottom_center',
      },
      structure: {
        normalize_headings: true,
        create_toc: true,
        h1_size: 18,
        h1_bold: true,
        h2_size: 14,
        h2_bold: true,
        h3_size: 12,
        h3_bold: true,
      },
    },
  },
  {
    id: 'book',
    name: 'Book/Novel',
    description: 'Book manuscript format',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600',
    options: {
      text: {
        font_family: 'Garamond',
        font_size: 12,
        line_spacing: '1.5',
        text_alignment: 'justify',
      },
      paragraph: {
        spacing_before: 0,
        spacing_after: 0,
        first_line_indent: 0.3,
      },
      page: {
        page_size: 'A5',
        margin_top: 0.75,
        margin_bottom: 0.75,
        margin_left: 0.75,
        margin_right: 0.75,
        page_numbers: true,
        page_number_position: 'bottom_center',
      },
    },
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Multi-column layouts',
    icon: <Newspaper className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-600',
    options: {
      text: {
        font_family: 'Verdana',
        font_size: 10,
        line_spacing: '1.15',
        text_alignment: 'justify',
      },
      paragraph: {
        spacing_before: 0,
        spacing_after: 6,
      },
      page: {
        columns: 2,
        column_spacing: 0.5,
        margin_top: 0.75,
        margin_bottom: 0.75,
        margin_left: 0.75,
        margin_right: 0.75,
      },
      structure: {
        normalize_headings: true,
        h1_size: 16,
        h1_bold: true,
        h2_size: 12,
        h2_bold: true,
      },
    },
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple & elegant',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-gray-600 to-gray-800',
    options: {
      text: {
        font_family: 'Calibri',
        font_size: 11,
        line_spacing: '1.15',
        text_alignment: 'left',
      },
      paragraph: {
        spacing_before: 0,
        spacing_after: 10,
        remove_extra_spaces: true,
        remove_blank_lines: true,
      },
      page: {
        margin_top: 1,
        margin_bottom: 1,
        margin_left: 1,
        margin_right: 1,
      },
      cleanup: {
        remove_inconsistent_fonts: true,
        normalize_formatting: true,
        fix_alignment_issues: true,
      },
    },
  },
];

interface QuickPresetsProps {
  onSelectPreset: (options: FormattingOptions) => void;
  selectedPreset?: string | null;
}

export default function QuickPresets({ onSelectPreset, selectedPreset }: QuickPresetsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-800">Quick Format Presets</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Select a preset to instantly apply professional formatting styles
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {presets.map((preset, index) => (
          <motion.button
            key={preset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectPreset(preset.options)}
            className={`
              relative p-4 rounded-xl border-2 text-left transition-all duration-300
              ${
                selectedPreset === preset.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
              }
            `}
          >
            <div
              className={`
                w-12 h-12 rounded-xl bg-gradient-to-br ${preset.color}
                flex items-center justify-center text-white mb-3 shadow-md
              `}
            >
              {preset.icon}
            </div>
            <h4 className="font-semibold text-gray-800 text-sm">{preset.name}</h4>
            <p className="text-xs text-gray-500 mt-1">{preset.description}</p>
            {selectedPreset === preset.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
