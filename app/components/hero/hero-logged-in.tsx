'use client';

import { useState } from 'react';
import { PlaylistDisplay } from '../playlist-display';
import { IUser } from '@/app/lib/helpers/auth';
import { CreatePlaylistForm } from '../create-playlist-form';

interface Props {
  user: IUser;
}

export function HeroLoggedIn({ user }: Props) {
  const [playlistCreated, setPlaylistCreated] = useState(false);

  return playlistCreated ? (
    <PlaylistDisplay />
  ) : (
    <CreatePlaylistForm user={user} />
  );
}
