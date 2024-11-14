'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
import PlusChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/PlusChallengeCard';
import { getStatusName } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteStudentChallengeList from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeList';

interface IStudentAllChallengeContentsProps {
  academyId: number;
}

// 학생 대시보드
// TODO: isEmpty router 경로 수정
function StudentAllChallengeContents({ academyId }: IStudentAllChallengeContentsProps) {
  const { data: challenge, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteStudentChallengeList(academyId);
  const router = useRouter();

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        void fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <Flex>
        <Typography size="h5">에러가 발생했습니다.</Typography>
      </Flex>
    );
  }

  const isEmpty = challenge?.pages.every((page) => page.result.studentChallengeList.length === 0);

  if (isEmpty) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PlusChallengeCard onClick={() => router.push('dashboard/create')} content={'참여할\n챌린지 찾기'} />
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {challenge?.pages.map((page) =>
        page.result.studentChallengeList.map((item) => (
          <AnimateCard
            onClick={() => router.push('/')}
            title={item.challenge.title}
            subTitle="예원이가 데이터 넣어주면 수정할 예정"
            key={item.studentChallengeStatus.studentChallengeId}
            imageUrl={item.challenge.thumbnailImageUrl}
            leftLabel={
              <Typography as="p" size="h7" className="text-xs" color="main-white">
                {getStatusName(item.studentChallengeStatus.challengeLogSubmissionStatus)}
              </Typography>
            }
          />
        )),
      )}
      {isFetching
        ? Array(6)
            .fill('')
            .map((_, i) => <AnimateCard.Skeleton key={i} />)
        : null}
      <div ref={ref} className="h-14" />
    </div>
  );
}

export default StudentAllChallengeContents;
