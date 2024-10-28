'use client';

import React from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import Image from 'next/image';

import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { IAcademyInfoResult, IAcademyProfile } from '@/shared/types/acadmy';
import { getRoleName } from '@/shared/utils/academyRole';

interface IAcademyTitleProps {
  academyInfo: IAcademyInfoResult['result'];
  profile: IAcademyProfile;
}

function AcademyTitle({ profile, academyInfo }: IAcademyTitleProps) {
  return (
    <Flex row="between" className="border-b border-solid border-gray-200 px-14 pb-4 md:px-0">
      <Flex column="center" className="gap-4">
        <Typography size="h3" className="break-keep">
          {academyInfo.academy.name}의 대시보드
        </Typography>
        <Typography size="h5" className="break-keep text-sm" as="p">
          안녕하세요! 오늘 우리학원의 챌린지 현황을 확인해보세요
        </Typography>
      </Flex>

      <div className="bg-red relative">
        <CiMenuKebab className="peer block cursor-pointer sm:hidden" />
        <div className="absolute right-2 top-5 hidden w-[150px] peer-hover:block">
          <Flex column="center" className="bg-white p-4">
            <Typography size="h5" className="ellipsis max-w-36 truncate">
              {profile?.nickname}
            </Typography>
            <Typography size="h5" as="p" className="ellipsis max-w-36 gap-1 truncate text-xs">
              크래빗 참여학원 {getRoleName(profile.academyRole)}
            </Typography>
          </Flex>
        </div>
      </div>
      <Flex row="between" className="hidden max-w-56 cursor-pointer items-center gap-4 rounded-lg px-3 py-2 sm:flex">
        {profile?.profileImageUrl ? (
          <Image
            alt="profile img"
            className="size-10 rounded-2xl object-cover"
            width={30}
            height={30}
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile?.profileImageUrl}`}
          />
        ) : (
          <Avatar size="md" variant="squareRound" />
        )}
        <Flex column="center">
          <Typography size="h5" className="ellipsis max-w-36 truncate">
            {profile?.nickname}
          </Typography>
          <Typography size="h5" as="p" className="ellipsis max-w-36 gap-1 truncate text-xs">
            크래빗 참여학원 {getRoleName(profile.academyRole)}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default AcademyTitle;
