'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
import PlusChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/PlusChallengeCard';
import { getChallengeCategory } from '@/features/academy/(workspace)/utils/challengeState';
import Typography from '@/shared/components/Typography';
import { PUBLIC_CATEGORY_NAME } from '@/shared/constants/tab-menu';
import useGetInfiniteMyAcademyChallenge from '@/shared/hooks/challenge/useGetInfiniteMyAcademyChallenge';

interface IAllChallengeContentsProps {
  academyId: number;
  category: string;
  search: string;
}

// 원장/강사 대시보드 챌린지
function AllChallengeContents({ academyId, category, search }: IAllChallengeContentsProps) {
  const router = useRouter();
  const selectedCategory = PUBLIC_CATEGORY_NAME[category] ?? undefined;
  const { data: challenge, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteMyAcademyChallenge(academyId, selectedCategory, search, 'ALL', 6);

  console.log(challenge);

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

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      <PlusChallengeCard onClick={() => router.push('dashboard/create')} content={'새로운\n챌린지 추가하기'} />
      {challenge?.pages?.map((page) =>
        page.result.releasedChallengeList.map((item) => (
          <AnimateCard
            leftLabel={
              <Typography as="p" size="h7" className="text-xs" color="main-white">
                {getChallengeCategory(item.releasedChallenge.challengeCategory)}
              </Typography>
            }
            imageUrl={item.releasedChallenge.thumbnailImageUrl}
            key={item.releasedChallenge.releasedChallengeId}
            onClick={() => router.push(`dashboard/${item.releasedChallenge.releasedChallengeId}`)}
            title={item.releasedChallenge.title}
            subTitle={item.releasedChallenge.content}
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

export default AllChallengeContents;
