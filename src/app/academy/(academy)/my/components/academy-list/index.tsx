'use client';

import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ListRow from '@/features/academy/alert/components/ListRow';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteAcademyList from '@/shared/hooks/academy/useGetInfiniteAcademyList';

function AcademyList() {
  const router = useRouter();
  const { data: academies, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteAcademyList();

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
      {academies?.pages.map((page) =>
        page.result?.memberAcademyList.map((academy) => (
          <Fragment key={academy.academyId}>
            <ListRow
              onClick={() => {
                router.push(`/academy/${academy.academyId}/dashboard`);
              }}
              right={academy.academyRole}
              left={
                academy.academyMainImageUrl == null ? <Image src="/images/logo_app.png" alt="이미지" width="60" height="60" /> : academy.academyMainImageUrl
              }
              contents={<ListRow.Texts title={academy.academyName} subTitle={academy.academyMemberId} />}
              withArrow
            />
          </Fragment>
        )),
      )}
      {isFetching ? <ListRow.Skeleton /> : null}
      <div ref={ref} className="h-[100px]" />
    </div>
  );
}

export default AcademyList;
