import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/header';
import { getServerSession } from 'next-auth';
import { AuthSessionProvider } from './auth-session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Top Songs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <AuthSessionProvider session={session}>
        <body
          className={
            inter.className + ' bg-gradient-to-r from-slate-900 to-slate-800'
          }
        >
          <div
            className='w-full bg-cover bg-center bg-no-repeat text-slate-100'
            style={{ backgroundImage: `url('/spotify-icon-trans.png')` }}
          >
            <Header />
            {children}
          </div>
        </body>
      </AuthSessionProvider>
    </html>
  );
}
