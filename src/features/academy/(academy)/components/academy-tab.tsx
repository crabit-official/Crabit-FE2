'use client';

import { FaBell } from 'react-icons/fa';
import { IoMdHome, IoMdSettings } from 'react-icons/io';
import { usePathname } from 'next/navigation';

import { TabButton } from '@/features/academy/components/tab-button';
import Flex from '@/shared/components/Flex';

function AcademyTab() {
  const pathname = usePathname();

  return (
    <Flex row="around">
      <TabButton icon={IoMdHome} label="내 학원" isActive={pathname.includes('/academy/my')} path="/academy/my" />
      <TabButton icon={FaBell} label="학원 알림" isActive={pathname.includes('/academy/alert')} path="/academy/alert" />
      <TabButton icon={IoMdSettings} label="학원 관리" isActive={pathname.includes('/academy/setting')} path="/academy/setting" />
    </Flex>
  );
}

export default AcademyTab;
