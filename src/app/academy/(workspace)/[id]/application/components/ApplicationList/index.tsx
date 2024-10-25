'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import type { Session } from 'next-auth';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import ListRow from '@/features/academy/alert/components/ListRow';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteApplicationList from '@/shared/hooks/academy/useGetInfiniteApplicationList';

interface IApplicationList {
  academyId: number;
  session: Session;
}

function ApplicationList({ session, academyId }: IApplicationList) {
  const { data: application, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteApplicationList(session, 5, academyId);

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
      {application?.pages.map((page) =>
        page?.result.joinRequestMemberList?.map((member) => (
          <ListRow
            key={member.academyMemberId}
            left={
              member.crabitAccountProfileImageUrl == null ? (
                <Image src="/images/logo_app.png" alt="이미지" width="60" height="60" />
              ) : (
                member.crabitAccountProfileImageUrl
              )
            }
            contents={
              <ListRow.Texts
                title={
                  <Typography size="h4">
                    {member.memberName} | {member.nickname}
                  </Typography>
                }
                subTitle={
                  <Typography size="h6" color="neutral-400" className="w-80 overflow-hidden truncate">
                    {member.introduction.repeat(200)}
                  </Typography>
                }
              />
            }
            right={
              <div>
                <StateLabel label={member.academyRole} variant="green" />
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

export default ApplicationList;
