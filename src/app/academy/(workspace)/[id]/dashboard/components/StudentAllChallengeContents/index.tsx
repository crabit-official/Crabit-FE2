// 'use client';
//
// import React, { useEffect } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { useRouter } from 'next/navigation';
//
// import ChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeCard';
// import Flex from '@/shared/components/Flex';
// import Framer from '@/shared/components/Framer';
// import Typography from '@/shared/components/Typography';
// import useGetInfiniteStudentChallengeList from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeList';
//
// interface IStudentAllChallengeContentsProps {
//   academyId: number;
// }
//
// // 학생 대시보드 챌린지
// function StudentAllChallengeContents({ academyId }: IStudentAllChallengeContentsProps) {
//   const router = useRouter();
//   const { data: challenge, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteStudentChallengeList(academyId);
//
//   const { ref, inView } = useInView({
//     threshold: 0,
//     delay: 0,
//   });
//
//   useEffect(() => {
//     if (inView) {
//       if (!isFetching && hasNextPage) {
//         void fetchNextPage();
//       }
//     }
//   }, [inView, isFetching, hasNextPage, fetchNextPage]);
//
//   if (isError) {
//     return (
//       <Flex>
//         <Typography size="h5">에러가 발생했습니다.</Typography>
//       </Flex>
//     );
//   }
//
//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {challenge?.pages?.map((page) =>
//         page.result.challengeList.map((item) => (
//           <ChallengeCard {...item} key={item.releasedChallengeId} onClick={() => router.push(`dashboard/${item.releasedChallengeId}`)} />
//         )),
//       )}
//       <div ref={ref} className="h-14" />
//     </div>
//   );
// }
//
// export default StudentAllChallengeContents;
