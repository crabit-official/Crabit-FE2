'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetChallengeDetail from '@/shared/hooks/challenge/useGetChallengeDetail';

function ChallengeStatistics() {
  const params = useParams();
  const { data: challengeData } = useGetChallengeDetail(Number(params.id), Number(params.challengeId));

  if (challengeData)
    return (
      <Flex column="center" className="w-full gap-4">
        <Flex className="w-full flex-col gap-4 md:flex-row">
          <Flex row="around" className="min-h-80 w-full rounded-2xl border border-solid border-gray-100 bg-main-gradient px-6 py-10">
            <Flex column="start" className="w-full gap-1">
              <Flex row="between">
                <Typography size="h2" className="text-white">
                  진행중인 학생수
                </Typography>
                <Typography size="h2" className="text-white">
                  {challengeData.result.challengeStatusCounts.inProgressStudents} 명
                </Typography>
              </Flex>
              <Flex row="between">
                <Typography size="h2" className="text-white">
                  시작하지 않은 학생수
                </Typography>
                <Typography size="h2" className="text-white">
                  {challengeData.result.challengeStatusCounts.notStartedStudents} 명
                </Typography>
              </Flex>
              <Flex row="between">
                <Typography size="h2" className="text-white">
                  제출한 학생 수
                </Typography>
                <Typography size="h2" className="text-white">
                  {challengeData.result.challengeStatusCounts.submissionFailedStudents} 명
                </Typography>
              </Flex>
              <Flex row="between">
                <Typography size="h2" className="text-white">
                  제출 실패한 학생 수
                </Typography>
                <Typography size="h2" className="text-white">
                  {challengeData.result.challengeStatusCounts.submissionFailedStudents} 명
                </Typography>
              </Flex>
              <Flex row="between">
                <Typography size="h2" className="text-white">
                  승인 된 학생 수
                </Typography>
                <Typography size="h2" className="text-white">
                  {challengeData.result.challengeStatusCounts.approvedStudents} 명
                </Typography>
              </Flex>
              <Flex row="between">
                <Typography size="h2" className="text-white">
                  승인 대기 중인 학생 수
                </Typography>
                <Typography size="h2" className="text-white">
                  {challengeData.result.challengeStatusCounts.pendingStudents} 명
                </Typography>
              </Flex>
              <Flex row="between">
                <Typography size="h2" className="text-white">
                  승인 거절 학생 수
                </Typography>
                <Typography size="h2" className="text-white">
                  {challengeData.result.challengeStatusCounts.rejectedStudents} 명
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
}
export default ChallengeStatistics;
