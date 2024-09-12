import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from './env';
import { prisma_db } from './prisma_db';
import { getUserByEmail } from '@/utils/api-methods';
import { compareSync } from 'bcryptjs';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma_db),
  secret: env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signup',
  },
  providers: [
    GoogleProvider({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        const user = await getUserByEmail(credentials.email);

        // User existence and password validation
        if (!user) {
          throw new Error('Account with this email does not exist');
        }

        // Check the user's signup method
        // is no password is present, that means the user has signed up via social provider, so return
        // else check the password
        if (!user.password) {
          throw new Error('Invalid login method. Pls use the same method to login');
        }

        console.log('userPassword', user.password);
        console.log('credentialsPassword', credentials.password);

        // Check if password is correct
        const isPasswordCorrect = compareSync(
          credentials.password,
          user.password,
        );

        // const hashedPassword = await hash(credentials.password, 10);
        if (!isPasswordCorrect) {
          throw new Error('Invalid password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
        },
      };
    },
  },
};

export { authOptions };
