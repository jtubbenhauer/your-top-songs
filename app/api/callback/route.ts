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

// app.get('/refresh_token', function(req, res) {
//
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//     },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };
//
//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token,
//           refresh_token = body.refresh_token;
//       res.send({
//         'access_token': access_token,
//         'refresh_token': refresh_token
//       });
//     }
//   });
// });
