import { NextRequest, NextResponse } from 'next/server';

// Hashing function from bcrypt
import { hash } from 'bcryptjs';
import { isUserExists, registerNewUser } from '@/utils/api-methods';

// API helper functions


export async function POST(request: NextRequest) {
  try {

    // TODO: Body Parser with the help of zod
    const { userName, userEmail, userPassword } = await request.json();

    // Check if user already exists
    const userData = await isUserExists(userEmail);
    if (userData) {
      return NextResponse.json({
        data: null,
        message: 'User already exists',
      });
    }

    const hashedPassword = await hash(userPassword, 10);

    const res = await registerNewUser({
      data: {
        name: userName,
        email: userEmail,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      data: res,
      message: 'User registered successfully',
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      message: 'Error registering user',
    });
  }
}
