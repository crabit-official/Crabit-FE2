import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isTokenExpired } from './shared/utils/decoded-token';

const rotateRefreshToken = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if ((accessToken && isTokenExpired(accessToken)) || (!accessToken && !!refreshToken)) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/reissue-token`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refreshToken=${refreshToken}`,
      },
    });

    if (response.ok) {
      const setCookieHeader = response.headers.get('set-cookie');
      if (setCookieHeader) {
        const cookies = setCookieHeader.split(',').map((cookie) => cookie.trim());
        const newAccessToken = cookies.find((cookie) => cookie.startsWith('accessToken='));

        const newRefreshToken = cookies.find((cookie) => cookie.startsWith('refreshToken='));

        if (newAccessToken && newRefreshToken) {
          const res = NextResponse.next();
          res.cookies.set('accessToken', newAccessToken.split('=')[1].split(';')[0], { httpOnly: true });
          res.cookies.set('refreshToken', newRefreshToken.split('=')[1].split(';')[0], { httpOnly: true });
          return res;
        }
      }
    }
  }

  return NextResponse.next();
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/')) {
    const res = await rotateRefreshToken(request);

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 아래와 같이 시작하는 것들을 제외한 모두 경로를 매치합니다:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */ '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
