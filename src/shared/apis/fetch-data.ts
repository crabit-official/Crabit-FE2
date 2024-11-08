/**
 * fetchData로 요청 시 코드 중복 및 휴먼 에러를 최소화 합니다.
 * @param endpoint 요청할 엔드포인트를 전달합니다.
 * @param method 요청의 method를 지정합니다.
 * @param body method에 따라 body가 필요할 경우 지정합니다.
 * @returns 요청에 대한 응답을 받습니다.
 */

import { cookies } from 'next/headers';

import type { IAuthResponse } from '@/shared/types/auth';

export async function fetchData<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: object,
  revalidateTag?: string,
  cache?: RequestCache,
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
  const isProduction = process.env.NODE_ENV === 'production';
  const accessToken = cookies().get('accessToken')?.value;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Cookie: `accessToken=${accessToken};` } : {}),
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  if (response.status === 401 || response.status === 404) {
    const cookieStore = cookies();
    const refreshToken = cookies().get('refreshToken')?.value;

    if (refreshToken) {
      const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/reissue-token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(refreshToken ? { Cookie: `refreshToken=${refreshToken};` } : {}),
        },
        next: revalidateTag ? { tags: [revalidateTag] } : undefined,
        cache,
      });

      if (refreshResponse.ok) {
        const data = (await refreshResponse.json()) as IAuthResponse;

        cookieStore.set('accessToken', data.result.accessToken, {
          maxAge: 3600, // 1시간
          httpOnly: true,
          secure: isProduction,
        });

        // 재시도: 새로운 토큰으로 요청
        return fetchData<T>(endpoint, method, body);
      }
    }

    throw new Error('에러가 발생하였습니다');
  }

  return (await response.json()) as Promise<T>;
}
