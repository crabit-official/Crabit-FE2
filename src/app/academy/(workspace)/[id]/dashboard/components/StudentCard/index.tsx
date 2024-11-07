'use client';

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoSchool } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

interface IStudentCardProps {
  academyNickname: string;
  challengeLogSubmissionStatus: string;
  color: 'blue' | 'gray' | 'red' | 'green' | 'yellow' | 'purple' | 'cyan' | 'lime' | null;
  school: string;
}

function StudentCard({ academyNickname, school, challengeLogSubmissionStatus, color }: IStudentCardProps) {
  const router = useRouter();

  return (
    <Flex row="between" className="gap-2">
      {/* TODO 경로 수정 */}
      <Flex
        onClick={() => router.push('2/student/2')}
        row="between"
        className="w-full cursor-pointer items-center rounded-lg border border-solid border-gray-100 bg-white px-4 py-5 shadow-custom transition-shadow duration-300 hover:shadow-hover-custom"
      >
        <Flex className="gap-4">
          <StateLabel label={challengeLogSubmissionStatus} variant={color} />
          <Typography size="h5" as="p" className="flex items-center gap-2 text-sm font-normal sm:text-base">
            <IoSchool />
            {school} • {academyNickname}
          </Typography>
        </Flex>
        <IoIosArrowForward />
      </Flex>
      <Button className="w-16 rounded-lg border border-solid border-gray-100 bg-neutral-500 text-sm text-white shadow-custom transition-shadow duration-300 hover:shadow-hover-custom sm:w-20 sm:text-base">
        승인
      </Button>
    </Flex>
  );
}
export default StudentCard;
