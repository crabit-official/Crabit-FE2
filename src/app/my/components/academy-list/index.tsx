'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import useInvitationModal from '../../hooks/use-invitation-modal';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
import PlusChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/PlusChallengeCard';
import Typography from '@/shared/components/Typography';
import useGetInfiniteAcademyList from '@/shared/hooks/academy/useGetInfiniteAcademyList';
import { getRoleName } from '@/shared/utils/academyRole';

function AcademyList() {
  const router = useRouter();
  const invitationModal = useInvitationModal();
  const { data: academies, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteAcademyList();

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
    <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      <PlusChallengeCard
        content={`기관\n초대코드 가입`}
        onClick={() => {
          invitationModal.onOpen();
        }}
      />
      {academies?.pages.map((page) =>
        page.result?.memberAcademyList.map((academy) => (
          <AnimateCard
            key={academy.academyId}
            onClick={() => {
              router.push(`/academy/${academy.academyId}/dashboard?tab=all&challengeFilter=ALL`);
            }}
            title={academy.academyName}
            subTitle={academy.nickname}
            imageUrl={academy.academyMainImageUrl}
            leftLabel={
              <Typography color="main-white" size="h7">
                {getRoleName(academy.academyRole)}
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
