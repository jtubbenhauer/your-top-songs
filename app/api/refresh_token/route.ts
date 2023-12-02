import { getAuthHeaderValue } from '@/app/lib/helpers/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import queryString from 'query-string';

export async function GET() {
  const refresh_token = cookies().get('refreshToken');

  const authOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getAuthHeaderValue(),
    },
    body: queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  };

  const response = await fetch(
    'https://accounts.spotify.com/api/token',
    authOptions,
  );

  if (!response.ok) {
    redirect('/#');
  }

  const { accessToken, refreshToken } = await response.json();
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
