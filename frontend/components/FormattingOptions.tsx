'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Type,
  AlignLeft,
  FileText,
  Layout,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { FormattingOptions as FormattingOptionsType } from '@/lib/api';
import { cn } from '@/lib/utils';

interface FormattingOptionsProps {
  options: FormattingOptionsType;
  onChange: (options: FormattingOptionsType) => void;
}

const fontFamilies = [
  'Arial',
  'Times New Roman',
  'Calibri',
  'Georgia',
  'Verdana',
  'Helvetica',
  'Courier New',
  'Tahoma',
  'Trebuchet MS',
  'Palatino Linotype',
  'Garamond',
  'Comic Sans MS',
  'Impact',
  'Lucida Console',
  'Cambria',
  'Century Gothic',
];

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

const lineSpacings = [
  { value: '1.0', label: 'Single (1.0)' },
  { value: '1.15', label: '1.15' },
  { value: '1.5', label: '1.5' },
  { value: '2.0', label: 'Double (2.0)' },
  { value: '2.5', label: '2.5' },
  { value: '3.0', label: 'Triple (3.0)' },
];

const textAlignments = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justify' },
];

const pageSizes = [
  { value: 'A4', label: 'A4 (8.27" x 11.69")' },
  { value: 'Letter', label: 'Letter (8.5" x 11")' },
  { value: 'Legal', label: 'Legal (8.5" x 14")' },
  { value: 'A3', label: 'A3 (11.69" x 16.54")' },
  { value: 'A5', label: 'A5 (5.83" x 8.27")' },
  { value: 'Executive', label: 'Executive (7.25" x 10.5")' },
];

const pageNumberPositions = [
  { value: 'top_left', label: 'Top Left' },
  { value: 'top_center', label: 'Top Center' },
  { value: 'top_right', label: 'Top Right' },
  { value: 'bottom_left', label: 'Bottom Left' },
  { value: 'bottom_center', label: 'Bottom Center' },
  { value: 'bottom_right', label: 'Bottom Right' },
];

const highlightColors = [
  { value: 'none', label: 'None' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'magenta', label: 'Magenta' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
  { value: 'darkBlue', label: 'Dark Blue' },
  { value: 'darkGreen', label: 'Dark Green' },
  { value: 'darkRed', label: 'Dark Red' },
  { value: 'lightGray', label: 'Light Gray' },
  { value: 'darkGray', label: 'Dark Gray' },
];

const borderStyles = [
  { value: 'none', label: 'None' },
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'thick', label: 'Thick' },
];

