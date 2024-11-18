'use client';

import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
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

interface IMyChallengeContentFormProps {
  academyId: number;
  studentChallengeId: number;
}

function MyChallengeContentForm({ academyId, studentChallengeId }: IMyChallengeContentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      content: '',
      imageUrl: '',
    },
  });

  const { mutate } = useCreateChallengeContent({ academyId, studentChallengeId });
  const { filePreview, handleChangeFile, file, setFile } = useImage();
  const { data: image } = useGetPresignedUrl(file?.name as string);

  const createContent: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    if (image) {
      const res = await fetch(image.result.url, {
        method: 'PUT',
        body: file,
      });

      if (res?.ok) {
        mutate({
          academyId,
          studentChallengeId,
          content: data.content,
          fileUrl: image.result.keyName,
        });
      }
    } else {
      toast.error('인증 파일을 추가해주세요.');
    }

    reset();
    setFile(null);
  };

  return (
    <Flex rowColumn="center" className="my-4 w-full max-w-[1000px] px-5 md:px-0">
      <Flex rowColumn="center" className="w-full gap-4 md:w-2/3">
        <Typography size="h5" className="font-normal">
          오늘의 챌린지 진행상황을 작성해보세요 !
        </Typography>
        <form onSubmit={handleSubmit(createContent)} className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
          <Flex as="figure" row="start">
            <label htmlFor="file" className="flex h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-neutral-100">
              {filePreview ? (
                <Image src={filePreview} width={200} height={200} className="w-full overflow-hidden rounded-xl object-contain" alt="img" />
              ) : (
                <IoMdPhotos size={20} className="h-[200px]" />
              )}
            </label>
            <input type="file" id="file" {...register('file')} onChange={handleChangeFile} className="hidden" />
          </Flex>
          <TextArea id="content" label="챌린지 내용" register={register} errors={errors} required />
          <Button type="submit" className="text-white">
            작성하기
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

export default MyChallengeContentForm;
