'use client';

import { getAuthUser, isLoading } from '@/app/lib/helpers/auth';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Avatar from 'react-avatar';

export function ProfileImage() {
  const { data: session, status } = useSession();
  const imageUrl = session?.user?.image;
  const name = session?.user?.name;

  if (isLoading(status)) {
    return <div>Loading</div>;
  }

  if (!getAuthUser(status, session)) {
    return (
      <Button className='text-black' onClick={() => signIn('spotify')}>
        Sign In
      </Button>
    );
  }

  return imageUrl ? (
    <Image
      className='rounded-full'
      src={imageUrl}
      width={48}
      height={48}
      alt='Spotify Profile Image'
    />
  ) : (
    <Avatar
      className='hover:cursor-pointer'
      name={name ?? 'Y T S'}
      size='48'
      round={true}
    />
  );
}
