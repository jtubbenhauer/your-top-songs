'use client';

import { useState } from 'react';
import { PlaylistDisplay } from '../playlist-display';
import { CreatePlaylistForm } from '../create-playlist-form';
import { Image as SpotifyImage, Playlist } from '@spotify/web-api-ts-sdk';

export function HeroLoggedIn() {
  const [playlist, setPlaylist] = useState<Playlist>();
  const [image, setImage] = useState<SpotifyImage>();

  return playlist && image ? (
    <PlaylistDisplay playlist={playlist} image={image} />
  ) : (
    <CreatePlaylistForm setPlaylist={setPlaylist} setImage={setImage} />
  );
}
