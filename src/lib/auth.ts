'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { createElement } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

// Simple auth store
let authState = {
  user: null as User | null,
  loading: true,
  isAuthenticated: false,
};

const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export function useAuth() {
  const [state, setState] = useState(authState);

  useEffect(() => {
    const listener = () => setState({ ...authState });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = {
        id: '1',
        email,
        name: 'Demo User',
        role: 'user',
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }

      authState = {
        user,
        loading: false,
        isAuthenticated: true,
      };
      
      notifyListeners();
      return { error: undefined };
    } catch (error) {
      console.error('Sign in failed:', error);
      return { error: 'Failed to sign in' };
    }
  };

  const signOut = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    
    authState = {
      user: null,
      loading: false,
      isAuthenticated: false,
    };
    
    notifyListeners();
  };

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        if (storedUser) {
          const user = JSON.parse(storedUser);
          authState = {
            user,
            loading: false,
            isAuthenticated: true,
          };
        } else {
          authState = {
            user: null,
            loading: false,
            isAuthenticated: false,
          };
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        authState = {
          user: null,
          loading: false,
          isAuthenticated: false,
        };
      }
      notifyListeners();
    };

    checkAuth();
  }, []);

  return {
    ...state,
    signIn,
    signOut,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { loading } = useAuth();
  
  if (loading) {
    return createElement('div', null, 'Loading...');
  }
  
  return createElement(React.Fragment, null, children);
}

// For backward compatibility
export async function auth() {
  return {
    user: authState.user,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  };
}

export async function currentUser() {
  return authState.user;
}

export async function currentRole() {
  return authState.user?.role || null;
}

export async function withAuth(callback: (user: User) => Promise<Response> | Response) {
  if (!authState.isAuthenticated || !authState.user) {
    return new Response('Unauthorized', { status: 401 });
  }
  return callback(authState.user);
}

// Export useAuth as the default export
export default useAuth;
