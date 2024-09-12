'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useUserLoggedIn = () => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['userLoggedIn', session?.user?.email],
    queryFn: async () => {
      return session;
    },
  });
};
