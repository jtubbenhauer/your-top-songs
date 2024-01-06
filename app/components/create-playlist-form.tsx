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
import { Dispatch, SetStateAction } from 'react';
import { Image as SpotifyImage, Playlist } from '@spotify/web-api-ts-sdk';
import { PlaylistDisplay } from './playlist-display';
import { signIn } from 'next-auth/react';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Playlist title is required',
  }),
  description: z.string().optional(),
});

type CreatePlaylistForm = z.infer<typeof formSchema>;

interface Props {
  setPlaylist: Dispatch<SetStateAction<Playlist | undefined>>;
  setImage: Dispatch<SetStateAction<SpotifyImage | undefined>>;
}

export function CreatePlaylistForm({ setPlaylist, setImage }: Props) {
  const sdk = getSpotifySdk();
  const form = useForm<CreatePlaylistForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'My Top Songs Of All Time',
    },
  });

  async function onSubmit(values: CreatePlaylistForm) {
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
    setImage(image);
  }

  return (
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
