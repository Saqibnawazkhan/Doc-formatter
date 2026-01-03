'use client';

import React, { useState } from 'react';
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
];

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

const lineSpacings = [
  { value: '1.0', label: 'Single (1.0)' },
  { value: '1.15', label: '1.15' },
  { value: '1.5', label: '1.5' },
  { value: '2.0', label: 'Double (2.0)' },
];

const textAlignments = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justify' },
];

const pageSizes = [
  { value: 'A4', label: 'A4' },
  { value: 'Letter', label: 'Letter' },
];

const pageNumberPositions = [
  { value: 'top_left', label: 'Top Left' },
  { value: 'top_center', label: 'Top Center' },
  { value: 'top_right', label: 'Top Right' },
  { value: 'bottom_left', label: 'Bottom Left' },
  { value: 'bottom_center', label: 'Bottom Center' },
  { value: 'bottom_right', label: 'Bottom Right' },
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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="p-4 space-y-4">{children}</div>}
    </div>
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

          <div className="flex items-center space-x-6 pt-6">
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
          </div>
        </div>
      </Section>

      {/* Paragraph Formatting */}
      <Section
        title="Paragraph Formatting"
        icon={<AlignLeft className="w-5 h-5 text-primary-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Spacing Before (pt)</label>
            <input
              type="number"
              className="input"
              placeholder="0"
              min="0"
              max="100"
              value={options.paragraph?.spacing_before || ''}
              onChange={(e) =>
                updateParagraphOption(
                  'spacing_before',
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </div>

          <div>
            <label className="label">Spacing After (pt)</label>
            <input
              type="number"
              className="input"
              placeholder="0"
              min="0"
              max="100"
              value={options.paragraph?.spacing_after || ''}
              onChange={(e) =>
                updateParagraphOption(
                  'spacing_after',
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </div>

          <div>
            <label className="label">Left Indent (inches)</label>
            <input
              type="number"
              className="input"
              placeholder="0"
              min="0"
              max="5"
              step="0.1"
              value={options.paragraph?.indent_left || ''}
              onChange={(e) =>
                updateParagraphOption(
                  'indent_left',
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
            />
          </div>

          <div>
            <label className="label">Right Indent (inches)</label>
            <input
              type="number"
              className="input"
              placeholder="0"
              min="0"
              max="5"
              step="0.1"
              value={options.paragraph?.indent_right || ''}
              onChange={(e) =>
                updateParagraphOption(
                  'indent_right',
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
            />
          </div>

          <div>
            <label className="label">First Line Indent (inches)</label>
            <input
              type="number"
              className="input"
              placeholder="0"
              min="0"
              max="5"
              step="0.1"
              value={options.paragraph?.first_line_indent || ''}
              onChange={(e) =>
                updateParagraphOption(
                  'first_line_indent',
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
            />
          </div>

          <div className="flex items-center space-x-6 pt-6">
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

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="label">H1 Size (pt)</label>
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
                  <label className="label">H2 Size (pt)</label>
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
                  <label className="label">H3 Size (pt)</label>
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
