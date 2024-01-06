'use client';

import { getAuthUser } from '@/app/lib/helpers/auth';
import { HeroLoggedIn } from './hero-logged-in';
import { HeroLoggedOut } from './hero-logged-out';
import { useSession } from 'next-auth/react';

export function Hero() {
  const { status, data: session } = useSession();
  const user = getAuthUser(status, session);

  return user ? <HeroLoggedIn /> : <HeroLoggedOut />;
}
