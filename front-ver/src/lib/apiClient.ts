import { API_BASE_URL, RECOMMEND_ENDPOINT, HEALTH_ENDPOINT } from '../constants/config';

export type ApiClientOptions = {
  timeoutMs?: number;
  signal?: AbortSignal;
};

export class ApiError extends Error {
  status?: number;
  code?: string;
  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

const DEFAULT_TIMEOUT_MS = 10000;

export async function postJson<T>(
  endpoint: string,
  body: unknown,
  options: ApiClientOptions = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  const signal = options.signal ? mergeSignals(options.signal, controller.signal) : controller.signal;

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const reqInit: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    };

    console.log('[api] request:start', {
      url,
      method: 'POST',
      headers: reqInit.headers,
      body,
      timeoutMs: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    });

    const res = await fetch(url, reqInit);

    if (!res.ok) {
      const text = await safeText(res);
      console.log('[api] request:error', { url, status: res.status, body: text });
      throw new ApiError(text || 'リクエストに失敗しました', res.status);
    }

    console.log('[api] request:success', { url, status: res.status });
    return (await res.json()) as T;
  } catch (e) {
    if (isAbortError(e)) {
      console.log('[api] request:aborted', { endpoint, method: 'POST' });
      throw new ApiError('リクエストがタイムアウトまたは中断されました', undefined, 'ABORTED');
    }
    if (e instanceof ApiError) throw e;
    throw new ApiError('ネットワークエラーが発生しました');
  } finally {
    clearTimeout(timeout);
  }
}

export async function getJson<T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  const signal = options.signal ? mergeSignals(options.signal, controller.signal) : controller.signal;

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const reqInit: RequestInit = { method: 'GET', signal };

    console.log('[api] request:start', {
      url,
      method: 'GET',
      timeoutMs: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    });

    const res = await fetch(url, reqInit);
    if (!res.ok) {
      const text = await safeText(res);
      console.log('[api] request:error', { url, status: res.status, body: text });
      throw new ApiError(text || 'リクエストに失敗しました', res.status);
    }
    console.log('[api] request:success', { url, status: res.status });
    return (await res.json()) as T;
  } catch (e) {
    if (isAbortError(e)) {
      console.log('[api] request:aborted', { endpoint, method: 'GET' });
      throw new ApiError('リクエストがタイムアウトまたは中断されました', undefined, 'ABORTED');
    }
    if (e instanceof ApiError) throw e;
    throw new ApiError('ネットワークエラーが発生しました');
  } finally {
    clearTimeout(timeout);
  }
}

export async function recommendApi(mood: string, query: string, options: ApiClientOptions = {}) {
  return postJson<{ videos?: unknown }>(RECOMMEND_ENDPOINT, { mood, query }, options);
}

export async function recommendByFilters(filters: string[], options: ApiClientOptions = {}) {
  // リクエスト送信直前の明示的なログ
  console.log('[api] recommend:payload', { endpoint: RECOMMEND_ENDPOINT, body: { filters } });
  return postJson<{ videos?: unknown }>(RECOMMEND_ENDPOINT, { filters }, options);
}

export type HealthResponse = {
  data: Array<{ url: string; name: string; icon: string; review: string }>; 
};

export async function getHealth(options: ApiClientOptions = {}) {
  return getJson<HealthResponse>(HEALTH_ENDPOINT, options);
}

function isAbortError(err: unknown) {
  return err instanceof DOMException && err.name === 'AbortError';
}

async function safeText(res: Response) {
  try {
    return await res.text();
  } catch (_e) {
    return '';
  }
}

function mergeSignals(a: AbortSignal, b: AbortSignal): AbortSignal {
  if ((a as any) === (b as any)) return a;
  const ctrl = new AbortController();
  const onAbort = () => ctrl.abort();
  a.addEventListener('abort', onAbort);
  b.addEventListener('abort', onAbort);
  if (a.aborted || b.aborted) ctrl.abort();
  return ctrl.signal;
}


