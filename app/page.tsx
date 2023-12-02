import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const accessToken = cookies().get('accessToken');
  const refreshToken = cookies().get('refreshToken');

  if (!accessToken || !refreshToken) {
    // just return the page with login stuff
    redirect('/api/login');
  }

  // createPlaylist(accessToken.value, refreshToken.value);

  return accessToken ? (
    <div>
      <h1>Yay got token</h1>
    </div>
  ) : (
    <div>
      <h1>Boo no token</h1>
    </div>
  );
}
