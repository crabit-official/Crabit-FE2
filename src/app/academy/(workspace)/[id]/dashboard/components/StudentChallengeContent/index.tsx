import React from 'react';
import { FaRegComment } from 'react-icons/fa6';
import Image from 'next/image';

import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';
import type { IStudentChallengeContents } from '@/shared/types/acadmy';

// TODO: 첨부파일 처리 (이미지, 파일에 따라)
function StudentChallengeContent({ challengeLog, studentProfile }: IStudentChallengeContents) {
  return (
    <Flex row="start" className="w-full gap-2">
      <Flex column="start" className="relative gap-2">
        <Flex>
          {studentProfile.academyProfileImageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${studentProfile.academyProfileImageUrl}`}
              alt="profile img"
              width={50}
              height={50}
              className="size-[30px] rounded-full border border-solid border-gray-100 object-cover"
            />
          ) : (
            <Avatar size="sm" />
          )}
        </Flex>
        <div className="absolute bottom-0 left-1/2 top-10 w-px bg-gray-200" />
      </Flex>
      <Flex column="around" className="w-full gap-3 rounded-lg border border-solid border-gray-100 bg-white px-4 py-5 shadow-custom">
        {challengeLog.fileUrl && (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeLog.fileUrl}`}
            alt="test"
            width={480}
            height={100}
            className="h-40 w-full rounded-lg border border-solid border-gray-100 bg-gray-50 object-contain"
          />
        )}
        <Flex column="start" className="gap-2">
          <Flex column="start">
            <Typography size="h7" as="p" className="text-xs font-normal opacity-60">
              DAY {challengeLog.day}
            </Typography>
            <Typography size="h5" as="p" className="text-sm font-normal opacity-80">
              {challengeLog.content}
            </Typography>
          </Flex>
        </Flex>
        <Flex row="end">
          <FaRegComment className="cursor-pointer opacity-50 hover:text-main-deep-pink" />
        </Flex>
      </Flex>
    </Flex>
  );
}

function StudentChallengeContentSkeleton() {
  return (
    <Flex row="start" className="w-full gap-2">
      <Flex column="start" className="relative gap-2">
        <Flex>
          <Skeleton height={30} width={30} className="rounded-full" />
        </Flex>
        <div className="absolute bottom-0 left-1/2 top-10 w-px bg-gray-200" />
      </Flex>
      <Flex column="around" className="w-full gap-3 rounded-lg border border-solid border-gray-100 bg-white px-4 py-5 shadow-custom">
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
