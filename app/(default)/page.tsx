import { buttonVariants } from '@/components/ui';
import Link from 'next/link';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='text-center'>
        <p className='text-xl font-bold'>Login Page Demo</p>
        <p>Made using NextJs, TS, Shadcn UI, Next-Auth, Prisma and Supabase</p>
        <section className='mt-3 flex gap-2 justify-center'>
          <Link
            className={buttonVariants({
              variant: 'outline',
            })}
            href='/login'
          >
            Login
          </Link>
          <Link
            className={buttonVariants({
              variant: 'default',
            })}
            href='/signup'
          >
            Sign Up
          </Link>
        </section>
      </div>
    </div>
  );
};
export default Home;
