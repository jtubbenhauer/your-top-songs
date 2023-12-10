'use client';

import * as z from 'zod';
import { IUser } from '../lib/helpers/auth';
import { getSpotifySdk } from '../lib/spotify/client-instance';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createPlaylist } from '../lib/spotify/create-playlist';
import { TypedInputField } from './form/input';

interface Props {
  user: IUser;
}

const formSchema = z.object({
  title: z.string({ required_error: 'Playlist title is required' }),
  description: z.string(),
});

type CreatePlaylistForm = z.infer<typeof formSchema>;

export function CreatePlaylistForm({ user }: Props) {
  const sdk = getSpotifySdk();

  const form = useForm<CreatePlaylistForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(values: CreatePlaylistForm) {
    createPlaylist(values.title, sdk, values.description);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <TypedInputField
          name='title'
          label='Playlist Title'
          control={form.control}
        />
        <Button type='submit'>Create Playlist</Button>
      </form>
    </Form>
  );
}
