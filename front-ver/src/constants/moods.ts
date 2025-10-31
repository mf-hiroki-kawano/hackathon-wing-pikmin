import { Smile, Frown, Heart, Zap, Coffee, Music } from 'lucide-react';
import type { ComponentType } from 'react';

export type Mood = {
  id: string;
  label: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  colorClass?: string; // Tailwindの色クラス（例: 'bg-yellow-500'）
};

export const MOODS: Mood[] = [
  { id: 'happy', label: '楽しい', icon: Smile, colorClass: 'bg-yellow-500' },
  { id: 'sad', label: '悲しい', icon: Frown, colorClass: 'bg-blue-500' },
  { id: 'healing', label: '癒されたい', icon: Heart, colorClass: 'bg-pink-500' },
  { id: 'stress', label: 'ストレス発散', icon: Zap, colorClass: 'bg-red-500' },
  { id: 'relax', label: 'リラックス', icon: Coffee, colorClass: 'bg-green-500' },
  { id: 'energize', label: 'エネルギーチャージ', icon: Music, colorClass: 'bg-purple-500' }
];


