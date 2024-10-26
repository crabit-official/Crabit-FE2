import type { AxiosError } from 'axios';
import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { axiosInstance } from '@/shared/libs/axios-instance';
import type { IApiResponse, ILoginResponse } from '@/shared/types/profile';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await axiosInstance.post<ILoginResponse>('/api/v1/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data) {
            return {
              accessToken: res.data.result.accessToken,
              refreshToken: res.data.result.refreshToken,
              socialType: res.data.result.socialType,
              globalRole: res.data.result.globalRole,
              profileImageUrl: res.data.result.profileImageUrl,
              name: res.data.result.name,
            } as User;
          }
        } catch (error) {
          const axiosError = error as AxiosError<IApiResponse>;
          throw new Error((axiosError.response?.data?.message as string) ?? '로그인에 실패했습니다.');
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },

  events: {
    // signOut 할 때 실행되는 이벤트
    async signOut(message) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'members/json',
          'Authorization': `Bearer ${message.token.accessToken}`,
        },
      });
    },
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          socialType: user.socialType,
          accessTokenExpires: Math.floor(Date.now() / 1000) + 60 * 57,
          globalRole: user.globalRole,
          name: user.name,
          profileImageUrl: user.profileImageUrl,
        };
      }

      // 현재시간으로 토큰 만료되었는지 판단
      const nowTime = Math.floor(Date.now() / 1000);
      const shouldRefreshTime = token.accessTokenExpires - nowTime;

      // 토큰이 만료되지 않았을 때
      if (shouldRefreshTime > 0) {
        return token;
      }

      // 토큰이 만료 되었을 때 - 리프레시 토큰 로직
      try {
        const res = await axiosInstance.get('/api/v1/auth/reissue-token', {
          headers: {
            Authorization: `Bearer ${token.refreshToken}`,
          },
        });

        return {
          ...token,
          refreshToken: res.data.result.refreshToken,
          accessToken: res.data.result.accessToken,
          accessTokenExpires: Math.floor(Date.now() / 1000) + 60 * 57,
        };
      } catch {
        /* 리프레시 토큰 에러로 클라이언트에 에러 내용 전달 후 클라이언트에서 처리 -> Provider로 처리함 */
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    },
    session({ session, token }: { session: Session; token: JWT }) {
      /* 클라이언트에서 확인할 때 호출 */

      const newSession = { ...session };

      if (token) {
        newSession.accessToken = token.accessToken;
        newSession.refreshToken = token.refreshToken;
        newSession.socialType = token.socialType;
        newSession.globalRole = token.globalRole;
        newSession.profileImageUrl = token.profileImageUrl;
        newSession.name = token.name;
      }

      return newSession;
    },
  },
};
