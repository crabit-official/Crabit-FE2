/* eslint-disable @typescript-eslint/naming-convention */

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import type NextAuth from 'next-auth';

declare module 'next-auth' {
  import type { DefaultSession } from 'next-auth';

  interface Session extends DefaultSession {
    accessToken: string;
    accessTokenExpires: number;
    error?: 'RefreshAccessTokenError';
    expires: string;
    refreshToken?: string;
    socialType: string;
    user: User;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    socialType: string;
  }
}

declare module 'next-auth/jwt' {
  import type { JWT } from 'next-auth/jwt';

  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    socialType: string;
  }
}
