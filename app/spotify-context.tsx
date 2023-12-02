'use client';

import { SpotifyApi, UserProfile } from '@spotify/web-api-ts-sdk';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface SpotifyContextState {
  logIn: () => void;
  loading: boolean;
  sdk?: SpotifyApi;
  user?: UserProfile;
}

export const SpotifyContext = createContext<SpotifyContextState>({
  logIn: () => {},
  loading: true,
  sdk: undefined,
  user: undefined,
});

export function SpotifyProvider({ children }: { children: ReactNode }) {
  const [sdk, setSdk] = useState<SpotifyApi>();
  const [user, setUser] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scopes = [
      'playlist-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
    ];

    const sdk = SpotifyApi.withUserAuthorization(
      String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID),
      'http://localhost:3000',
      scopes,
    );

    setSdk(sdk);
  }, []);

  useEffect(() => {
    async function checkUser() {
      if (!sdk) {
        return;
      }
      const user = await sdk.currentUser.profile();
      setUser(user);
      setLoading(false);
    }
    checkUser();
  }, [sdk]);

  async function logIn() {
    if (!sdk) {
      return;
    }
    await sdk.authenticate();
  }

  return (
    <SpotifyContext.Provider value={{ sdk, user, logIn, loading }}>
      {children}
    </SpotifyContext.Provider>
  );
}
