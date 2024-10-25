'use client';

import React from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

const imgUrl =
  'https://plus.unsplash.com/premium_photo-1681396937086-8a28edd8d257?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3VpdGFyfGVufDB8fDB8fHww';

function AcademyTitle() {
  return (
    <Flex row="between" className="border-b border-solid border-gray-200 px-14 pb-4 md:px-0">
      <Flex column="center" className="gap-4">
        <Typography size="h3" className="break-keep">
          조이 학원의 대시보드
        </Typography>
        <Typography size="h5" className="break-keep text-sm" as="p">
          안녕하세요! 오늘 우리학원의 챌린지 현황을 확인해보세요
        </Typography>
      </Flex>

      <div className="bg-red relative">
        <CiMenuKebab className="peer block cursor-pointer sm:hidden" />
        <div className="absolute right-2 top-5 hidden w-[150px] peer-hover:block">
          <Flex column="center" className="rounded-xl bg-white p-4">
            <Typography size="h5" className="ellipsis max-w-36 truncate">
              정조이
            </Typography>
            <Typography size="h5" as="p" className="ellipsis max-w-36 gap-1 truncate text-xs">
              크래빗 참여학원 원장
            </Typography>
          </Flex>
        </div>
      </div>
      <Flex row="between" className="hidden max-w-56 cursor-pointer items-center gap-4 rounded-lg px-3 py-2 sm:flex">
        <Image alt="profile img" className="size-10 rounded-2xl object-cover" width={30} height={30} src={imgUrl} />
        <Flex column="center">
          <Typography size="h5" className="ellipsis max-w-36 truncate">
            정조이
          </Typography>
          <Typography size="h5" as="p" className="ellipsis max-w-36 gap-1 truncate text-xs">
            크래빗 참여학원 원장
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default AcademyTitle;
