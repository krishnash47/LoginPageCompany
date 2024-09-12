'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Zod and RHF
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

// Form Data and Schema
import { LoginFormSchema } from '@/forms/Schema';
import { LoginFormFields } from '@/forms/FormData';

// Shadcn ui
import { Input } from '@/components/ui';

// Next Auth
import { signIn } from 'next-auth/react';

// Api Helpers

// Components
import { LoadingButton } from '@/components/custom';
import { GoogleLoginButton } from '@/components/common';
import { getUserByEmail } from '@/utils/api-methods';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export const LoginForm: React.FC = () => {
  const [isActive, setIsActive] = useState<number>(-1);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleFormSubmit: SubmitHandler<
    z.infer<typeof LoginFormSchema>
  > = async (data: z.infer<typeof LoginFormSchema>) => {
    data;

    const userData = await getUserByEmail(data.email);

    // Check if user exists
    if (!userData) {
      toast({
        variant: 'destructive',
        description: (
          <p>
            Account with{' '}
            <span className='font-semibold'>{data.email}&nbsp;</span>email does
            not exist.&nbsp;
          </p>
        ),
      });
      return;
    }

    // Check if password exists
    if (!userData.password) {
      toast({
        variant: 'destructive',
        description: (
          <p>
            <span className='font-semibold'>Invalid Login method.</span>Please
            use the same login method as you used to register.
          </p>
        ),
      });
      return;
    }

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      // callbackUrl: '/dashboard',
    });

    if (!res?.ok) {
      toast({
        variant: 'destructive',
        description: <p>{res?.error}&nbsp;</p>,
      });
      return;
    }

    router.push(`/dashboard`);
  };

  return (
    <section>
      <div>
        <GoogleLoginButton />
      </div>
      <div className='my-3 flex items-center justify-center gap-3 text-sm text-gray-500'>
        <span className='h-[0.5px] w-[100px] bg-gray-300' />
        or
        <span className='h-[0.5px] w-[100px] bg-gray-300' />
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {LoginFormFields.map(({ fieldName, placeholder, fieldType }, index) => (
          <div key={index}>
            <div className='relative mt-2'>
              <div
                className={`absolute left-0 ${
                  isActive === index || getValues(fieldName) != ''
                    ? 'top-0'
                    : 'top-[50%]'
                } ml-2 -translate-y-1/2 transform bg-[#FFF] px-2 leading-none duration-150 dark:bg-[#171717]`}
              >
                <label
                  htmlFor={`${fieldName.toString()}`}
                  className={`${
                    isActive === index || getValues(fieldName) != ''
                      ? 'text-[11px]'
                      : 'text-[14px]'
                  } font-medium text-black/50 duration-150 dark:text-white/50`}
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
        ))}
        <LoadingButton
          disabled={isSubmitting}
          className='mt-3 w-full'
          loaderColor='#fff'
        >
          Login
        </LoadingButton>
      </form>
      <p className='mt-2 text-sm text-black/50 dark:text-white/50'>
        Don&apos;t have an account?{' '}
        <Link href='/signup' className='font-semibold'>
          Sign up
        </Link>
      </p>
    </section>
  );
};
