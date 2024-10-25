'use client';

import { IoPerson } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

import ListRow from '@/features/academy/alert/components/ListRow';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function SettingList({ id }: { id: string }) {
  const router = useRouter();

  return (
    <>
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
