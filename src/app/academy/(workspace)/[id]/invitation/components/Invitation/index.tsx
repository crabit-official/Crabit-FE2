'use client';

import { useState } from 'react';
import { RiRefreshLine } from 'react-icons/ri';
import { QueryClient } from '@tanstack/query-core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import { getInvitationCode, postInvitationCode } from '@/shared/apis/invitation';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';

function InvitationTab() {
  const [tab, setTab] = useState<'INSTRUCTOR' | 'STUDENT'>('STUDENT');
  const { data: session } = useSession();
  const params = useParams();
  const queryClient = new QueryClient();

  const { data } = useQuery({
    queryFn: () =>
      getInvitationCode({
        academyId: Number(params.id),
        session: session as Session,
        academyRole: tab,
      }),
    queryKey: ['invitation', tab],
  });

  const { mutate } = useMutation({
    mutationFn: postInvitationCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitation'] });
    },
  });

  return (
    <>
      <Flex row="between">
        <Flex column="center" className="w-full">
          <Button variant="link" className="border-gray-800" onClick={() => setTab('STUDENT')}>
            학생
          </Button>
          <div className={`${tab === 'STUDENT' ? 'h-[0.1rem] bg-gray-400' : ''}`} />
        </Flex>
        <div className="w-full">
          <Button variant="link" className="border-gray-800" onClick={() => setTab('INSTRUCTOR')}>
            선생님
          </Button>
          <div className={`${tab === 'INSTRUCTOR' ? 'h-[0.1rem] bg-gray-400' : ''}`} />
        </div>
      </Flex>
      <Flex column="start" className="mt-10 gap-1">
        <Typography size="h5-2">초대 코드 발급</Typography>
        <Typography size="h5-2" color="neutral-300">
          원장선생님께서, 초대코드를 통해, 학생과 선생님을 초대할 수 있어요!
        </Typography>
      </Flex>
      <Spacing direction="vertical" size={16} />
      <div className="rounded-3xl bg-gray-200 p-5">
        <Flex row="between">
          <Flex className="items-center justify-center gap-5">
            <Typography size="h4" color="neutral-500">
              코드
            </Typography>
            <Typography size="h4">{data?.result.joinCode}</Typography>
          </Flex>
          <button
            type="button"
            className="hover:rounded-2xl hover:bg-slate-300"
            onClick={() => {
              mutate({
                academyId: Number(params.id),
                session: session as Session,
                academyRole: tab,
              });
            }}
          >
            <RiRefreshLine size={24} />
          </button>
        </Flex>
      </div>
    </>
  );
}

export default InvitationTab;
