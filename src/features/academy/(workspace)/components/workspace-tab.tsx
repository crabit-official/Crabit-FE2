'use client';

import { FaUserPlus } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa6';
import { IoIosSettings } from 'react-icons/io';
import { MdInsertChart } from 'react-icons/md';
import { useParams, usePathname } from 'next/navigation';

import { TabButton } from '@/features/academy/components/tab-button';
import Flex from '@/shared/components/Flex';

function WorkspaceTab() {
  const pathname = usePathname();
  const params = useParams();
  const id = params.id as string;

  return (
    <Flex row="around">
      <TabButton icon={FaBookmark} label="대시보드" isActive={pathname.includes(`/academy/${id}/dashboard`)} path={`/academy/${id}/dashboard`} />
      <TabButton icon={MdInsertChart} label="챌린지 관리" isActive={pathname.includes(`/academy/${id}/challenge`)} path={`/academy/${id}/challenge`} />
      <TabButton icon={FaUserPlus} label="학원 관리" isActive={pathname.includes(`/academy/${id}/manage`)} path={`/academy/${id}/manage`} />
      <TabButton icon={IoIosSettings} label="설정" isActive={pathname.includes(`/academy/${id}/setting`)} path={`/academy/${id}/setting`} />
    </Flex>
  );
}

export default WorkspaceTab;
