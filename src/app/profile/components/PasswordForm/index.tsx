import React from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import { LiaHourglassEndSolid } from 'react-icons/lia';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import Typography from '@/shared/components/Typography';
import useChangePassword from '@/shared/hooks/profile/useChangePassword';
import { passwordSchema } from '@/shared/utils/schema';

interface IEmailProps {
  email: string;
}

function PasswordForm({ email }: IEmailProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(passwordSchema),
  });
  const { mutate, isPending } = useChangePassword();

  const onSubmit = (data: FieldValues) => {
    mutate({
      email,
      password: data.password,
    });
  };

  return (
    <Flex column="start" className="gap-4">
      <Typography size="h3" as="p" className="opacity-80">
        비밀번호 수정
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:flex-row">
        <Input type="password" register={register} id="password" errors={errors} label="새 비밀번호" disabled={isPending} />
        <Button type="submit" className="w-full text-white sm:w-16" disabled={isPending}>
          {isPending ? <LiaHourglassEndSolid className="animate-spin" /> : <FiSave />}
        </Button>
      </form>
      {errors.password && (
        <Typography size="h6" as="p" className="mt-1 text-xs text-red-500">
          {errors.password.message as string}
        </Typography>
      )}
    </Flex>
  );
}
export default PasswordForm;
