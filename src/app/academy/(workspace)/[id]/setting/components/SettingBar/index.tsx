'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { ACADEMY_ROLE } from '@/shared/enums/academy';

interface ISettingBarProps {
  academyId: number;
  academyRole: ACADEMY_ROLE;
}

function SettingBar({ academyId, academyRole }: ISettingBarProps) {
  const pathname = usePathname();

  return (
    <Flex row="start" className="mb-2 w-full gap-8 border-b border-solid border-gray-100 py-5 lg:w-40 lg:flex-col">
      <Flex column="start" className="gap-2">
        <Typography size="h4">내 정보</Typography>
        <Link
          href={`/academy/${academyId}/setting`}
          className={`${pathname === `/academy/${academyId}/setting` ? 'text-main-deep-pink' : 'text-gray-700'} gap-1 font-normal text-gray-600 hover:opacity-60`}
        >
          프로필 수정
        </Link>
      </Flex>
      {ACADEMY_ROLE.STUDENT !== academyRole && (
        <Flex column="start" className="gap-2">
          <Typography size="h4">기관</Typography>
          {ACADEMY_ROLE.PRINCIPAL === academyRole && (
            <>
              <Link
                href={`/academy/${academyId}/setting/management/institution`}
                className={`${pathname === `/academy/${academyId}/setting/management/institution` ? 'text-main-deep-pink' : 'text-gray-700'} gap-1 font-normal text-gray-600 hover:opacity-60`}
              >
                기관 정보 수정
              </Link>
              <Link
                href={`/academy/${academyId}/setting/management/invitation`}
                className={`${pathname === `/academy/${academyId}/setting/management/invitation` ? 'text-main-deep-pink' : 'text-gray-700'} gap-1 font-normal text-gray-600 hover:opacity-60`}
              >
                초대 코드
              </Link>
              <Link
                href={`/academy/${academyId}/setting/management/instructor`}
                className={`${pathname === `/academy/${academyId}/setting/management/instructor` ? 'text-main-deep-pink' : 'text-gray-700'} gap-1 font-normal text-gray-600 hover:opacity-60`}
              >
                관리자 관리
              </Link>
            </>
          )}
          <Link
            href={`/academy/${academyId}/setting/management/student`}
            className={`${pathname === `/academy/${academyId}/setting/management/student` ? 'text-main-deep-pink' : 'text-gray-700'} gap-1 font-normal text-gray-600 hover:opacity-60`}
          >
            학생 관리
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
export default SettingBar;
