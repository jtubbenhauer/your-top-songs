import { Hero } from './components/hero/hero';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='container'>
      <div className='grid h-[calc(100vh-6rem)] grid-cols-1 md:grid-cols-2  md:gap-64'>
        <div className='flex items-center justify-center text-6xl font-bold md:justify-end'>
          <div className='flex flex-col gap-2'>
            <span>Your</span>
            <span>Top</span>
            <span>Songs.</span>
          </div>
          <Image
            className='-ml-8 mb-10'
            src={'/spotify-icon.png'}
            width={100}
            height={100}
            alt='Spotify Logo'
          />
        </div>
        <div className='flex justify-center md:items-center md:justify-start'>
          <Hero />
        </div>
      </div>
    </div>
  );
}
