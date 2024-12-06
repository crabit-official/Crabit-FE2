'use client';

import React, { useEffect, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { zodResolver } from '@hookform/resolvers/zod';

import Students from '@/features/academy/(workspace)/components/dashboard/Students';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_CATEGORIES, METHOD_CATEGORIES, VISIBILITY_CATEGORIES } from '@/shared/constants/challenge-cataegrories';
import { CHALLENGE_PARTICIPATION_METHODS } from '@/shared/enums/challenge';
import useGetInfiniteAcademyMemberDetailList from '@/shared/hooks/academy/useGetInfiniteAcademyStudentList';
import type { IAcademyChallenges } from '@/shared/types/acadmy';
import { challengeSchema } from '@/shared/utils/schema';

interface IThirdProps {
  academyId: number;
  onBack: () => void;
  onNext: (data: Partial<IAcademyChallenges>) => void;
}

function Third({ onBack, onNext, academyId }: IThirdProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    resolver: zodResolver(challengeSchema),
  });
  const { data: studentData, isFetching, hasNextPage, fetchNextPage, isError } = useGetInfiniteAcademyMemberDetailList(10, academyId);

  const [selectedStudentIdList, setSelectedStudentIdList] = useState<number[]>([]);
  const watchCategory = watch('challengeParticipationMethod');
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
    return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const onSubmit = (data: FieldValues) => {
    if (data.challengeParticipationMethod === CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING) {
      onNext({
        challengeMarketVisibility: data.challengeMarketVisibility,
        challengeParticipationMethod: data.challengeParticipationMethod,
        challengeCategory: data.challengeCategory,
      });
    } else {
      onNext({
        challengeMarketVisibility: data.challengeMarketVisibility,
        challengeParticipationMethod: data.challengeParticipationMethod,
        challengeCategory: data.challengeCategory,
        studentIdList: selectedStudentIdList,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <BoxContainer className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
        <Flex column="start" className="gap-1">
          <Typography size="h3">챌린지 종류</Typography>
        </Flex>
        <SelectDropdown id="challengeCategory" label="챌린지 종류" register={register} errors={errors} options={CHALLENGE_CATEGORIES} />
      </BoxContainer>
      <BoxContainer className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
        <Flex column="start" className="gap-1">
          <Typography size="h3">챌린지 마켓 업로드 여부</Typography>
          <Typography size="h5" as="p" className="text-xs opacity-60">
            tip ) 챌린지 마켓 업로드 여부
          </Typography>
        </Flex>
        <SelectDropdown id="challengeMarketVisibility" label="챌린지 마켓 업로드 여부" register={register} errors={errors} options={VISIBILITY_CATEGORIES} />
      </BoxContainer>
      <BoxContainer className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
        <Flex column="start" className="gap-1">
          <Typography size="h3">챌린지 참여 방식</Typography>
          <Typography size="h5" as="p" className="text-xs opacity-60">
            tip ) 배정형의 경우 참여 학생을 선택합니다.
          </Typography>
        </Flex>
        <Flex column="center" className="w-full gap-4">
          <SelectDropdown id="challengeParticipationMethod" label="챌린지 참여 방식" register={register} errors={errors} options={METHOD_CATEGORIES} />

          {watchCategory === CHALLENGE_PARTICIPATION_METHODS.ASSIGNED && (
            <>
              <Typography size="h5" className="mt-2 border-t border-solid border-gray-100 pt-4 text-sm font-normal opacity-80">
                챌린지에 참여할 학생을 선택해주세요.
              </Typography>
              <div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto">
                {studentData?.pages.map((page) =>
                  page.result.studentList.map((student) => (
                    <Students
                      key={student.academyMemberId}
                      {...student}
                      selectedStudentIdList={selectedStudentIdList}
                      setSelectedStudentIdList={setSelectedStudentIdList}
                    />
                  )),
                )}
                <div ref={ref} className="h-5" />
              </div>
            </>
          )}
        </Flex>
      </BoxContainer>
      <div className="mt-4 flex gap-4">
        <Button type="button" onClick={onBack} className="text-white">
          이전
        </Button>
        <Button type="submit" className="text-white">
          다음
        </Button>
      </div>
    </form>
  );
}

export default Third;
