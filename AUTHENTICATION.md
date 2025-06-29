# Authentication Flow

This document outlines the authentication flow and how to test it.

## How It Works

1. **Middleware Protection**:
   - Protected routes are defined in `src/middleware.ts`
   - Unauthenticated users are redirected to `/login` with a `callbackUrl` parameter
   - Public routes (login, register, etc.) are excluded from authentication checks

2. **Login Flow**:
   - User submits credentials on the login page
   - The form sends a request to NextAuth.js's credential provider
   - On success, the user is redirected to the `callbackUrl` or `/dashboard`
   - The session is stored in an HTTP-only cookie

3. **Session Management**:
   - The session is checked on the server for server components
   - Client components use the `useSession` hook to access session data
   - The session is automatically refreshed when needed

## Testing the Authentication

1. **Test Login**:
   - Navigate to `/login`
   - Enter valid credentials
   - You should be redirected to `/dashboard`
   - The page should show your user information

2. **Test Protected Routes**:
   - Try accessing `/dashboard` while logged out
   - You should be redirected to `/login` with a `callbackUrl` parameter
   - After logging in, you should be redirected back to the original URL

3. **Test Logout**:
   - Click the logout button
   - You should be redirected to the login page
   - Trying to access protected routes should redirect you back to login

## Environment Variables

Make sure these environment variables are set in your production environment:

```
NEXTAUTH_URL=your-production-url
NEXTAUTH_SECRET=your-secure-secret
DATABASE_URL=your-database-connection-string
```

## Troubleshooting

### Redirect Loop Issues

If you experience redirect loops:

1. Clear your browser cookies for the domain
2. Verify that `NEXTAUTH_URL` is set correctly in your environment
3. Check the browser's network tab for failed authentication requests
4. Look for errors in the browser console and server logs

### Common Issues

- **Session not persisting**: Ensure `NEXTAUTH_SECRET` is set and consistent across deployments
- **CSRF errors**: Make sure your `NEXTAUTH_URL` matches the domain exactly
- **CORS issues**: Verify your CORS settings in `next.config.js` and API routes

## Security Considerations

- Always use HTTPS in production
- Set appropriate cookie security flags
- Implement rate limiting on authentication endpoints
- Use secure, HTTP-only cookies for session storage
- Keep dependencies up to date
