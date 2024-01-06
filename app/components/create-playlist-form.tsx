'use client';

import * as z from 'zod';
import { getSpotifySdk } from '../lib/spotify/client-instance';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { createPlaylist } from '../lib/spotify/create-playlist';
import { TypedInputField } from './form/input';
import { TypedTextareaField } from './form/textarea';
import { useState } from 'react';
import { Image, Playlist } from '@spotify/web-api-ts-sdk';
import { PlaylistDisplay } from './playlist-display';
import { signIn, useSession } from 'next-auth/react';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Playlist title is required',
  }),
  description: z.string().optional(),
});

type CreatePlaylistForm = z.infer<typeof formSchema>;

export function CreatePlaylistForm() {
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useState<Playlist>();
  const [playlistImage, setPlaylistImage] = useState<Image>();

  const sdk = getSpotifySdk();

  const form = useForm<CreatePlaylistForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'My Top Songs Of All Time',
    },
  });

  async function onSubmit(values: CreatePlaylistForm) {
    const tokenExpiry = session?.expires
      ? new Date(session.expires).getTime()
      : undefined;
    if (tokenExpiry && Date.now() > tokenExpiry) {
      await signIn('spotify');
    }

    const playlist = await createPlaylist(
      values.title,
      sdk,
      values.description,
    );
    if (!playlist) {
      return;
    }
    const image = await sdk.playlists
      .getPlaylistCoverImage(playlist.id)
      .then((images) => images[1]);

    setPlaylist(playlist);
    setPlaylistImage(image);
  }

  return playlist ? (
    <PlaylistDisplay playlist={playlist} image={playlistImage} />
  ) : (
    <div className='flex flex-col gap-4'>
      <PlaylistDisplay />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-[350px] flex-col gap-4'
        >
          <TypedInputField
            name='title'
            label='Playlist title'
            control={form.control}
          />
          <TypedTextareaField
            name='description'
            label='Playlist description (optional)'
            control={form.control}
          />
          <Button className='mt-3' type='submit'>
            Create Playlist
          </Button>
        </form>
      </Form>
    </div>
  );
}
