'use client';

import { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { RiRefreshLine } from 'react-icons/ri';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { getInvitationCode, postInvitationCode } from '@/shared/apis/invitation';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import SmallModal from '@/shared/components/SmallModal';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import useGetAcademyMember from '@/shared/hooks/academy/useGetAcademyMember';

function InvitationTab() {
  const [tab, setTab] = useState<'INSTRUCTOR' | 'STUDENT'>('STUDENT');
  const params = useParams();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    data: memberCount,
    refetch,
    isPending: academyMemberPending,
  } = useGetAcademyMember({
    academyId: Number(params.id),
    academyRole: tab,
  });

  const { data, isPending: invitationCodePending } = useQuery({
    queryFn: () =>
      getInvitationCode({
        academyId: Number(params.id),
        academyRole: tab,
      }),
    queryKey: [queryKeys.INVITATION_CODE, tab],
    enabled: !!memberCount,
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
      {!academyMemberPending && !invitationCodePending && memberCount?.result.count === memberCount?.result.maxCount ? (
        <BoxContainer>
          <Flex row="between">
            <Typography size="h5-2" color="main-pink" className="font-bold">
              가입 가능한 인원수를 초과하였습니다.
            </Typography>
            <button
              type="button"
              className="hover:rounded-2xl hover:bg-slate-300"
              onClick={() => {
                refetch();
              }}
            >
              <RiRefreshLine size={20} />
            </button>
          </Flex>
        </BoxContainer>
      ) : (
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
              <button type="button" className="hover:rounded-2xl hover:bg-slate-300" onClick={() => setIsOpen(true)}>
                <RiRefreshLine size={20} />
              </button>
            </div>
          </Flex>
        </div>
      )}
      {isOpen && (
        <SmallModal
          actionLabel="발급하기"
          onClose={() => setIsOpen(false)}
          onSubmit={() => {
            mutate(
              {
                academyId: Number(params.id),
                academyRole: tab,
              },
              {
                onSuccess: () => {
                  setIsOpen(false);
                },
              },
            );
          }}
          title="초대 코드 재발급"
          secondaryActionLabel="취소하기"
          secondaryAction={() => setIsOpen((prev) => !prev)}
          body={
            <Typography size="h7" className="text-center font-normal text-gray-500">
              새로운 초대 코드를 발급하는 경우 <br />
              기존 초대 코드는 더 이상 유효하지 않습니다. <br />
            </Typography>
          }
        />
      )}
    </FramerScale>
  );
}

export default InvitationTab;
