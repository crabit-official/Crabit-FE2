'use client';

import { FiUserX } from 'react-icons/fi';
import { LuUserCog } from 'react-icons/lu';
import { RiLockLine } from 'react-icons/ri';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import LinkBox from '@/app/profile/components/LinkBox';
import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetProfile from '@/shared/hooks/main/useGetProfile';

function Sidebar() {
  const { data: profile } = useGetProfile();
  const pathname = usePathname();

  return (
    <Flex column="start" className="size-full gap-4 rounded-xl border border-solid border-gray-200 bg-white py-10 lg:w-64">
      <Flex column="start" className="items-center gap-2">
        {profile?.profileImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile?.profileImageUrl}`}
            alt="profile img"
            width={200}
            height={200}
            className="size-20 rounded-full border border-solid border-gray-50 object-cover"
          />
        ) : (
          <Avatar size="lg" />
        )}
        <Flex rowColumn="center">
          <Typography size="h5" as="p" className="text-base font-medium">
            {profile?.name}
          </Typography>
          <Typography size="h4" as="p" className="text-sm font-normal opacity-80">
            {profile?.email}
          </Typography>
        </Flex>
      </Flex>
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
