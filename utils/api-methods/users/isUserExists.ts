import { prisma_db } from '@/lib/prisma_db';

// TODO: remove password from response
export  async function isUserExists(email: string): Promise<boolean> {
  const user = await prisma_db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
    },
  });
  return user?.email ? true : false;
}
