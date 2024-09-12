'use client';

import { Button } from '@/components/ui';
import { useSession } from 'next-auth/react';
import React from 'react';
import { signOut } from 'next-auth/react';

const Dashboard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='text-center'>
        <p className='text-xl font-bold'>Dashboard</p>
        <p>Hi {session?.user?.name || '-'}, welcome !</p>
        <Button
          onClick={() => {
            signOut({
              callbackUrl: '/',
            });
          }}
          className='mt-3'
          variant={'default'}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
export default Dashboard;
