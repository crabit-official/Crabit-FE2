'use client';

import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import { postEnrollAcademy } from '@/shared/apis/academy';
import AddressSearch from '@/shared/components/AddressSearch/address-search';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import Spacing from '@/shared/components/Spacing/spacing';
import type { IAcademyCreateDTO } from '@/shared/types/acadmy';

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
  const { data: session } = useSession();

  const [isLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    try {
      await postEnrollAcademy({ ...(data as IAcademyCreateDTO), session: session as Session });
      reset();
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  };

  return (
    <form>
      <Flex rowColumn="center">
        <Input id="academyName" label="학원명" disabled={isLoading} register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Input id="academyEmail" type="email" label="학원 이메일" disabled={isLoading} register={register} errors={errors} required />
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
