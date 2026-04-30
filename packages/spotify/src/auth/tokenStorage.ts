const ACCESS_TOKEN_KEY = "spotify_access_token";
const REFRESH_TOKEN_KEY = "spotify_refresh_token";
const EXPIRES_AT_KEY = "spotify_expires_at";

export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

export function saveTokens(
  response: SpotifyTokenResponse,
  fallbackRefreshToken?: string,
): StoredTokens {
  const refreshToken = response.refresh_token ?? fallbackRefreshToken ?? "";
  const expiresAt = Date.now() + response.expires_in * 1000;
  localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(EXPIRES_AT_KEY, String(expiresAt));
  return {accessToken: response.access_token, refreshToken, expiresAt};
}

export function loadTokens(): StoredTokens | null {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const expiresAtRaw = localStorage.getItem(EXPIRES_AT_KEY);
  if (!accessToken || !refreshToken || !expiresAtRaw) return null;
  const expiresAt = Number.parseInt(expiresAtRaw, 10);
  if (!Number.isFinite(expiresAt)) return null;
  return {accessToken, refreshToken, expiresAt};
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
}

export function isExpired(
  tokens: StoredTokens,
  skewSeconds: number = 60,
): boolean {
  return Date.now() >= tokens.expiresAt - skewSeconds * 1000;
}
