'use client';

import React, { useEffect, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { FaPencil } from 'react-icons/fa6';
import { PiUserSquareFill } from 'react-icons/pi';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'sonner';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import Avatar from '@/shared/components/Avatar';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Input from '@/shared/components/Input';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import { getRoleName } from '@/shared/utils/academyRole';
import { formatNumberWithCommas } from '@/shared/utils/number';

interface IProfileFormProps {
  academyId: number;
}

function AcademyProfileForm({ academyId }: IProfileFormProps) {
  let profileContent;
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState<boolean>(false);
  const { filePreview, handleChangeFile, file } = useImage();

  const { useGetAcademyMemberProfile, editAcademyMemberProfile } = useManageAcademy();

  const { data: profile, isPending: profileLoading } = useGetAcademyMemberProfile({ academyId });
  const { data: image, isSuccess } = useGetPresignedUrl(file?.name as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  useEffect(() => {
    if (profile?.result) {
      reset({
        nickname: profile?.result.nickname,
        profileImageUrl: profile?.result.profileImageUrl,
        introduction: profile?.result.introduction,
        school: profile?.result.school,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: FieldValues) => {
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
                academyId,
                introduction: editIntroduction,
                nickname: editNickname,
                school: editSchool,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_MEMBER_PROFILE, academyId] });
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
          academyId,
          introduction: editIntroduction,
          nickname: editNickname,
          school: editSchool,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_MEMBER_PROFILE, academyId] });
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
          className="relative flex size-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-full border border-solid border-gray-200 bg-gray-50"
        >
          <div className="absolute bottom-0 right-[-5px] w-fit rounded-full bg-gray-200 p-2 text-gray-500">
            <FaPencil size={13} />
          </div>
          {filePreview ? (
            <Image src={filePreview} width={200} height={200} className="size-20 rounded-full object-cover" alt="img" />
          ) : profile?.result.profileImageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile.result.profileImageUrl}`}
              width={100}
              height={100}
              className="size-20 rounded-full border border-solid border-gray-200 object-cover"
              alt="img"
            />
          ) : (
            <PiUserSquareFill size={15} />
          )}
        </label>
        <input type="file" id="file" onChange={handleChangeFile} className="hidden" />
      </>
    );
  } else {
    profileContent = profile?.result.profileImageUrl ? (
      <div className="flex size-20 flex-col items-center justify-center gap-2 rounded-full border border-solid border-gray-200 bg-gray-50">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile.result.profileImageUrl}`}
          width={100}
          height={100}
          className="size-20 rounded-full border border-solid border-gray-200 object-cover"
          alt="img"
        />
      </div>
    ) : (
      <Avatar size="lg" />
    );
  }

  if (profileLoading) {
    return (
      <Flex column="start" className="w-full gap-5 p-8">
        <Flex column="start" className="w-full gap-1">
          <Skeleton height={25} width={100} className="rounded-md" />
          <Skeleton height={15} width={200} className="rounded-md" />
        </Flex>
        <Flex className="w-full pb-14">
          <Skeleton height={80} width={80} className="rounded-full" />
        </Flex>
        <Skeleton height={100} className="w-full rounded-md" />
      </Flex>
    );
  }

  return (
    <FramerScale className="flex w-full flex-col justify-start gap-5">
      <section className="relative flex flex-col gap-4">
        {!edit && (
          <Button
            variant="secondary"
            type="button"
            className="absolute right-[-10px] top-[-15px] w-fit rounded-full p-[10px] hover:bg-main-deep-pink hover:text-white"
            onClick={() => setEdit(true)}
          >
            <FaPencil size={15} />
          </Button>
        )}
        <BoxContainer className="flex w-full flex-col items-center gap-5 p-8 pb-14">
          <Flex column="start" className="w-full gap-1">
            <Typography size="h3" className="opacity-80">
              {edit ? '프로필 수정' : '내 프로필'}
            </Typography>
            <Typography size="h5" as="p" className="text-xs opacity-60">
              기관 내 프로필 수정
            </Typography>
            {edit && <Spacing direction="vertical" size={28} />}
          </Flex>
          <Flex as="figure" rowColumn="center" className="relative">
            {profileContent}
            {profile?.result.academyRole === ACADEMY_ROLE.STUDENT && !!profile?.result.point && !edit && (
              <StateLabel label={`Ⓟ ${formatNumberWithCommas(Number(profile?.result.point))}`} variant="yellow" className="absolute bottom-[-10px]" />
            )}
          </Flex>
          <Typography size="h7" as="p" className="w-full text-center font-normal">
            {getRoleName(profile?.result.academyRole as ACADEMY_ROLE)} {profile?.result.academyRole === ACADEMY_ROLE.STUDENT && `• ${profile?.result.school} `}
          </Typography>
          <Spacing direction="vertical" size={50} />
          <Flex column="start" className="w-11/12 gap-2">
            {edit && profile?.result.academyRole === ACADEMY_ROLE.STUDENT && (
              <Flex row="between" className="w-full items-center gap-10">
                <Typography size="h5" as="p" className="w-14">
                  학교
                </Typography>
                {edit ? (
                  <Input register={register} errors={errors} id="school" label="학교" variant="secondary" required />
                ) : (
                  <Typography size="h5" as="p" className="font-normal">
                    {profile?.result.introduction}
                  </Typography>
                )}
              </Flex>
            )}
            <Flex row="between" className="w-full items-center gap-10">
              <Typography size="h5" as="p" className="w-14">
                닉네임
              </Typography>
              {edit ? (
                <Input register={register} errors={errors} id="nickname" label="닉네임" variant="secondary" />
              ) : (
                <Typography size="h5" as="p" className="font-normal">
                  {profile?.result.nickname}
                </Typography>
              )}
            </Flex>
            <Flex row="between" className="w-full items-center gap-10">
              <Typography size="h5" as="p" className="w-14">
                소개
              </Typography>
              {edit ? (
                <Input disabled={profileLoading} register={register} errors={errors} id="introduction" label="소개" variant="secondary" required />
              ) : (
                <Typography size="h5" as="p" className="font-normal">
                  {profile?.result.introduction}
                </Typography>
              )}
            </Flex>
          </Flex>
        </BoxContainer>
        <Flex row="end">
          {edit && (
            <Button type="button" className="w-fit px-2 py-1 text-sm font-medium text-white" onClick={handleSubmit(onSubmit)}>
              수정하기
            </Button>
          )}
        </Flex>
      </section>
    </FramerScale>
  );
}

export default AcademyProfileForm;
