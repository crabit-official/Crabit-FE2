'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import type { Session } from 'next-auth';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import ListRow from '@/features/academy/alert/components/ListRow';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteAcademyStudentList from '@/shared/hooks/academy/useGetInfiniteAcademyStudentList';

interface IInstructorStudentList {
  academyId: number;
  session: Session;
}

function StudentDetailList({ session, academyId }: IInstructorStudentList) {
  const { data: students, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteAcademyStudentList(session, 5, academyId);

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
    <div className="h-full overflow-y-auto">
      {students?.pages.map((page) =>
        page?.result.studentList?.map((student) => (
          <ListRow
            key={student.academyMemberId}
            left={student.profileImageUrl == null ? <Image src="/images/logo_app.png" alt="이미지" width="60" height="60" /> : student.profileImageUrl}
            contents={
              <ListRow.Texts
                title={
                  <Typography size="h4">
                    {student.memberName} | {student.nickname}
                  </Typography>
                }
                subTitle={
                  <Typography size="h6" color="neutral-400" className="w-80 overflow-hidden truncate">
                    {student.introduction}
                  </Typography>
                }
              />
            }
            right={
              <div>
                <StateLabel label={String(student.academyMemberId)} variant="cyan" />
              </div>
            }
            withArrow
          />
        )),
      )}
      {isFetching ? <ListRow.Skeleton /> : null}
      <div ref={ref} className="h-[100px]" />
    </div>
  );
}

export default StudentDetailList;
