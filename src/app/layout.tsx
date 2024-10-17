import '@/shared/styles';

import React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import AuthProvider from '@/libs/next-auth/auth-provider';
import Provider from '@/libs/next-auth/session-provider';

import LoginModal from '@/features/main/components/LoginModal';
import Navbar from '@/features/main/components/Navbar';
import RegisterModal from '@/features/main/components/RegisterModal';
import Footer from '@/shared/components/Footer';
import { MSWProvider } from '@/shared/components/MSWProvider';
import { QueryProvider } from '@/shared/components/QueryProvider';
import { isMocking } from '@/shared/constants/constants';
import { initMocking } from '@/shared/mocks';

const pretendard = localFont({
  src: '../../src/app/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: '크래빗',
  description: 'Craft Your Habit 습관 형성의 시작점',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (isMocking()) {
    await initMocking();
  }

  return (
    <html lang="ko" className={`${pretendard.variable} ${roboto.variable} antialiased`}>
      <body className="bg-[#F5F5F7] font-pretendard">
        <Provider>
          <AuthProvider>
            <MSWProvider>
              <QueryProvider>
                <Navbar />
                <main className="pb-20 pt-28">{children}</main>
                <LoginModal />
                <RegisterModal />
              </QueryProvider>
              <Footer />
            </MSWProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
