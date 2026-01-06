'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  GraduationCap,
  Briefcase,
  BookOpen,
  Newspaper,
  Sparkles,
  Scale,
  Heart,
  Code,
  Presentation,
  FileSpreadsheet,
  Mail,
  ChevronDown,
  Check,
} from 'lucide-react';
import { FormattingOptions } from '@/lib/api';

interface PresetConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: 'business' | 'academic' | 'creative' | 'special';
  options: FormattingOptions;
}

const presets: PresetConfig[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean business documents',
    icon: <Briefcase className="w-5 h-5" />,
    color: 'from-blue-500 to-indigo-600',
    category: 'business',
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
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'from-purple-500 to-violet-600',
    category: 'academic',
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
    icon: <FileText className="w-5 h-5" />,
    color: 'from-emerald-500 to-teal-600',
    category: 'business',
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
    icon: <BookOpen className="w-5 h-5" />,
    color: 'from-amber-500 to-orange-600',
    category: 'creative',
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
    icon: <Newspaper className="w-5 h-5" />,
    color: 'from-rose-500 to-pink-600',
    category: 'creative',
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
    icon: <Sparkles className="w-5 h-5" />,
    color: 'from-gray-600 to-gray-800',
    category: 'creative',
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
  {
    id: 'legal',
    name: 'Legal',
    description: 'Legal documents style',
    icon: <Scale className="w-5 h-5" />,
    color: 'from-slate-600 to-slate-800',
    category: 'special',
    options: {
      text: {
        font_family: 'Times New Roman',
        font_size: 12,
        line_spacing: '2.0',
        text_alignment: 'justify',
      },
      paragraph: {
        spacing_before: 0,
        spacing_after: 12,
      },
      page: {
        margin_top: 1.5,
        margin_bottom: 1.5,
        margin_left: 1.5,
        margin_right: 1,
        page_numbers: true,
        page_number_position: 'bottom_center',
      },
      structure: {
        normalize_headings: true,
        h1_size: 14,
        h1_bold: true,
        h1_color: '#000000',
      },
    },
  },
  {
    id: 'medical',
    name: 'Medical',
    description: 'Healthcare documents',
    icon: <Heart className="w-5 h-5" />,
    color: 'from-red-500 to-rose-600',
    category: 'special',
    options: {
      text: {
        font_family: 'Arial',
        font_size: 11,
        line_spacing: '1.5',
        text_alignment: 'left',
      },
      paragraph: {
        spacing_before: 6,
        spacing_after: 6,
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
    id: 'technical',
    name: 'Technical',
    description: 'Tech docs & manuals',
    icon: <Code className="w-5 h-5" />,
    color: 'from-cyan-500 to-blue-600',
    category: 'special',
    options: {
      text: {
        font_family: 'Courier New',
        font_size: 10,
        line_spacing: '1.15',
        text_alignment: 'left',
      },
      paragraph: {
        spacing_before: 6,
        spacing_after: 6,
      },
      page: {
        margin_top: 0.75,
        margin_bottom: 0.75,
        margin_left: 1,
        margin_right: 0.75,
        page_numbers: true,
        page_number_position: 'bottom_right',
      },
      structure: {
        normalize_headings: true,
        create_toc: true,
        h1_size: 16,
        h1_bold: true,
        h2_size: 13,
        h2_bold: true,
        h3_size: 11,
        h3_bold: true,
      },
    },
  },
  {
    id: 'presentation',
    name: 'Presentation',
    description: 'Slide handouts',
    icon: <Presentation className="w-5 h-5" />,
    color: 'from-orange-500 to-amber-600',
    category: 'business',
    options: {
      text: {
        font_family: 'Arial',
        font_size: 14,
        line_spacing: '1.5',
        text_alignment: 'left',
      },
      paragraph: {
        spacing_before: 12,
        spacing_after: 12,
      },
      page: {
        orientation: 'landscape',
        margin_top: 0.75,
        margin_bottom: 0.75,
        margin_left: 1,
        margin_right: 1,
      },
      structure: {
        normalize_headings: true,
        h1_size: 24,
        h1_bold: true,
        h2_size: 18,
        h2_bold: true,
      },
    },
  },
  {
    id: 'spreadsheet',
    name: 'Data Report',
    description: 'Tables & data',
    icon: <FileSpreadsheet className="w-5 h-5" />,
    color: 'from-green-500 to-emerald-600',
    category: 'business',
    options: {
      text: {
        font_family: 'Calibri',
        font_size: 10,
        line_spacing: '1.0',
        text_alignment: 'left',
      },
      paragraph: {
        spacing_before: 3,
        spacing_after: 3,
      },
      page: {
        orientation: 'landscape',
        margin_top: 0.5,
        margin_bottom: 0.5,
        margin_left: 0.5,
        margin_right: 0.5,
      },
      structure: {
        normalize_headings: true,
        h1_size: 14,
        h1_bold: true,
      },
    },
  },
  {
    id: 'letter',
    name: 'Letter',
    description: 'Formal letters',
    icon: <Mail className="w-5 h-5" />,
    color: 'from-indigo-500 to-purple-600',
    category: 'business',
    options: {
      text: {
        font_family: 'Times New Roman',
        font_size: 12,
        line_spacing: '1.0',
        text_alignment: 'left',
      },
      paragraph: {
        spacing_before: 0,
        spacing_after: 12,
      },
      page: {
        margin_top: 1,
        margin_bottom: 1,
        margin_left: 1.25,
        margin_right: 1.25,
      },
    },
  },
];

const categories = [
  { id: 'all', name: 'All Presets', count: presets.length },
  { id: 'business', name: 'Business', count: presets.filter(p => p.category === 'business').length },
  { id: 'academic', name: 'Academic', count: presets.filter(p => p.category === 'academic').length },
  { id: 'creative', name: 'Creative', count: presets.filter(p => p.category === 'creative').length },
  { id: 'special', name: 'Specialized', count: presets.filter(p => p.category === 'special').length },
];

interface QuickPresetsProps {
  onSelectPreset: (options: FormattingOptions) => void;
  selectedPreset?: string | null;
}

export default function QuickPresets({ onSelectPreset, selectedPreset }: QuickPresetsProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const filteredPresets = activeCategory === 'all'
    ? presets
    : presets.filter(p => p.category === activeCategory);

  const displayedPresets = showAll ? filteredPresets : filteredPresets.slice(0, 6);

  const handlePresetSelect = (preset: PresetConfig) => {
    onSelectPreset(preset.options);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Format Presets</h3>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {filteredPresets.length} templates
        </span>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveCategory(category.id);
              setShowAll(false);
            }}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${activeCategory === category.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {category.name}
            <span className={`ml-1 text-xs ${activeCategory === category.id ? 'text-blue-100' : 'text-gray-400'}`}>
              ({category.count})
            </span>
          </motion.button>
        ))}
      </div>

      {/* Presets Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        <AnimatePresence mode="popLayout">
          {displayedPresets.map((preset, index) => (
            <motion.button
              key={preset.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePresetSelect(preset)}
              className={`
                relative p-3 rounded-xl border-2 text-left transition-all duration-300 group
                ${selectedPreset === preset.id
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                }
              `}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
                className={`
                  w-10 h-10 rounded-lg bg-gradient-to-br ${preset.color}
                  flex items-center justify-center text-white mb-2 shadow-md
                  group-hover:shadow-lg transition-shadow
                `}
              >
                {preset.icon}
              </motion.div>

              {/* Text */}
              <h4 className="font-semibold text-gray-800 text-sm truncate">{preset.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{preset.description}</p>

              {/* Selected Indicator */}
              <AnimatePresence>
                {selectedPreset === preset.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all pointer-events-none" />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More Button */}
      {filteredPresets.length > 6 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center space-x-1 transition-colors"
        >
          <span>{showAll ? 'Show Less' : `Show ${filteredPresets.length - 6} More`}</span>
          <motion.div animate={{ rotate: showAll ? 180 : 0 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}
