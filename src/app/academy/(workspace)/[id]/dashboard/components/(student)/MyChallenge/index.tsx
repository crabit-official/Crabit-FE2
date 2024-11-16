'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

import StudentChallengeContent from '@/app/academy/(workspace)/[id]/dashboard/components/StudentChallengeContent';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';
import useInfiniteMyChallengeContents from '@/shared/hooks/challenge/useInfiniteMyChallengeContents';

interface IMyChallengeProps {
  academyId: number;
  studentChallengeId: number;
}

function MyChallenge({ academyId, studentChallengeId }: IMyChallengeProps) {
  const { data: contents, isError, isFetching, hasNextPage, fetchNextPage } = useInfiniteMyChallengeContents(academyId, studentChallengeId);
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

  if (isError) {
    return (
      <Flex>
        <Typography size="h5">에러가 발생했습니다.</Typography>
      </Flex>
    );
  }

  if (isEmpty) {
    return (
      <Framer className="flex w-full flex-col items-center justify-center gap-10 py-10">
        <Image src="/images/icons/icon_bell.webp" alt="bell img" width={200} height={200} />
        <Flex column="start" className="w-80 rounded-2xl border border-solid border-gray-200 bg-gray-100 px-5 py-4">
          <Typography size="h4" as="p" className="opacity-80">
            챌린지 글이 없습니다
          </Typography>
          <Typography size="h7" as="p" className="font-normal opacity-60">
            오늘의 인증글을 작성해주세요.
          </Typography>
          <div className="mt-7">
            <Link href="?tab=create" className="rounded-md bg-main-deep-pink px-4 py-2 text-sm font-semibold text-white hover:opacity-60">
              작성하기
            </Link>
          </div>
        </Flex>
      </Framer>
    );
  }

  return (
    <Flex column="center" className="w-full gap-4">
      <div>
        디자인 수정 예정입니다...
        {isFetching && '데이터 불러오는 중...'}
      </div>
      {contents?.pages.map((page) =>
        page.result.challengeLogList.map((content) => (
          <StudentChallengeContent
            key={content.challengeLog.studentChallengeLogId}
            challengeLog={content.challengeLog}
            studentProfile={content.studentProfile}
          />
        )),
      )}
      <div ref={ref} className="h-14" />
    </Flex>
  );
}

export default MyChallenge;
