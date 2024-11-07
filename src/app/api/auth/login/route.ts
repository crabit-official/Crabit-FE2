import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { setAuthCookies } from '@/shared/apis/set-auth-cookie';
import type { IAuthResponse, ICommonResponse } from '@/shared/types/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // 백엔드 로그인 API 호출
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData: ICommonResponse = await res.json();
    return NextResponse.json(
      {
        success: errorData.isSuccess,
        code: errorData.code,
        message: errorData.message || '로그인에 실패하였습니다.',
      },
      { status: res.status },
    );
  }

  const data: IAuthResponse = await res.json();

  // 쿠키 설정
  setAuthCookies(data.result);

  return NextResponse.json(data);
}
