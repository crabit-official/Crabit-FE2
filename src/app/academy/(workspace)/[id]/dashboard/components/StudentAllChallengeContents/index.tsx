'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
import PlusChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/PlusChallengeCard';
import { getStatusName } from '@/features/academy/(workspace)/utils/challengeState';
import Typography from '@/shared/components/Typography';
import { LOG_SUBMISSION_NAME } from '@/shared/constants/tab-menu';
import useGetInfiniteStudentChallengeList from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeList';

interface IStudentAllChallengeContentsProps {
  academyId: number;
  category: string;
  search: string;
}

// 학생 대시보드
function StudentAllChallengeContents({ academyId, category, search }: IStudentAllChallengeContentsProps) {
  const selectedCategory = LOG_SUBMISSION_NAME[category] ?? undefined;

  const { data: challenge, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteStudentChallengeList(academyId, selectedCategory, search);
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

  const isEmpty = challenge?.pages.every((page) => page.result.studentChallengeList.length === 0);

  if (isEmpty) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <PlusChallengeCard onClick={() => router.push(`/academy/${academyId}/public-challenge`)} content={'참여할\n챌린지 찾기'} />
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {challenge?.pages.map((page) =>
        page.result.studentChallengeList.map((item) => (
          <AnimateCard
            onClick={() => router.push(`dashboard/${item.studentChallengeStatus.studentChallengeId}`)}
            title={item.challenge.title}
            subTitle={item.challenge.content}
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
