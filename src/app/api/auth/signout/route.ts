import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST() {
  try {
    const session = await auth();
    if (session) {
      // Invalidate the session
      // This is a placeholder - in a real app, you'd invalidate the session token
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sign out error:', error);
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    );
  }
}
