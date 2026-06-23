import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Obtenemos el token (usualmente llamado JSESSIONID en Spring Boot)
  const token = request.cookies.get('JSESSIONID') || request.cookies.get('token');

  const { pathname } = request.nextUrl;

  // 2. Si intenta entrar a una ruta protegida y NO tiene token
  if (pathname.startsWith('/dashboard') && !token) {
    console.log("Acceso denegado a:", pathname, "Redirigiendo a /login");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Si ya tiene token y está en el login, redirigirlo al dashboard
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 4. Configuración del matcher (rutas que el middleware debe interceptar)
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};