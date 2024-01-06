import { Hero } from './components/hero/hero';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='container'>
      <div className='grid h-[calc(100vh-8rem)] grid-cols-1 gap-8 md:grid-cols-2 md:gap-24'>
        <div className='flex items-center justify-center text-4xl font-bold md:text-6xl'>
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
