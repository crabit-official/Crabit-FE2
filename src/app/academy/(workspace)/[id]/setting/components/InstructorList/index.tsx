'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import Flex from '@/shared/components/Flex';
import ProfileCard from '@/shared/components/ProfileCard';
import Typography from '@/shared/components/Typography';
import useGetInfiniteAcademyInstructorList from '@/shared/hooks/academy/useGetInfiniteAcademyInstructorList';

interface IInstructorListProps {
  academyId: number;
}

function InstructorList({ academyId }: IInstructorListProps) {
  const router = useRouter();
  const { data: instructorData, hasNextPage, isFetching, fetchNextPage, isError } = useGetInfiniteAcademyInstructorList(6, academyId);

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
