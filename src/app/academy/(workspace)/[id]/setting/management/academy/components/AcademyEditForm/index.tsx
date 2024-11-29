'use client';

import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Container from '@/features/main/components/Container';
import Input from '@/shared/components/Input';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';

interface IAcademyEditFormProps {
  academyId: number;
}

function AcademyEditForm({ academyId }: IAcademyEditFormProps) {
  const { useGetAcademyInfo } = useManageAcademy();
  const { data: academyInfo } = useGetAcademyInfo({ academyId });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: isEditing ? academyInfo?.result.academy.academyName : '',
      address: isEditing ? academyInfo?.result.academy.address : '',
      addressDetail: isEditing ? academyInfo?.result.academy.addressDetail : '',
      email: isEditing ? academyInfo?.result.academy.email : '',
      mainImageUrl: isEditing ? academyInfo?.result.academy.mainImageUrl : '',
      studentCountRange: isEditing ? academyInfo?.result.academy.studentCountRange : '',
      contactNumber: isEditing ? academyInfo?.result.academy.contactNumber : '',
    },
  });

  return (
    <Container>
      <div>{isEditing ? <Input id="name" label="이름" errors={errors} register={register} /> : <p>{academyInfo?.result.academy.academyName}</p>}</div>

      <button type="button" onClick={() => setIsEditing((prev) => !prev)}>
        수정하기
      </button>
    </Container>
  );
}

export default AcademyEditForm;
