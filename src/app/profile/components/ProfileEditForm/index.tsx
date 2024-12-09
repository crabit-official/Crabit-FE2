'use client';

import React, { type Dispatch, type SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencil } from 'react-icons/fa6';
import { PiUserSquareFill } from 'react-icons/pi';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import type { z } from 'zod';

import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Input from '@/shared/components/Input';
import Typography from '@/shared/components/Typography';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import useEditProfile from '@/shared/hooks/profile/useEditProfile';
import { S3_FOLDER_NAME } from '@/shared/types/image';
import { profileSchema } from '@/shared/utils/schema';

type FormValues = z.infer<typeof profileSchema>;

interface IProfileEditFormProps {
  name: string;
  profileImageUrl: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

function ProfileEditForm({ setIsEditing, name, profileImageUrl: initProfile }: IProfileEditFormProps) {
  const [profileImg, setProfileImg] = useState<string | null>(initProfile);

  const { filePreview, handleChangeFile, file, handleRemove, handleImageUpload } = useImage();
  const { data: image, isSuccess } = useGetPresignedUrl({
    fileName: file?.name as string,
    s3Folder: S3_FOLDER_NAME.PROFILE_IMAGE,
  });
  const { mutate, isPending } = useEditProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: name || '',
      profileImageUrl: initProfile || '',
    },
    resolver: zodResolver(profileSchema),
  });

  const updateProfile = (data: FormValues, imageKeyName?: string) => {
    mutate(
      {
        profileImageUrl: imageKeyName || data.profileImageUrl,
        name: data.name,
      },
      {
        onSettled: () => setIsEditing(false),
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

  const handleProfileRemove = () => {
    if (filePreview) handleRemove();
    else {
      setProfileImg(null);
      setValue('profileImageUrl', null);
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
              내 프로필 수정
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
              ) : profileImg ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profileImg}`}
                  width={100}
                  height={100}
                  className="size-20 rounded-full border border-solid border-gray-200 object-cover"
                  alt="img"
                />
              ) : (
                <PiUserSquareFill size={15} />
              )}
            </label>
            <button type="button" className="py-2 text-xs text-gray-500 hover:text-main-deep-pink" onClick={handleProfileRemove}>
              프로필 삭제
            </button>
            <input type="file" id="file" onChange={handleChangeFile} className="hidden" />
          </Flex>
          <Flex column="start" className="w-11/12 gap-2">
            <Flex row="between" className="w-full items-center gap-10">
              <Typography size="h5" as="p" className="w-14">
                이름
              </Typography>
              <Input register={register} errors={errors} id="name" label="이름" variant="secondary" />
            </Flex>
          </Flex>
        </BoxContainer>
        <Flex row="end">
          <Button type="button" disabled={isPending} className="w-fit px-2 py-1 text-sm font-medium text-white" onClick={handleSubmit(onSubmit)}>
            수정하기
          </Button>
        </Flex>
      </section>
    </FramerScale>
  );
}

export default ProfileEditForm;
