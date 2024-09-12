'use server';

import { prisma_db } from '@/lib/prisma_db';
import { useQuery } from '@tanstack/react-query';

// TODO: remove password from response
export  async function getUserByEmail(email: string) {
  const user = await prisma_db.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}
