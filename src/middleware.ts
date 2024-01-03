import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const user: undefined | string = request.cookies.get("user")?.value;

    if (request.nextUrl.pathname.startsWith('/login')) {
        if (user) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    if (request.nextUrl.pathname.startsWith('/register')) {
        if (user) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }


    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    // }
}