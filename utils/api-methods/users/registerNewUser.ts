import { prisma_db } from '@/lib/prisma_db';
import { createHash } from 'crypto';
import { hash } from 'bcryptjs';

type UserData = {
  name: string;
  email: string;
  password: string;
};

/**
 * Registers a new user in the system.
 *
 * @param data - An object containing user details (name, email, password).
 * @returns The newly created user object, including their containerId.
 * @throws Will throw an error if the user already exists or if registration fails.
 */
export async function registerNewUser({ data }: { data: UserData }) {
  // Check if user already exists
  const isUserExists = await prisma_db.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      email: true,
    },
  });

  if (isUserExists) {
    throw new Error('User already exists');
  }

  try {
    // Generate a profile image URL from the user's email using Gravatar
    const hashedEmail = createHash('md5').update(data.email.trim().toLowerCase()).digest('hex');
    const image = `https://www.gravatar.com/avatar/${hashedEmail}`;

    // Hash the user's password for security
    const hashedPassword = await hash(data.password, 10);

    // Create the new user
    const newUser = await prisma_db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        image,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error('Failed to register new user');
  }
}
