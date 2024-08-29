import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/']);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId } = auth();
  const isSignInRoute = req.nextUrl.pathname === '/sign-in';
  const isSelectOrgRoute = req.nextUrl.pathname === '/select-org';

  if (userId && isProtectedRoute(req)) {
    let path = '/select-org';
    if (orgId) {
      path = `/organization/${orgId}`;
    }
    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  if (!userId && !isProtectedRoute(req) && !isSignInRoute) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  if (userId && !orgId && !isSelectOrgRoute && !isSignInRoute) {
    const orgSelection = new URL('/select-org', req.url);
    return NextResponse.redirect(orgSelection);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
