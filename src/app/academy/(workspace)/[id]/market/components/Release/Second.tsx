import React from 'react';
import { type FieldValues, useForm } from 'react-hook-form';

import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import TextArea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import type { IReleaseChallengeDTO } from '@/shared/types/market';

interface ISecondProps {
  content: string;
  onBack: () => void;
  onNext: (data: Partial<IReleaseChallengeDTO>) => void;
}
export default function SecondStep({ onNext, onBack, content }: ISecondProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onBlur',
  });

  const handleNext = (data: FieldValues) => {
    const description = data.description ?? null;
    onNext({ description });
  };

  return (
    <form onSubmit={handleSubmit(handleNext)} className="flex flex-col justify-center gap-10">
      <Flex column="start" className="gap-4">
        <BoxContainer variant="border">
          <Typography size="h5" as="p" className="opacity-80">
            원본 챌린지 내용
          </Typography>
          <Typography size="h5" as="p" className="text-xs opacity-80">
            {content}
          </Typography>
        </BoxContainer>

        <BoxContainer variant="border">
          <TextArea id="description" label="챌린지 추가 설명" register={register} errors={errors} />
          <Typography size="h5" as="p" className="break-keep px-1 text-xs opacity-60">
            tip ) 원본 챌린지에 추가할 설명이 있다면 추가해주세요. 없다면, 다음을 눌러주세요
          </Typography>
        </BoxContainer>
      </Flex>
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
