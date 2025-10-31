'use client';

import React from 'react';
import type { Video } from '../types/video';

type VideoCardProps = {
  video: Video;
};

const VideoCard: React.FC<VideoCardProps> = ({ video }) => (
  <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
    <img
      src={video.thumbnail}
      alt={video.title}
      className="w-40 h-24 object-cover rounded"
    />
    <div className="flex-1">
      <h3 className="font-bold text-lg mb-1">{video.title}</h3>
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm mb-2 block"
      >
        動画リンク
      </a>
      <p className="text-gray-500 text-sm">{video.duration}</p>
    </div>
  </div>
);

export default VideoCard;


