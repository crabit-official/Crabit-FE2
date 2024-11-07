import React from 'react';
import { FaCrown } from 'react-icons/fa';

import DonutChart from '@/app/academy/(workspace)/[id]/dashboard/components/DonutChart';
import BestChallengeTable from '@/features/academy/(workspace)/components/dashboard/best-challenge-table';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { STUDENTS } from '@/shared/constants/student';

function ChallengeStatistics() {
  return (
    <Flex column="center" className="w-full gap-4">
      <Flex column="between" className="min-h-80 w-full rounded-2xl border border-solid border-gray-100 bg-gray-50 p-10">
        <Flex column="start" className="gap-5">
          <Flex row="end" className="items-center gap-2">
            <FaCrown size={20} />
            <Typography size="h2" className="text-end font-bold text-gray-700">
              챌린지 TOP 5
            </Typography>
          </Flex>
          <div className="scrollbar-hide grid w-full cursor-pointer place-items-center gap-6 overflow-x-auto">
            <BestChallengeTable topStudents={STUDENTS} />
          </div>
        </Flex>
      </Flex>
      <Flex className="w-full flex-col gap-4 md:flex-row">
        <Flex column="between" className="min-h-96 w-full rounded-2xl border border-solid border-gray-100 bg-gray-50 px-6 py-10">
          <Flex column="start" className="gap-1">
            <Typography size="h5" as="p" className="text-blue-950">
              예원이 제육
            </Typography>
            <Typography size="h2" className="font-bold text-gray-700">
              챌린지 완료율
            </Typography>
          </Flex>
          <DonutChart approvedRate={77} color="#F06485" size="large" />
        </Flex>
        <Flex row="around" className="min-h-96 w-full rounded-2xl border border-solid border-gray-100 bg-main-gradient px-6 py-10">
          <Flex column="start" className="w-full gap-1">
            <Flex row="between">
              <Typography size="h2" className="text-white">
                참여중인 학생수
              </Typography>
              <Typography size="h2" className="text-white">
                90 명
              </Typography>
            </Flex>
            <Flex row="between">
              <Typography size="h2" className="text-white">
                시작하지 않은 학생수
              </Typography>
              <Typography size="h2" className="text-white">
                4 명
              </Typography>
            </Flex>
            <Flex row="between">
              <Typography size="h2" className="text-white">
                제출한 학생 수
              </Typography>
              <Typography size="h2" className="text-white">
                50 명
              </Typography>
            </Flex>
            <Flex row="between">
              <Typography size="h2" className="text-white">
                승인 대기 중인 학생 수
              </Typography>
              <Typography size="h2" className="text-white">
                20 명
              </Typography>
            </Flex>
            <Flex row="between">
              <Typography size="h2" className="text-white">
                승인 된 학생 수
              </Typography>
              <Typography size="h2" className="text-white">
                15 명
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default ChallengeStatistics;
