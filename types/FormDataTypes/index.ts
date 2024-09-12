import { LoginFormSchema, SignupFormSchema } from '@/forms/Schema';
import { z } from 'zod';

export type SignUpFormFieldsProps = {
  fieldName: keyof z.infer<typeof SignupFormSchema>;
  fieldType: 'text' | 'email' | 'password';
  placeholder: string;
};

export type LoginFormFieldsProps = {
  fieldName: keyof z.infer<typeof LoginFormSchema>;
  fieldType: 'text' | 'email' | 'password';
  placeholder: string;
};
