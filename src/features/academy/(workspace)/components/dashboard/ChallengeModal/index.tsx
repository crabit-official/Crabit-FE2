'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import First from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/First';
import Second from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/Second';
import Third from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/Third';
import useCreateChallenges from '@/features/academy/(workspace)/hooks/challenges/use-create-challenges';
import useChallengeModal from '@/features/academy/(workspace)/hooks/use-challenge-modal';
import ProgressBar from '@/shared/components/ProgressBar';

export interface IChallengeValue {
  challengeCategory: string;
  challengeMarketVisibility: string;
  challengeParticipationMethod: 'ASSIGNED' | 'SELF_PARTICIPATING';
  content: string;
  open: boolean;
  points: number;
  step: number;
  studentIdList: number[];
  thumbnailImageUrl: string | null;
  title: string;
  totalDays: number;
}

const LAST_STEP = 3;

function ChallengeModal({ id }: { id: string }) {
  const { data: session } = useSession();
  const storageKey = `challenge=${session?.name}`;
  const { mutate, isPending } = useCreateChallenges();
  const challengeModal = useChallengeModal();

  const [values, setValue] = useState<Partial<IChallengeValue>>({
    step: 0,
  });

  // 클라이언트에서만 로컬스토리지를 접근
  useEffect(() => {
    // Client
    if (typeof window !== 'undefined') {
      const applied = localStorage.getItem(storageKey);
      if (applied !== null) {
        setValue(JSON.parse(applied) as IChallengeValue);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (values.step === 3 && challengeModal.isOpen) {
      mutate({
        id,
        challengeData: {
          title: values.title ?? '',
          challengeCategory: values.challengeCategory ?? '',
          challengeMarketVisibility: values.challengeMarketVisibility ?? '',
          challengeParticipationMethod: values.challengeParticipationMethod ?? '',
          content: values.content ?? '',
          thumbnailImageUrl: values.thumbnailImageUrl ?? null,
          points: Number(values.points) ?? 0,
          studentIdList: values.studentIdList ?? [],
          totalDays: Number(values.totalDays) ?? 0,
        },
        accessToken: session?.accessToken as string,
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem(storageKey);
      }
      setValue({ step: 0 });
    } else if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(values));
    }
  }, [values, storageKey, challengeModal, mutate, session?.accessToken, id]);

  const handleInfoChange = (infoValues: Pick<IChallengeValue, 'title' | 'content' | 'thumbnailImageUrl'>) => {
    setValue((pre) => ({
      ...pre,
      ...infoValues,
      step: (pre.step as number) + 1,
    }));
  };

  const handleTypeChange = (infoValues: Pick<IChallengeValue, 'challengeCategory' | 'challengeMarketVisibility' | 'points' | 'totalDays'>) => {
    setValue((pre) => ({
      ...pre,
      ...infoValues,
      step: (pre.step as number) + 1,
    }));
  };

  const handleParticipationChange = (infoValues: Pick<IChallengeValue, 'challengeParticipationMethod' | 'studentIdList'>) => {
    setValue((pre) => ({
      ...pre,
      ...infoValues,
      step: (pre.step as number) + 1,
    }));
  };

  if (!challengeModal.isOpen) {
    return null;
  }

  if (isPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none">
        <div className="lg:w-3-/6 relative mx-auto my-6 size-full rounded-xl bg-white md:h-auto md:w-4/6 lg:h-auto xl:w-2/5">
          <ProgressBar progress={(values.step as number) / LAST_STEP} />
          <div className="h-full p-10">
            <div>생성중..</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none">
      <div className="lg:w-3-/6 relative mx-auto my-6 size-full rounded-xl bg-white md:h-auto md:w-4/6 lg:h-auto xl:w-2/5">
        <ProgressBar progress={(values.step as number) / LAST_STEP} />
        <div className="h-full p-10">
          {values.step === 0 ? <First onNext={handleInfoChange} /> : null}
          {values.step === 1 ? <Second onNext={handleTypeChange} /> : null}
          {values.step === 2 ? <Third onNext={handleParticipationChange} id={id} accessToken={session?.accessToken as string} /> : null}
        </div>
      </div>
    </div>
  );
}

export default ChallengeModal;
