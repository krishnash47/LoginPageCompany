'use client';

import React, { useState } from 'react';

// Tanstack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

// Shadcn UI
import { Toaster } from '@/components/ui';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
};
