import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import type { z } from 'zod';

import Students from '@/features/academy/(workspace)/components/dashboard/Students';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Typography from '@/shared/components/Typography';
import { METHOD_CATEGORIES } from '@/shared/constants/challenge-cataegrories';
import { CHALLENGE_PARTICIPATION_METHODS } from '@/shared/enums/challenge';
import useGetInfiniteAcademyMemberDetailList from '@/shared/hooks/academy/useGetInfiniteAcademyStudentList';
import type { IReleaseChallengeDTO } from '@/shared/types/market';
import { marketSchema } from '@/shared/utils/schema';

type FormValues = z.infer<typeof marketSchema>;

interface IFirstStep {
  academyId: number;
  onNext: (data: Partial<IReleaseChallengeDTO>) => void;
}

function FirstStep({ academyId, onNext }: IFirstStep) {
  const { data: studentData, isFetching, hasNextPage, fetchNextPage, isError } = useGetInfiniteAcademyMemberDetailList(10, academyId);
  const [selectedStudentIdList, setSelectedStudentIdList] = useState<number[]>([]);
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(marketSchema),
    mode: 'onBlur',
    defaultValues: {
      challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING,
    },
  });
  const watchCategory = watch('challengeParticipationMethod');

  const handleRelease = (data: FormValues) => {
    const challengeData: Partial<IReleaseChallengeDTO> = {
      totalDays: data.totalDays,
      challengeParticipationMethod: data.challengeParticipationMethod as CHALLENGE_PARTICIPATION_METHODS,
      studentIdList: [],
      points: data.points,
    };

    if (data.challengeParticipationMethod === CHALLENGE_PARTICIPATION_METHODS.ASSIGNED) {
      if (selectedStudentIdList.length !== 0) challengeData.studentIdList = selectedStudentIdList;
      else {
        toast.error('배정형의 경우 학생을 선택해주세요');
        return;
      }
    }

    onNext({ ...challengeData });
  };

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
    <form onSubmit={handleSubmit(handleRelease)} className="flex flex-col justify-center gap-10">
      <Flex column="start" className="gap-4">
        <BoxContainer variant="border" className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
          <Input id="totalDays" type="number" label="챌린지 기간" register={register} errors={errors} required valueAsNumber />
          <Typography size="h5" as="p" className="px-1 text-xs opacity-60">
            tip ) 챌린지 진행 기간은 최소 3일에서 최대 31일까지 설정할 수 있습니다.
          </Typography>
        </BoxContainer>
        <BoxContainer variant="border" className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
          <Input id="points" type="number" label="포인트" register={register} errors={errors} required valueAsNumber />
        </BoxContainer>
        <BoxContainer variant="border" className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
          <SelectDropdown id="challengeParticipationMethod" label="챌린지 참여 방식" register={register} errors={errors} options={METHOD_CATEGORIES} />
          <Typography size="h5" as="p" className="px-1 text-xs opacity-60">
            tip ) 배정형의 경우 참여 학생을 선택합니다.
          </Typography>
          {watchCategory === CHALLENGE_PARTICIPATION_METHODS.ASSIGNED && (
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
          )}
        </BoxContainer>
      </Flex>

      <Button type="submit" className="font-medium text-white">
        다음
      </Button>
    </form>
  );
}
export default FirstStep;
