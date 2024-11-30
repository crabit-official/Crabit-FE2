'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import Avatar from '@/shared/components/Avatar';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import SmallModal from '@/shared/components/SmallModal';
import TextArea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';

const formSchema = z.object({
  description: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface IInstructorDetailProps {
  academyId: number;
  academyMemberId: number;
}

function InstructorDetail({ academyId, academyMemberId }: IInstructorDetailProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { updateInstructorIntroduction, revokeInstructor, useGetAcademyInstructorDetailProfile } = useManageAcademy();
  const { data: profile, isFetching } = useGetAcademyInstructorDetailProfile({ academyId, academyMemberId });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: profile
      ? {
          description: profile?.result.teacher.description || '',
        }
      : undefined,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    if (edit) {
      updateInstructorIntroduction.mutate(
        {
          academyId,
          academyMemberId,
          description: data.description,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_INSTRUCTOR_PROFILE, academyMemberId] });
            setEdit(false);
          },
        },
      );
    }
  };

  const handleRevoke = () => {
    revokeInstructor.mutate({
      academyId,
      academyMemberId,
    });

    setOpen(false);
    router.replace(`/academy/${academyId}/setting/management/instructor`);
  };

  if (open) {
    return (
      <SmallModal
        title="교사 강퇴"
        actionLabel="교사강퇴"
        onClose={() => setOpen((prev) => !prev)}
        onSubmit={handleRevoke}
        secondaryAction={() => setOpen((prev) => !prev)}
        secondaryActionLabel="취소하기"
        body={
          <Typography size="h7" className="text-center font-normal text-gray-500">
            ⚠️ 교사를 강퇴시킬 경우 교사는 학원에 접근할 수 없게 됩니다.
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
            {profile?.result.teacher.profileImageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile?.result.teacher.profileImageUrl}`}
                alt="profile"
                width={80}
                height={80}
                className="size-20 rounded-full border border-solid border-gray-100 object-cover"
              />
            ) : (
              <Avatar size="lg" />
            )}
          </Flex>
          <Flex rowColumn="center" className="gap-1">
            {isFetching && <Skeleton height={20} width={50} className="rounded-xl" />}
            <Typography size="h5">{profile?.result.teacher.name}</Typography>
            <Typography size="h7" className="font-normal opacity-80">
              {profile?.result.teacher.nickname} • {profile?.result.teacher.name}
            </Typography>
            <Typography size="h7" className="font-normal opacity-80">
              {profile?.result.teacher.introduction ?? '한줄 소개가 없습니다.'}
            </Typography>
          </Flex>
        </Flex>
        {edit ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex size-full flex-col justify-between gap-2">
            <TextArea
              defaultValue={edit ? profile?.result.teacher.description : undefined}
              errors={errors}
              id="description"
              label="추가 설명"
              register={register}
              variant="secondary"
            />
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
                {profile?.result.teacher.description ? profile?.result.teacher.description : '교사에 대한 설명이 없습니다.'}
              </Typography>
            </Flex>

            <Flex className="justify-end">
              <FaRegPenToSquare className="cursor-pointer text-gray-600 hover:text-main-deep-pink" onClick={() => setEdit((prev) => !prev)} />
            </Flex>
          </BoxContainer>
        )}
      </BoxContainer>

      <div className="flex w-full justify-end">
        <div className="w-20">
          <Button type="button" className="text-sm opacity-60 hover:opacity-80" onClick={() => setOpen((prev) => !prev)}>
            교사 강퇴
          </Button>
        </div>
      </div>
    </FramerScale>
  );
}

export default InstructorDetail;
