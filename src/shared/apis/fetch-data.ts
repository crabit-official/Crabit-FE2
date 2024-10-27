import type { Session } from 'next-auth';

export async function fetchData<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: object,
  session?: { accessToken: string },
): Promise<T> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const { accessToken } = session as Session;

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  return response.json() as Promise<T>;
}
