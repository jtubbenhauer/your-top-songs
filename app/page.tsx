import { Hero } from './components/hero/hero';

export default function Home() {
  return (
    <div className='container'>
      <div className='grid h-[calc(100vh-6rem)] grid-cols-1  md:grid-cols-2'>
        <div className='flex items-center justify-center text-6xl font-bold'>
          <div className='flex flex-col gap-2'>
            <span>Your</span>
            <span>Top</span>
            <span>Songs.</span>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Hero />
        </div>
      </div>
    </div>
  );
}
