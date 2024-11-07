'use client';

import React from 'react';
import { IoPerson } from 'react-icons/io5';
import { useSession } from 'next-auth/react';

import ListRow from '@/features/academy/alert/components/ListRow';
// import { revokeAcademy } from '@/shared/apis/academy';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function RevokeButton({ academyId }: { academyId: string }) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <ListRow
      // onClick={async () => {
      //   await revokeAcademy({ session, academyId: Number(academyId) });
      // }}
      contents={
        <Flex row="start" className="gap-2">
          <input name="academyId" defaultValue={academyId} hidden />
          <IoPerson size={24} />
          <Typography size="h5">학원 탈퇴</Typography>
        </Flex>
      }
      withArrow
    />
  );
}

export default RevokeButton;
