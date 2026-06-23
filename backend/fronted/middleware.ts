import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // Log para depuración
  console.log(`Acceso a: ${request.nextUrl.pathname} | Token presente: ${!!token}`);

  // Protegemos las rutas de dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Si no hay token, redirigimos al login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};