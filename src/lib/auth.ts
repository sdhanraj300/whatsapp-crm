import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth-options";
import { NextRequest } from "next/server";

// Extend the default User type to include role
declare module "next-auth" {
  interface User {
    role?: string;
  }
}

export interface SessionWithRole {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
    role?: string;
  };
  expires: string;
}

export async function auth() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export async function currentUser() {
  const session = await auth();
  return session?.user;
}

export async function currentRole() {
  const session = await auth() as SessionWithRole | null;
  return session?.user?.role;
}

export async function withAuth(callback: (user: any) => Promise<Response> | Response) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }
  return callback(session.user);
}

export async function apiAuthMiddleware(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }
  return null;
}

// Export the auth function as default
export default auth;
