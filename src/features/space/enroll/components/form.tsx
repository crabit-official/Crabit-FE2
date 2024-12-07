'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { LiaHourglassEndSolid } from 'react-icons/lia';
import { RiMailSendLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import PhoneInput from './phone-input';

import AddressSearch from '@/shared/components/AddressSearch/address-search';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import NonRegisterInput from '@/shared/components/NonRegisterInput';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Spacing from '@/shared/components/Spacing/spacing';
import usePostCheckVerifyCode from '@/shared/hooks/auth/queries/usePostCheckVerifyCode';
import usePostSendVerifyCode from '@/shared/hooks/auth/queries/usePostSendVerifyCode';

const FREEMIUM_TIER = [
  { value: 'BETA', label: '베타 서비스 (무료)' },
  { value: 'STARTER', label: '스타터 (~25명)' },
  { value: 'BASIC', label: '베이직 (~100명)' },
  { value: 'STANDARD', label: '스탠다드 (~200명)' },
  { value: 'PREMIUM', label: '프리미엄 (~300명' },
  { value: 'ENTERPRISE', label: '엔터프라이즈 (맞춤 견적)' },
];

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
        toast.success('기관 신청이 완료되었습니다. 내부적으로 검토 후 연락 예정입니다.');
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
        <Input id="academyName" label="기관명" disabled={isLoading} register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Input
          id="academyEmail"
          type="email"
          label="기관 이메일"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          actionButton={
            postSendVerifyCodeLoading ? (
              <LiaHourglassEndSolid className="animate-spin" />
            ) : showTimerButton ? (
              isTimerActive ? (
                `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`
              ) : (
                '이메일 인증'
              )
            ) : null
          }
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
              actionButton={isLoading ? <LiaHourglassEndSolid className="animate-spin" /> : <RiMailSendLine />}
              actionButtonLoading={postCheckVerifyCodeLoading}
              onClickButton={handleVerifyCode}
              value={verifyCode}
              onChange={handleChangeVerifyInput}
            />
          </>
        )}
        <Spacing direction="vertical" size={24} />
        <AddressSearch setValue={setValue} id="academyAddress" label="기관 주소" register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Input disabled={isLoading} id="academyAddressDetail" label="기관 상세 주소" register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Flex className="w-full flex-col gap-5 md:flex-row">
          <SelectDropdown id="freemiumTier" label="요금제" register={register} errors={errors} options={FREEMIUM_TIER} />
          <PhoneInput id="contactNumber" label="대표자 번호" disabled={isLoading} control={control} errors={errors} required />
        </Flex>
        <Spacing direction="vertical" size={24} />
        <Button onClick={handleSubmit(onSubmit)} type="submit" variant="outline" className="border-neutral-300 py-5 transition hover:bg-neutral-100">
          기관 등록하기
        </Button>
      </Flex>
    </form>
  );
}

export default Form;
