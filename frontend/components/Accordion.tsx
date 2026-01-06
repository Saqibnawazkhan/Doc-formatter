'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string[];
  allowMultiple?: boolean;
  variant?: 'default' | 'bordered' | 'separated';
  iconStyle?: 'chevron' | 'plus';
  onChange?: (openItems: string[]) => void;
}

export default function Accordion({
  items,
  defaultOpen = [],
  allowMultiple = false,
  variant = 'default',
  iconStyle = 'chevron',
  onChange,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const handleToggle = (itemId: string) => {
    let newOpenItems: string[];

    if (allowMultiple) {
      newOpenItems = openItems.includes(itemId)
        ? openItems.filter((id) => id !== itemId)
        : [...openItems, itemId];
    } else {
      newOpenItems = openItems.includes(itemId) ? [] : [itemId];
    }

    setOpenItems(newOpenItems);
    onChange?.(newOpenItems);
  };

  const getContainerStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200';
      case 'separated':
        return 'space-y-3';
      default:
        return 'space-y-2';
    }
  };

  const getItemStyles = (isOpen: boolean, isDisabled: boolean) => {
    const baseStyles = isDisabled ? 'opacity-50 cursor-not-allowed' : '';

    switch (variant) {
      case 'bordered':
        return `${baseStyles}`;
      case 'separated':
        return `${baseStyles} border border-gray-200 rounded-xl overflow-hidden ${
          isOpen ? 'shadow-md' : 'shadow-sm'
        }`;
      default:
        return `${baseStyles} bg-gray-50 rounded-xl overflow-hidden ${
          isOpen ? 'shadow-md bg-white' : ''
        }`;
    }
  };

  const Icon = iconStyle === 'plus' ? (isOpen: boolean) => (isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />) : (isOpen: boolean) => <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />;

  return (
    <div className={getContainerStyles()}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        const isDisabled = item.disabled || false;

        return (
          <div key={item.id} className={getItemStyles(isOpen, isDisabled)}>
            {/* Header */}
            <motion.button
              type="button"
              onClick={() => !isDisabled && handleToggle(item.id)}
              className={`
                w-full flex items-center justify-between px-5 py-4 text-left
                transition-colors duration-200
                ${isDisabled ? '' : 'hover:bg-gray-50'}
                ${isOpen && variant !== 'bordered' ? 'bg-white' : ''}
              `}
              whileHover={isDisabled ? {} : { x: 2 }}
              whileTap={isDisabled ? {} : { scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <motion.span
                    animate={{ rotate: isOpen ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500"
                  >
                    {item.icon}
                  </motion.span>
                )}
                <span className={`font-medium ${isOpen ? 'text-blue-600' : 'text-gray-800'}`}>
                  {item.title}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen && iconStyle === 'chevron' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`${isOpen ? 'text-blue-500' : 'text-gray-400'}`}
              >
                {iconStyle === 'plus' ? (isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />) : <ChevronDown className="w-5 h-5" />}
              </motion.span>
            </motion.button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    exit={{ y: -10 }}
                    className="px-5 pb-4 pt-0"
                  >
                    <div className="text-gray-600">{item.content}</div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// FAQ Accordion with special styling
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const accordionItems: AccordionItem[] = items.map((item, index) => ({
    id: `faq-${index}`,
    title: item.question,
    content: <p className="leading-relaxed">{item.answer}</p>,
  }));

  return (
    <div className="max-w-3xl mx-auto">
      <Accordion items={accordionItems} variant="separated" iconStyle="plus" />
    </div>
  );
}

// Simple Collapsible Component
interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export function Collapsible({ title, children, defaultOpen = false, icon }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
