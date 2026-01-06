'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Moon,
  Sun,
  Bell,
  Download,
  Trash2,
  Save,
  RefreshCw,
  ChevronRight,
  X,
  Globe,
  Palette,
  HardDrive,
  Shield,
} from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (settings: AppSettings) => void;
}

interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  autoSave: boolean;
  notifications: boolean;
  defaultPreset: string;
  outputFormat: 'docx' | 'pdf';
  language: string;
  keepHistory: boolean;
  historyDays: number;
  autoCleanup: boolean;
}

const defaultSettings: AppSettings = {
  theme: 'light',
  autoSave: true,
  notifications: true,
  defaultPreset: 'professional',
  outputFormat: 'docx',
  language: 'en',
  keepHistory: true,
  historyDays: 30,
  autoCleanup: false,
};

export default function SettingsPanel({ isOpen, onClose, onSave }: SettingsPanelProps) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [activeSection, setActiveSection] = useState('general');

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave?.(settings);
    onClose();
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  const sections = [
    { id: 'general', label: 'General', icon: <Settings className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-5 h-5" /> },
    { id: 'storage', label: 'Storage', icon: <HardDrive className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Settings</h2>
                  <p className="text-sm text-gray-500">Customize your experience</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-48 border-r border-gray-200 p-4 space-y-1">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                      ${activeSection === section.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    {section.icon}
                    <span className="font-medium text-sm">{section.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Settings Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeSection === 'general' && (
                    <motion.div
                      key="general"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <SettingGroup title="Notifications">
                        <SettingSwitch
                          label="Enable notifications"
                          description="Get notified when formatting is complete"
                          checked={settings.notifications}
                          onChange={(v) => updateSetting('notifications', v)}
                        />
                      </SettingGroup>

                      <SettingGroup title="Auto-save">
                        <SettingSwitch
                          label="Auto-save settings"
                          description="Automatically save your preferences"
                          checked={settings.autoSave}
                          onChange={(v) => updateSetting('autoSave', v)}
                        />
                      </SettingGroup>

                      <SettingGroup title="Language">
                        <SettingSelect
                          label="Interface language"
                          value={settings.language}
                          onChange={(v) => updateSetting('language', v)}
                          options={[
                            { value: 'en', label: 'English' },
                            { value: 'es', label: 'Spanish' },
                            { value: 'fr', label: 'French' },
                            { value: 'de', label: 'German' },
                          ]}
                        />
                      </SettingGroup>
                    </motion.div>
                  )}

                  {activeSection === 'appearance' && (
                    <motion.div
                      key="appearance"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <SettingGroup title="Theme">
                        <div className="grid grid-cols-3 gap-3">
                          {['light', 'dark', 'system'].map((theme) => (
                            <motion.button
                              key={theme}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => updateSetting('theme', theme as any)}
                              className={`
                                p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                                ${settings.theme === theme
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                                }
                              `}
                            >
                              {theme === 'light' && <Sun className="w-6 h-6 text-amber-500" />}
                              {theme === 'dark' && <Moon className="w-6 h-6 text-indigo-500" />}
                              {theme === 'system' && <Settings className="w-6 h-6 text-gray-500" />}
                              <span className="text-sm font-medium capitalize">{theme}</span>
                            </motion.button>
                          ))}
                        </div>
                      </SettingGroup>

                      <SettingGroup title="Default Preset">
                        <SettingSelect
                          label="Default formatting style"
                          value={settings.defaultPreset}
                          onChange={(v) => updateSetting('defaultPreset', v)}
                          options={[
                            { value: 'professional', label: 'Professional' },
                            { value: 'academic', label: 'Academic' },
                            { value: 'minimal', label: 'Minimal' },
                            { value: 'report', label: 'Report' },
                          ]}
                        />
                      </SettingGroup>
                    </motion.div>
                  )}

                  {activeSection === 'storage' && (
                    <motion.div
                      key="storage"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <SettingGroup title="History">
                        <SettingSwitch
                          label="Keep file history"
                          description="Store recently formatted documents"
                          checked={settings.keepHistory}
                          onChange={(v) => updateSetting('keepHistory', v)}
                        />
                        {settings.keepHistory && (
                          <div className="mt-4">
                            <label className="text-sm text-gray-600">Keep history for</label>
                            <select
                              value={settings.historyDays}
                              onChange={(e) => updateSetting('historyDays', Number(e.target.value))}
                              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value={7}>7 days</option>
                              <option value={14}>14 days</option>
                              <option value={30}>30 days</option>
                              <option value={90}>90 days</option>
                            </select>
                          </div>
                        )}
                      </SettingGroup>

                      <SettingGroup title="Auto Cleanup">
                        <SettingSwitch
                          label="Automatic cleanup"
                          description="Remove old files automatically"
                          checked={settings.autoCleanup}
                          onChange={(v) => updateSetting('autoCleanup', v)}
                        />
                      </SettingGroup>

                      <SettingGroup title="Output Format">
                        <SettingSelect
                          label="Default output format"
                          value={settings.outputFormat}
                          onChange={(v) => updateSetting('outputFormat', v as any)}
                          options={[
                            { value: 'docx', label: 'Word Document (.docx)' },
                            { value: 'pdf', label: 'PDF (.pdf)' },
                          ]}
                        />
                      </SettingGroup>
                    </motion.div>
                  )}

                  {activeSection === 'privacy' && (
                    <motion.div
                      key="privacy"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">Your data is secure</p>
                            <p className="text-sm text-blue-600 mt-1">
                              All documents are processed locally and deleted after download.
                              We don't store your files on our servers.
                            </p>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl flex items-center justify-center gap-2 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                        Clear All Data
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reset to defaults
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Setting Group Component
function SettingGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

// Setting Switch Component
function SettingSwitch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <motion.button
        type="button"
        onClick={() => onChange(!checked)}
        className={`
          relative w-11 h-6 rounded-full transition-colors
          ${checked ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'}
        `}
      >
        <motion.span
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
        />
      </motion.button>
    </label>
  );
}

// Setting Select Component
function SettingSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
