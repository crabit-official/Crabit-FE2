import React from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { IoMdPhotos } from 'react-icons/io';
import Image from 'next/image';
import { toast } from 'sonner';

import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import TextArea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import useCreateChallengeContent from '@/shared/hooks/challenge/useCreateChallengeContent';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import type { TMyChallengeProgressResult } from '@/shared/types/acadmy';

interface ICreateChallengeFormProps {
  academyId: number;
  challengeData: TMyChallengeProgressResult['result'];
  studentChallengeId: number;
}

function CreateChallengeForm({ challengeData, academyId, studentChallengeId }: ICreateChallengeFormProps) {
  const { filePreview, handleChangeFile, file, setFile, setFilePreview } = useImage();
  const { data: image, isSuccess } = useGetPresignedUrl(file?.name as string);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-xl border border-solid border-gray-100 p-5 shadow-custom">
      <Flex column="start" className="gap-2">
        <Typography size="h3" className="opacity-80">
          챌린지 인증글 올리기
        </Typography>
        <Typography size="h5" as="p" className="text-xs opacity-60">
          tip ) 어찌고 저찌고 어찌고 저찌고...
        </Typography>

        <Flex as="figure" column="center" className="mt-4 gap-2">
          <label
            htmlFor="file"
            className="flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-solid border-gray-100 bg-neutral-50"
          >
            {filePreview ? (
              <Image src={filePreview} width={200} height={200} className="h-52 w-full overflow-hidden rounded-xl object-contain" alt="img" />
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
