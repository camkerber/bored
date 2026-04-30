import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
} from "./pkce";
import {
  clearTokens,
  isExpired,
  loadTokens,
  saveTokens,
  StoredTokens,
  SpotifyTokenResponse,
} from "./tokenStorage";

const AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SCOPES = ["user-top-read"];

const PENDING_VERIFIER_KEY = "spotify_pkce_verifier";
const PENDING_STATE_KEY = "spotify_pkce_state";

function getClientId(): string {
  const id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  if (!id) {
    throw new Error(
      "VITE_SPOTIFY_CLIENT_ID is not set. Add it to website/.env.local.",
    );
  }
  return id;
}

function getRedirectUri(): string {
  const uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  if (!uri) {
    throw new Error(
      "VITE_SPOTIFY_REDIRECT_URI is not set. Add it to website/.env.local.",
    );
  }
  return uri;
}

export async function beginLogin(): Promise<void> {
  const verifier = generateCodeVerifier();
  const state = generateState();
  const challenge = await generateCodeChallenge(verifier);

  sessionStorage.setItem(PENDING_VERIFIER_KEY, verifier);
  sessionStorage.setItem(PENDING_STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: getClientId(),
    response_type: "code",
    redirect_uri: getRedirectUri(),
    code_challenge_method: "S256",
    code_challenge: challenge,
    state,
    scope: SCOPES.join(" "),
  });

  window.location.href = `${AUTHORIZE_ENDPOINT}?${params.toString()}`;
}

let inflightExchange: {code: string; promise: Promise<StoredTokens>} | null =
  null;

async function exchangeCodeForTokens(code: string): Promise<StoredTokens> {
  const verifier = sessionStorage.getItem(PENDING_VERIFIER_KEY);
  sessionStorage.removeItem(PENDING_VERIFIER_KEY);
  sessionStorage.removeItem(PENDING_STATE_KEY);

  if (!verifier) throw new Error("Missing PKCE verifier — restart login.");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: getRedirectUri(),
    client_id: getClientId(),
    code_verifier: verifier,
  });

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }
  const json = (await res.json()) as SpotifyTokenResponse;
  return saveTokens(json);
}

export async function completeLogin(
  searchParams: URLSearchParams,
): Promise<StoredTokens> {
  const error = searchParams.get("error");
  if (error) {
    sessionStorage.removeItem(PENDING_VERIFIER_KEY);
    sessionStorage.removeItem(PENDING_STATE_KEY);
    throw new Error(`Spotify authorization failed: ${error}`);
  }

  const code = searchParams.get("code");
  if (!code) throw new Error("Missing authorization code in callback URL.");

  if (inflightExchange && inflightExchange.code === code) {
    return inflightExchange.promise;
  }

  const returnedState = searchParams.get("state");
  const expectedState = sessionStorage.getItem(PENDING_STATE_KEY);
  if (!expectedState || expectedState !== returnedState) {
    sessionStorage.removeItem(PENDING_VERIFIER_KEY);
    sessionStorage.removeItem(PENDING_STATE_KEY);
    throw new Error("State mismatch — possible CSRF, restart login.");
  }

  const promise = exchangeCodeForTokens(code);
  inflightExchange = {code, promise};
  return promise;
}

async function performRefresh(refreshToken: string): Promise<StoredTokens> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: getClientId(),
  });
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Token refresh failed: ${res.status} ${text}`);
  }
  const json = (await res.json()) as SpotifyTokenResponse;
  return saveTokens(json, refreshToken);
}

let inflightRefresh: Promise<StoredTokens> | null = null;

export async function refreshTokensIfNeeded(): Promise<StoredTokens | null> {
  const tokens = loadTokens();
  if (!tokens) return null;
  if (!isExpired(tokens)) return tokens;
  if (!tokens.refreshToken) return null;

  inflightRefresh ??= performRefresh(tokens.refreshToken).finally(() => {
    inflightRefresh = null;
  });
  try {
    return await inflightRefresh;
  } catch (err) {
    clearTokens();
    throw err;
  }
}

export async function getValidAccessToken(): Promise<string> {
  const tokens = await refreshTokensIfNeeded();
  if (!tokens) throw new Error("Not authenticated with Spotify.");
  return tokens.accessToken;
}

export function logout(): void {
  clearTokens();
}
