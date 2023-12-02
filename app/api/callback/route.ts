import { getAuthHeaderValue } from '@/app/lib/helpers/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import queryString from 'query-string';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const code = params.get('code');
  const state = params.get('state');

  const cookieStore = cookies();
  const storedState = cookieStore.get('state')?.value;
  cookieStore.delete('store');
  if (!code || !state || !storedState || state !== storedState) {
    redirect('/#' + queryString.stringify({ error: 'state_mismatch' }));
  }

  const authOptions: RequestInit = {
    method: 'POST',
    body: queryString.stringify({
      code,
      redirect_uri: 'http://localhost:3000/api/callback',
      grant_type: 'authorization_code',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getAuthHeaderValue(),
    },
  };

  const authResponse = await fetch(
    'https://accounts.spotify.com/api/token',
    authOptions,
  );

  if (!authResponse.ok) {
    redirect(
      `/#${queryString.stringify({ error: await authResponse.text() })}`,
    );
  }

  const authData = await authResponse.json();
  const { access_token, refresh_token } = authData;

  cookieStore.set('accessToken', access_token);
  cookieStore.set('refreshToken', refresh_token);
  redirect('/');
}
