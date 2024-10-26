'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import type { Session } from 'next-auth';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import ListRow from '@/features/academy/alert/components/ListRow';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteAcademyMemberDetailList from '@/shared/hooks/academy/useGetInfiniteAcademyMemberDetailList';

interface IStudentDetailList {
  academyId: number;
  session: Session;
}

function StudentDetailList({ session, academyId }: IStudentDetailList) {
  const { data: students, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteAcademyMemberDetailList(session, 100, academyId);

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
        page?.result.studentList?.map((member) => (
          <ListRow
            key={member.academyMemberId}
            left={member.profileImageUrl == null ? <Image src="/images/logo_app.png" alt="이미지" width="60" height="60" /> : member.profileImageUrl}
            contents={
              <ListRow.Texts
                title={
                  <Typography size="h4">
                    {member.memberName} | {member.nickname}
                  </Typography>
                }
                subTitle={
                  <Typography size="h6" color="neutral-400" className="w-80 overflow-hidden truncate">
                    {member.introduction}
                  </Typography>
                }
              />
            }
            right={
              <div>
                <StateLabel label={String(member.point)} variant="green" />
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
