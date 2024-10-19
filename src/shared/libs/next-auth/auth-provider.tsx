'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

interface IProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: IProps) {
  const { data: session } = useSession();

  useEffect(() => {
    /* Refresh Token 만료되었을 때 */
    if (session?.error === 'RefreshAccessTokenError') {
      // alert('리프레시 토큰 만료. 로그아웃 합니다');
      signOut({ callbackUrl: '/' });
    }
  }, [session]);

  return children;
}
