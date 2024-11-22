'use client';

import React from 'react';
import Image from 'next/image';

import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';
import useGetProfile from '@/shared/hooks/main/useGetProfile';

function ProfileBox() {
  let profileData;
  const { data: profile, isPending } = useGetProfile();

  if (isPending) {
    profileData = (
      <Flex rowColumn="center" className="gap-2">
        <Skeleton height={20} width={65} className="mr-2 rounded-xl" />
        <Skeleton height={15} width={100} className="mr-2 rounded-xl" />
      </Flex>
    );
  }

  if (profile) {
    profileData = (
      <Flex rowColumn="center">
        <Typography size="h5" as="p" className="text-base font-medium">
          {profile.name}
        </Typography>
        <Typography size="h4" as="p" className="text-sm font-normal opacity-80">
          {profile.email}
        </Typography>
      </Flex>
    );
  }

  return (
    <Flex column="start" className="items-center gap-2">
      {profile?.profileImageUrl ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile?.profileImageUrl}`}
          alt="profile img"
          width={200}
          height={200}
          className="size-20 rounded-full border border-solid border-gray-50 object-cover"
        />
      ) : (
        <Avatar size="lg" />
      )}
      {profileData}
    </Flex>
  );
}
export default ProfileBox;
