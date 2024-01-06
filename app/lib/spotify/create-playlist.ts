'use client';

import { uniq, flatten, chunk } from 'lodash';
import { Playlist, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { signIn } from 'next-auth/react';

export async function createPlaylist(
  title: string,
  sdk: SpotifyApi,
  description?: string,
): Promise<Playlist | undefined> {
  try {
    const playlists = await sdk
      .search('Your Top Songs', ['playlist'])
      .then((results) =>
        results.playlists.items.filter(
          (playlist) => playlist.owner.id === 'spotify',
        ),
      );

    if (!playlists.length) {
      return;
    }

    const playlistTrackUris = await Promise.all(
      playlists.map((playlist) =>
        sdk.playlists
          .getPlaylistItems(playlist.id)
          .then((items) => items.items.map((item) => item.track.uri)),
      ),
    );

    const uniqueTrackUris = uniq(flatten(playlistTrackUris));
    const userProfile = await sdk.currentUser.profile();
    const newPlaylist = await sdk.playlists.createPlaylist(userProfile.id, {
      name: title,
      description: description ?? 'All Your Top Songs',
    });

    for (const uris of chunk(uniqueTrackUris, 100)) {
      await sdk.playlists.addItemsToPlaylist(newPlaylist.id, uris);
    }

    return newPlaylist;
  } catch (error) {
    await signIn('spotify');
    await createPlaylist(title, sdk, description);
  }
}
