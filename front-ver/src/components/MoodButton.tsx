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
    className={`group px-6 py-2 rounded-lg font-medium transition-all duration-200 ease-out flex items-center gap-2 text-white cursor-pointer transform ${
      colorClass
        ? `${colorClass} ${isSelected ? '' : 'opacity-80 hover:opacity-100'} hover:shadow-md hover:scale-[1.03] active:scale-[0.99]`
        : `${isSelected ? 'bg-gray-700' : 'bg-gray-600 hover:bg-gray-500'} hover:shadow-md hover:scale-[1.03] active:scale-[0.99]`
    }`}
  >
    {Icon && <Icon size={18} className="opacity-95 transition-transform duration-200 group-hover:scale-110" />}
    {label}
  </button>
);

export default MoodButton;


