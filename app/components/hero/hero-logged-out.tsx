'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export function HeroLoggedOut() {
  return (
    <div className='flex flex-col gap-16'>
      <p className='max-w-sm text-2xl'>
        Create a playlist of <i>all</i> your Spotify Top Songs from over the
        years with a single click.
      </p>
      <Button onClick={() => signIn('spotify')} className='text-black'>
        Sign In
      </Button>
    </div>
  );
}
