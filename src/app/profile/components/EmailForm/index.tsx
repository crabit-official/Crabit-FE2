'use client';

import React from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { LiaHourglassEndSolid } from 'react-icons/lia';
import { RiMailSendLine } from 'react-icons/ri';

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
import useGetProfile from '@/shared/hooks/main/useGetProfile';

function EmailForm() {
  const { data: profile } = useGetProfile();

  const {
    register: codeRegister,
    handleSubmit: codeSubmit,
    formState: { errors: codeErrors },
  } = useForm<FieldValues>({});

  const { mutate: codeMutate, isSuccess: codeSuccess } = useVerifyCode();
  const { mutate, isPending, isSuccess: sendEmailSuccess } = useSendEmail();

  const sendEmail = () => {
    mutate({
      emailVerificationPurpose: EMAIL_VERIFIED_TYPE.UPDATE_PASSWORD_VERIFIED,
      email: profile?.email as string,
    });
  };

  const onSubmit = (data: FieldValues) => {
    codeMutate({
      email: profile?.email as string,
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
        <form className="flex flex-col gap-4 sm:flex-row" onSubmit={codeSubmit(onSubmit)}>
          <Input register={codeRegister} id="code" errors={codeErrors} label="인증코드" />
          {!sendEmailSuccess && (
            <Button onClick={() => sendEmail()} className="w-full text-white sm:w-16" disabled={isPending}>
              {isPending ? <LiaHourglassEndSolid className="animate-spin" /> : <RiMailSendLine />}
            </Button>
          )}

          <Button type="submit" className="w-full text-white sm:w-16">
            <FaCheck />
          </Button>
        </form>
        <Flex column="start" className="gap-4">
          <Typography size="h5" as="p" className="pl-1 text-xs opacity-60">
            크래빗에 가입하신 이메일로, 인증번호가 전송됩니다.
          </Typography>
          <Typography size="h5" as="p" className="pl-1 text-xs opacity-60">
            코드 전송 후 10분 이내에 입력해주세요
          </Typography>
        </Flex>
      </Flex>

      {codeSuccess && (
        <Framer>
          <div className="mb-5 h-px w-full bg-gray-200" />
          <PasswordForm email={profile?.email as string} />
        </Framer>
      )}
    </BoxContainer>
  );
}

export default EmailForm;
