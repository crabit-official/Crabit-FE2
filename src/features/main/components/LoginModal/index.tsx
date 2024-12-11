'use client';

import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import usePasswordChangeModal from '../../hooks/use-password-change-modal';

import useLoginModal from '@/features/main/hooks/use-login-modal';
import useRegisterModal from '@/features/main/hooks/use-register-modal';
import Heading from '@/shared/components/Heading';
import Input from '@/shared/components/Input';
import Modal from '@/shared/components/Modal';
import { queryKeys } from '@/shared/constants/query-keys';
import { loginSchema } from '@/shared/utils/schema';

function LoginModal() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const passwordChangeModal = usePasswordChangeModal();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);

    const { email, password } = data;

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res?.ok) {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PROFILE] });
      loginModal.onClose();
      reset();
      router.refresh();
    } else {
      toast.error('로그인에 실패하였습니다.');
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
      {/* <Button variant="outline" onClick={() => {}} icon={FcGoogle}>
        구글로 로그인하기
      </Button> */}
      {/* 소셜로그인 추가 될 떄 마다 아래 버튼 추가 */}
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <span
            className="cursor-pointer text-neutral-800 hover:underline"
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
          >
            회원가입
          </span>
          <span>|</span>
          <span
            className="cursor-pointer text-neutral-800 hover:underline"
            onClick={() => {
              loginModal.onClose();
              passwordChangeModal.onOpen();
            }}
          >
            비밀번호 찾기
          </span>
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