const orientations = [
  { value: '', label: 'Keep original' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'landscape', label: 'Landscape' },
];

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, children, defaultOpen = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: isOpen ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4 bg-white">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FormattingOptions({
  options,
  onChange,
}: FormattingOptionsProps) {
  const updateTextOption = (key: string, value: any) => {
    onChange({
      ...options,
      text: { ...options.text, [key]: value },
    });
  };

  const updateParagraphOption = (key: string, value: any) => {
    onChange({
      ...options,
      paragraph: { ...options.paragraph, [key]: value },
    });
  };

  const updatePageOption = (key: string, value: any) => {
    onChange({
      ...options,
      page: { ...options.page, [key]: value },
    });
  };

  const updateStructureOption = (key: string, value: any) => {
    onChange({
      ...options,
      structure: { ...options.structure, [key]: value },
    });
  };

  const updateCleanupOption = (key: string, value: any) => {
    onChange({
      ...options,
      cleanup: { ...options.cleanup, [key]: value },
    });
  };

  return (
    <div className="space-y-4">
      {/* Text Formatting */}
      <Section
        title="Text Formatting"
        icon={<Type className="w-5 h-5 text-primary-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Font Family</label>
            <select
              className="select"
              value={options.text?.font_family || ''}
              onChange={(e) => updateTextOption('font_family', e.target.value || undefined)}
            >
              <option value="">Keep original</option>
              {fontFamilies.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Font Size</label>
            <select
              className="select"
              value={options.text?.font_size || ''}
              onChange={(e) =>
                updateTextOption('font_size', e.target.value ? parseInt(e.target.value) : undefined)
              }
            >
              <option value="">Keep original</option>
              {fontSizes.map((size) => (
                <option key={size} value={size}>
                  {size} pt
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Font Color</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={options.text?.font_color || '#000000'}
                onChange={(e) => updateTextOption('font_color', e.target.value)}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                placeholder="#000000"
                value={options.text?.font_color || ''}
                onChange={(e) => updateTextOption('font_color', e.target.value || undefined)}
                className="input flex-1"
              />
            </div>
          </div>

          <div>
            <label className="label">Line Spacing</label>
            <select
              className="select"
              value={options.text?.line_spacing || ''}
              onChange={(e) => updateTextOption('line_spacing', e.target.value || undefined)}
            >
              <option value="">Keep original</option>
              {lineSpacings.map((spacing) => (
                <option key={spacing.value} value={spacing.value}>
                  {spacing.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Text Alignment</label>
            <select
              className="select"
              value={options.text?.text_alignment || ''}
              onChange={(e) => updateTextOption('text_alignment', e.target.value || undefined)}
            >
              <option value="">Keep original</option>
              {textAlignments.map((align) => (
                <option key={align.value} value={align.value}>
                  {align.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Highlight Color</label>
            <select
              className="select"
              value={options.text?.highlight_color || ''}
              onChange={(e) => updateTextOption('highlight_color', e.target.value || undefined)}
            >
              <option value="">None</option>
              {highlightColors.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Character Spacing (pt)</label>
            <input
              type="number"
              className="input"
              placeholder="0"
              min="-5"
              max="50"
              step="0.5"
              value={options.text?.character_spacing || ''}
              onChange={(e) =>
                updateTextOption('character_spacing', e.target.value ? parseFloat(e.target.value) : undefined)
              }
            />
          </div>

          {/* Text Style Checkboxes - Row 1 */}
          <div className="md:col-span-2 flex flex-wrap items-center gap-4 pt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.text?.bold || false}
                onChange={(e) => updateTextOption('bold', e.target.checked || undefined)}
              />
              <span className="font-bold">Bold</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.text?.italic || false}
                onChange={(e) => updateTextOption('italic', e.target.checked || undefined)}
              />
              <span className="italic">Italic</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.text?.underline || false}
                onChange={(e) => updateTextOption('underline', e.target.checked || undefined)}
              />
              <span className="underline">Underline</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.text?.strikethrough || false}
                onChange={(e) => updateTextOption('strikethrough', e.target.checked || undefined)}
              />
              <span className="line-through">Strikethrough</span>
            </label>
          </div>

          {/* Text Style Checkboxes - Row 2 */}
          <div className="md:col-span-2 flex flex-wrap items-center gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.text?.superscript || false}
                onChange={(e) => updateTextOption('superscript', e.target.checked || undefined)}
              />
              <span>Superscript<sup>x</sup></span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.text?.subscript || false}
                onChange={(e) => updateTextOption('subscript', e.target.checked || undefined)}
              />
              <span>Subscript<sub>x</sub></span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.text?.all_caps || false}
                onChange={(e) => updateTextOption('all_caps', e.target.checked || undefined)}
              />
              <span className="uppercase text-sm">All Caps</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.text?.small_caps || false}
                onChange={(e) => updateTextOption('small_caps', e.target.checked || undefined)}
              />
              <span style={{ fontVariant: 'small-caps' }}>Small Caps</span>
            </label>
          </div>
        </div>
      </Section>

      {/* Paragraph Formatting */}
      <Section
        title="Paragraph Formatting"
        icon={<AlignLeft className="w-5 h-5 text-primary-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Spacing Section */}
          <div className="md:col-span-2">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Spacing</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Spacing Before (pt)</label>
                <input
                  type="number"
                  className="input"
                  placeholder="0 (default)"
                  min="0"
                  max="100"
                  value={options.paragraph?.spacing_before ?? ''}
                  onChange={(e) =>
                    updateParagraphOption(
                      'spacing_before',
                      e.target.value !== '' ? parseInt(e.target.value) : 0
                    )
                  }
                />
              </div>

              <div>
                <label className="label">Spacing After (pt)</label>
                <input
                  type="number"
                  className="input"
                  placeholder="8 (default)"
                  min="0"
                  max="100"
                  value={options.paragraph?.spacing_after ?? ''}
                  onChange={(e) =>
                    updateParagraphOption(
                      'spacing_after',
                      e.target.value !== '' ? parseInt(e.target.value) : 8
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Indentation Section */}
          <div className="md:col-span-2">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Indentation (inches)</h4>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="label">Left</label>
                <input
                  type="number"
                  className="input"
                  placeholder="0"
                  min="0"
                  max="5"
                  step="0.1"
                  value={options.paragraph?.indent_left ?? ''}
                  onChange={(e) =>
                    updateParagraphOption(
                      'indent_left',
                      e.target.value !== '' ? parseFloat(e.target.value) : 0
                    )
                  }
                />
              </div>

              <div>
                <label className="label">Right</label>
                <input
                  type="number"
                  className="input"
                  placeholder="0"
                  min="0"
                  max="5"
                  step="0.1"
                  value={options.paragraph?.indent_right ?? ''}
                  onChange={(e) =>
                    updateParagraphOption(
                      'indent_right',
                      e.target.value !== '' ? parseFloat(e.target.value) : 0
                    )
                  }
                />
              </div>

              <div>
                <label className="label">First Line</label>
                <input
                  type="number"
                  className="input"
                  placeholder="0"
                  min="0"
                  max="5"
                  step="0.1"
                  value={options.paragraph?.first_line_indent ?? ''}
                  onChange={(e) =>
                    updateParagraphOption(
                      'first_line_indent',
                      e.target.value !== '' ? parseFloat(e.target.value) : 0
                    )
                  }
                />
              </div>

              <div>
                <label className="label">Hanging</label>
                <input
                  type="number"
                  className="input"
                  placeholder="0"
                  min="0"
                  max="5"
                  step="0.1"
                  value={options.paragraph?.hanging_indent || ''}
                  onChange={(e) =>
                    updateParagraphOption(
                      'hanging_indent',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Border Section */}
          <div className="md:col-span-2">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Paragraph Border</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label">Border Style</label>
                <select
                  className="select"
                  value={options.paragraph?.border_style || ''}
                  onChange={(e) => updateParagraphOption('border_style', e.target.value || undefined)}
                >
                  {borderStyles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Border Color</label>
                <input
                  type="color"
                  value={options.paragraph?.border_color || '#000000'}
                  onChange={(e) => updateParagraphOption('border_color', e.target.value)}
                  className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="label">Border Width (pt)</label>
                <input
                  type="number"
                  className="input"
                  placeholder="1"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={options.paragraph?.border_width || ''}
                  onChange={(e) =>
                    updateParagraphOption(
                      'border_width',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="label">Background Color</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={options.paragraph?.background_color || '#ffffff'}
                onChange={(e) => updateParagraphOption('background_color', e.target.value === '#ffffff' ? undefined : e.target.value)}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                placeholder="None"
                value={options.paragraph?.background_color || ''}
                onChange={(e) => updateParagraphOption('background_color', e.target.value || undefined)}
                className="input flex-1"
              />
            </div>
          </div>

          {/* Page Break Options */}
          <div className="md:col-span-2">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Page Break Options</h4>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={options.paragraph?.keep_lines_together || false}
                  onChange={(e) =>
                    updateParagraphOption('keep_lines_together', e.target.checked || undefined)
                  }
                />
                <span>Keep lines together</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={options.paragraph?.keep_with_next || false}
                  onChange={(e) =>
                    updateParagraphOption('keep_with_next', e.target.checked || undefined)
                  }
                />
                <span>Keep with next</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={options.paragraph?.page_break_before || false}
                  onChange={(e) =>
                    updateParagraphOption('page_break_before', e.target.checked || undefined)
                  }
                />
                <span>Page break before</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={options.paragraph?.widow_control !== false}
                  onChange={(e) =>
                    updateParagraphOption('widow_control', e.target.checked)
                  }
                />
                <span>Widow/Orphan control</span>
              </label>
            </div>
          </div>

          {/* Cleanup Options */}
          <div className="md:col-span-2 flex items-center space-x-6 pt-4 border-t">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.paragraph?.remove_extra_spaces || false}
                onChange={(e) =>
                  updateParagraphOption('remove_extra_spaces', e.target.checked || undefined)
                }
              />
              <span>Remove extra spaces</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.paragraph?.remove_blank_lines || false}
                onChange={(e) =>
                  updateParagraphOption('remove_blank_lines', e.target.checked || undefined)
                }
              />
              <span>Remove blank lines</span>
            </label>
          </div>
        </div>
      </Section>

      {/* Page Formatting */}
      <Section
        title="Page Formatting"
        icon={<FileText className="w-5 h-5 text-primary-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Page Size</label>
            <select
              className="select"
              value={options.page?.page_size || ''}
              onChange={(e) => updatePageOption('page_size', e.target.value || undefined)}
            >
              <option value="">Keep original</option>
              {pageSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Orientation</label>
            <select
              className="select"
              value={options.page?.orientation || ''}
              onChange={(e) => updatePageOption('orientation', e.target.value || undefined)}
            >
              {orientations.map((orient) => (
                <option key={orient.value} value={orient.value}>
                  {orient.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Columns</label>
            <select
              className="select"
              value={options.page?.columns || ''}
              onChange={(e) => updatePageOption('columns', e.target.value ? parseInt(e.target.value) : undefined)}
            >
              <option value="">1 (default)</option>
              <option value="2">2 Columns</option>
              <option value="3">3 Columns</option>
              <option value="4">4 Columns</option>
            </select>
          </div>

          {options.page?.columns && options.page.columns > 1 && (
            <div>
              <label className="label">Column Spacing (inches)</label>
              <input
                type="number"
                className="input"
                placeholder="0.5"
                min="0"
                max="2"
                step="0.1"
                value={options.page?.column_spacing || ''}
                onChange={(e) =>
                  updatePageOption('column_spacing', e.target.value ? parseFloat(e.target.value) : undefined)
                }
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="label">Margins (inches)</label>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <input
                  type="number"
                  className="input"
                  placeholder="Top"
                  min="0"
                  max="5"
                  step="0.1"
                  value={options.page?.margin_top || ''}
                  onChange={(e) =>
                    updatePageOption(
                      'margin_top',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
                <span className="text-xs text-gray-500">Top</span>
              </div>
              <div>
                <input
                  type="number"
                  className="input"
                  placeholder="Bottom"
                  min="0"
                  max="5"
                  step="0.1"
                  value={options.page?.margin_bottom || ''}
                  onChange={(e) =>
                    updatePageOption(
                      'margin_bottom',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
                <span className="text-xs text-gray-500">Bottom</span>
              </div>
              <div>
                <input
                  type="number"
                  className="input"
                  placeholder="Left"
                  min="0"
                  max="5"
                  step="0.1"
                  value={options.page?.margin_left || ''}
                  onChange={(e) =>
                    updatePageOption(
                      'margin_left',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
                <span className="text-xs text-gray-500">Left</span>
              </div>
              <div>
                <input
                  type="number"
                  className="input"
                  placeholder="Right"
                  min="0"
                  max="5"
                  step="0.1"
                  value={options.page?.margin_right || ''}
                  onChange={(e) =>
                    updatePageOption(
                      'margin_right',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
                <span className="text-xs text-gray-500">Right</span>
              </div>
            </div>
          </div>

          <div>
            <label className="label">Header Text</label>
            <input
              type="text"
              className="input"
              placeholder="Enter header text"
              value={options.page?.header_text || ''}
              onChange={(e) => updatePageOption('header_text', e.target.value || undefined)}
            />
          </div>

          <div>
            <label className="label">Footer Text</label>
            <input
              type="text"
              className="input"
              placeholder="Enter footer text"
              value={options.page?.footer_text || ''}
              onChange={(e) => updatePageOption('footer_text', e.target.value || undefined)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.page?.page_numbers || false}
                onChange={(e) => updatePageOption('page_numbers', e.target.checked || undefined)}
              />
              <span>Add page numbers</span>
            </label>
          </div>

          {options.page?.page_numbers && (
            <div>
              <label className="label">Page Number Position</label>
              <select
                className="select"
                value={options.page?.page_number_position || 'bottom_center'}
                onChange={(e) => updatePageOption('page_number_position', e.target.value)}
              >
                {pageNumberPositions.map((pos) => (
                  <option key={pos.value} value={pos.value}>
                    {pos.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </Section>

      {/* Document Structure */}
      <Section
        title="Document Structure"
        icon={<Layout className="w-5 h-5 text-primary-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.structure?.normalize_headings || false}
                onChange={(e) =>
                  updateStructureOption('normalize_headings', e.target.checked || undefined)
                }
              />
              <span>Normalize headings</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={options.structure?.create_toc || false}
                onChange={(e) => updateStructureOption('create_toc', e.target.checked || undefined)}
              />
              <span>Create table of contents</span>
            </label>
          </div>

          {options.structure?.normalize_headings && (
            <>
              <div>
                <label className="label">Heading Font Family</label>
                <select
                  className="select"
                  value={options.structure?.heading_font_family || ''}
                  onChange={(e) =>
                    updateStructureOption('heading_font_family', e.target.value || undefined)
                  }
                >
                  <option value="">Keep original</option>
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                {/* H1 Options */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Heading 1 (H1)</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="label text-xs">Size (pt)</label>
                      <input
                        type="number"
                        className="input"
                        placeholder="24"
                        min="8"
                        max="72"
                        value={options.structure?.h1_size || ''}
                        onChange={(e) =>
                          updateStructureOption(
                            'h1_size',
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Color</label>
                      <input
                        type="color"
                        value={options.structure?.h1_color || '#000000'}
                        onChange={(e) => updateStructureOption('h1_color', e.target.value)}
                        className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center space-x-2 cursor-pointer pb-2">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={options.structure?.h1_bold !== false}
                          onChange={(e) =>
                            updateStructureOption('h1_bold', e.target.checked)
                          }
                        />
                        <span className="text-sm font-bold">Bold</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* H2 Options */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Heading 2 (H2)</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="label text-xs">Size (pt)</label>
                      <input
                        type="number"
                        className="input"
                        placeholder="20"
                        min="8"
                        max="72"
                        value={options.structure?.h2_size || ''}
                        onChange={(e) =>
                          updateStructureOption(
                            'h2_size',
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Color</label>
                      <input
                        type="color"
                        value={options.structure?.h2_color || '#000000'}
                        onChange={(e) => updateStructureOption('h2_color', e.target.value)}
                        className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center space-x-2 cursor-pointer pb-2">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={options.structure?.h2_bold !== false}
                          onChange={(e) =>
                            updateStructureOption('h2_bold', e.target.checked)
                          }
                        />
                        <span className="text-sm font-bold">Bold</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* H3 Options */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Heading 3 (H3)</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="label text-xs">Size (pt)</label>
                      <input
                        type="number"
                        className="input"
                        placeholder="16"
                        min="8"
                        max="72"
                        value={options.structure?.h3_size || ''}
                        onChange={(e) =>
                          updateStructureOption(
                            'h3_size',
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Color</label>
                      <input
                        type="color"
                        value={options.structure?.h3_color || '#000000'}
                        onChange={(e) => updateStructureOption('h3_color', e.target.value)}
                        className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center space-x-2 cursor-pointer pb-2">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={options.structure?.h3_bold !== false}
                          onChange={(e) =>
                            updateStructureOption('h3_bold', e.target.checked)
                          }
                        />
                        <span className="text-sm font-bold">Bold</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Section>

      {/* Cleanup & Standardization */}
      <Section
        title="Cleanup & Standardization"
        icon={<Sparkles className="w-5 h-5 text-primary-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={options.cleanup?.remove_inconsistent_fonts || false}
              onChange={(e) =>
                updateCleanupOption('remove_inconsistent_fonts', e.target.checked || undefined)
              }
            />
            <span>Remove inconsistent fonts</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={options.cleanup?.remove_unnecessary_styles || false}
              onChange={(e) =>
                updateCleanupOption('remove_unnecessary_styles', e.target.checked || undefined)
              }
            />
            <span>Remove unnecessary styles</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={options.cleanup?.clean_copied_text || false}
              onChange={(e) =>
                updateCleanupOption('clean_copied_text', e.target.checked || undefined)
              }
            />
            <span>Clean copied text</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={options.cleanup?.fix_alignment_issues || false}
              onChange={(e) =>
                updateCleanupOption('fix_alignment_issues', e.target.checked || undefined)
              }
            />
            <span>Fix alignment issues</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={options.cleanup?.normalize_formatting || false}
              onChange={(e) =>
                updateCleanupOption('normalize_formatting', e.target.checked || undefined)
              }
            />
            <span>Normalize all formatting</span>
          </label>
        </div>
      </Section>
    </div>
  );
}
