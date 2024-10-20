'use client';

import { FaUserPlus } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa6';
import { IoIosSettings } from 'react-icons/io';
import { MdInsertChart } from 'react-icons/md';
import { useParams, usePathname } from 'next/navigation';

import { TabButton } from '@/features/academy/components/tab-button';
import Flex from '@/shared/components/Flex';

function WorkspaceTab({ role }: { role: string }) {
  const pathname = usePathname();
  const params = useParams();
  const id = params.id as string;

  let content;

  if (role === 'PRINCIPAL' || role === 'INSTRUCTOR') {
    content = (
      <>
        <TabButton icon={MdInsertChart} label="챌린지 관리" isActive={pathname.includes(`/academy/${id}/challenge`)} path={`/academy/${id}/challenge`} />
        <TabButton
          className="size-[19px]"
          icon={FaUserPlus}
          label="학원 관리"
          isActive={pathname.includes(`/academy/${id}/manage`)}
          path={`/academy/${id}/manage`}
        />
      </>
    );
  }

  if (role === 'STUDENT') {
    // TODO: 경로 수정
    content = (
      <TabButton className="size-[19px]" icon={FaUserPlus} label="MY 챌린지" isActive={pathname.includes(`/academy/my/${id}`)} path={`/academy/my/${id}`} />
    );
  }

  return (
    <Flex row="around">
      <TabButton
        icon={FaBookmark}
        label="대시보드"
        isActive={pathname.includes(`/academy/${id}/dashboard`)}
        path={`/academy/${id}/dashboard`}
        className="size-4"
      />
      {content}
      <TabButton icon={IoIosSettings} label="설정" isActive={pathname.includes(`/academy/${id}/setting`)} path={`/academy/${id}/setting`} />
    </Flex>
  );
}

export default WorkspaceTab;
