import React from 'react';
import Image from 'next/image';

import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';
import type { IStudentChallengeContents } from '@/shared/types/acadmy';

// TODO: 첨부파일 처리 (이미지, 파일에 따라)
function StudentChallengeContent({ challengeLog, studentProfile }: IStudentChallengeContents) {
  return (
    <Flex column="start" className="w-full gap-2">
      <Typography size="h5" as="p" className="text-blue-950">
        DAY {challengeLog.day}
      </Typography>
      <Flex column="around" className="w-full cursor-pointer gap-3 rounded-lg border border-solid border-gray-100 bg-white px-4 py-5 shadow-custom">
        {challengeLog.fileUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeLog.fileUrl}`}
            alt="test"
            width={480}
            height={100}
            className="h-40 w-full rounded-lg border border-solid border-gray-100 bg-gray-50 object-contain"
          />
        ) : (
          <Image
            src="/images/test.jpeg"
            alt="test"
            width={480}
            height={100}
            className="h-40 w-full rounded-lg border border-solid border-gray-100 object-cover"
          />
        )}
        <Flex column="start" className="gap-4">
          <Typography size="h5" as="p" className="text-sm font-normal opacity-80">
            {challengeLog.content}
          </Typography>
          <Flex row="end" className="gap-2">
            {studentProfile.academyProfileImageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${studentProfile.academyProfileImageUrl}`}
                alt="profile img"
                width={50}
                height={50}
                className="size-5 rounded-full border border-solid border-gray-100 object-cover"
              />
            ) : (
              <Avatar size="xs" />
            )}
            <Typography size="h5" as="p" className="text-sm font-normal opacity-70">
              {studentProfile.academyNickname}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

function StudentChallengeContentSkeleton() {
  return (
    <Flex column="start" className="w-full gap-2">
      <Flex column="around" className="w-full cursor-pointer gap-3 rounded-lg border border-solid border-gray-100 bg-white px-4 py-5 shadow-custom">
        <Skeleton height={160} className="rounded-md" />
        <Flex column="start" className="gap-4">
          <Skeleton height={40} className="rounded-md" />
        </Flex>
      </Flex>
    </Flex>
  );
}

StudentChallengeContent.Skeleton = StudentChallengeContentSkeleton;

export default StudentChallengeContent;
