'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { zodResolver } from '@hookform/resolvers/zod';

import useLoginModal from '@/features/main/hooks/use-login-modal';
import useRegisterModal from '@/features/main/hooks/use-register-modal';
import Button from '@/shared/components/Button';
import CheckBox from '@/shared/components/CheckBox';
import Flex from '@/shared/components/Flex';
import Heading from '@/shared/components/Heading';
import Input from '@/shared/components/Input';
import Modal from '@/shared/components/Modal';
import NonRegisterInput from '@/shared/components/NonRegisterInput';
import Typography from '@/shared/components/Typography';
import { GLOBAL_ROLE, SOCIAL_TYPE } from '@/shared/enums/auth';
import usePostCheckVerifyCode from '@/shared/hooks/auth/queries/usePostCheckVerifyCode';
import usePostSendVerifyCode from '@/shared/hooks/auth/queries/usePostSendVerifyCode';
import usePostSignupMutation from '@/shared/hooks/auth/queries/usePostSignupMutation';
import { signUpSchema } from '@/shared/utils/schema';

function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: postSignup } = usePostSignupMutation();
  const { mutate: postSendVerifyCode, isPending: postSendVerifyCodeLoading } = usePostSendVerifyCode();
  const { mutate: postCheckVerifyCode, isPending: postCheckVerifyCodeLoading } = usePostCheckVerifyCode();

  const [isShownVerifyInput, setIsShownVerifyInput] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');

  const handleChangeVerifyInput = (e: ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(e.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      privacyPolicyAllowed: false,
      termsOfServiceAllowed: false,
      marketingEmailAllowed: false,
      socialType: 'LOCAL',
      globalRole: 'ROLE_USER',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    postSignup(
      {
        email: data.email,
        globalRole: GLOBAL_ROLE.ROLE_USER,
        name: data.name,
        password: data.password,
        privacyPolicyAllowed: data.privacyPolicyAllowed ? 'AGREE' : 'DISAGREE',
        socialType: SOCIAL_TYPE.LOCAL,
        termsOfServiceAllowed: data.termsOfServiceAllowed ? 'AGREE' : 'DISAGREE',
        marketingEmailAllowed: data.marketingEmailAllowed ? 'AGREE' : 'DISAGREE',
      },
      {
        onSuccess: () => {
          registerModal.onClose();
          loginModal.onOpen();
          reset();
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Crabit에 오신 것을 환영합니다." subTitle="계정을 생성해주세요!" />
      <Input id="name" label="이름" disabled={isLoading} register={register} errors={errors} required />
      <Input
        id="email"
        label="이메일"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        actionButton="이메일 인증"
        actionButtonLoading={postSendVerifyCodeLoading}
        onClickButton={() => {
          if (getValues('email').trim().length !== 0) {
            postSendVerifyCode(
              {
                email: getValues('email') as string,
                emailVerificationPurpose: 'JOIN_VERIFIED',
              },
              {
                onSuccess: () => {
                  setIsShownVerifyInput(true);
                },
              },
            );
          }
        }}
      />
      {isShownVerifyInput && (
        <NonRegisterInput
          id="verifyCode"
          label="인증번호"
          disabled={isLoading}
          actionButton="인증하기"
          actionButtonLoading={postCheckVerifyCodeLoading}
          onClickButton={() => {
            if (verifyCode.trim().length !== 0) {
              postCheckVerifyCode(
                {
                  code: verifyCode,
                  email: getValues('email') as string,
                  emailVerificationPurpose: 'JOIN_VERIFIED',
                },
                {
                  onSuccess: () => {
                    setIsShownVerifyInput(false);
                  },
                },
              );
            }
          }}
          value={verifyCode}
          onChange={handleChangeVerifyInput}
        />
      )}
      <Input id="password" type="password" label="비밀번호" disabled={isLoading} register={register} errors={errors} required />
      <CheckBox label="개인정보 처리 방침 동의" id="privacyPolicyAllowed" disabled={isLoading} register={register} errors={errors} required />
      <CheckBox label=" 서비스 약관 동의" id="termsOfServiceAllowed" disabled={isLoading} register={register} errors={errors} required />
      <CheckBox label=" 마케팅 약관 동의" id="marketingEmailAllowed" disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button variant="outline" onClick={() => {}} icon={FcGoogle}>
        구글로 로그인하기
      </Button>
      {/* 소셜로그인 추가 될 떄 마다 아래 버튼 추가 */}
      <Flex className="gap-2">
        <Typography size="h6">크래빗 계정이 있으신가요?</Typography>
        <div
          onClick={() => {
            registerModal.onClose();
            loginModal.onOpen();
          }}
          className="cursor-pointer hover:underline"
        >
          <Typography color="neutral-500" size="h6">
            로그인
          </Typography>
        </div>
      </Flex>
    </div>
  );

  return (
    <Modal
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="회원가입"
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="회원가입"
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
