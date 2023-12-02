import { uniq, compact, flatten, chunk } from 'lodash';
import SpotifyWebApi from 'spotify-web-api-node';
import { delay } from '../helpers/delay';

export async function CreatePlaylist(
  accessToken: string,
  refreshToken: string,
) {
  const spotify = new SpotifyWebApi({
    accessToken,
    refreshToken,
  });

  if (!spotify) {
    return;
  }

  const playlists = await spotify
    .searchPlaylists('Your+Top+Songs')
    .then(
      (results) =>
        results.body.playlists?.items.filter(
          (playlist) => playlist.owner.id === 'spotify',
        ),
    );

  if (!playlists) {
    return;
  }

  const playlistTrackUris = await Promise.all(
    playlists.map((result) =>
      spotify
        .getPlaylistTracks(result.id)
        .then((playlistTracks) =>
          playlistTracks.body.items.map((item) => item.track?.uri),
        ),
    ),
  );

  const allUniqueTracks = uniq(compact(flatten(playlistTrackUris)));
  console.log(allUniqueTracks.length);
  const chunkedTracks = chunk(allUniqueTracks, 100);

  const newPlaylist = await spotify.createPlaylist('Second Test');

  for (const chunk of chunkedTracks) {
    await spotify.addTracksToPlaylist(newPlaylist.body.id, chunk);
    await delay(1000);
  }
}
