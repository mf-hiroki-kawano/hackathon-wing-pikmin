import type { Video } from '../types/video';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// FastAPI の {url, name, icon, review} を Video 型に合わせて変換
export function coerceVideos(input: unknown): Video[] {
  if (!Array.isArray(input)) return [];

  return input.map((item) => {
    if (!isRecord(item)) return null;

    // ここで string にキャストして型エラーを回避
    const url = String(item.url ?? '');
    const name = String(item.name ?? '');
    const icon = String(item.icon ?? '');
    const review = String((item as any).review ?? '');

    return {
      id: url,
      title: name,
      url,
      thumbnail: icon,
      duration: 'N/A',
      review
    } as Video;
  }).filter((v): v is Video => v !== null);
}
