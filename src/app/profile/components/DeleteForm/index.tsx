'use client';

import React, { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { FaUserXmark } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import SmallModal from '@/shared/components/SmallModal';
import Typography from '@/shared/components/Typography';
import useGetProfile from '@/shared/hooks/main/useGetProfile';
import useDeleteAccount from '@/shared/hooks/profile/useDeleteAccount';
import { emailSchema } from '@/shared/utils/schema';

function DeleteForm() {
  const { data: profile } = useGetProfile();
  const { mutate } = useDeleteAccount();
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: FieldValues) => {
    if (data.email !== profile?.email) toast.error('이메일이 일치하지 않습니다.');
    else mutate();
  };

  const bodyContent = (
    <div className="mt-4 flex flex-col gap-4">
      <Typography size="h6" className="break-keep font-normal opacity-60">
        탈퇴 진행을 위해 자신의 이메일을 입력해주세요
      </Typography>
      <Input variant="secondary" register={register} errors={errors} required label="이메일" id="email" />
    </div>
  );

  return (
    <div className="w-full">
      <Button onClick={() => setOpen(true)} className="gap-2 text-white" icon={FaUserXmark}>
        탈퇴 하기
      </Button>
      <SmallModal
        secondaryActionLabel="취소"
        secondaryAction={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel="탈퇴하기"
        isOpen={open}
        title="탈퇴하기"
        disabled={false}
        body={bodyContent}
      />
    </div>
  );
}
export default DeleteForm;
