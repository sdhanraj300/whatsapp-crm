import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If token exists, user is authenticated
        return !!token;
      },
    },
    pages: {
      signIn: '/login', // Redirect to login page if not authenticated
    },
  }
);

// Protect specific routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/auth/session',
  ],
};
