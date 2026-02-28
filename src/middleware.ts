import { createMiddlewareSupabaseClient } from '@/lib/supabase/middleware-client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  const supabase = createMiddlewareSupabaseClient(req)
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Redirigir a login si no hay sesión en rutas protegidas
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  // Redirigir a dashboard si ya hay sesión en rutas de auth
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}
