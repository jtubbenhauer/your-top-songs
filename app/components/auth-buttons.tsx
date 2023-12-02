'use client';

import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { SpotifyContext } from '../spotify-context';

export default function AuthButtons() {
  const { sdk, user, logIn, loading } = useContext(SpotifyContext);

  if (loading) {
    return <></>;
  }

  return (
    <div className='flex gap-2'>
      {!user && <Button onClick={logIn}>Log In</Button>}
      {user && <p>{user.display_name}</p>}
      <Button onClick={() => sdk?.logOut()}>Log Out</Button>
    </div>
  );
}
