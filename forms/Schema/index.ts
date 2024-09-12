import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Email is invalid'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be less than 16 characters'),
});

export const LoginFormSchema = z.object({
  email: z.string().email('Email is invalid'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be less than 16 characters'),
});
