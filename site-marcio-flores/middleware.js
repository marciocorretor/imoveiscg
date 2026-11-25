import {NextResponse} from 'next/server';
import {tok} from '@/lib/auth';
export const config={matcher:['/painel/:path*']};
export async function middleware(req){
  if(req.nextUrl.pathname==='/painel/login')return NextResponse.next();
  const c=req.cookies.get('adm');
  if(c&&c.value===await tok())return NextResponse.next();
  return NextResponse.redirect(new URL('/painel/login',req.url));
}
