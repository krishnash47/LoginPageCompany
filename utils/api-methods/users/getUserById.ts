'use server';

import { prisma_db } from '@/lib/prisma_db';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

// TODO: remove password from response
export  async function getUserById(id: string) {
  const user = await prisma_db.user.findUnique({
    where: {
      id: id,
    },
  });
  return user as User | null;
}
