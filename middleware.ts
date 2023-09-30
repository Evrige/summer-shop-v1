import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {EnumRoles, EnumSaveData, IUserState} from "@/app/types/user.interface";
import {getStorageLocal} from "@/app/utils/local-storage";

export function middleware(request: NextRequest) {
	const user:IUserState = getStorageLocal(EnumSaveData.user)
	if (user?.role === EnumRoles.ADMIN){
		if (request.nextUrl.pathname.startsWith('/dashboard'))
			return NextResponse.redirect(new URL('/', request.url))
	}
}

