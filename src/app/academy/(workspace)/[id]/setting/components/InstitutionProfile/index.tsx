'use client';

import React, { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import InstitutionProfileForm from '@/app/academy/(workspace)/[id]/setting/components/InstitutionProfileForm';
import StateLabel from '@/features/academy/(workspace)/components/state-label';
import Avatar from '@/shared/components/Avatar';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';
import { getRoleName } from '@/shared/utils/academyRole';
import { formatNumberWithCommas } from '@/shared/utils/number';

function InstitutionProfile() {
  const params = useParams();
  const academyId = Number(params.id);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { useGetAcademyMemberProfile } = useManageAcademy();
  const { data: profile, isPending: profileLoading } = useGetAcademyMemberProfile({ academyId });

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

  if (isEditing && profile) {
    return <InstitutionProfileForm {...profile.result} setIsEditing={setIsEditing} />;
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
              기관 내 프로필 수정
            </Typography>
          </Flex>
          <Flex as="figure" rowColumn="center" className="relative">
            {profile?.result.profileImageUrl ? (
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
            )}
            {profile?.result.academyRole === ACADEMY_ROLE.STUDENT && !!profile?.result.point && (
              <StateLabel label={`Ⓟ ${formatNumberWithCommas(Number(profile?.result.point))}`} variant="yellow" className="absolute bottom-[-10px]" />
            )}
          </Flex>
          <Typography size="h7" as="p" className="w-full text-center font-normal">
            {getRoleName(profile?.result.academyRole as ACADEMY_ROLE)} {profile?.result.academyRole === ACADEMY_ROLE.STUDENT && `• ${profile?.result.school} `}
          </Typography>
          <Spacing direction="vertical" size={50} />
          <Flex column="start" className="w-11/12 gap-2">
            {profile?.result.academyRole === ACADEMY_ROLE.STUDENT && (
              <Flex row="between" className="w-full items-center gap-10">
                <Typography size="h5" as="p" className="w-14">
                  학교
                </Typography>
                <Typography size="h5" as="p" className="break-keep font-normal">
                  {profile?.result.school}
                </Typography>
              </Flex>
            )}
            <Flex row="between" className="w-full items-center gap-10">
              <Typography size="h5" as="p" className="w-14">
                닉네임
              </Typography>
              <Typography size="h5" as="p" className="break-keep font-normal">
                {profile?.result.nickname}
              </Typography>
            </Flex>
            <Flex row="between" className="w-full items-center gap-10">
              <Typography size="h5" as="p" className="w-14">
                소개
              </Typography>
              <Typography size="h5" as="p" className="break-keep font-normal">
                {profile?.result.introduction}
              </Typography>
            </Flex>
          </Flex>
        </BoxContainer>
      </section>
    </FramerScale>
  );
}

export default InstitutionProfile;
