'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Type, AlignLeft, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

interface StatsCardProps {
  wordCount?: number;
  paragraphCount?: number;
  pageCount?: number;
  processingTime?: number;
}

export default function StatsCard({
  wordCount = 0,
  paragraphCount = 0,
  pageCount = 0,
  processingTime = 0,
}: StatsCardProps) {
  const stats: Stat[] = [
    {
      id: 'words',
      label: 'Words',
      value: wordCount.toLocaleString(),
      icon: <Type className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      trend: 'neutral',
    },
    {
      id: 'paragraphs',
      label: 'Paragraphs',
      value: paragraphCount.toLocaleString(),
      icon: <AlignLeft className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      trend: 'neutral',
    },
    {
      id: 'pages',
      label: 'Pages',
      value: pageCount,
      icon: <FileText className="w-5 h-5" />,
      color: 'from-emerald-500 to-emerald-600',
      trend: 'neutral',
    },
    {
      id: 'time',
      label: 'Processing',
      value: `${processingTime}s`,
      icon: <Clock className="w-5 h-5" />,
      color: 'from-amber-500 to-amber-600',
      trend: processingTime < 5 ? 'up' : processingTime > 10 ? 'down' : 'neutral',
      trendValue: processingTime < 5 ? 'Fast' : processingTime > 10 ? 'Slow' : 'Normal',
    },
  ];

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />;
      default:
        return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}
            >
              {stat.icon}
            </motion.div>
            {stat.trend && (
              <div className="flex items-center gap-1">
                {getTrendIcon(stat.trend)}
                {stat.trendValue && (
                  <span className={`text-xs ${
                    stat.trend === 'up' ? 'text-green-500' :
                    stat.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {stat.trendValue}
                  </span>
                )}
              </div>
            )}
          </div>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-gray-800"
          >
            {stat.value}
          </motion.p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Compact version for sidebar
export function StatsCardCompact({
  wordCount = 0,
  paragraphCount = 0,
  pageCount = 0,
}: Omit<StatsCardProps, 'processingTime'>) {
  const stats = [
    { label: 'Words', value: wordCount, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Paragraphs', value: paragraphCount, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pages', value: pageCount, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.bg} ${stat.color} px-3 py-1.5 rounded-full flex items-center gap-2`}
        >
          <span className="text-sm font-bold">{stat.value.toLocaleString()}</span>
          <span className="text-xs opacity-75">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
