'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { isMocking } from '@/shared/constants/constants';
import { initMocking } from '@/shared/mocks';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(!isMocking());

  useEffect(() => {
    if (!isReady) {
      (async () => {
        await initMocking();

        setIsReady(true);
      })();
    }
  }, [isReady]);

  if (!isReady) return null;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
