'use client';

import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import AddressSearch from '@/shared/components/AddressSearch/address-search';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import Spacing from '@/shared/components/Spacing/spacing';

function Form() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();
  const [isLoading] = useState<boolean>(false);

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  return (
    <form>
      <Flex rowColumn="center">
        <Input id="academyName" label="학원명" disabled={isLoading} register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Input id="academyEmail" type="email" label="학원 이메일" disabled={isLoading} register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <AddressSearch disabled={isLoading} setValue={setValue} id="academyAddress" label="학원 주소" register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <AddressSearch disabled={isLoading} setValue={setValue} id="academyAddressDetail" label="학원 상세 주소" register={register} errors={errors} required />
        <Spacing direction="vertical" size={24} />
        <Flex className="w-full flex-col gap-5 md:flex-row">
          <Input type="number" className="w-full" id="studentCount" label="학생 수" disabled={isLoading} register={register} errors={errors} required />
          <Input type="tel" id="contactNumber" label="대표자 번호" disabled={isLoading} register={register} errors={errors} required />
        </Flex>
        <Spacing direction="vertical" size={24} />
        <Button type="submit" variant="outline" className="border-neutral-300 py-5 transition hover:bg-neutral-100">
          학원 등록하기
        </Button>
      </Flex>
    </form>
  );
}

export default Form;
