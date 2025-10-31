'use client';

import React from 'react';
import type { ComponentType } from 'react';

type MoodButtonProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: ComponentType<{ size?: number; className?: string }>;
  colorClass?: string;
};

// タイルカラーからアイコン色/枠線色に変換（Tailwindのクラスが静的に現れるように明示マップ）
const COLOR_MAP: Record<string, { text: string; ring: string; border: string }> = {
  'bg-yellow-500': { text: 'text-yellow-500', ring: 'ring-yellow-500', border: 'border-yellow-500' },
  'bg-blue-500': { text: 'text-blue-500', ring: 'ring-blue-500', border: 'border-blue-500' },
  'bg-pink-500': { text: 'text-pink-500', ring: 'ring-pink-500', border: 'border-pink-500' },
  'bg-red-500': { text: 'text-red-500', ring: 'ring-red-500', border: 'border-red-500' },
  'bg-green-500': { text: 'text-green-500', ring: 'ring-green-500', border: 'border-green-500' },
  'bg-purple-500': { text: 'text-purple-500', ring: 'ring-purple-500', border: 'border-purple-500' },
};

const MoodButton: React.FC<MoodButtonProps> = ({ label, isSelected, onClick, icon: Icon, colorClass }) => {
  const color = (colorClass && COLOR_MAP[colorClass]) || {
    text: 'text-gray-600',
    ring: 'ring-gray-400',
    border: 'border-gray-300',
  };

  return (
    <button
      onClick={onClick}
      className={`group px-6 py-2 rounded-lg font-medium transition-all duration-200 ease-out flex items-center gap-2 cursor-pointer transform bg-white text-gray-800 border ${
        isSelected ? `border-2 ${color.border} ring-2 ${color.ring}` : 'border-gray-200'
      } hover:shadow-md hover:scale-[1.03] active:scale-[0.99]`}
    >
      {Icon && (
        <Icon
          size={18}
          className={`${color.text} opacity-95 transition-transform duration-200 group-hover:scale-110`}
        />
      )}
      {label}
    </button>
  );
};

export default MoodButton;


