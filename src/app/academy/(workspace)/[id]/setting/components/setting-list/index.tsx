'use client';

import React from 'react';
import { IoPerson } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

import ListRow from '@/features/academy/alert/components/ListRow';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { ACADEMY_ROLE } from '@/shared/enums/academy';

function SettingList({ id, academyRole }: { academyRole: ACADEMY_ROLE; id: string }) {
  const router = useRouter();

  return (
    <>
      {academyRole === ACADEMY_ROLE.PRINCIPAL ? (
        <ListRow
          contents={
            <Flex row="start" className="gap-2">
              <IoPerson size={24} />
              <Typography size="h5">학원 가입 신청 조회</Typography>
            </Flex>
          }
          withArrow
          onClick={() => router.push(`/academy/${id}/application`)}
        />
      ) : null}
      <ListRow
        contents={
          <Flex row="start" className="gap-2">
            <IoPerson size={24} />
            <Typography size="h5">학생 리스트 조회</Typography>
          </Flex>
        }
        withArrow
      />
      <ListRow
        contents={
          <Flex row="start" className="gap-2">
            <IoPerson size={24} />
            <Typography size="h5">강사 리스트 조회</Typography>
          </Flex>
        }
        withArrow
      />
      <ListRow
        contents={
          <Flex row="start" className="gap-2">
            <IoPerson size={24} />
            <Typography size="h5">전체 학원 리스트 조회</Typography>
          </Flex>
        }
        withArrow
      />
    </>
  );
}

export default SettingList;
