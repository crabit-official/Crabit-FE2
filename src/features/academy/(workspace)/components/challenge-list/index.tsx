'use client';

import { useEffect } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import type { Session } from 'next-auth';

import ChallengeCard from '@/features/academy/(workspace)/components/challenge-card';
import ChallengeModal from '@/features/academy/(workspace)/components/dashboard/ChallengeModal';
import useChallengeModal from '@/features/academy/(workspace)/hooks/use-challenge-modal';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteTeacherChallengeList from '@/shared/hooks/challenge/useGetInfiniteTeacherChallengeList';

interface IChallengeListProps {
  academyId: number;
  session: Session;
}

function ChallengeList({ session, academyId }: IChallengeListProps) {
  const { data: challenge, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteTeacherChallengeList(session, academyId);
  const challengeModal = useChallengeModal();

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
    <Flex column="center" className="w-full gap-5 lg:w-4/5">
      <ChallengeModal id={academyId} />
      <button type="button" className="fixed bottom-5 left-5 z-20 cursor-pointer" onClick={() => challengeModal.onOpen()}>
        <FaCirclePlus size={40} className="rounded-full bg-white text-main-pink hover:opacity-85" />
      </button>
      <Flex row="start" className="items-end gap-2">
        <Image src="/images/logo_goal.webp" alt="goal img" width={70} height={70} className="size-10 sm:size-[70px]" />
        <Typography size="h3" className="pb-0 sm:pb-3">
          챌린지 목록
        </Typography>
      </Flex>
      <div className="grid size-full grid-cols-1 place-items-center gap-5 sm:grid-cols-2 md:grid-cols-3">
        {challenge?.pages?.map((page) => page?.result?.challengeList?.map((list) => <ChallengeCard {...list} key={list.releasedChallengeId} />))}
        {isFetching ? <ChallengeCard.Skeleton /> : null}
        <div ref={ref} className="h-14" />
      </div>
    </Flex>
  );
}

export default ChallengeList;
