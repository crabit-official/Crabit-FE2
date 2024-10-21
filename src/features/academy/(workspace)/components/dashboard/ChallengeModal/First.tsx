import { type FieldValues, useForm } from 'react-hook-form';
import { IoMdPhotos } from 'react-icons/io';
import Image from 'next/image';

import type { IChallengeValue } from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/index';
import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import TextArea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
// import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';

type InfoValues = Pick<IChallengeValue, 'title' | 'content' | 'file'>;

interface IFirstProps {
  onNext: (values: InfoValues) => void;
}

function First({ onNext }: IFirstProps) {
  const { filePreview, handleChangeFile, file } = useImage();

  // const { data } = useGetPresignedUrl(file?.name as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    onNext({ title: data.title, content: data.content, file });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex size-full min-h-96 flex-col items-center justify-between gap-2">
      <Flex column="center" className="w-full gap-8">
        <Typography size="h4" className="text-center">
          챌린지 정보 입력하기
        </Typography>
        <Flex column="center" className="w-full gap-2">
          <Input id="title" label="챌린지 제목" register={register} errors={errors} required />
          <TextArea id="content" label="챌린지 내용" register={register} errors={errors} required />
          <Flex as="figure" row="start">
            <label htmlFor="file" className="flex size-52 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-neutral-100">
              {filePreview ? (
                <Image src={filePreview} width={200} height={200} className="w-52 overflow-hidden rounded-xl object-contain" alt="img" />
              ) : (
                <>
                  <IoMdPhotos size={30} />
                  <Typography size="h5" className="text-sm">
                    사진을 선택해주세요.
                  </Typography>
                </>
              )}
            </label>
            <input type="file" id="file" {...register('file')} onChange={handleChangeFile} className="hidden" />
          </Flex>
        </Flex>
      </Flex>
      <button type="submit" className="w-full rounded-xl bg-main-pink p-4 text-white hover:opacity-90">
        다음
      </button>
    </form>
  );
}

export default First;
