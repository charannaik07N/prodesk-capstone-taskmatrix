import { NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard'];
const AUTH_ROUTES = ['/login', '/register'];

/**
 * Middleware for route protection.
 * 
 * NOTE: The Supabase JS client is NOT compatible with Edge Runtime (no process.env access).
 * We read the Supabase session cookie directly here.
 * Supabase stores its session in a cookie named "sb-<project-ref>-auth-token"
 * or the generic "supabase-auth-token". We check for any sb-*-auth-token cookie.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check for Supabase session token in cookies
  const cookieHeader = request.headers.get('cookie') || '';
  
  // Supabase sets cookies matching pattern: sb-<ref>-auth-token
  // Also check for the legacy key
  const hasAuthCookie =
    cookieHeader.includes('-auth-token=') ||
    cookieHeader.includes('supabase-auth-token=') ||
    cookieHeader.includes('sb-access-token=');

  const isAuthenticated = hasAuthCookie;

  // Protect dashboard routes
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent authenticated users from visiting auth pages
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
