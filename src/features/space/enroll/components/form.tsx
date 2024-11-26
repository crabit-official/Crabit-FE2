'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import PhoneInput from './phone-input';

import AddressSearch from '@/shared/components/AddressSearch/address-search';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import NonRegisterInput from '@/shared/components/NonRegisterInput';
import Spacing from '@/shared/components/Spacing/spacing';
import usePostCheckVerifyCode from '@/shared/hooks/auth/queries/usePostCheckVerifyCode';
import usePostSendVerifyCode from '@/shared/hooks/auth/queries/usePostSendVerifyCode';

function Form() {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    control,
  } = useForm<FieldValues>({
    mode: 'onBlur',
  });

  const { mutate: postSendVerifyCode, isPending: postSendVerifyCodeLoading } = usePostSendVerifyCode();
  const { mutate: postCheckVerifyCode, isPending: postCheckVerifyCodeLoading } = usePostCheckVerifyCode();

  const [isShownVerifyInput, setIsShownVerifyInput] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showTimerButton, setShowTimerButton] = useState(true);

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
    const email = getValues('academyEmail').trim();
    if (email.length === 0 || postSendVerifyCodeLoading) return;

    postSendVerifyCode(
      {
        email,
        emailVerificationPurpose: 'ACADEMY_REGISTRATION_VERIFIED',
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
        email: getValues('academyEmail') as string,
        emailVerificationPurpose: 'ACADEMY_REGISTRATION_VERIFIED',
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

  const [isLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch('/api/academy/enroll', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error as string);
      }

      if (response.ok) {
        toast.success('학원 신청이 완료되었습니다. 내부적으로 검토 후 연락 예정입니다.');
        reset();
        router.push('/');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast.error(errorMessage);
    }
  };

  return (
    <form>
      <Flex rowColumn="center">
        <Input id="academyName" label="학원명" disabled={isLoading} register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Input
          id="academyEmail"
          type="email"
          label="학원 이메일"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          actionButton={showTimerButton ? (isTimerActive ? `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : '이메일 인증') : null}
          actionButtonLoading={postSendVerifyCodeLoading}
          onClickButton={handleSendVerifyCode}
        />
        {isShownVerifyInput && (
          <>
            <Spacing direction="vertical" size={24} />
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
          </>
        )}
        <Spacing direction="vertical" size={24} />
        <AddressSearch setValue={setValue} id="academyAddress" label="학원 주소" register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Input disabled={isLoading} id="academyAddressDetail" label="학원 상세 주소" register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Flex className="w-full flex-col gap-5 md:flex-row">
          <select
            id="studentCount"
            {...register('studentCount', { required: true })}
            disabled={isLoading}
            className="peer w-full rounded-md border-2 border-neutral-300 bg-main-white p-4 pt-6 font-light outline-none transition focus:border-main-black disabled:cursor-not-allowed disabled:opacity-70"
          >
            <option value="10명 이하">10명 이하</option>
            <option value="10~30명">10~30명</option>
            <option value="30~50명">30~50명</option>
            <option value="50~100명">50~100명</option>
            <option value="100~150명">100~150명</option>
            <option value="150명 이상">150명 이상</option>
          </select>
          <PhoneInput id="contactNumber" label="대표자 번호" disabled={isLoading} control={control} errors={errors} required />
        </Flex>
        <Spacing direction="vertical" size={24} />
        <Button onClick={handleSubmit(onSubmit)} type="submit" variant="outline" className="border-neutral-300 py-5 transition hover:bg-neutral-100">
          학원 등록하기
        </Button>
      </Flex>
    </form>
  );
}

export default Form;
