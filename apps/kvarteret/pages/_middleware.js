import { getRedirectBySlugCached } from 'dak-components/lib/cms/queries/redirects';
import { NextResponse, NextRequest } from 'next/server'
export async function middleware(req, ev) {
    const { pathname } = req.nextUrl

    const redirect = await getRedirectBySlugCached(pathname.slice(1, -1));   
    if (redirect) {
        return NextResponse.redirect(redirect.destination)
    }
    return NextResponse.next()
}