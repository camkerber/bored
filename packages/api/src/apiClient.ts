const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface SuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

interface ErrorEnvelope {
  success: false;
  message: string;
  error: {message: string; code?: string; details?: unknown};
  timestamp: string;
}

function isEnvelope(v: unknown): v is {success: boolean; message?: string} {
  return typeof v === "object" && v !== null && "success" in v;
}

async function apiGetInner<T>(path: string, init: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  const raw: unknown = await res.json().catch(() => null);

  if (!isEnvelope(raw)) throw new Error(`Invalid response: ${res.status}`);
  if (raw.success === false) {
    const err = raw as ErrorEnvelope;
    throw new Error(
      err.error?.message ?? err.message ?? `Request failed: ${res.status}`,
    );
  }
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (raw as SuccessEnvelope<T>).data;
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  return apiGetInner<T>(path, {signal});
}

export async function apiGetWithAuth<T>(
  path: string,
  accessToken: string,
  signal?: AbortSignal,
): Promise<T> {
  return apiGetInner<T>(path, {
    signal,
    headers: {Authorization: `Bearer ${accessToken}`},
  });
}
