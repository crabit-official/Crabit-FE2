'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
import PlusChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/PlusChallengeCard';
import { getChallengeCategory } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { PUBLIC_CATEGORY_NAME } from '@/shared/constants/tab-menu';
import useGetInfinitePublicChallenge from '@/shared/hooks/public/useGetInfinitePublicChallenge';

interface IPublicCardListProps {
  academyId: number;
  category: string;
}

function PublicCardList({ academyId, category }: IPublicCardListProps) {
  const router = useRouter();
  const selectedCategory = PUBLIC_CATEGORY_NAME[category] ?? undefined;
  const { data: challenge, isFetching, hasNextPage, fetchNextPage, isError } = useGetInfinitePublicChallenge(academyId, selectedCategory);
  const isEmpty = challenge?.pages.every((page) => page.result.academyPublicChallengeList.length === 0);

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

  if (isEmpty) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <PlusChallengeCard onClick={() => toast.message('준비중 입니다.')} content="준비중..." />
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {challenge?.pages.map((page) =>
        page.result.academyPublicChallengeList.map((item) => (
          <AnimateCard
            onClick={() => router.push(`public-challenge/${item.releasedChallengeId}`)}
            title={item.title}
            subTitle={item.content}
            key={item.releasedChallengeId}
            imageUrl={item.thumbnailImageUrl}
            leftLabel={
              <Typography as="p" size="h7" className="text-xs" color="main-white">
                {getChallengeCategory(item.challengeCategory)}
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

export default PublicCardList;
