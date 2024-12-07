'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

import StudentChallengeContent from '@/app/academy/(workspace)/[id]/dashboard/components/StudentChallengeContent';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';
import useGetInfiniteFeedChallengeContents from '@/shared/hooks/challenge/useGetInfiniteFeedChallengeContents';

interface IFeedProps {
  academyId: number;
}

function ChallengeFeed({ academyId }: IFeedProps) {
  const { data: contents, isFetching, hasNextPage, fetchNextPage } = useGetInfiniteFeedChallengeContents(academyId);
  const isEmpty = contents?.pages.every((page) => page.result.challengeLogList.length === 0);

  console.log(contents);

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

  if (isEmpty) {
    return (
      <Framer className="flex w-full flex-col items-center justify-center gap-10 py-10">
        <Image src="/images/icons/icon_bell.webp" alt="bell img" width={200} height={200} />
        <Flex column="start" className="w-80 rounded-2xl border border-solid border-gray-200 bg-gray-100 px-5 py-4">
          <Typography size="h4" as="p" className="opacity-80">
            인증글을 작성해주세요 !
          </Typography>
          <Typography size="h7" as="p" className="whitespace-pre-wrap font-normal opacity-60">
            {`챌린지를 시작한 상태인 챌린지에 대한\n인증 게시글만 조회 가능합니다.`}
          </Typography>
          <div className="mt-7">
            <Link href={`/academy/${academyId}/dashboard`} className="rounded-md bg-main-deep-pink px-4 py-2 text-sm font-semibold text-white hover:opacity-60">
              작성하러 가기
            </Link>
          </div>
        </Flex>
      </Framer>
    );
  }

  return (
    <Flex column="center" className="w-full gap-4">
      {contents?.pages.map((page) =>
        page.result.challengeLogList.map((content) => (
          <StudentChallengeContent
            academyId={academyId}
            key={content.challengeLog.studentChallengeLogId}
            challengeLog={content.challengeLog}
            studentProfile={content.studentProfile}
          />
        )),
      )}
      {isFetching
        ? Array(6)
            .fill('')
            .map((_, i) => <StudentChallengeContent.Skeleton key={i} />)
        : null}
      <div ref={ref} className="h-14" />
    </Flex>
  );
}
export default ChallengeFeed;
