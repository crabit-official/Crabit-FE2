'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import useLoginModal from '../../hooks/use-login-modal';
import usePasswordChangeModal from '../../hooks/use-password-change-modal';
import useRegisterModal from '../../hooks/use-register-modal';

import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Heading from '@/shared/components/Heading';
import Input from '@/shared/components/Input';
import Modal from '@/shared/components/Modal';
import { EMAIL_VERIFIED_TYPE } from '@/shared/enums/email';
import usePasswordChange from '@/shared/hooks/auth/queries/usePasswordChange';
import useSendEmail from '@/shared/hooks/email/useSendEmail';
import useVerifyCode from '@/shared/hooks/email/useVerifyCode';
import { email, password } from '@/shared/utils/schema';

const formSchema = z.object({
  email,
  password,
  code: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

// 비밀번호 변경, (로그인 하지 않은 유저)
function PasswordChangeModal() {
  const passwordChangeModal = usePasswordChangeModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isVerifyCodeVisible, setIsVerifyCode] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: passwordChange } = usePasswordChange();
  const { mutate: sendEmailMutation, isPending: sendEmailPending } = useSendEmail();
  const { mutate: codeMutate, isSuccess: codeSuccess } = useVerifyCode();

  const sendEmail = () => {
    sendEmailMutation(
      {
        emailVerificationPurpose: EMAIL_VERIFIED_TYPE.UPDATE_PASSWORD_VERIFIED,
        email: getValues('email'),
      },
      {
        onSuccess: () => {
          setIsVerifyCode(true);
        },
      },
    );
  };

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);

    const { email, password } = data;

    passwordChange(
      { email, password },
      {
        onSuccess: () => {
          reset();
          setIsInputVisible(false);
          setIsPasswordVisible(false);
          setIsVerifyCode(false);
          passwordChangeModal.onClose();
          loginModal.onOpen();
        },
      },
    );

    setIsLoading(false);
  };

  const bodyContent = (
    <BoxContainer className="flex flex-col gap-4">
      <Heading title="비밀번호 변경" subTitle="이메일 인증 후 비밀번호 변경을 도와드릴게요!" />
      <Flex column="start" className="gap-4">
        {isInputVisible && (
          <Input
            actionButton={codeSuccess ? '재전송' : '인증코드 전송'}
            onClickButton={() => {
              sendEmail();
            }}
            actionButtonLoading={sendEmailPending}
            id="email"
            label="이메일"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        )}
        {isVerifyCodeVisible && (
          <Framer>
            <Input
              register={register}
              id="code"
              errors={errors}
              label="인증코드"
              actionButton="코드 인증"
              onClickButton={() => {
                codeMutate(
                  {
                    code: getValues('code'),
                    email: getValues('email'),
                    emailVerificationPurpose: EMAIL_VERIFIED_TYPE.UPDATE_PASSWORD_VERIFIED,
                  },
                  {
                    onSuccess: () => {
                      setIsVerifyCode(false);
                      setIsPasswordVisible(true);
                    },
                  },
                );
              }}
            />
          </Framer>
        )}
        {isPasswordVisible && (
          <Framer>
            <Input id="password" type="password" label="새 비밀번호" disabled={isLoading} register={register} errors={errors} required />
          </Framer>
        )}
        {!isInputVisible && (
          <Button
            type="button"
            className={`${sendEmailPending ? 'bg-gray-200' : 'bg-main-deep-pink'} `}
            disabled={codeSuccess}
            onClick={() => {
              setIsInputVisible(true);
            }}
          >
            이메일 인증하기
          </Button>
        )}
      </Flex>
    </BoxContainer>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      {/* 소셜로그인 추가 될 떄 마다 아래 버튼 추가 */}
      <div className="flex flex-row items-center justify-center gap-2">
        <div>아직 크래빗 계정이 없으신가요?</div>
        <div
          onClick={() => {
            loginModal.onClose();
            registerModal.onOpen();
          }}
          className="cursor-pointer text-neutral-800 hover:underline"
        >
          회원가입
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <div>이미 크래빗 계정이 있으신가요?</div>
        <div
          onClick={() => {
            loginModal.onClose();
            passwordChangeModal.onOpen();
          }}
          className="cursor-pointer text-neutral-800 hover:underline"
        >
          로그인
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      onClose={passwordChangeModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={codeSuccess ? '비밀번호 변경' : null}
      disabled={isLoading}
      isOpen={passwordChangeModal.isOpen}
      title="비밀번호 변경"
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default PasswordChangeModal;
