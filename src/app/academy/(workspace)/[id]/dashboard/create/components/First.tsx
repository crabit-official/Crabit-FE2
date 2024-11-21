import React from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { IoMdPhotos } from 'react-icons/io';
import Image from 'next/image';
import { toast } from 'sonner';

import type { IChallengeValue } from '@/app/academy/(workspace)/[id]/dashboard/create/page';
import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import TextArea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';

interface IFirstProps {
  onNext: (data: Partial<IChallengeValue>) => void;
}

function First({ onNext }: IFirstProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({});
  const { filePreview, handleChangeFile, file } = useImage();
  const { data: image, isSuccess } = useGetPresignedUrl(file?.name as string);

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
            onNext({ title: data.title, content: data.content, thumbnailImageUrl: image.result.keyName });
          }
        } catch {
          toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } else {
      onNext({ title: data.title, content: data.content, thumbnailImageUrl: null });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <BoxContainer>
        <Flex column="start" className="gap-1">
          <Typography size="h3" className="opacity-80">
            챌린지 이미지
          </Typography>
          <Typography size="h5" as="p" className="text-xs opacity-60">
            tip ) 챌린지 썸네일 이미지를 등록해주세요
          </Typography>
          <Flex as="figure" row="start" className="mt-4">
            <label htmlFor="file" className="flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-neutral-100">
              {filePreview ? (
                <Image src={filePreview} width={200} height={200} className="h-52 w-full overflow-hidden rounded-xl object-cover" alt="img" />
              ) : (
                <IoMdPhotos size={30} />
              )}
            </label>
            <input type="file" id="file" {...register('file')} onChange={handleChangeFile} className="hidden" />
          </Flex>
        </Flex>
      </BoxContainer>
      <BoxContainer>
        <Flex column="start" className="gap-1">
          <Typography size="h3">제목</Typography>
          <Typography size="h5" as="p" className="text-xs opacity-60">
            ex ) 필사 챌린지, 미라클 모닝 챌린지
          </Typography>
        </Flex>
        <Input id="title" label="챌린지 제목" register={register} errors={errors} required />
      </BoxContainer>
      <BoxContainer>
        <Flex column="start" className="gap-1">
          <Typography size="h3" className="opacity-80">
            챌린지 내용
          </Typography>
          <Typography size="h5" as="p" className="text-xs opacity-60">
            tip ) 챌린지 방법에 대해 적어보세요 !
          </Typography>
        </Flex>
        <TextArea id="content" label="챌린지 내용" register={register} errors={errors} required />
      </BoxContainer>
      <div className="mt-4 flex gap-4">
        <Button type="submit" className="text-white">
          다음
        </Button>
      </div>
    </form>
  );
}

export default First;
