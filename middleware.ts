import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// import { getLocalStorage } from './hooks/useLocalStorage';

const HOME_URL = '/';
const SIGNUP_URL = '/signup';

/**
 * Checks if the user is logged-in by verifying the presence of a session token in cookies.
 * @param req - The NextRequest object.
 * @returns True if the user is authenticated, otherwise false.
 */
const isUserLoggedIn = (req: NextRequest): boolean => {
  try {
    const cookieStore = cookies();

    // Session token from NextAuth Social Providers
    const sessionToken = cookieStore.get('next-auth.session-token')?.value;

    // Secure Session token for production env
    const secureSessionToken = cookieStore.get(
      '__Secure-next-auth.session-token',
    )?.value;

    // Token from NextAuth Credentials Provider
    const token = cookieStore.get('token')?.value;

    // if  no session token and no token, return false
    if (!sessionToken && !token && !secureSessionToken) {
      return false;
    }

    // Important
    // TODO: Verify the session token
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Middleware to handle redirection.
 * - If the user is logged-in and tries to access /login or /signup, they will be redirected to the home page.
 * - If the user is not logged-in and tries to access restricted paths, they will be redirected to the home page.
 * @param req - The NextRequest object.
 * @returns NextResponse object to redirect or proceed with the request.
 */
export const middleware = async (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  const authPaths = ['/login', '/signup'];
  const restrictedPaths = ['/dashboard'];

  // Check if the user is logged-in and accessing /login or /signup
  if (isUserLoggedIn(req) && authPaths.includes(pathname)) {
    const homeUrl = new URL(HOME_URL, req.url);
    return NextResponse.redirect(homeUrl);
  }

  // Check if the user is not logged-in and trying to access restricted paths
  if (!isUserLoggedIn(req) && restrictedPaths.includes(pathname)) {
    url.pathname = SIGNUP_URL;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

/**
 * Configuration for the middleware to match specific paths.
 * @type {import('next/server').Config}
 */
export const config = {
  matcher: [
    '/login/:path*',
    '/signup/:path*',
    '/dashboard/:path*',
  ], // Paths to apply middleware
};
