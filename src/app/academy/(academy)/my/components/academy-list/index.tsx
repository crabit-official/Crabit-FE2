'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
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
    <div className="grid h-full grid-cols-1 gap-6 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
      {academies?.pages.map((page) =>
        page.result?.memberAcademyList.map((academy) => (
          <AnimateCard
            key={academy.academyId}
            onClick={() => {
              router.push(`/academy/${academy.academyId}/dashboard`);
            }}
            title={academy.academyName}
            subTitle={academy.academyMemberNickname}
            imageUrl={academy.academyMainImageUrl}
            leftLabel={
              <Typography color="main-white" size="h7">
                {getRoleLabel(academy.academyRole)}
              </Typography>
            }
          />
        )),
      )}
      {isFetching
        ? Array(10)
            .fill('')
            .map((_, i) => <AnimateCard.Skeleton key={i} />)
        : null}
      <div ref={ref} className="h-[100px]" />
    </div>
  );
}

export default AcademyList;

function getRoleLabel(role: string) {
  switch (role) {
    case 'PRINCIPAL':
      return '원장님';
    case 'INSTRUCTOR':
      return '강사';
    case 'STUDENT':
      return '학생';
    default:
      return '유저';
  }
}
