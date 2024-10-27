import React from 'react';
import { IoPerson } from 'react-icons/io5';
import Link from 'next/link';

import RevokeButton from '@/app/academy/(workspace)/[id]/setting/components/revoke-button';
import ListRow from '@/features/academy/alert/components/ListRow';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { ACADEMY_ROLE } from '@/shared/enums/academy';

function SettingList({ id, academyRole }: { academyRole: ACADEMY_ROLE; id: string }) {
  return (
    <>
      {academyRole === ACADEMY_ROLE.PRINCIPAL ? (
        <Link href={`/academy/${id}/members/detail`}>
          <ListRow
            contents={
              <Flex row="start" className="gap-2">
                <IoPerson size={24} />
                <Typography size="h5">학생 관리</Typography>
              </Flex>
            }
            withArrow
          />
        </Link>
      ) : null}
      {academyRole === ACADEMY_ROLE.PRINCIPAL ? (
        <Link href={`/academy/${id}/members/instructor`}>
          <ListRow
            contents={
              <Flex row="start" className="gap-2">
                <IoPerson size={24} />
                <Typography size="h5">학원 선생님 관리</Typography>
              </Flex>
            }
            withArrow
          />
        </Link>
      ) : null}
      {academyRole === ACADEMY_ROLE.PRINCIPAL || ACADEMY_ROLE.INSTRUCTOR ? (
        <Link href={`/academy/${id}/members/student`}>
          <ListRow
            contents={
              <Flex row="start" className="gap-2">
                <IoPerson size={24} />
                <Typography size="h5">학원 학생 관리</Typography>
              </Flex>
            }
            withArrow
          />
        </Link>
      ) : null}
      <RevokeButton academyId={id} />
    </>
  );
}

export default SettingList;
