'use client';

import 'react-loading-skeleton/dist/skeleton.css';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export function Header() {
  return (
    <div className='flex h-16 items-center justify-between p-8 md:h-24'>
      <h1 className='select-none text-2xl font-black text-slate-50'>YTS.</h1>
      <Button onClick={() => signOut()}>Log Out</Button>
    </div>
  );
}
