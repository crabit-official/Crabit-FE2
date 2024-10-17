'use client';

import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import Spacing from '@/shared/components/Spacing/spacing';

function Form() {
  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>();
  const [isLoading] = useState<boolean>(false);

  return (
    <Flex column="center">
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Spacing direction="vertical" size={24} />
      <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required />{' '}
    </Flex>
  );
}

export default Form;
