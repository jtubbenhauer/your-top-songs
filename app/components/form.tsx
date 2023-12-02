'use client';

import { Button } from '@/components/ui/button';
import { SpotifyContext } from '../spotify-context';
import { useContext, useState } from 'react';
import { createPlaylist } from '../lib/spotify/create-playlist';

export function Form() {
  const [playlistTitle, setPlaylistTitle] = useState<string>();
  const { sdk, user } = useContext(SpotifyContext);

  return (
    <div>
      {user && (
        <Button
          onClick={() =>
            createPlaylist(playlistTitle ?? '', 'Descipto', sdk, user)
          }
        >
          Create Playlist
        </Button>
      )}
    </div>
  );
}
