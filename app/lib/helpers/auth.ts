import { Session } from 'next-auth';

export type AuthStatus = 'authenticated' | 'loading' | 'unauthenticated';

export interface IUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function getAuthUser(
  status: AuthStatus,
  session: Session | null,
): IUser | undefined {
  if (status === 'authenticated' && session?.user) {
    return session.user;
  }
}

export function isLoading(status: AuthStatus): boolean {
  return status === 'loading';
}
