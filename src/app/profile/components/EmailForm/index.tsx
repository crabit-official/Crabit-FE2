'use client';

import React, { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { LiaHourglassEndSolid } from 'react-icons/lia';
import { RiMailSendLine } from 'react-icons/ri';
import { zodResolver } from '@hookform/resolvers/zod';

import PasswordForm from '@/app/profile/components/PasswordForm';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Input from '@/shared/components/Input';
import Typography from '@/shared/components/Typography';
import { EMAIL_VERIFIED_TYPE } from '@/shared/enums/email';
import useSendEmail from '@/shared/hooks/email/useSendEmail';
import useVerifyCode from '@/shared/hooks/email/useVerifyCode';
import { emailSchema } from '@/shared/utils/schema';

function EmailForm() {
  const [email, setEmail] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: codeRegister,
    handleSubmit: codeSubmit,
    formState: { errors: codeErrors },
  } = useForm<FieldValues>({});

  const { mutate: codeMutate, isSuccess: codeSuccess } = useVerifyCode();
  const { mutate, isPending, isSuccess } = useSendEmail();

  const sendEmail = (data: FieldValues) => {
    setEmail(data.email as string);
    mutate({
      emailVerificationPurpose: EMAIL_VERIFIED_TYPE.UPDATE_PASSWORD_VERIFIED,
      email: data.email,
    });
  };

  const onSubmit = (data: FieldValues) => {
    codeMutate({
      email,
      emailVerificationPurpose: EMAIL_VERIFIED_TYPE.UPDATE_PASSWORD_VERIFIED,
      code: data.code,
    });
  };

  return (
    <BoxContainer variant="border" className="gap-4 py-10">
      <Typography size="h3" as="p" className="opacity-80">
        이메일 인증
      </Typography>
      <Flex column="start" className="gap-4">
        <form onSubmit={handleSubmit(sendEmail)} className="flex flex-col gap-4 sm:flex-row">
          <Input register={register} id="email" errors={errors} label="이메일" disabled={isPending} />
          <Button type="submit" className="w-full text-white sm:w-16" disabled={isPending}>
            {isPending ? <LiaHourglassEndSolid className="animate-spin" /> : <RiMailSendLine />}
          </Button>
        </form>
      </Flex>
      <Flex column="start" className="gap-4">
        <form className="flex flex-col gap-4 sm:flex-row" onSubmit={codeSubmit(onSubmit)}>
          <Input register={codeRegister} id="code" errors={codeErrors} label="인증코드" disabled={!isSuccess} />
          <Button type="submit" className="w-full text-white sm:w-16" disabled={!isSuccess}>
            <FaArrowRight />
          </Button>
        </form>
        <Typography size="h5" as="p" className="pl-1 text-xs opacity-60">
          코드 전송 후 10분 이내에 입력해주세요
        </Typography>
      </Flex>

      {codeSuccess && (
        <Framer>
          <div className="mb-5 h-px w-full bg-gray-200" />
          <PasswordForm email={email} />
        </Framer>
      )}
    </BoxContainer>
  );
}

export default EmailForm;
