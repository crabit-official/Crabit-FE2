import React, { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import Image from 'next/image';

import ProfileEditForm from '@/app/profile/components/ProfileEditForm';
import Avatar from '@/shared/components/Avatar';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';
import useGetProfile from '@/shared/hooks/main/useGetProfile';

function ProfileEdit() {
  const { data: profile, isPending: profileLoading } = useGetProfile();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (profileLoading) {
    return (
      <Flex column="start" className="w-full gap-5 p-8">
        <Flex column="start" className="w-full gap-1">
          <Skeleton height={25} width={100} className="rounded-md" />
          <Skeleton height={15} width={200} className="rounded-md" />
        </Flex>
        <Flex className="w-full">
          <Skeleton height={80} width={80} className="rounded-full" />
        </Flex>
        <Skeleton height={80} className="w-full rounded-md" />
      </Flex>
    );
  }

  if (isEditing && profile) {
    return <ProfileEditForm {...profile} setIsEditing={setIsEditing} />;
  }

  return (
    <FramerScale className="flex w-full flex-col justify-start gap-5">
      <section className="relative flex flex-col gap-4">
        {!isEditing && (
          <Button
            variant="secondary"
            type="button"
            className="absolute right-[-10px] top-[-15px] w-fit rounded-full p-[10px] hover:bg-main-deep-pink hover:text-white"
            onClick={() => setIsEditing(true)}
          >
            <FaPencil size={15} />
          </Button>
        )}
        <BoxContainer className="flex w-full flex-col items-center gap-5 p-8 pb-14">
          <Flex column="start" className="w-full gap-1">
            <Typography size="h3" className="opacity-80">
              내 프로필
            </Typography>
            <Typography size="h5" as="p" className="break-keep text-xs opacity-60">
              내 프로필 수정
            </Typography>
          </Flex>
          <Flex as="figure" rowColumn="center" className="relative">
            {profile?.profileImageUrl ? (
              <div className="flex size-20 flex-col items-center justify-center gap-2 rounded-full border border-solid border-gray-200 bg-gray-50">
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile.profileImageUrl}`}
                  width={100}
                  height={100}
                  className="size-20 rounded-full border border-solid border-gray-200 object-cover"
                  alt="img"
                />
              </div>
            ) : (
              <Avatar size="lg" />
            )}
          </Flex>
          <Flex column="start" className="w-11/12 gap-2">
            <Flex row="between" className="w-full items-center gap-10">
              <Typography size="h5" as="p" className="w-14">
                이름
              </Typography>
              <Typography size="h5" as="p" className="break-keep font-normal">
                {profile?.name}
              </Typography>
            </Flex>
            <Flex row="between" className="w-full items-center gap-10">
              <Typography size="h5" as="p" className="w-14">
                이메일
              </Typography>
              <Typography size="h5" as="p" className="break-keep font-normal">
                {profile?.email}
              </Typography>
            </Flex>
          </Flex>
        </BoxContainer>
      </section>
    </FramerScale>
  );
}
export default ProfileEdit;
