import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {EnumRoles, EnumSaveData} from "@/app/types/user.interface";

export function middleware(request: NextRequest) {
	const userCookie = request.cookies.get(EnumSaveData.user);

	if (userCookie?.value) {
		const user = JSON.parse(userCookie.value);

		if (user.role !== EnumRoles.ADMIN) {
			if (request.nextUrl.pathname.startsWith('/dashboard')) {
				return NextResponse.redirect(new URL('/', request.url));
			}
		}
	}
}

