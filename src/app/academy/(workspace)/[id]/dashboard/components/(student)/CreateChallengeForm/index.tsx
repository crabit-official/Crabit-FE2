import React from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { FaFile } from 'react-icons/fa';
import { IoMdPhotos } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import Toggle from '@/app/academy/(workspace)/[id]/dashboard/components/Toggle';
import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import TextArea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import useCreateChallengeContent from '@/shared/hooks/challenge/useCreateChallengeContent';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import type { TMyChallengeProgressResult } from '@/shared/types/acadmy';
import { S3_FOLDER_NAME } from '@/shared/types/image';
import { formatNumberWithCommas } from '@/shared/utils/number';

interface ICreateChallengeFormProps {
  academyId: number;
  challengeData: TMyChallengeProgressResult['result'];
  studentChallengeId: number;
}

function CreateChallengeForm({ challengeData, academyId, studentChallengeId }: ICreateChallengeFormProps) {
  const { filePreview, handleChangeFile, file, setFile, setFilePreview } = useImage();
  const { data: image, isSuccess } = useGetPresignedUrl({ fileName: file?.name as string, s3Folder: S3_FOLDER_NAME.GENERAL_STUDENT_CHALLENGE_LOG_FILE });
  const { mutate, isPending } = useCreateChallengeContent({ academyId, studentChallengeId });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    if (image) {
      if (isSuccess) {
        try {
          const res = await fetch(image.result.url, {
            method: 'PUT',
            body: file,
          });

          if (!res.ok) {
            toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
          } else {
            mutate({
              academyId,
              studentChallengeId,
              content: data.content,
              fileUrl: image.result.keyName,
            });
          }
        } catch {
          toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } else {
      mutate({
        academyId,
        studentChallengeId,
        content: data.content,
        fileUrl: null,
      });
    }
    reset();
    setFile(null);
    setFilePreview(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-xl border border-solid border-gray-100 p-5 pb-8 shadow-custom">
      <Flex column="start" className="gap-1">
        <Toggle
          buttonOpenLabel="설명 확인"
          buttonCloseLabel="설명 닫기"
          title={`'${challengeData.releasedChallenge.title}'  인증글 작성`}
          content={
            <Flex column="center" className="gap-4">
              <Typography size="h5" className="break-keep text-main-deep-pink">
                {getChallengeType(challengeData.releasedChallenge.challengeType)} • {getChallengeCategory(challengeData.releasedChallenge.challengeCategory)}
              </Typography>
              {challengeData.releasedChallenge.thumbnailImageUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData.releasedChallenge.thumbnailImageUrl}`}
                  alt="thumbnail image"
                  width={500}
                  height={500}
                  className="h-64 w-full rounded-2xl border border-solid border-gray-100 object-contain shadow-custom"
                />
              ) : null}
              <Flex column="center" className="gap-2">
                <Typography size="h6" className="break-keep font-medium text-main-deep-pink" as="p">
                  DAY {challengeData.releasedChallenge.totalDays} • Ⓟ {formatNumberWithCommas(challengeData.releasedChallenge.points)}
                </Typography>
                <Typography size="h5" className="overflow-hidden whitespace-pre-wrap break-all font-normal opacity-80" as="p">
                  {challengeData.releasedChallenge.content}
                </Typography>
                {challengeData?.releasedChallenge.description && (
                  <>
                    <Typography size="h6" as="p" className="mt-">
                      챌린지 추가 설명
                    </Typography>
                    <Typography size="h5" className="overflow-hidden whitespace-pre-wrap break-all font-normal opacity-80" as="p">
                      {challengeData.releasedChallenge.description}
                    </Typography>
                  </>
                )}
              </Flex>
              {/* TODO: 챌린지 올린 사람이, 올린 파일을 볼 수 있는 자리. */}
              {challengeData.releasedChallenge.fileUrl && (
                <Flex column="start" className="w-full gap-2 rounded-xl bg-neutral-50 p-5">
                  <Typography size="h5" className="break-keep font-bold opacity-80" as="p">
                    첨부 파일
                  </Typography>
                  <Flex row="start">
                    <FaFile className="mr-2" />
                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData.releasedChallenge.fileUrl}`}
                      download
                      className="text-blue-500 underline"
                    >
                      {challengeData.releasedChallenge.fileUrl.split('_').slice(1).join('_')}
                    </Link>
                  </Flex>
                </Flex>
              )}
            </Flex>
          }
        />
        <Flex as="figure" column="center" className="mt-2 gap-2">
          <label
            htmlFor="file"
            className="flex h-[400px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-solid border-gray-100 bg-neutral-50"
          >
            {filePreview ? (
              <Image src={filePreview} width={200} height={400} className="h-[400px] w-full overflow-hidden rounded-xl object-contain" alt="img" />
            ) : (
              <IoMdPhotos size={30} />
            )}
          </label>
          <input type="file" id="file" {...register('file')} onChange={handleChangeFile} className="hidden" />
          <TextArea id="content" label="챌린지 내용" register={register} errors={errors} required />
        </Flex>
        <Button type="submit" className="break-keep font-medium text-white" disabled={challengeData?.studentChallenge.hasTodayChallengeLog}>
          {isPending ? '업로드 중...' : challengeData?.studentChallenge.hasTodayChallengeLog ? '오늘의 챌린지를 이미 제출 하였습니다' : '제출하기'}
        </Button>
      </Flex>
    </form>
  );
}

export default CreateChallengeForm;
