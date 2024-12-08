'use client';

import React, { type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencil } from 'react-icons/fa6';
import { PiUserSquareFill } from 'react-icons/pi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import type { z } from 'zod';

import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Input from '@/shared/components/Input';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import { S3_FOLDER_NAME } from '@/shared/types/image';
import { getRoleName } from '@/shared/utils/academyRole';
import { institutionProfileSchema } from '@/shared/utils/schema';

type FormValues = z.infer<typeof institutionProfileSchema>;

interface IProfileFormProps {
  academyRole: ACADEMY_ROLE;
  introduction: string;
  nickname: string;
  profileImageUrl: string;
  school: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

function InstitutionProfileForm({ setIsEditing, profileImageUrl, nickname, academyRole, school, introduction }: IProfileFormProps) {
  const { filePreview, handleChangeFile, file, handleImageUpload } = useImage();
  const { data: image, isSuccess } = useGetPresignedUrl({
    fileName: file?.name as string,
    s3Folder: S3_FOLDER_NAME.PROFILE_IMAGE,
  });
  const { editAcademyMemberProfile } = useManageAcademy();
  const queryClient = useQueryClient();
  const params = useParams();
  const academyId = Number(params.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nickname: nickname || '',
      school: school || '',
      profileImageUrl: profileImageUrl || '',
      introduction: introduction || '',
    },
    resolver: zodResolver(institutionProfileSchema),
  });

  const updateProfile = (data: FormValues, imageKeyName?: string) => {
    editAcademyMemberProfile.mutate(
      {
        profileImageUrl: imageKeyName || data.profileImageUrl,
        academyId,
        introduction: data.introduction,
        nickname: data.nickname,
        school: data.school,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_MEMBER_PROFILE, academyId] });
        },
        onSettled: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const onSubmit = async (data: FormValues) => {
    if (image && isSuccess) {
      const uploadSuccess = await handleImageUpload(image.result.url, file as File);
      if (uploadSuccess) {
        updateProfile(data, image.result.keyName);
      }
    } else {
      updateProfile(data);
    }
  };

  return (
    <FramerScale className="flex w-full flex-col justify-start gap-5">
      <section className="relative flex flex-col gap-4">
        <BoxContainer className="flex w-full flex-col items-center gap-5 p-8 pb-14">
          <Flex column="start" className="w-full gap-1">
            <Typography size="h3" className="opacity-80">
              프로필 수정
            </Typography>
            <Typography size="h5" as="p" className="break-keep text-xs opacity-60">
              기관 내 프로필 수정
            </Typography>
          </Flex>
          <Flex as="figure" rowColumn="center" className="relative">
            <label
              htmlFor="file"
              className="relative flex size-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-full border border-solid border-gray-200 bg-gray-50"
            >
              <div className="absolute bottom-0 right-[-5px] w-fit rounded-full bg-gray-200 p-2 text-gray-500">
                <FaPencil size={13} />
              </div>
              {filePreview ? (
                <Image src={filePreview} width={200} height={200} className="size-20 rounded-full object-cover" alt="img" />
              ) : profileImageUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profileImageUrl}`}
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
          </Flex>
          <Typography size="h7" as="p" className="w-full text-center font-normal">
            {getRoleName(academyRole)} {academyRole === ACADEMY_ROLE.STUDENT && `• ${school} `}
          </Typography>
          <Spacing direction="vertical" size={50} />
          <Flex column="start" className="w-11/12 gap-2">
            {academyRole === ACADEMY_ROLE.STUDENT && (
              <Flex row="between" className="w-full items-center gap-10">
                <Typography size="h5" as="p" className="w-14">
                  학교
                </Typography>
                <Input register={register} errors={errors} id="school" label="학교" variant="secondary" required />
              </Flex>
            )}
            <Flex row="between" className="w-full items-center gap-10">
              <Typography size="h5" as="p" className="w-14">
                닉네임
              </Typography>
              <Input register={register} errors={errors} id="nickname" label="닉네임" variant="secondary" />
            </Flex>
            <Flex row="between" className="w-full items-center gap-10">
              <Typography size="h5" as="p" className="w-14">
                소개
              </Typography>
              <Input register={register} errors={errors} id="introduction" label="소개" variant="secondary" required />
            </Flex>
          </Flex>
        </BoxContainer>
        <Flex row="end">
          <Button type="button" className="w-fit px-2 py-1 text-sm font-medium text-white" onClick={handleSubmit(onSubmit)}>
            수정하기
          </Button>
        </Flex>
      </section>
    </FramerScale>
  );
}
export default InstitutionProfileForm;
