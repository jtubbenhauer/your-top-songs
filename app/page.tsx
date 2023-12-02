import { cookies } from 'next/headers';

export default async function Home() {
  const accessToken = cookies().get('accessToken');

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
