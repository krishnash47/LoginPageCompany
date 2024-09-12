import { prisma_db } from '@/lib/prisma_db';
import { useQuery } from '@tanstack/react-query';

// TODO: remove password from response
export async function getUser({ email, id }: { email?: string; id?: string }) {
  const user = await prisma_db.user.findMany({
    where: {
      OR: [
        {
          email: email,
        },
        {
          id: id,
        },
      ],
    },
  });
  return user;
}

export const useGetUser = ({ email, id }: { email?: string; id?: string }) => {
  return useQuery({
    queryKey: [email, id],
    queryFn: async () => {
      if (!email && !id) return;
      const user = await prisma_db.user.findMany({
        where: {
          OR: [
            {
              email: email,
            },
            {
              id: id,
            },
          ],
        },
      });
      return user;
    },
  });
};
