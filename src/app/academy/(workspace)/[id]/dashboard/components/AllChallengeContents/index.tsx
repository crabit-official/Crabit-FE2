'use client';

import React, { useEffect } from 'react';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
import { getChallengeCategory } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';
import useGetInfiniteTeacherChallengeList from '@/shared/hooks/challenge/useGetInfiniteTeacherChallengeList';

interface IAllChallengeContentsProps {
  academyId: number;
}

// 원장/강사 대시보드 챌린지
function AllChallengeContents({ academyId }: IAllChallengeContentsProps) {
  const router = useRouter();
  const { data: challenge, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteTeacherChallengeList(academyId);

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

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Framer
        onClick={() => {
          router.push('dashboard/create');
        }}
        whileHover={{ scale: 1.01 }}
        className="flex min-h-80 w-64 cursor-pointer flex-col justify-center gap-20 overflow-hidden rounded-lg border border-solid border-gray-100 bg-main-gradient px-6 shadow-custom transition-shadow duration-300 hover:shadow-hover-custom"
      >
        <Typography size="h2" className="break-keep text-white">
          새로운
          <br /> 챌린지 추가하기
        </Typography>
        <Flex rowColumn="center">
          <BsFillPatchPlusFill size={50} className="text-white opacity-80" />
        </Flex>
      </Framer>
      {challenge?.pages?.map((page) =>
        page.result.challengeList.map((item) => (
          <AnimateCard
            leftLabel={
              <Typography as="p" size="h7" className="text-xs" color="main-white">
                {getChallengeCategory(item.challengeCategory)}
              </Typography>
            }
            imageUrl={item.thumbnailImageUrl}
            key={item.releasedChallengeId}
            onClick={() => router.push(`dashboard/${item.releasedChallengeId}`)}
            title={item.title}
            subTitle={item.content}
          />
        )),
      )}
      {isFetching
        ? Array(10)
            .fill('')
            .map((_, i) => <AnimateCard.Skeleton key={i} />)
        : null}
      <div ref={ref} className="h-14" />
    </div>
  );
}

export default AllChallengeContents;
