'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import Button from '@/shared/components/Button';
import FallbackMessage from '@/shared/components/FallbackMessage';
import Flex from '@/shared/components/Flex';
import ProfileCard from '@/shared/components/ProfileCard';
import useGetInfiniteAcademyInstructorList from '@/shared/hooks/academy/useGetInfiniteAcademyInstructorList';

interface IInstructorListProps {
  academyId: number;
}

function InstructorList({ academyId }: IInstructorListProps) {
  const router = useRouter();
  const { data: instructorData, hasNextPage, isFetching, fetchNextPage } = useGetInfiniteAcademyInstructorList(6, academyId);
  const isEmpty = instructorData?.pages.every((page) => page.result.teacherList.length === 0);

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
      <Flex rowColumn="center" className="h-fit gap-1">
        <FallbackMessage imageUrl="/images/animation/no_content.gif" title="관리자가 없습니다" content="기관에 관리자를 초대해주세요" />
        <Button type="button" onClick={() => router.push(`/academy/${academyId}/setting/management/invitation`)}>
          초대하기
        </Button>
      </Flex>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-5 pl-0 md:pl-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {instructorData?.pages.map((page) =>
        page.result.teacherList.map((teacher) => (
          <ProfileCard
            {...teacher}
            key={teacher.academyMemberId}
            onClick={() => router.push(`/academy/${academyId}/setting/management/instructor/${teacher.academyMemberId}`)}
          />
        )),
      )}
      {isFetching
        ? Array(6)
            .fill('')
            .map((_, i) => <ProfileCard.Skeleton key={i} />)
        : null}
      <div ref={ref} className="h-5" />
    </div>
  );
}

export default InstructorList;
