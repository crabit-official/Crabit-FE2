'use client';

import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AddressSearch from '@/shared/components/AddressSearch/address-search';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import Spacing from '@/shared/components/Spacing/spacing';

function Form() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    mode: 'onBlur',
  });

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
      reset();

      if (!response.ok) {
        const errorData = await response.json();
        toast.success(errorData.message as string);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      toast.error('알수 없는 에러가 발생했습니다.');
    }
  };

  return (
    <form>
      <Flex rowColumn="center">
        <Input id="academyName" label="학원명" disabled={isLoading} register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Flex className="w-full">
          <Input id="academyEmail" type="email" label="학원 이메일" disabled={isLoading} register={register} errors={errors} required />
          <Button className="ml-4 w-[150px]">이메일 인증</Button>
        </Flex>
        <Spacing direction="vertical" size={24} />
        <AddressSearch setValue={setValue} id="academyAddress" label="학원 주소" register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Input disabled={isLoading} id="academyAddressDetail" label="학원 상세 주소" register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Flex className="w-full flex-col gap-5 md:flex-row">
          <Input type="number" className="w-full" id="studentCount" label="학생 수" disabled={isLoading} register={register} errors={errors} required />
          <Input type="tel" id="contactNumber" label="대표자 번호" disabled={isLoading} register={register} errors={errors} required />
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
