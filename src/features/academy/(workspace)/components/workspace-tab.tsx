'use client';

import { FaBookmark } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { RiStore2Fill } from 'react-icons/ri';
import { useParams, usePathname } from 'next/navigation';

import { TabButton } from '@/features/academy/components/tab-button';
import Flex from '@/shared/components/Flex';
import { ACADEMY_ROLE } from '@/shared/enums/academy';

interface IWorkspaceTabProps {
  role: ACADEMY_ROLE;
}

function WorkspaceTab({ role }: IWorkspaceTabProps) {
  const pathname = usePathname();
  const params = useParams();
  const id = params.id as string;

  let content;

  if (role === ACADEMY_ROLE.STUDENT) {
    content = (
      <TabButton
        className="size-[19px]"
        icon={RiStore2Fill}
        label="공개 챌린지"
        isActive={pathname.includes(`/academy/${id}/public-challenge`)}
        path={`/academy/${id}/public-challenge`}
      />
    );
  } else {
    content = (
      <TabButton
        className="size-[19px]"
        icon={RiStore2Fill}
        label="챌린지 마켓"
        isActive={pathname.includes(`/academy/${id}/market`)}
        path={`/academy/${id}/market`}
      />
    );
  } else {
    content = (
      <TabButton
        className="size-[19px]"
        icon={RiStore2Fill}
        label="챌린지 마켓"
        isActive={pathname.includes(`/academy/${id}/market`)}
        path={`/academy/${id}/market`}
      />
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
