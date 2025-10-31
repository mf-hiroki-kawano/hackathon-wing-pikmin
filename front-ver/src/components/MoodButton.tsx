'use client';

import React from 'react';

type MoodButtonProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

const MoodButton: React.FC<MoodButtonProps> = ({ label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-medium transition-all ${
      isSelected ? 'bg-gray-700 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'
    }`}
  >
    {label}
  </button>
);

export default MoodButton;


