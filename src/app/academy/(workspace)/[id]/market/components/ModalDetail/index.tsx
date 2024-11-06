'use client';

import React from 'react';
import { GoX } from 'react-icons/go';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function ModalDetail() {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 z-50 size-full bg-black/60 backdrop-blur-sm" onClick={() => router.back()}>
      <Flex rowColumn="center" className="size-full px-4">
        <div
          className="relative flex min-h-[500px] w-full max-w-[500px] flex-col overflow-hidden rounded-2xl bg-white sm:w-2/3"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <button type="button" className="absolute right-4 top-4 cursor-pointer font-bold text-black hover:text-main-pink" onClick={() => router.back()}>
            <GoX />
          </button>
          <Image src="/images/test.jpeg" alt="test" width={480} height={100} className="h-64 w-full object-cover" />
          <Flex column="between" className="h-full p-6">
            <Flex column="start" className="gap-4">
              <Flex row="start" className="gap-2">
                <div className="rounded-2xl bg-main-deep-pink px-2 py-1 text-xs font-medium text-white">공식 챌린지</div>
                <div className="rounded-2xl bg-neutral-500/60 px-2 py-1 text-xs font-medium text-white">공부 챌린지</div>
              </Flex>
              <Flex column="start" className="px-1">
                <Typography size="h4" className="break-keep">
                  감사일기 챌린지 ✏️
                </Typography>
                <Typography size="h5" as="p" className="break-keep text-sm opacity-60">
                  진행 방법: 매일 하루를 되돌아보고, 감사했던 일을 적어보는 감사일기 챌린지에요. 이번주는 우리 가족과 나의 친구에 대해 감사한 것을 적어봅시다!
                </Typography>
              </Flex>
            </Flex>
            <Button className="mt-4 bg-main-deep-pink font-medium text-white">우리 학원에 배포</Button>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}

export default ModalDetail;
