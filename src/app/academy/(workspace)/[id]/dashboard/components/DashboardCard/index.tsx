import React from 'react';
import Image from 'next/image';

import DashboardChallengeTable from '@/app/academy/(workspace)/[id]/dashboard/components/DashboardChallengeTable';
import DonutChart from '@/app/academy/(workspace)/[id]/dashboard/components/DonutChart';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

interface IDashboardCardProps {
  approvedParticipants: number;
  approvedRate: number;
  challengeThumbnailImageUrl: string;
  challengeTitle: string;
  color: string;
  releasedAt: Date;
  totalParticipants: number;
}

export default function DashboardCard({
  challengeThumbnailImageUrl,
  approvedRate,
  challengeTitle,
  releasedAt,
  totalParticipants,
  approvedParticipants,
  color,
}: IDashboardCardProps) {
  return (
    <>
      {challengeThumbnailImageUrl ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeThumbnailImageUrl}`}
          alt="challenge thumbnail"
          width={300}
          height={300}
          className="h-44 w-full shrink-0 rounded-xl bg-black/80 object-cover"
        />
      ) : (
        <Image alt="no images" className="h-44 w-full shrink-0 rounded-xl bg-black/80 object-contain" width={200} height={200} src="/images/logo_dark.png" />
      )}
      <Flex row="center" className="w-full gap-8">
        <DonutChart approvedRate={approvedRate} color={color} />
        <Flex column="center" className="gap-1">
          <Typography size="h5" className="break-keep">
            {challengeTitle}
          </Typography>
          <Typography size="h3">{approvedRate}% 완료율</Typography>
        </Flex>
      </Flex>
      <DashboardChallengeTable releasedAt={releasedAt} totalParticipants={totalParticipants} approvedParticipants={approvedParticipants} />
    </>
  );
}
