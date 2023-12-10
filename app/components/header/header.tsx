import { ProfileImage } from './profile-image';

export function Header() {
  return (
    <div className='mx-auto flex h-24 max-w-screen-xl items-center justify-between p-8 md:h-24'>
      <h1 className='select-none text-2xl font-black text-slate-50'>YTS.</h1>
      <ProfileImage />
    </div>
  );
}
