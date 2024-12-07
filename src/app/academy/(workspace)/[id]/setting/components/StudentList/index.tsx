'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import ProfileCard from '@/shared/components/ProfileCard';
import useGetInfiniteAcademyMemberDetailList from '@/shared/hooks/academy/useGetInfiniteAcademyMemberDetailList';

interface IStudentListProps {
  academyId: number;
}

function StudentList({ academyId }: IStudentListProps) {
  const router = useRouter();
  const { data: studentList, isFetching, hasNextPage, fetchNextPage } = useGetInfiniteAcademyMemberDetailList(9, academyId);

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
    <div className="grid w-full grid-cols-1 gap-5 pl-0 md:pl-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {studentList?.pages.map((page) =>
        page.result.studentList.map((student) => (
          <ProfileCard
            {...student}
            key={student.academyMemberId}
            onClick={() => router.push(`/academy/${academyId}/setting/management/student/${student.academyMemberId}`)}
          />
        )),
      )}
      {isFetching
        ? Array(9)
            .fill('')
            .map((_, i) => <ProfileCard.Skeleton key={i} />)
        : null}
      <div ref={ref} className="h-5" />
    </div>
  );
}

export default StudentList;
