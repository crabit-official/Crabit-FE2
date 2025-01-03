'use client';

import React, { useState } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { BsTrash3Fill } from 'react-icons/bs';
import { FaFile } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import ChallengeCoreEditForm from '@/app/academy/(workspace)/[id]/dashboard/components/(principal)/ChallengeCoreEditForm';
import ChallengeEditForm from '@/app/academy/(workspace)/[id]/dashboard/components/(principal)/ChallengeEditForm';
import Toggle from '@/app/academy/(workspace)/[id]/dashboard/components/Toggle';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import BoxContainer from '@/shared/components/BoxContainer';
import FallbackMessage from '@/shared/components/FallbackMessage';
import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import SmallModal from '@/shared/components/SmallModal';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_SOURCE_TYPE } from '@/shared/enums/challenge';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';
import useDeleteChallenge from '@/shared/hooks/challenge/useDeleteChallenge';
import useGetChallengeDetail from '@/shared/hooks/challenge/useGetChallengeDetail';
import { formatNumberWithCommas } from '@/shared/utils/number';

type TChallengeDetailProps = {
  academyId: number;
  releasedChallengeId: number;
};

function ChallengeDetail({ academyId, releasedChallengeId }: TChallengeDetailProps) {
  const { data: challengeData, isPending } = useGetChallengeDetail(academyId, releasedChallengeId);
  const { useGetAcademyMemberProfile } = useManageAcademy();
  const { data: profile } = useGetAcademyMemberProfile({ academyId });
  const { mutate } = useDeleteChallenge({ academyId });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const editPossible =
    challengeData?.result?.challengeStatusCounts?.totalParticipants === 0 ||
    challengeData?.result?.challengeStatusCounts?.notStartedStudents === challengeData?.result?.challengeStatusCounts?.totalParticipants;
  const isCoreEdit =
    challengeData?.result.releasedChallenge.challengeSource === CHALLENGE_SOURCE_TYPE.ORIGINAL && !challengeData?.result.releasedChallenge.releasedInOthers;

  const handleDelete = () => {
    mutate({ academyId, releasedChallengeId });
  };

  if (isPending) {
    return (
      <Flex column="start" className="w-full gap-8">
        <Flex column="start" className="gap-2">
          <Skeleton height={21} width={100} className="rounded-md" />
          <Skeleton height={45} width={200} className="rounded-md" />
        </Flex>
        <Skeleton height={1000} className="rounded-lg" />
        <Skeleton height={100} className="rounded-lg" />
        <Flex className="gap-4">
          <Skeleton height={100} className="rounded-lg" />
          <Skeleton height={100} className="rounded-lg" />
        </Flex>
      </Flex>
    );
  }

  if (isEdit && challengeData && editPossible) {
    if (isCoreEdit) return <ChallengeCoreEditForm {...challengeData.result.releasedChallenge} setIsEdit={setIsEdit} />;
    return <ChallengeEditForm {...challengeData.result.releasedChallenge} setIsEdit={setIsEdit} />;
  }

  if (challengeData)
    return (
      <Flex className="w-full">
        {isEdit && !editPossible && (
          <SmallModal
            actionLabel="뒤로가기"
            onClose={() => setIsEdit((prev) => !prev)}
            onSubmit={() => setIsEdit((prev) => !prev)}
            body={
              <FallbackMessage
                imageUrl="/images/animation/alert.gif"
                title="챌린지를 수정할 수 없어요"
                content={
                  <Typography as="p" size="h6" className="font-normal opacity-90">
                    이미 참여중인 학생이 있을 경우
                    <br />
                    챌린지를 수정할 수 없습니다.
                  </Typography>
                }
              />
            }
          />
        )}
        {isOpen && (
          <SmallModal
            actionLabel="삭제하기"
            onClose={() => setIsOpen((prev) => !prev)}
            onSubmit={handleDelete}
            title="챌린지 삭제하기"
            secondaryActionLabel="취소하기"
            secondaryAction={() => setIsOpen((prev) => !prev)}
            body={
              <Typography size="h7" className="text-center font-normal text-gray-500">
                이미 진행 중인 학생이 있는 경우 챌린지를 삭제할 수 없습니다.
                <br />
                삭제를 원할 경우 관리자에게 문의 바랍니다.
                <br />
                ⚠️ 한번 삭제한 챌린지는 되돌릴 수 없습니다 ⚠️
              </Typography>
            }
          />
        )}
        <Flex column="center" className="relative w-full gap-5 px-2 sm:px-0">
          <Flex column="center" className="gap-1">
            <Typography size="h5" className="break-keep text-main-deep-pink">
              {getChallengeType(challengeData?.result.releasedChallenge.challengeType)} •{' '}
              {getChallengeCategory(challengeData?.result.releasedChallenge?.challengeCategory)}
            </Typography>
            <Typography size="h1" className="overflow-hidden whitespace-normal break-all text-3xl font-bold md:text-4xl">
              {challengeData?.result.releasedChallenge?.title}
            </Typography>
          </Flex>
          <div className="relative">
            {challengeData?.result.releasedChallenge?.thumbnailImageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData.result.releasedChallenge?.thumbnailImageUrl}`}
                alt="test"
                width={500}
                height={500}
                className="h-100 w-full rounded-2xl border border-solid border-gray-100 object-cover shadow-custom"
              />
            ) : (
              <Image
                src="/images/test.jpeg"
                alt="test"
                width={500}
                height={500}
                className="h-100 w-full rounded-2xl border border-solid border-gray-100 object-cover shadow-custom"
              />
            )}
            {challengeData.result.teacher.memberId === profile?.result.memberId && (
              <Flex column="center" className="absolute right-[-20px] top-[20px] mx-2 gap-4 rounded-xl bg-gray-100 p-4 sm:mx-0">
                <button type="button" onClick={() => setIsEdit((prev) => !prev)}>
                  <AiTwotoneEdit className="hover:text-main-deep-pink" />
                </button>
                <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
                  <BsTrash3Fill className="hover:text-main-deep-pink" />
                </button>
              </Flex>
            )}
          </div>
          <Flex column="start" className="gap-2 p-2">
            <Typography size="h3">챌린지 설명</Typography>
            <Typography size="h5" className="overflow-hidden whitespace-pre-wrap break-all text-start font-normal opacity-80" as="p">
              {challengeData?.result.releasedChallenge?.content}
            </Typography>

            {challengeData?.result.releasedChallenge?.description && (
              <>
                <hr className="my-4 h-1 w-full" />
                <Typography size="h5" as="p">
                  추가 설명
                </Typography>
                <Typography size="h5" className="overflow-hidden whitespace-pre-wrap break-all text-start font-normal opacity-80" as="p">
                  {challengeData?.result.releasedChallenge.description}
                </Typography>
              </>
            )}
          </Flex>
          <BoxContainer variant="border" className="px-4 py-5">
            <Toggle
              content={
                challengeData?.result.releasedChallenge?.fileUrl ? (
                  <Flex row="start">
                    <FaFile className="mr-2" />
                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData?.result.releasedChallenge.fileUrl}`}
                      download
                      className="text-blue-500 underline"
                    >
                      {challengeData?.result.releasedChallenge.fileUrl.split('_').slice(1).join('_')}
                    </Link>
                  </Flex>
                ) : (
                  '첨부파일이 없습니다.'
                )
              }
              title="첨부파일"
            />
          </BoxContainer>
          <Flex className="gap-4">
            <BoxContainer variant="border" className="flex w-full flex-col items-center px-4 py-5">
              <Typography size="h3" className="w-full text-start">
                배정된 포인트
              </Typography>
              <Typography size="h5" className="w-full text-end text-main-deep-pink">
                Ⓟ {formatNumberWithCommas(challengeData?.result.releasedChallenge?.points)}
              </Typography>
            </BoxContainer>
            <BoxContainer variant="border" className="flex w-full flex-col items-center px-4 py-5">
              <Typography size="h3" className="w-full text-start">
                총 일수
              </Typography>
              <Typography size="h5" className="w-full text-end text-main-deep-pink">
                Day {challengeData?.result.releasedChallenge?.totalDays}
              </Typography>
            </BoxContainer>
          </Flex>
        </Flex>
      </Flex>
    );
}

export default ChallengeDetail;
