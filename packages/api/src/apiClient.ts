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

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;
  constructor(
    status: number,
    message: string,
    code?: string,
    details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function isEnvelope(v: unknown): v is {success: boolean; message?: string} {
  return typeof v === "object" && v !== null && "success" in v;
}

async function apiRequest<T>(path: string, init: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  const raw: unknown = await res.json().catch(() => null);

  if (!isEnvelope(raw)) throw new ApiError(res.status, `Invalid response: ${res.status}`);
  if (raw.success === false) {
    const err = raw as ErrorEnvelope;
    throw new ApiError(
      res.status,
      err.error?.message ?? err.message ?? `Request failed: ${res.status}`,
      err.error?.code,
      err.error?.details,
    );
  }
  if (!res.ok) throw new ApiError(res.status, `Request failed: ${res.status}`);
  return (raw as SuccessEnvelope<T>).data;
}

export async function apiGet<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  return apiRequest<T>(path, {signal});
}

export async function apiGetWithAuth<T>(
  path: string,
  accessToken: string,
  signal?: AbortSignal,
): Promise<T> {
  return apiRequest<T>(path, {
    signal,
    headers: {Authorization: `Bearer ${accessToken}`},
  });
}

export async function apiGetWithHeaders<T>(
  path: string,
  headers: Record<string, string>,
  signal?: AbortSignal,
): Promise<T> {
  return apiRequest<T>(path, {signal, headers});
}

export async function apiPost<TResp, TBody = unknown>(
  path: string,
  body?: TBody,
  headers?: Record<string, string>,
  signal?: AbortSignal,
): Promise<TResp> {
  return apiRequest<TResp>(path, {
    method: "POST",
    headers: {"Content-Type": "application/json", ...(headers ?? {})},
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });
}

export async function apiPut<TResp, TBody = unknown>(
  path: string,
  body: TBody,
  headers?: Record<string, string>,
  signal?: AbortSignal,
): Promise<TResp> {
  return apiRequest<TResp>(path, {
    method: "PUT",
    headers: {"Content-Type": "application/json", ...(headers ?? {})},
    body: JSON.stringify(body),
    signal,
  });
}

export function withParticipantToken(token: string): Record<string, string> {
  return {"x-participant-token": token};
}
