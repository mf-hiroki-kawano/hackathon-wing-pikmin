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

const MoodButton: React.FC<MoodButtonProps> = ({ label, isSelected, onClick, icon: Icon, colorClass }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-white ${
      colorClass ? `${colorClass} ${isSelected ? '' : 'opacity-80 hover:opacity-100'}` : isSelected ? 'bg-gray-700' : 'bg-gray-600 hover:bg-gray-500'
    }`}
  >
    {Icon && <Icon size={18} className="opacity-95" />}
    {label}
  </button>
);

export default MoodButton;


