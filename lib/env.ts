import { z } from 'zod';

const envSchema = z.object({
  // Google OAuth credentials
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(1),
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: z.string().min(1),

  // Next Auth Secret
  NEXT_PUBLIC_NEXTAUTH_SECRET: z.string().min(1),

});

export const env = envSchema.parse({
  // Google OAuth credentials
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,

  // Next Auth Secret
  NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
});
