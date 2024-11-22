'use client';

import { FiUserX } from 'react-icons/fi';
import { LuUserCog } from 'react-icons/lu';
import { RiLockLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

import LinkBox from '@/app/profile/components/LinkBox';
import ProfileBox from '@/app/profile/components/ProfileBox';
import Flex from '@/shared/components/Flex';

function Sidebar() {
  const pathname = usePathname();

  return (
    <Flex column="start" className="size-full gap-4 rounded-xl border border-solid border-gray-200 bg-white py-10 lg:w-64">
      <ProfileBox />
      <Flex column="start" className="py-5">
        <div className="bg-main-deep-pink/5 p-5 font-medium text-gray-600">계정</div>
        <LinkBox icon={LuUserCog} label="프로필 수정" currentPath={pathname} path="/profile" />
        <LinkBox icon={RiLockLine} label="비밀번호 수정" currentPath={pathname} path="/profile/password" />
        <LinkBox icon={FiUserX} label="   회원 탈퇴" currentPath={pathname} path="/profile/delete" />
      </Flex>
    </Flex>
  );
}
export default Sidebar;
