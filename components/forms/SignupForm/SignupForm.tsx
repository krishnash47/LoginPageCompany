'use client';

import React, { useState } from 'react';

// Zod and RHF
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

// Form Data and Schema
import { SignupFormSchema } from '@/forms/Schema';
import { SignUpFormFields } from '@/forms/FormData';

// Shadcn ui
import { Input } from '@/components/ui/input';

// Components
import { GoogleSignupButton } from '@/components/common/GoogleSignupButton';
import { LoadingButton } from '@/components/custom';
import Link from 'next/link';
import { RegisterUserResponseType } from '@/types/ResponseType';
import { toast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const SignupForm: React.FC = () => {
  const router = useRouter();

  const [isActive, setIsActive] = useState<number>(-1);
  const {
    register,
    handleSubmit,
    getValues,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const handleFormSubmit: SubmitHandler<
    z.infer<typeof SignupFormSchema>
  > = async (data: z.infer<typeof SignupFormSchema>) => {
    console.log(data);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: data.name,
        userEmail: data.email,
        userPassword: data.password,
      }),
    });

    const registerData: RegisterUserResponseType = await res.json();

    console.log(registerData);

    if (!registerData.data) {
      toast({
        variant: 'destructive',
        description: registerData.message,
      });
      return;
    }

    const singInResponse = await signIn('credentials', {
      email: data.email,
      password: data.password,
      // redirect: false
      redirect: true,
      // callbackUrl: '/dashboard',
    });

    console.log(singInResponse);

    if (!singInResponse?.ok) {
      toast({
        variant: 'destructive',
        description: <p>{singInResponse?.error}&nbsp;</p>,
      });
      return;
    }

    router.push(`/dashboard`);
  };

  return (
    <section>
      {/* Sign Up Form */}
      <h1 className='text-xl font-bold text-black dark:text-white md:text-2xl'>
        Let&apos;s get you onboard
      </h1>
      <p className='text-sm text-black/50 dark:text-white/50 sm:text-base'>
        Create your account to get started. It&apos;s free.
      </p>
      <div className='mt-4'>
        <GoogleSignupButton />
      </div>
      <div className='my-3 flex items-center justify-center gap-3 text-sm text-gray-500'>
        <span className='h-[0.5px] w-[100px] bg-gray-300' />
        or
        <span className='h-[0.5px] w-[100px] bg-gray-300' />
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {SignUpFormFields.map(
          ({ fieldName, placeholder, fieldType }, index) => (
            <div key={index}>
              <div className='relative mt-2'>
                <div
                  className={`absolute left-0 ${
                    isActive === index || getValues(fieldName) != ''
                      ? 'top-0'
                      : 'top-[50%]'
                  } ml-2 -translate-y-1/2 transform bg-[#FFF] dark:bg-[#171717] px-2 leading-none duration-150`}
                >
                  <label
                    htmlFor={fieldName.toString()}
                    className={`${
                      isActive === index || getValues(fieldName) != ''
                        ? 'text-[11px]'
                        : 'text-[14px]'
                    } font-medium duration-150 text-black/50 dark:text-white/50`}
                  >
                    {placeholder}
                  </label>
                </div>
                <Input
                  type={fieldType}
                  id={fieldName.toString()}
                  {...register(fieldName)}
                  onFocus={() => setIsActive(index)}
                  onBlur={() => setIsActive(-1)}
                  disabled={isSubmitting}
                  className='border-gray-300 bg-white px-5 font-medium placeholder:font-normal focus:border-gray-500 dark:bg-[#171717]'
                />
              </div>
              {errors[fieldName] && (
                <p key={index} className='text-[13px] font-medium text-red-500'>
                  {errors[fieldName]?.message}
                </p>
              )}
            </div>
          ),
        )}

        <LoadingButton
          disabled={isSubmitting}
          // onClick={() => {
          //   setShowOTPInput(true);
          // }}
          className='mt-3 w-full'
          loaderColor='#fff'
        >
          Sign Up
        </LoadingButton>

        {/* For testing */}
        {/* <Link href="/plans" className={buttonVariants({ variant: 'default', className: 'mt-3 w-full' })}>
          Sign Up
        </Link> */}
      </form>
      <p className='mt-2 text-sm text-black/50 dark:text-white/50'>
        Already have an account?{' '}
        <Link href='/login' className='font-semibold'>
          Log in
        </Link>
      </p>
    </section>
  );
};
