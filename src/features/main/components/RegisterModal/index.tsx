'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useLoginModal from '@/features/main/hooks/use-login-modal';
import useRegisterModal from '@/features/main/hooks/use-register-modal';
import CheckBox from '@/shared/components/CheckBox';
import Heading from '@/shared/components/Heading';
import Input from '@/shared/components/Input';
import Modal from '@/shared/components/Modal';
import NonRegisterInput from '@/shared/components/NonRegisterInput';
import { GLOBAL_ROLE, SOCIAL_TYPE } from '@/shared/enums/auth';
import usePostCheckVerifyCode from '@/shared/hooks/auth/queries/usePostCheckVerifyCode';
import usePostSendVerifyCode from '@/shared/hooks/auth/queries/usePostSendVerifyCode';
import usePostSignupMutation from '@/shared/hooks/auth/queries/usePostSignupMutation';
import { signUpSchema } from '@/shared/utils/schema';

function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isShownVerifyInput, setIsShownVerifyInput] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showTimerButton, setShowTimerButton] = useState(true);

  const { mutate: postSignup } = usePostSignupMutation();
  const { mutate: postSendVerifyCode, isPending: postSendVerifyCodeLoading } = usePostSendVerifyCode();
  const { mutate: postCheckVerifyCode, isPending: postCheckVerifyCodeLoading } = usePostCheckVerifyCode();

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
    },
  });

  /* eslint-disable consistent-return */
  useEffect(() => {
    if (timer > 0 && isTimerActive) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); // 클린업 함수 반환
    }

    if (timer === 0) {
      setIsTimerActive(false);
    }

    // 명시적으로 반환하지 않음
  }, [timer, isTimerActive]);

  const handleChangeVerifyInput = (e: ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(e.target.value);
  };

  const handleSendVerifyCode = () => {
    const email = getValues('email').trim();
    if (email.length === 0 || postSendVerifyCodeLoading) return;

    postSendVerifyCode(
      {
        email,
        emailVerificationPurpose: 'JOIN_VERIFIED',
      },
      {
        onSuccess: () => {
          setIsShownVerifyInput(true);
          setTimer(180); // 3 minutes
          setIsTimerActive(true);
          setShowTimerButton(true); // 버튼 다시 표시
        },
      },
    );
  };

  const handleVerifyCode = () => {
    if (verifyCode.trim().length === 0) return;

    postCheckVerifyCode(
      {
        code: verifyCode,
        email: getValues('email') as string,
        emailVerificationPurpose: 'JOIN_VERIFIED',
      },
      {
        onSuccess: () => {
          setIsTimerActive(false); // 타이머 중지
          setShowTimerButton(false); // 타이머 버튼 숨기기
          setIsShownVerifyInput(false); // 인증 입력 필드 숨기기
        },
      },
    );
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    postSignup(
      {
        email: data.email,
        name: data.name,
        password: data.password,
        privacyPolicyAllowed: data.privacyPolicyAllowed ? 'AGREE' : 'DISAGREE',
        termsOfServiceAllowed: data.termsOfServiceAllowed ? 'AGREE' : 'DISAGREE',
        marketingEmailAllowed: data.marketingEmailAllowed ? 'AGREE' : 'DISAGREE',
        globalRole: GLOBAL_ROLE.ROLE_USER,
        socialType: SOCIAL_TYPE.LOCAL,
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
        actionButton={showTimerButton ? (isTimerActive ? `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : '이메일 인증') : null}
        actionButtonLoading={postSendVerifyCodeLoading}
        onClickButton={handleSendVerifyCode}
      />
      {isShownVerifyInput && (
        <NonRegisterInput
          id="verifyCode"
          label="인증번호"
          disabled={isLoading}
          actionButton="인증하기"
          actionButtonLoading={postCheckVerifyCodeLoading}
          onClickButton={handleVerifyCode}
          value={verifyCode}
          onChange={handleChangeVerifyInput}
        />
      )}
      <Input id="password" type="password" label="비밀번호" disabled={isLoading} register={register} errors={errors} required />
      <CheckBox label="개인정보 처리 방침 동의" id="privacyPolicyAllowed" disabled={isLoading} register={register} errors={errors} required />
      <CheckBox label="서비스 약관 동의" id="termsOfServiceAllowed" disabled={isLoading} register={register} errors={errors} required />
      <CheckBox label="마케팅 약관 동의" id="marketingEmailAllowed" disabled={isLoading} register={register} errors={errors} />
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
    />
  );
}

export default RegisterModal;
