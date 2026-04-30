import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  beginLogin,
  getValidAccessToken,
  logout as logoutClient,
  refreshTokensIfNeeded,
} from "./auth/spotifyAuthClient";
export interface SpotifyAuthValue {
  isAuthenticated: boolean;
  accessToken: string | null;
  isInitializing: boolean;
  login: () => void;
  logout: () => void;
  getValidAccessToken: () => Promise<string>;
  setAuthenticatedFromCallback: (accessToken: string) => void;
}

export const SpotifyAuthContext = createContext<SpotifyAuthValue | undefined>(
  undefined,
);

export const SpotifyAuthProvider = ({children}: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const tokens = await refreshTokensIfNeeded();
        if (!cancelled) setAccessToken(tokens?.accessToken ?? null);
      } catch {
        if (!cancelled) setAccessToken(null);
      } finally {
        if (!cancelled) setIsInitializing(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(() => {
    void beginLogin();
  }, []);

  const logout = useCallback(() => {
    logoutClient();
    setAccessToken(null);
  }, []);

  const getValidAccessTokenCallback = useCallback(async () => {
    const token = await getValidAccessToken();
    setAccessToken((current) => (current === token ? current : token));
    return token;
  }, []);

  const setAuthenticatedFromCallback = useCallback((token: string) => {
    setAccessToken(token);
  }, []);

  const value = useMemo<SpotifyAuthValue>(
    () => ({
      isAuthenticated: accessToken !== null,
      accessToken,
      isInitializing,
      login,
      logout,
      getValidAccessToken: getValidAccessTokenCallback,
      setAuthenticatedFromCallback,
    }),
    [
      accessToken,
      isInitializing,
      login,
      logout,
      getValidAccessTokenCallback,
      setAuthenticatedFromCallback,
    ],
  );

  return (
    <SpotifyAuthContext.Provider value={value}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};
