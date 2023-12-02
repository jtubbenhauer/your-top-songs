import AuthButtons from './components/auth-buttons';
import { Form } from './components/form';

export default function Home() {
  return (
    <div className='bg-slate-800 h-screen w-full'>
      <div className='container pt-4'>
        <AuthButtons></AuthButtons>
        <h1 className='text-slate-100 text-[5rem]'>Your Top Songs</h1>
        <Form></Form>
      </div>
    </div>
  );
}
