import { redirect } from 'next/navigation';
import queryString from 'query-string';
import { cookies } from 'next/headers';

export async function GET() {
  cookies().delete('state');
  cookies().delete('accessToken');
  const state = crypto.randomUUID();
  cookies().set('state', state);
  const scopes = [
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
  ];
  const scope = scopes.join(' ');
  const redirect_uri = 'http://localhost:3000/api/callback';

  redirect(
    'https://accounts.spotify.com/authorize?' +
      queryString.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope,
        redirect_uri,
        state,
      }),
  );
}
