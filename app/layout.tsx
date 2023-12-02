import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpotifyProvider } from './spotify-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Top Tracks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SpotifyProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </SpotifyProvider>
  );
}
