'use client';

import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

import useLoginModal from '@/features/main/hooks/use-login-modal';
import useRegisterModal from '@/features/main/hooks/use-register-modal';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Heading from '@/shared/components/Heading';
import Input from '@/shared/components/Input';
import Modal from '@/shared/components/Modal';
import Typography from '@/shared/components/Typography';

function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = () => {
    setIsLoading(true);
    // 데이터 요청, 성공시 registerModal.onClose
    // onSettled setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Crabit에 오신 것을 환영합니다." subTitle="계정을 생성해주세요!" />
      <Input id="email" label="이메일" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" type="password" label="비밀번호" disabled={isLoading} register={register} errors={errors} required />
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
