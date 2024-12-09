'use client';

import React, { useEffect, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ChallengeStatisticsTable from '@/app/academy/(workspace)/[id]/setting/management/student/components/ChallengeStatisticsTable';
import StateLabel from '@/features/academy/(workspace)/components/state-label';
import Avatar from '@/shared/components/Avatar';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Input from '@/shared/components/Input';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import SmallModal from '@/shared/components/SmallModal';
import Textarea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import useGetStudentDetail from '@/shared/hooks/academy/useGetStudentDetail';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';
import { formatNumberWithCommas } from '@/shared/utils/number';

interface IMemberDetailProps {
  academyId: number;
  academyMemberId: number;
}

function MemberDetail({ academyId, academyMemberId }: IMemberDetailProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { updateStudentIntroduction, revokeStudent } = useManageAcademy();
  const { data: member, isPending: profileLoading } = useGetStudentDetail({ academyId, academyMemberId });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  useEffect(() => {
    if (member?.result) {
      reset({
        description: member?.result.student.description,
        nickname: member?.result.student.nickname,
      });
    }
  }, [member, reset]);

  const handleUpdate = (data: FieldValues) => {
    updateStudentIntroduction.mutate(
      { academyId, academyMemberId, description: data.description, nickname: data.nickname },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({ queryKey: [queryKeys.STUDENT_DETAIL, { academyId, academyMemberId }] });
        },
      },
    );

    setEdit(false);
  };

  const handleRevoke = () => {
    revokeStudent.mutate({
      academyId,
      academyMemberId,
    });

    setOpen(false);
    router.replace(`/academy/${academyId}/setting/management/student`);
  };

  if (profileLoading) {
    return (
      <Flex column="start" className="w-full gap-5 p-8">
        <Flex rowColumn="center" className="w-full gap-6 pb-14">
          <Skeleton height={80} width={80} className="rounded-full" />
          <Flex rowColumn="center" className="w-full gap-1">
            <Skeleton height={20} width={50} className="rounded-md" />
            <Skeleton height={15} width={150} className="rounded-md" />
          </Flex>
        </Flex>
        <Skeleton height={570} className="w-full rounded-md sm:w-2/3" />
      </Flex>
    );
  }

  return (
    <FramerScale className="grid place-items-center gap-2">
      {open && (
        <SmallModal
          title="학생 강퇴"
          actionLabel="학생강퇴"
          onClose={() => setOpen((prev) => !prev)}
          onSubmit={handleRevoke}
          secondaryAction={() => setOpen((prev) => !prev)}
          secondaryActionLabel="취소하기"
          body={
            <Typography size="h7" className="text-center font-normal text-gray-500">
              ⚠️ 학생을 강퇴시킬 경우 학생은 기관에 접근할 수 없게 됩니다.
            </Typography>
          }
        />
      )}
      <BoxContainer className="w-full items-center gap-10 py-10">
        <Flex rowColumn="center" className="gap-6">
          <Flex className="relative">
            {member?.result.student.profileImageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${member?.result.student.profileImageUrl}`}
                alt="profile"
                width={80}
                height={80}
                className="size-20 rounded-full border border-solid border-gray-100 object-cover"
              />
            ) : (
              <Avatar size="lg" />
            )}
            {!!member?.result.student.point && (
              <StateLabel label={`Ⓟ ${formatNumberWithCommas(Number(member?.result.student.point))}`} variant="yellow" className="absolute bottom-[-10px]" />
            )}
          </Flex>
          <Flex rowColumn="center" className="gap-1">
            <Typography size="h5">{member?.result.student.name}</Typography>
            <Typography size="h7" className="font-normal opacity-80">
              {member?.result.student.nickname} • {member?.result.student.school}
            </Typography>
            <Typography size="h7" className="font-normal opacity-80">
              {member?.result.student.introduction ?? '한줄 소개가 없습니다.'}
            </Typography>
          </Flex>
        </Flex>
        <div className="w-full sm:w-2/3">
          <ChallengeStatisticsTable challengeData={member?.result?.studentChallengeStatistics} />
        </div>
        {edit ? (
          <form onSubmit={handleSubmit(handleUpdate)} className="flex size-full flex-col justify-between gap-2">
            <Input variant="secondary" errors={errors} id="nickname" label="닉네임 변경" register={register} />
            <Textarea errors={errors} id="description" label="추가 설명" register={register} variant="secondary" />
            <Flex className="justify-end">
              <Button type="submit" className="w-fit px-2 py-1 text-sm">
                수정완료
              </Button>
            </Flex>
          </form>
        ) : (
          <BoxContainer variant="border" className="size-full min-h-24 justify-between">
            <Flex column="start" className="gap-1">
              <Typography size="h5">추가 설명</Typography>
              <Typography size="h7" className="font-normal opacity-80">
                {member?.result.student.description ? member?.result.student.description : '학생에 대한 설명이 없습니다.'}
              </Typography>
            </Flex>
            <Flex className="justify-end">
              <FaRegPenToSquare className="cursor-pointer text-gray-600 hover:text-main-deep-pink" onClick={() => setEdit((prev) => !prev)} />
            </Flex>
          </BoxContainer>
        )}
      </BoxContainer>

      <div className="flex w-full justify-end">
        <Button
          type="button"
          variant="secondary"
          className="w-fit px-2 py-1 text-sm hover:bg-main-deep-pink hover:text-white"
          onClick={() => setOpen((prev) => !prev)}
        >
          학생 강퇴
        </Button>
      </div>
    </FramerScale>
  );
}
export default MemberDetail;
