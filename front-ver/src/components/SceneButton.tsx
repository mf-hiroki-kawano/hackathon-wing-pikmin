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

// カラーからアイコン色/枠線色に変換（Tailwindのクラスが静的に現れるように明示マップ）
const COLOR_MAP: Record<string, { text: string; ring: string; border: string }> = {
  'bg-amber-500': { text: 'text-amber-500', ring: 'ring-amber-500', border: 'border-amber-500' },
  'bg-blue-500': { text: 'text-blue-500', ring: 'ring-blue-500', border: 'border-blue-500' },
  'bg-emerald-500': { text: 'text-emerald-500', ring: 'ring-emerald-500', border: 'border-emerald-500' },
  'bg-orange-500': { text: 'text-orange-500', ring: 'ring-orange-500', border: 'border-orange-500' },
  'bg-slate-600': { text: 'text-slate-600', ring: 'ring-slate-600', border: 'border-slate-600' },
  'bg-indigo-500': { text: 'text-indigo-500', ring: 'ring-indigo-500', border: 'border-indigo-500' },
  'bg-violet-500': { text: 'text-violet-500', ring: 'ring-violet-500', border: 'border-violet-500' },
  'bg-pink-500': { text: 'text-pink-500', ring: 'ring-pink-500', border: 'border-pink-500' },
  'bg-red-500': { text: 'text-red-500', ring: 'ring-red-500', border: 'border-red-500' },
  'bg-teal-500': { text: 'text-teal-500', ring: 'ring-teal-500', border: 'border-teal-500' },
};

const SceneButton: React.FC<SceneButtonProps> = ({ label, description, isSelected, onClick, icon: Icon, colorClass }) => {
  const color = (colorClass && COLOR_MAP[colorClass]) || {
    text: 'text-gray-600',
    ring: 'ring-gray-400',
    border: 'border-gray-300',
  };

  return (
    <button
      onClick={onClick}
      className={`group w-full text-left p-4 rounded-xl border transition-all duration-200 ease-out cursor-pointer transform bg-white ${
        isSelected
          ? `border-2 ${color.border} ring-2 ${color.ring}`
          : 'border-gray-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.99]'
      }`}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon
            size={18}
            className={`${color.text} transition-transform duration-200 group-hover:scale-110`}
          />
        )}
        <div>
          <div className="font-semibold text-gray-900">{label}</div>
          {description && <div className="text-sm text-gray-500">{description}</div>}
        </div>
      </div>
    </button>
  );
};

export default SceneButton;


