'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-center">
        <Image src="/images/logo_app.png" width={100} height={100} alt="logo" className="mx-auto mb-4" />
        <Typography size="h1" className="mb-2 text-main-deep-pink">
          에러가 발생했습니다.
        </Typography>
        <Typography size="body0" className="mb-6 text-gray-700">
          {error.message}
        </Typography>
      </div>
      <Flex className="flex w-[300px] flex-col gap-4">
        <Button
          onClick={() => {
            router.refresh();
            reset();
          }}
        >
          재시도
        </Button>
        <Button onClick={() => router.push('/')}>홈으로 이동</Button>
      </Flex>
    </div>
  );
}
