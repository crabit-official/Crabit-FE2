'use client';

import { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { RiRefreshLine } from 'react-icons/ri';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { getInvitationCode, postInvitationCode } from '@/shared/apis/invitation';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';

function InvitationTab() {
  const [tab, setTab] = useState<'INSTRUCTOR' | 'STUDENT'>('STUDENT');
  const params = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () =>
      getInvitationCode({
        academyId: Number(params.id),
        academyRole: tab,
      }),
    queryKey: [queryKeys.INVITATION_CODE, tab],
  });

  const { mutate } = useMutation({
    mutationFn: postInvitationCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.INVITATION_CODE] });
    },
  });

  const handleCopy = async () => {
    if (data?.result.joinCode) {
      try {
        await navigator.clipboard.writeText(data?.result.joinCode);

        toast.success('코드가 복사되었습니다');
      } catch {
        toast.success('코드 복사에 실패하였습니다. 다시 시도해주세요');
      }
    }
  };

  return (
    <FramerScale>
      <Flex row="between" className="w-full">
        <Flex column="center" className="w-full">
          <Button variant="link" className="border-gray-800" onClick={() => setTab('STUDENT')}>
            학생
          </Button>
          <div className={`${tab === 'STUDENT' ? 'h-[0.1rem] bg-gray-400' : ''}`} />
        </Flex>
        <div className="w-full">
          <Button variant="link" className="border-gray-800" onClick={() => setTab('INSTRUCTOR')}>
            관리자
          </Button>
          <div className={`${tab === 'INSTRUCTOR' ? 'h-[0.1rem] bg-gray-400' : ''}`} />
        </div>
      </Flex>
      <Flex column="start" className="mt-10 gap-1">
        <Typography size="h5-2">초대 코드 발급</Typography>
        <Typography size="h5-2" color="neutral-300">
          초대코드를 통해, 학생과 관리자를 초대할 수 있어요!
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
          <div className="flex gap-2">
            <button type="button" className="hover:rounded-2xl hover:bg-slate-300" onClick={handleCopy}>
              <IoCopyOutline size={20} />
            </button>
            <button
              type="button"
              className="hover:rounded-2xl hover:bg-slate-300"
              onClick={() => {
                mutate({
                  academyId: Number(params.id),
                  academyRole: tab,
                });
              }}
            >
              <RiRefreshLine size={20} />
            </button>
          </div>
        </Flex>
      </div>
    </FramerScale>
  );
}

export default InvitationTab;
