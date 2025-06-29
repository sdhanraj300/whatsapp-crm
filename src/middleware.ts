import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware() {
  // For static export, we'll handle auth client-side
  // This middleware will only run on the server in production
  return NextResponse.next();
}

export const config = {
  // Skip all static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
