'use client';

import { HeroLoggedIn } from './hero-logged-in';
import { HeroLoggedOut } from './hero-logged-out';
import { useSession } from 'next-auth/react';

export function Hero() {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  return isAuthenticated ? <HeroLoggedIn /> : <HeroLoggedOut />;
}
