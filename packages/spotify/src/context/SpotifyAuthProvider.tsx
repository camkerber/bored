import {createContext, useState, type PropsWithChildren} from "react";
import {
  beginLogin,
  getValidAccessToken,
  logout as logoutClient,
  refreshTokensIfNeeded,
} from "../auth";

export interface SpotifyAuthValue {
  authPromise: Promise<boolean>;
  login: () => void;
  logout: () => void;
  getValidAccessToken: () => Promise<string>;
}

export const SpotifyAuthContext = createContext<SpotifyAuthValue | undefined>(
  undefined,
);

const createAuthPromise = (): Promise<boolean> =>
  refreshTokensIfNeeded()
    .then((tokens) => tokens !== null)
    .catch(() => false);

export const SpotifyAuthProvider = ({children}: PropsWithChildren) => {
  const [authPromise, setAuthPromise] =
    useState<Promise<boolean>>(createAuthPromise);

  const login = () => {
    void beginLogin();
  };

  const logout = () => {
    logoutClient();
    setAuthPromise(Promise.resolve(false));
  };

  const value: SpotifyAuthValue = {
    authPromise,
    login,
    logout,
    getValidAccessToken,
  };

  return (
    <SpotifyAuthContext.Provider value={value}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};
