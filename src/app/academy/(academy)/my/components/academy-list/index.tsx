'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
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
      <Framer
        onClick={() => {}}
        whileHover={{ scale: 1.01 }}
        className="relative flex h-fit min-h-80 w-[300px] cursor-pointer flex-col items-center justify-start overflow-hidden rounded-lg border border-solid border-gray-100 bg-main-deep-pink p-4 py-10 shadow-custom transition-shadow duration-300 hover:shadow-hover-custom sm:w-64"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-main-white to-main-deep-pink opacity-50" />
        <Flex column="start" className="size-full min-h-32 gap-2 px-1">
          <Typography size="h1" color="main-white" className="break-keep font-bold">
            학원
          </Typography>
          <Typography size="h1" color="main-white" className="break-keep font-bold">
            초대코드 가입
          </Typography>
        </Flex>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mt-10 flex size-[50px] items-center justify-center rounded-full bg-white">
            <span className="text-3xl text-main-deep-pink">+</span>
          </div>
        </div>
      </Framer>
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
