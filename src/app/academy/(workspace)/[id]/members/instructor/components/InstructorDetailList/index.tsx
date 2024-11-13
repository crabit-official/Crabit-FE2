'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import ListRow from '@/features/academy/alert/components/ListRow';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteAcademyInstructorList from '@/shared/hooks/academy/useGetInfiniteAcademyInstructorList';

interface IInstructorDetailList {
  academyId: number;
}

function InstructorDetailList({ academyId }: IInstructorDetailList) {
  const { data: instructors, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteAcademyInstructorList(5, academyId);

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
      {instructors?.pages.map((page) =>
        page?.result.teacherList?.map((instructor) => (
          <ListRow
            key={instructor.academyMemberId}
            left={instructor.profileImageUrl == null ? <Image src="/images/logo_app.png" alt="이미지" width="60" height="60" /> : instructor.profileImageUrl}
            contents={
              <ListRow.Texts
                title={
                  <Typography size="h4">
                    {instructor.memberName} | {instructor.nickname}
                  </Typography>
                }
                subTitle={
                  <Typography size="h6" color="neutral-400" className="w-80 overflow-hidden truncate">
                    {instructor.introduction}
                  </Typography>
                }
              />
            }
            right={
              <div>
                <StateLabel label={String(instructor.academyMemberId)} variant="cyan" />
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

export default InstructorDetailList;
