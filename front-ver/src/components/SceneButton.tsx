'use client';

import React from 'react';
import type { ComponentType } from 'react';

type SceneButtonProps = {
  label: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: ComponentType<{ size?: number; className?: string }>;
  colorClass?: string;
};

const SceneButton: React.FC<SceneButtonProps> = ({ label, description, isSelected, onClick, icon: Icon, colorClass }) => (
  <button
    onClick={onClick}
    className={`group w-full text-left p-4 rounded-xl border transition-all duration-200 ease-out cursor-pointer transform ${
      isSelected
        ? 'border-gray-800 ring-2 ring-gray-300'
        : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.99]'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110 ${
        colorClass ?? 'bg-gray-500'
      }`}>
        {Icon && <Icon size={18} />}
      </div>
      <div>
        <div className="font-semibold text-gray-900">{label}</div>
        {description && <div className="text-sm text-gray-500">{description}</div>}
      </div>
    </div>
  </button>
);

export default SceneButton;


