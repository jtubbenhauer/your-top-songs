export function getAuthHeaderValue(): string {
  const authBuffer = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  );
  return `Basic ${authBuffer.toString('base64')}`;
}
