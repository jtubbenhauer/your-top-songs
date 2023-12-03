'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function AuthSessionProvider({
  session,
  children,
}: {
  children: ReactNode;
  session: Session | null | undefined;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
