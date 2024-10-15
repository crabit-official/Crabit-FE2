'use client';

import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import useLoginModal from '@/features/main/hooks/use-login-modal';
import useRegisterModal from '@/features/main/hooks/use-register-modal';
import Button from '@/shared/components/Button';
import Heading from '@/shared/components/Heading';
import Input from '@/shared/components/Input';
import Modal from '@/shared/components/Modal';
import { loginSchema } from '@/shared/utils/schema';

function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      loginModal.onClose();
      reset();
    } else {
      toast.error(res?.error);
    }

    setIsLoading(false);
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
      <div className="flex flex-row items-center justify-center gap-2">
        <div>이미 크래빗 계정이 없으신가요?</div>
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
    </div>
  );

  return (
    <Modal
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="로그인"
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="로그인"
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
