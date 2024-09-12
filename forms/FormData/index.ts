import {  LoginFormFieldsProps, SignUpFormFieldsProps } from '@/types/FormDataTypes';

export const SignUpFormFields: SignUpFormFieldsProps[] = [
  {
    fieldName: 'name',
    fieldType: 'text',
    placeholder: 'Name',
  },
  {
    fieldName: 'email',
    fieldType: 'text',
    placeholder: 'Email',
  },
  {
    fieldName: 'password',
    fieldType: 'password',
    placeholder: 'Password',
  },
];

export const LoginFormFields: LoginFormFieldsProps[] = [
  {
    fieldName: 'email',
    fieldType: 'text',
    placeholder: 'Email',
  },
  {
    fieldName: 'password',
    fieldType: 'password',
    placeholder: 'Password',
  },
];

// export const EmailVerificationFormFields: EmailVerificationFormFieldsProps[] = [
//   {
//     fieldName: 'verificationCode',
//     fieldType: 'text',
//     placeholder: 'Verification Code',
//   },
// ];
