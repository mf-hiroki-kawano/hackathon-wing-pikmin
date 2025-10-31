import { Sunrise, Bus, Coffee, Utensils, Home, Clock, Bed, Calendar, Dumbbell, BookOpen } from 'lucide-react';
import type { ComponentType } from 'react';

export type Scene = {
  id: string;
  label: string;
  description: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  colorClass?: string;
  keywords: string[];
};

export const SCENES: Scene[] = [
  { id: 'morning-rush', label: '朝の急いでる時', description: '短くて元気が出る', icon: Sunrise, colorClass: 'bg-amber-500', keywords: ['朝','モーニング','短い','元気','目覚め','5分'] },
  { id: 'commute', label: '通勤・通学中', description: '移動時間に最適', icon: Bus, colorClass: 'bg-blue-500', keywords: ['通勤','通学','電車','バス','移動','ながら'] },
  { id: 'work-break', label: '仕事・勉強の休憩', description: 'リフレッシュ', icon: Coffee, colorClass: 'bg-emerald-500', keywords: ['休憩','ブレイク','仕事','勉強','リフレッシュ'] },
  { id: 'lunch-time', label: 'ランチタイム', description: '食事しながら', icon: Utensils, colorClass: 'bg-orange-500', keywords: ['ランチ','昼食','食事','ごはん'] },
  { id: 'after-work', label: '仕事・学校終わり', description: 'お疲れ様', icon: Home, colorClass: 'bg-slate-600', keywords: ['帰宅','仕事終わり','学校終わり','お疲れ'] },
  { id: 'evening-relax', label: '夜のリラックス', description: 'ゆったり過ごす', icon: Clock, colorClass: 'bg-indigo-500', keywords: ['夜','リラックス','ゆっくり','晩酌'] },
  { id: 'before-sleep', label: '寝る前', description: '睡眠導入に', icon: Bed, colorClass: 'bg-violet-500', keywords: ['寝る前','睡眠','就寝','おやすみ','眠'] },
  { id: 'weekend', label: '週末', description: 'ゆっくり楽しむ', icon: Calendar, colorClass: 'bg-pink-500', keywords: ['週末','休日','土日','ホリデー'] },
  { id: 'workout', label: '運動・ワークアウト', description: 'トレーニング中', icon: Dumbbell, colorClass: 'bg-red-500', keywords: ['運動','ワークアウト','トレーニング','ジム','エクササイズ'] },
  { id: 'study', label: '勉強・作業中', description: '集中したい', icon: BookOpen, colorClass: 'bg-teal-500', keywords: ['勉強','作業','集中','BGM','仕事中'] },
];


