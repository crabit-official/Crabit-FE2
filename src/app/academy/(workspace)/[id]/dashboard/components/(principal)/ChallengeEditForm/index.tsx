'use client';

import React, { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import type { z } from 'zod';

import Students from '@/features/academy/(workspace)/components/dashboard/Students';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Textarea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import { METHOD_CATEGORIES } from '@/shared/constants/challenge-cataegrories';
import { queryKeys } from '@/shared/constants/query-keys';
import { CHALLENGE_PARTICIPATION_METHODS } from '@/shared/enums/challenge';
import useGetInfiniteAcademyMemberDetailList from '@/shared/hooks/academy/useGetInfiniteAcademyStudentList';
import useEditChallenge from '@/shared/hooks/challenge/useEditChallenge';
import type { TChallengeEditRequest } from '@/shared/types/acadmy';
import { challengeEditSchema } from '@/shared/utils/schema';

type FormValues = z.infer<typeof challengeEditSchema>;

interface IEditProps {
  challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS;
  content: string;
  description: string;
  points: number;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  title: string;
  totalDays: number;
}

function ChallengeEditForm({ points, title, totalDays, content, description, challengeParticipationMethod, setIsEdit }: IEditProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      points: points || 0,
      totalDays: totalDays || 0,
      description: description || '',
      challengeParticipationMethod: challengeParticipationMethod || CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING,
    },
    resolver: zodResolver(challengeEditSchema),
  });
  const queryClient = useQueryClient();
  const params = useParams();
  const { mutate } = useEditChallenge();
  const { data: studentData, isFetching, hasNextPage, fetchNextPage } = useGetInfiniteAcademyMemberDetailList(10, Number(params.id));

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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    const academyId = Number(params.id);
    const releasedChallengeId = Number(params.challengeId);

    const challengeData: TChallengeEditRequest = {
      academyId,
      releasedChallengeId,
      challengeParticipationMethod: data.challengeParticipationMethod as CHALLENGE_PARTICIPATION_METHODS,
      totalDays: data.totalDays || 0,
      studentIdList: selectedStudentIdList.length > 0 ? selectedStudentIdList : [],
      points: data.points || 0,
      description: data.description || '',
    };

    if (data.challengeParticipationMethod === CHALLENGE_PARTICIPATION_METHODS.ASSIGNED && selectedStudentIdList.length === 0) {
      toast.error('배정형의 경우 학생을 선택해주세요');
      return;
    }

    mutate(challengeData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.CHALLENGE_DETAIL, academyId, releasedChallengeId],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.CHALLENGE_STUDENT_PROGRESS_LIST, { academyId }, { releasedChallengeId }],
        });
      },
      onSettled: () => {
        setIsEdit((prev) => !prev);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col justify-start gap-5">
      <Typography size="h1" className="flex items-center gap-2 px-1">
        <FaRegEdit />
        {title} 수정
      </Typography>

      <Flex column="start" className="w-full gap-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <BoxContainer className="group justify-between transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
            <Flex column="start" className="gap-1">
              <Typography size="h3">포인트</Typography>
            </Flex>
            <Input id="points" type="number" label="포인트" register={register} errors={errors} required valueAsNumber />
          </BoxContainer>
          <BoxContainer className="group justify-between transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
            <Flex column="start" className="gap-1">
              <Typography size="h3" className="opacity-80">
                총 챌린지 기간
              </Typography>
              <Typography size="h5" as="p" className="text-xs opacity-60">
                tip ) 챌린지 진행 기간은 최소 3일에서 최대 31일까지 설정할 수 있습니다.
              </Typography>
            </Flex>
            <Input id="totalDays" label="챌린지 기간" type="number" register={register} errors={errors} required valueAsNumber />
          </BoxContainer>
        </div>
        <BoxContainer className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
          <Flex column="start" className="gap-1 border-b border-solid border-b-gray-100 pb-4">
            <Typography size="h3" className="opacity-80">
              원본 챌린지 설명
            </Typography>
            <Typography size="h6" className="overflow-hidden whitespace-normal break-all font-normal opacity-80">
              {content}
            </Typography>
          </Flex>
          <Flex column="start" className="gap-1">
            <Typography size="h3" className="opacity-80">
              챌린지 추가 설명
            </Typography>
            <Typography size="h5" as="p" className="text-xs opacity-60">
              우리 기관에 맞는 설명을 추가하고싶은 경우 작성해주세요
            </Typography>
          </Flex>
          <Textarea errors={errors} id="description" label="챌린지 추가 설명" register={register} />
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
      </Flex>
      <Button type="submit">수정하기</Button>
    </form>
  );
}
export default ChallengeEditForm;
