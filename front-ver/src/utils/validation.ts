import type { Video } from '../types/video';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isVideo(value: unknown): value is Video {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.url === 'string' &&
    typeof value.thumbnail === 'string' &&
    typeof value.duration === 'string'
  );
}

export function coerceVideos(input: unknown): Video[] {
  if (!Array.isArray(input)) return [];
  return input.filter(isVideo);
}


