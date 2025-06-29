import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Only run middleware on these paths
const protectedPaths = [
  '/dashboard',
  '/api',
];

const publicPaths = [
  '/login',
  '/register',
  '/_next',
  '/favicon.ico',
  '/api/auth',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Only run middleware for protected paths
  const shouldProtect = protectedPaths.some(path => pathname.startsWith(path));
  if (!shouldProtect) {
    return NextResponse.next();
  }

  // Check for token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If no token, redirect to login with callback URL
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on specific paths
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
};
