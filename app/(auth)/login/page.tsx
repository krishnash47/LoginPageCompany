import React from 'react';

// Forms
import { LoginForm } from '@/components/forms';


const Login: React.FC = () => {
  return (
    <main className="flex h-screen w-full">
      <section className="hidden h-full w-1/2 md:block">
        <div className="h-full w-full bg-[#323232]" />
      </section>
      <section className="flex h-full w-full items-center justify-center bg-white p-5 dark:bg-[#171717] sm:p-[50px] md:w-1/2 md:p-0">
        <div className="w-[350px] max-[400px]:w-full">
          <h1 className="text-xl font-bold md:text-2xl">Good to see you back</h1>
          <p className="text-sm sm:text-base">Let&apos;s continue from where you left off.</p>
          <div className="mt-5">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
