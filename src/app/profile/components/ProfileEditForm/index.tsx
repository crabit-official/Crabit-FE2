'use client';

import React, { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { PiUserSquareFill } from 'react-icons/pi';
import Image from 'next/image';
import { toast } from 'sonner';

import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import useGetProfile from '@/shared/hooks/main/useGetProfile';
import useEditProfile from '@/shared/hooks/profile/useEditProfile';

function ProfileEditForm() {
  let profileContent;

  const [edit, setEdit] = useState<boolean>(false);
  const { filePreview, handleChangeFile, file } = useImage();
  const { data: profile } = useGetProfile();
  const { data: image, isSuccess } = useGetPresignedUrl(file?.name as string);
  const { mutate, isPending } = useEditProfile();
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      name: profile?.name,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const editName = data.name ?? profile?.name;

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
            mutate({ profileImageUrl: image.result.keyName, name: editName });
          }
        } catch {
          toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } else {
      mutate({ profileImageUrl: profile?.profileImageUrl ?? null, name: editName });
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
          ) : profile?.profileImageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile.profileImageUrl}`}
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
    profileContent = profile?.profileImageUrl ? (
      <Image
        src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile.profileImageUrl}`}
        width={200}
        height={200}
        className="size-52 rounded-xl border border-solid border-gray-200 object-cover"
        alt="img"
      />
    ) : (
      <div className="flex size-52 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-solid border-gray-200 bg-gray-50">
        <PiUserSquareFill size={30} />
      </div>
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
      </Flex>
      <section className="flex flex-col gap-4">
        <BoxContainer variant="border" className="flex w-full flex-col gap-5 sm:flex-row">
          <Flex as="figure" row="start">
            {profileContent}
          </Flex>

          <Flex column="between" className="w-full py-2">
            <Flex column="start">
              <Flex className="items-center gap-2">
                <Typography size="h5" as="p" className="w-12 text-center text-sm font-semibold opacity-80 lg:text-base">
                  email
                </Typography>
                <Typography size="h5" as="p" className="w-full p-2 text-sm font-normal opacity-80 lg:text-base">
                  {profile?.email}
                </Typography>
              </Flex>
              <Flex className="items-center gap-2">
                <Typography size="h5" as="p" className="w-12 text-center text-sm font-semibold opacity-80 lg:text-base">
                  name
                </Typography>
                {edit ? (
                  <input
                    defaultValue={profile?.name}
                    disabled={isPending}
                    id="name"
                    {...register('name', { required: true })}
                    placeholder="이름을 입력해주세요."
                    className="w-full border-b border-solid border-b-gray-200 bg-transparent p-2 text-sm focus:border-b-main-deep-pink focus:outline-none lg:text-base"
                  />
                ) : (
                  <Typography size="h5" as="p" className="w-full p-2 text-sm font-normal opacity-80 lg:text-base">
                    {profile?.name}
                  </Typography>
                )}
              </Flex>
            </Flex>
          </Flex>
        </BoxContainer>
        <Flex row="end">
          {edit ? (
            <Button type="button" className="w-44 font-medium text-white" onClick={handleSubmit(onSubmit)}>
              수정하기
            </Button>
          ) : (
            <Button type="button" className="w-16 font-medium text-white" onClick={() => setEdit(true)}>
              <FaArrowRight />
            </Button>
          )}
        </Flex>
      </section>
    </Flex>
  );
}

export default ProfileEditForm;
