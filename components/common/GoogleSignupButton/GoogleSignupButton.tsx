'use client';

import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/icons';
import React from 'react';

import { signIn } from 'next-auth/react';

export const GoogleSignupButton: React.FC = () => {
  return (
    <div className='flex items-center justify-center'>
      <Button
        variant='outline'
        className='w-full gap-2 bg-white dark:bg-[#2e2e2e]'
        onClick={() => {
          // TODO: Add the url to redirect URIs
          signIn('google', { callbackUrl: '/dashboard' });
        }}
      >
        <GoogleIcon className='text-[18px]' /> SignUp with Google
      </Button>
    </div>
  );
};
