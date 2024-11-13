'use client';

import React, { useEffect, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

import Students from '@/features/academy/(workspace)/components/dashboard/Students';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Typography from '@/shared/components/Typography';
import { METHOD_CATEGORIES } from '@/shared/constants/challenge-cataegrories';
import { CHALLENGE_PARTICIPATION_METHODS } from '@/shared/enums/challenge';
import useGetInfiniteAcademyMemberDetailList from '@/shared/hooks/academy/useGetInfiniteAcademyStudentList';
import useReleaseChallenge from '@/shared/hooks/market/useReleaseChallenge';
import type { IReleaseChallengeDTO, TChallengeDetail } from '@/shared/types/market';
import { marketSchema } from '@/shared/utils/schema';

type TChallengeDetailProps = TChallengeDetail['result'] & {
  academyId: number;
  challengeCoreId: number;
};

function ChallengeDetail({ challenge, teacher, academy, academyId, challengeCoreId }: TChallengeDetailProps) {
  let content;

  const { mutate, isPending } = useReleaseChallenge(academyId);
  const { data: studentData, isFetching, hasNextPage, fetchNextPage, isError } = useGetInfiniteAcademyMemberDetailList(10, academyId);
  const [selectedStudentIdList, setSelectedStudentIdList] = useState<number[]>([]);
  const [release, setRelease] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FieldValues>({
    resolver: zodResolver(marketSchema),
    mode: 'onBlur',
    defaultValues: {
      challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING,
    },
  });
  const watchCategory = watch('challengeParticipationMethod');

  const handleRelease = (data: FieldValues) => {
    const challengeData: IReleaseChallengeDTO = {
      points: data.points,
      totalDays: data.totalDays,
      challengeParticipationMethod: data.challengeParticipationMethod,
      studentIdList: [],
    };

    if (data.challengeParticipationMethod === CHALLENGE_PARTICIPATION_METHODS.ASSIGNED) {
      challengeData.studentIdList = selectedStudentIdList;
    }

    mutate({
      academyId,
      challengeCoreId,
      challengeData,
    });

    reset();
  };

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

  if (release) {
    content = (
      <form onSubmit={handleSubmit(handleRelease)} className="flex size-full flex-col justify-center gap-4 p-6">
        <Typography size="h2"> {challenge?.title} 우리 학원에 배포</Typography>
        <Typography className="w-full pl-1 text-start text-xs font-medium text-neutral-300" size="h5">
          Tip ) 챌린지 진행 기간은 최소 3일에서 최대 31일까지 설정할 수 있습니다.
        </Typography>
        <Input id="totalDays" type="number" label="챌린지 기간" register={register} errors={errors} required valueAsNumber />
        <Input id="points" type="number" label="포인트" register={register} errors={errors} required valueAsNumber />
        <SelectDropdown id="challengeParticipationMethod" label="챌린지 참여 방식" register={register} errors={errors} options={METHOD_CATEGORIES} />
        {watchCategory === CHALLENGE_PARTICIPATION_METHODS.ASSIGNED && (
          <div className="flex max-h-48 flex-wrap gap-2 overflow-y-scroll">
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
            <div ref={ref} className="h-14" />
          </div>
        )}
        <Button type="submit" className="font-medium text-white" disabled={isPending}>
          {isPending ? '학원에 배포중..' : '배포 하기'}
        </Button>
      </form>
    );
  } else {
    content = (
      <>
        <Flex column="center" className="w-full gap-1">
          <Flex row="start" className="items-center gap-2">
            <Typography size="h5" className="break-keep text-main-deep-pink">
              {getChallengeType(challenge?.challengeType)} • {getChallengeCategory(challenge?.challengeCategory)}
            </Typography>
            {teacher && academy && (
              <Typography size="h5" as="p" className="py-2 text-xs opacity-60">
                {academy?.academyName} • {teacher?.academyNickname}/{teacher?.memberName}
              </Typography>
            )}
          </Flex>
          <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
            {challenge?.title}
          </Typography>
        </Flex>
        <Flex column="center" className="gap-4">
          {challenge?.thumbnailImageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge.thumbnailImageUrl}`}
              alt="thumbnail img"
              width={400}
              height={400}
              className="size-full h-96 rounded-2xl object-cover"
            />
          ) : (
            <Image src="/images/test.jpeg" alt="default thumbnail img" width={300} height={300} className="h-96 w-full rounded-2xl object-cover" />
          )}
          <Typography size="h5" as="p" className="text-sm opacity-80">
            첨부파일 : {challenge?.fileUrl ? '첨부파일 내용' : '첨부파일이 존재하지 않습니다.'}
          </Typography>
          <Typography size="h5" as="p" className="break-keep text-base opacity-60">
            {challenge?.content}
          </Typography>
        </Flex>
        <Button onClick={() => setRelease(true)} className="mt-4 bg-main-deep-pink font-medium text-white" disabled={challenge?.alreadyReleasedInAcademy}>
          {challenge?.alreadyReleasedInAcademy ? '이미 학원에 배포된 챌린지입니다.' : '우리 학원에 배포'}
        </Button>
      </>
    );
  }
  return (
    <Flex rowColumn="center" className="w-full gap-10 px-6 py-20 md:w-3/5 md:px-0">
      {content}
    </Flex>
  );
}

export default ChallengeDetail;
