'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

import ChannelService from '@/shared/components/ChannelTalk';

type Props = {
  children: React.ReactNode;
};

export function QueryProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1min
          },
        },
      }),
  );

  useEffect(() => {
    ChannelService.loadScript();

    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY || '',
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
