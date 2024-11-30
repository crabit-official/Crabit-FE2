'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencil } from 'react-icons/fa6';
import { PiUserSquareFill } from 'react-icons/pi';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import { getRoleName } from '@/shared/utils/academyRole';

/* eslint-disable @typescript-eslint/no-unused-vars */
const formSchema = z.object({
  academyRole: z.union([z.literal(ACADEMY_ROLE.PRINCIPAL), z.literal(ACADEMY_ROLE.INSTRUCTOR), z.literal(ACADEMY_ROLE.STUDENT)]),
  nickname: z.string(),
  profileImageUrl: z.string().url(),
  school: z.string(),
  point: z.number().int(),
  file: z.string(),
  introduction: z.string().max(500),
});

type FormValues = z.infer<typeof formSchema>;

function AcademyProfileForm() {
  let profileContent;
  const queryClient = useQueryClient();
  const params = useParams();
  const [edit, setEdit] = useState<boolean>(false);
  const { filePreview, handleChangeFile, file } = useImage();

  const { useGetAcademyMemberProfile, editAcademyMemberProfile } = useManageAcademy();

  const { data: profile, isPending: profileLoading } = useGetAcademyMemberProfile({ academyId: Number(params.id) });
  const { data: image, isSuccess } = useGetPresignedUrl(file?.name as string);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: profile
      ? {
          academyRole: profile?.result.academyRole,
          nickname: profile?.result.nickname,
          profileImageUrl: profile?.result.profileImageUrl,
          school: profile?.result.school,
          point: profile?.result.point,
        }
      : undefined,
  });

  const onSubmit = async (data: FormValues) => {
    const editNickname = data.nickname ?? profile?.result.nickname;
    const editIntroduction = data.introduction ?? profile?.result.introduction;
    const editSchool = data.school ?? profile?.result.school;

    if (image) {
      if (isSuccess) {
        try {
          const res = await fetch(image.result.url, {
            method: 'PUT',
            body: file,
          });

          if (!res.ok) {
            toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
          } else {
            editAcademyMemberProfile.mutate(
              {
                profileImageUrl: image.result.keyName,
                academyId: Number(params.id),
                introduction: editIntroduction,
                nickname: editNickname,
                school: editSchool,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_MEMBER_PROFILE, Number(params.id)] });
                },
              },
            );
          }
        } catch {
          toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } else {
      editAcademyMemberProfile.mutate(
        {
          profileImageUrl: profile?.result.profileImageUrl ?? null,
          academyId: Number(params.id),
          introduction: editIntroduction,
          nickname: editNickname,
          school: editSchool,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_MEMBER_PROFILE, Number(params.id)] });
          },
        },
      );
    }

    setEdit(false);
  };

  if (edit) {
    profileContent = (
      <>
        <label
          htmlFor="file"
          className="flex size-52 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-solid border-gray-200 bg-gray-50"
        >
          {filePreview ? (
            <Image src={filePreview} width={200} height={200} className="size-52 rounded-xl object-cover" alt="img" />
          ) : profile?.result.profileImageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile.result.profileImageUrl}`}
              width={200}
              height={200}
              className="size-52 rounded-xl object-cover"
              alt="img"
            />
          ) : (
            <PiUserSquareFill size={30} />
          )}
        </label>
        <input type="file" id="file" {...register('file')} onChange={handleChangeFile} className="hidden" />
      </>
    );
  } else {
    profileContent = profile?.result.profileImageUrl ? (
      <div className="flex size-52 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-solid border-gray-200 bg-gray-50">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile.result.profileImageUrl}`}
          width={200}
          height={200}
          className="size-52 rounded-xl border border-solid border-gray-200 object-cover"
          alt="img"
        />
      </div>
    ) : (
      <div className="flex size-52 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-solid border-gray-200 bg-gray-50">
        <PiUserSquareFill size={30} />
      </div>
    );
  }

  if (profileLoading) {
    return (
      <Flex column="start" className="w-full">
        <Flex column="start" className="w-full">
          <Skeleton width={80} height={20} className="rounded-sm" />
          <Spacing direction="vertical" size={5} />
          <Skeleton width={60} height={20} className="rounded-sm" />
        </Flex>
        <Spacing direction="vertical" size={20} />
        <Flex row="end">
          <Skeleton width={60} height={40} className="rounded-md" />
        </Flex>
        <Spacing direction="vertical" size={20} />
        <Flex>
          <Skeleton height={330} width={500} className="w-full rounded-md" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex column="start" className="w-full gap-5">
      <Flex column="start" className="w-full gap-1">
        <Typography size="h3" className="opacity-80">
          {edit ? '프로필 수정' : '내 프로필'}
        </Typography>
        <Typography size="h5" as="p" className="text-xs opacity-60">
          기본 프로필
        </Typography>
        {edit && <Spacing direction="vertical" size={28} />}
      </Flex>
      <Flex row="end">
        {!edit && (
          <Button variant="secondary" type="button" className="w-16 font-medium text-slate-500" onClick={() => setEdit(true)}>
            <FaPencil />
          </Button>
        )}
      </Flex>
      <section className="flex flex-col gap-4">
        <BoxContainer variant="border" className="flex w-[500px] flex-col gap-5 sm:flex-row">
          <Flex as="figure" row="start">
            {profileContent}
          </Flex>

          <Flex column="between" className="w-full py-2">
            <Flex column="start">
              <Flex className="items-center gap-2">
                <Typography size="h5" as="p" className="w-20 text-center text-sm font-semibold opacity-80 lg:text-base">
                  역할
                </Typography>
                <Typography size="h5" as="p" className="w-full p-2 text-sm font-normal opacity-80 lg:text-base">
                  {getRoleName(profile?.result.academyRole as ACADEMY_ROLE)}
                </Typography>
              </Flex>
              <Flex className="items-center gap-2">
                <Typography size="h5" as="p" className="w-20 text-center text-sm font-semibold opacity-80 lg:text-base">
                  닉네임
                </Typography>
                {edit ? (
                  <input
                    defaultValue={profile?.result.nickname}
                    disabled={profileLoading}
                    id="nickname"
                    {...register('nickname', { required: true })}
                    placeholder="이름을 입력해주세요."
                    className="w-full border-b border-solid border-b-gray-200 bg-transparent p-2 text-sm focus:border-b-main-deep-pink focus:outline-none lg:text-base"
                  />
                ) : (
                  <Typography size="h5" as="p" className="w-full p-2 text-sm font-normal opacity-80 lg:text-base">
                    {profile?.result.nickname}
                  </Typography>
                )}
              </Flex>
              <Flex className="items-center gap-2">
                <Typography size="h5" as="p" className="w-20 text-center text-sm font-semibold opacity-80 lg:text-base">
                  소개
                </Typography>
                {edit ? (
                  <input
                    defaultValue={profile?.result.introduction}
                    disabled={profileLoading}
                    id="nickname"
                    {...register('introduction', { required: true })}
                    placeholder="소개를 입력해주세요."
                    className="w-full border-b border-solid border-b-gray-200 bg-transparent p-2 text-sm focus:border-b-main-deep-pink focus:outline-none lg:text-base"
                  />
                ) : (
                  <Typography size="h5" as="p" className="w-full p-2 text-sm font-normal opacity-80 lg:text-base">
                    {profile?.result.introduction}
                  </Typography>
                )}
              </Flex>
              {profile?.result.academyRole === ACADEMY_ROLE.STUDENT && (
                <Flex className="items-center gap-2">
                  <Typography size="h5" as="p" className="w-20 text-center text-sm font-semibold opacity-80 lg:text-base">
                    학교
                  </Typography>
                  <Typography size="h5" as="p" className="w-full p-4 text-sm font-normal opacity-80 lg:text-base">
                    {profile?.result.school}
                  </Typography>
                </Flex>
              )}
              {profile?.result.academyRole === ACADEMY_ROLE.STUDENT && (
                <Flex className="items-center gap-2">
                  <Typography size="h5" as="p" className="w-20 text-center text-sm font-semibold opacity-80 lg:text-base">
                    포인트
                  </Typography>
                  <Typography size="h5" as="p" className="w-full p-4 text-sm font-normal opacity-80 lg:text-base">
                    {profile?.result.point}
                  </Typography>
                </Flex>
              )}
            </Flex>
          </Flex>
        </BoxContainer>
        <Flex row="end">
          {edit && (
            <Button type="button" className="w-44 font-medium text-white" onClick={handleSubmit(onSubmit)}>
              수정하기
            </Button>
          )}
        </Flex>
      </section>
    </Flex>
  );
}

export default AcademyProfileForm;
