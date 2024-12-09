import React from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { FaFileImport } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';

import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import Typography from '@/shared/components/Typography';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import type { IAcademyChallenges } from '@/shared/types/acadmy';
import { S3_FOLDER_NAME } from '@/shared/types/image';
import { challengeTwoSchema } from '@/shared/utils/schema';

interface ISecondProps {
  onBack: () => void;
  onNext: (data: Partial<IAcademyChallenges>) => void;
}

function Second({ onNext, onBack }: ISecondProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(challengeTwoSchema),
  });
  const { handleChangeFile, file, handleRemove } = useImage();
  const { data: fileUrl } = useGetPresignedUrl({
    fileName: file?.name as string,
    s3Folder: S3_FOLDER_NAME.CHALLENGE_CORE_FILE,
  });

  const onSubmit = async (data: FieldValues) => {
    if (fileUrl) {
      if (fileUrl.isSuccess) {
        const res = await fetch(fileUrl.result.url, {
          method: 'PUT',
          body: file,
        });

        if (res?.ok) onNext({ points: data.points, totalDays: data.totalDays, fileUrl: fileUrl.result.keyName });
      }
    } else {
      onNext({ points: data.points, totalDays: data.totalDays, fileUrl: null });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <BoxContainer>
        <Flex column="start" className="gap-1">
          <Typography size="h3" className="opacity-80">
            첨부파일
          </Typography>
          <Typography size="h5" as="p" className="text-xs opacity-60">
            tip ) 챌린지 관련 파일을 올려주세요.
          </Typography>
          <Flex as="figure" column="start">
            {file && (
              <button onClick={handleRemove} type="button" className="flex justify-end text-xs text-gray-600 hover:text-main-deep-pink">
                첨부파일 삭제
              </button>
            )}
            <label htmlFor="file" className="flex w-full cursor-pointer items-center justify-start gap-2 py-2 font-medium opacity-80">
              <BoxContainer variant="border" className="relative w-full flex-row items-center gap-2">
                {file ? (
                  file.name
                ) : (
                  <>
                    <FaFileImport />
                    <Typography size="h5">첨부파일 업로드</Typography>
                  </>
                )}
              </BoxContainer>
            </label>
            <input type="file" id="file" {...register('file')} onChange={handleChangeFile} className="hidden" />
          </Flex>
        </Flex>
      </BoxContainer>
      <BoxContainer className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
        <Flex column="start" className="gap-1">
          <Typography size="h3">포인트</Typography>
        </Flex>
        <Input id="points" type="number" label="포인트" register={register} errors={errors} required valueAsNumber />
      </BoxContainer>

      <BoxContainer className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
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

export default Second;
