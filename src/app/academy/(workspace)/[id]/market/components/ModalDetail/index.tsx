'use client';

import React, { useEffect, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { GoX } from 'react-icons/go';
import { useInView } from 'react-intersection-observer';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Students from '@/features/academy/(workspace)/components/dashboard/Students';
import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeCategory, getChallengeType, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
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

type TModalDetailProps = TChallengeDetail['result'] & {
  academyId: number;
  challengeCoreId: number;
};
// TODO: 첨부파일
function ModalDetail({ challenge, teacher, academy, academyId, challengeCoreId }: TModalDetailProps) {
  let content;
  const router = useRouter();
  const [release, setRelease] = useState<boolean>(false);
  const { mutate, isPending } = useReleaseChallenge(academyId);
  const { data: studentData, isFetching, hasNextPage, fetchNextPage, isError } = useGetInfiniteAcademyMemberDetailList(10, academyId);
  const [selectedStudentIdList, setSelectedStudentIdList] = useState<number[]>([]);
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

  if (isError) {
    return (
      <Flex>
        <Typography size="h5">에러가 발생했습니다.</Typography>
      </Flex>
    );
  }

  if (release) {
    content = (
      <form onSubmit={handleSubmit(handleRelease)} className="flex h-full flex-col justify-center gap-4 p-6">
        <Typography size="h2">우리 학원에 배포</Typography>
        <Typography className="w-full pl-1 text-start text-xs font-medium text-neutral-300" size="h5">
          Tip ) 챌린지 진행 기간은 최소 3일에서 최대 31일까지 설정할 수 있습니다.
        </Typography>
        <Input id="totalDays" type="number" label="챌린지 기간" register={register} errors={errors} required valueAsNumber />
        <Input id="points" type="number" label="포인트" register={register} errors={errors} required valueAsNumber />
        <SelectDropdown id="challengeParticipationMethod" label="챌린지 참여 방식" register={register} errors={errors} options={METHOD_CATEGORIES} />
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
        <button type="button" className="absolute right-4 top-4 cursor-pointer font-bold text-black hover:text-main-pink" onClick={() => router.back()}>
          <GoX />
        </button>
        {challenge?.thumbnailImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge.thumbnailImageUrl}`}
            alt="thumbnail img"
            width={480}
            height={100}
            className="h-64 w-full object-cover"
          />
        ) : (
          <Image src="/images/test.jpeg" alt="default img" width={480} height={100} className="h-64 w-full object-cover" />
        )}
        <Flex column="between" className="h-full gap-4 p-6">
          <Flex column="start" className="gap-6">
            <Flex row="between" className="items-center">
              <Flex row="start" className="gap-2">
                <StateLabel label={getChallengeType(challenge?.challengeType)} variant={getVariantByStatus(challenge?.challengeType)} />
                <StateLabel label={getChallengeCategory(challenge?.challengeCategory)} variant={getVariantByStatus(challenge?.challengeCategory)} />
              </Flex>
              {teacher && academy && (
                <Typography size="h5" as="p" className="text-xs text-blue-950">
                  {academy?.academyName} • {teacher?.academyNickname}/{teacher?.memberName}
                </Typography>
              )}
            </Flex>
            <Flex column="start" className="gap-1 px-1">
              <Typography size="h4" className="break-keep">
                {challenge?.title}
              </Typography>
              <Typography size="h5" as="p" className="break-keep text-sm opacity-60">
                {challenge?.content}
              </Typography>
            </Flex>
          </Flex>
          <Flex row="start">
            <Typography size="h5" className="px-1 text-sm opacity-80">
              첨부파일 : {challenge?.fileUrl ? '첨부파일 내용' : '첨부파일이 존재하지 않습니다.'}
            </Typography>
          </Flex>
          <Button onClick={() => setRelease(true)} className="mt-4 bg-main-deep-pink font-medium text-white" disabled={challenge?.alreadyReleasedInAcademy}>
            {challenge?.alreadyReleasedInAcademy ? '이미 학원에 배포된 챌린지입니다.' : '우리 학원에 배포'}
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <div className="fixed left-0 top-0 z-50 size-full bg-black/60 backdrop-blur-sm" onClick={() => router.back()}>
      <Flex rowColumn="center" className="size-full px-4">
        <div
          className="relative flex min-h-[500px] w-full max-w-[500px] flex-col overflow-hidden rounded-2xl bg-white sm:w-2/3"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {content}
        </div>
      </Flex>
    </div>
  );
}

export default ModalDetail;
