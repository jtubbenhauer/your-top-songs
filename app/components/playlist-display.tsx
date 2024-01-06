import { Image as SpotifyImage, Playlist } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Props {
  playlist?: Playlist;
  image?: SpotifyImage;
}

export function PlaylistDisplay({ playlist, image }: Props) {
  return (
    playlist && (
      <div className='flex flex-col items-center gap-4 rounded-md bg-slate-700 px-4 py-6'>
        <h2 className='mb-2 text-lg font-semibold tracking-wide text-primary'>
          Playlist Created
        </h2>
        {image && (
          <Image
            src={image.url}
            alt='Your playlist cover image'
            height={300}
            width={300}
            className='rounded-md'
          />
        )}
        <span className='text-lg font-semibold'>{playlist.name}</span>

        {playlist.description && (
          <span className='font-thin italic'>{playlist.description}</span>
        )}

        <Button
          onClick={() => window.open(playlist.external_urls.spotify, '_blank')}
        >
          View In Spotify
        </Button>
      </div>
    )
  );
}
