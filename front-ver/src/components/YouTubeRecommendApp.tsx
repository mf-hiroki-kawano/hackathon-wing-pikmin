'use client';

import React, { useRef, useState } from 'react';
import { Search } from 'lucide-react';
import MoodButton from './MoodButton';
import VideoCard from './VideoCard';
import type { Video } from '../types/video';
import { MOODS } from '../constants/moods';
import { DEMO_VIDEOS } from '../constants/demoVideos';
import { recommendApi, ApiError } from '../lib/apiClient';
import { coerceVideos } from '../utils/validation';

// メインアプリコンポーネント
const YouTubeRecommendApp = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentControllerRef = useRef<AbortController | null>(null);

  const moods = MOODS;

  // バックエンドAPIを呼び出す関数（タイムアウト/重複防止/バリデーション/共通エラー対応）
  const fetchVideos = async (mood: string, query: string = '') => {
    setLoading(true);
    setError(null);

    try {
      // 既存のリクエストがあれば中断（重複防止）
      if (currentControllerRef.current) {
        currentControllerRef.current.abort();
      }
      const controller = new AbortController();
      currentControllerRef.current = controller;

      const data = await recommendApi(mood, query, { timeoutMs: 10000, signal: controller.signal });
      const validated = coerceVideos(data.videos);
      setVideos(validated);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === 'ABORTED') {
          setError('リクエストが中断されました');
        } else if (err.status) {
          setError(`サーバーエラー(${err.status})が発生しました`);
        } else {
          setError(err.message || '通信エラーが発生しました');
        }
      } else {
        setError('予期しないエラーが発生しました');
      }
      // デモ用のダミーデータ
      setVideos(DEMO_VIDEOS);
    } finally {
      if (currentControllerRef.current) {
        currentControllerRef.current = null;
      }
      setLoading(false);
    }
  };

  const handleMoodClick = (moodId: string) => {
    setSelectedMood(moodId);
    fetchVideos(moodId, searchQuery);
  };

  const handleSearch = () => {
    if (selectedMood) {
      fetchVideos(selectedMood, searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 shadow-md">
        <h1 className="text-3xl font-bold text-white">おすすめYouTube</h1>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto p-6">
        {/* 気分選択セクション */}
        <div className="mb-8">
          <h2 className="text-2xl text-center mb-6 text-gray-800">
            どんな気分になりたいですか？
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {moods.map((mood) => (
              <MoodButton
                key={mood.id}
                label={mood.label}
                isSelected={selectedMood === mood.id}
                onClick={() => handleMoodClick(mood.id)}
                icon={mood.icon}
                colorClass={mood.colorClass}
              />
            ))}
          </div>

          {/* 検索バー */}
          <div className="flex gap-2 max-w-3xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="キーワードで検索"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={handleSearch}
              disabled={!selectedMood}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Search size={20} />
              検索
            </button>
          </div>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}（デモデータを表示しています）
          </div>
        )}

        {/* ローディング表示 */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">動画を検索中...</p>
          </div>
        )}

        {/* 動画リスト */}
        {!loading && videos.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* 初期状態のメッセージ */}
        {!loading && videos.length === 0 && !selectedMood && (
          <div className="text-center py-12 text-gray-500">
            気分を選択して、おすすめの動画を見つけましょう！
          </div>
        )}
      </main>
    </div>
  );
};

export default YouTubeRecommendApp;
