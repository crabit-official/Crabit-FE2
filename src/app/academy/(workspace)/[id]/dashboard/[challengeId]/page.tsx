import React from 'react';

import ChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeDetail';
import ChallengeStatistics from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeStatistics';
import DetailTab from '@/app/academy/(workspace)/[id]/dashboard/components/DetailTab';
import StudentCard from '@/app/academy/(workspace)/[id]/dashboard/components/StudentCard';
import Flex from '@/shared/components/Flex';

interface IContentDetailProps {
  params: {
    challengeId: string;
    id: string;
  };
  searchParams: {
    tab: string;
  };
}

function ContentDetail({ params, searchParams }: IContentDetailProps) {
  return (
    <Flex className="w-full">
      <Flex column="start" className="min-h-[550px] w-full lg:w-2/3">
        <DetailTab academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} />
        <Flex rowColumn="center" className="z-10 mt-1 w-full gap-20 py-10">
          {searchParams.tab === 'challenge' && <ChallengeDetail academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} />}
          {searchParams.tab === 'student' && (
            <Flex column="between" className="w-full gap-2">
              <StudentCard color="blue" academyNickname="안예원" school="대진고등학교" challengeLogSubmissionStatus="진행 중" />
              <StudentCard color="gray" academyNickname="정혜원" school="한수중학교" challengeLogSubmissionStatus="시작 전" />
            </Flex>
          )}
          {searchParams.tab === 'statistics' && <ChallengeStatistics academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} />}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ContentDetail;
