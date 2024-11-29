'use client';

import React, { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import Avatar from '@/shared/components/Avatar';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import SmallModal from '@/shared/components/SmallModal';
import Textarea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';
import type { IAcademyStudentListDTO } from '@/shared/types/acadmy';
import { formatNumberWithCommas } from '@/shared/utils/number';

interface IMemberDetailProps {
  academyId: number;
  academyMemberId: number;
  member: IAcademyStudentListDTO;
}

function MemberDetail({ member, academyId, academyMemberId }: IMemberDetailProps) {
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { updateStudentIntroduction, revokeStudent } = useManageAcademy();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      description: member.description || '',
    },
  });

  const handleUpdate = (data: FieldValues) => {
    updateStudentIntroduction.mutate({ academyId, academyMemberId, description: data.description, nickname: member.nickname });
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

  if (open) {
    return (
      <SmallModal
        title="학생 강퇴"
        actionLabel="학생강퇴"
        onClose={() => setOpen((prev) => !prev)}
        onSubmit={handleRevoke}
        secondaryAction={() => setOpen((prev) => !prev)}
        secondaryActionLabel="취소하기"
        body={
          <Typography size="h7" className="text-center font-normal text-gray-500">
            ⚠️ 학생을 강퇴시킬 경우 학생은 학원에 접근할 수 없게 됩니다.
          </Typography>
        }
      />
    );
  }

  return (
    <FramerScale className="ml-10 grid place-items-center gap-2">
      <BoxContainer className="w-full items-center gap-10 py-10 lg:ml-10">
        <Flex rowColumn="center" className="gap-6">
          <Flex className="relative">
            {member.profileImageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${member.profileImageUrl}`}
                alt="profile"
                width={80}
                height={80}
                className="size-20 rounded-full border border-solid border-gray-100 object-cover"
              />
            ) : (
              <Avatar size="lg" />
            )}
            {!!member.point && <StateLabel label={`Ⓟ ${formatNumberWithCommas(member.point)}`} variant="yellow" className="absolute bottom-[-10px]" />}
          </Flex>
          <Flex rowColumn="center" className="gap-1">
            <Typography size="h5">{member.name}</Typography>
            <Typography size="h7" className="font-normal opacity-80">
              {member.nickname} • {member.school}
            </Typography>
            <Typography size="h7" className="font-normal opacity-80">
              {member.introduction ?? '한줄 소개가 없습니다.'}
            </Typography>
          </Flex>
        </Flex>
        {edit ? (
          <form onSubmit={handleSubmit(handleUpdate)} className="flex size-full flex-col justify-between gap-2">
            <Textarea errors={errors} id="description" label="추가 설명" register={register} variant="secondary" />
            <Flex className="justify-end">
              <Button type="submit" className="w-fit px-2 py-1 text-sm">
                수정완료
              </Button>
            </Flex>
          </form>
        ) : (
          <BoxContainer variant="border" className="size-full justify-between">
            <Flex column="start" className="gap-1">
              <Typography size="h5">추가 설명</Typography>
              <Typography size="h7" className="font-normal opacity-80">
                {member.description ?? '학생에 대한 설명이 없습니다.'}
              </Typography>
            </Flex>

            <Flex className="justify-end">
              <Button type="button" className="w-fit px-2 py-1 text-sm" onClick={() => setEdit((prev) => !prev)}>
                수정하기
              </Button>
            </Flex>
          </BoxContainer>
        )}
      </BoxContainer>
      <BoxContainer className="flex w-full flex-row items-center justify-center gap-10 py-10 lg:ml-10">sfnsdjfnsdjkfnsknf</BoxContainer>
      <button type="button" className="text-sm opacity-60 hover:opacity-80" onClick={() => setOpen((prev) => !prev)}>
        학생 강퇴
      </button>
    </FramerScale>
  );
}
export default MemberDetail;
