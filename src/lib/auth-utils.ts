import { auth } from './auth';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const session = await auth();
  
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
  }
  
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  
  if (session.user?.role !== 'ADMIN') {
    redirect('/unauthorized');
  }
  
  return session;
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user || null;
}

export async function getSession() {
  return await auth();
}
