'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import First from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/First';
import Second from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/Second';
import Third from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/Third';
import useChallengeModal from '@/features/academy/(workspace)/hooks/use-challenge-modal';
import ProgressBar from '@/shared/components/ProgressBar';

export interface IChallengeValue {
  challengeCategory: string;
  challengeMarketVisibility: string;
  challengeParticipationMethod: string;
  content: string;
  file: File | null;
  imageUrl: string;
  open: boolean;
  points: number;
  step: number;
  studentIdList: number[];
  title: string;
  totalDays: number;
}

const LAST_STEP = 3;

function ChallengeModal() {
  // const { mutate } = useCreateChallenges();
  const challengeModal = useChallengeModal();
  const { data: session } = useSession();
  const storageKey = `challenge=${session?.name}`;

  const [values, setValue] = useState<Partial<IChallengeValue>>(() => {
    const applied = localStorage.getItem(storageKey);
    if (applied === null) {
      return {
        step: 0,
      };
    }
    return JSON.parse(applied) as IChallengeValue;
  });

  useEffect(() => {
    // 데이터를 저장
    if (values.step === 3) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(values));
    }
  }, [values, storageKey, challengeModal]);

  const handleInfoChange = (infoValues: Pick<IChallengeValue, 'title' | 'content' | 'file'>) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none">
      <div className="lg:w-3-/6 relative mx-auto my-6 size-full rounded-xl bg-white md:h-auto md:w-4/6 lg:h-auto xl:w-2/5">
        <ProgressBar progress={(values.step as number) / LAST_STEP} />
        <div className="h-full p-10">
          {values.step === 0 ? <First onNext={handleInfoChange} /> : null}
          {values.step === 1 ? <Second onNext={handleTypeChange} /> : null}
          {values.step === 2 ? <Third onNext={handleParticipationChange} /> : null}
        </div>
      </div>
    </div>
  );
}

export default ChallengeModal;
