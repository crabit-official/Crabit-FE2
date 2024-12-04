'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHouseChimney, FaPencil } from 'react-icons/fa6';
import { IoCall } from 'react-icons/io5';
import { MdCameraAlt, MdEmail } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'sonner';
import type { z } from 'zod';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import { getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import PhoneInput from '@/features/space/enroll/components/phone-input';
import AddressSearch from '@/shared/components/AddressSearch/address-search';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Input from '@/shared/components/Input';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import type { FREEMIUM_TIRE } from '@/shared/enums/academy';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import { institutionSchema } from '@/shared/utils/schema';

type FormValues = z.infer<typeof institutionSchema>;

interface IAcademyEditFormProps {
  academyId: number;
}

function AcademyEditForm({ academyId }: IAcademyEditFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { useGetAcademyInfo, updateAcademyInfo } = useManageAcademy();
  const { data: academyInfo, isPending } = useGetAcademyInfo({ academyId });
  const { filePreview, handleChangeFile, file } = useImage();
  const { data: image, isSuccess } = useGetPresignedUrl(file?.name as string);
  const queryClient = useQueryClient();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      academyName: academyInfo?.result.academy.academyName || '',
      address: academyInfo?.result.academy.address || '',
      addressDetail: academyInfo?.result.academy.addressDetail || '',
      mainImageUrl: academyInfo?.result.academy.mainImageUrl || '',
      contactNumber: academyInfo?.result.academy.contactNumber || '',
    },
    resolver: zodResolver(institutionSchema),
  });

  const onSubmit = async (data: FormValues) => {
    if (image) {
      if (isSuccess) {
        try {
          const res = await fetch(image.result.url, {
            method: 'PUT',
            body: file,
          });

          if (!res.ok) {
            toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
          } else {
            updateAcademyInfo.mutate(
              {
                mainImageUrl: image.result.keyName,
                address: data.address,
                contactNumber: data.contactNumber,
                academyName: data.academyName,
                academyId,
                addressDetail: data.addressDetail,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_INFO, academyId] });
                },
              },
            );
          }
        } catch {
          toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } else {
      updateAcademyInfo.mutate(
        {
          mainImageUrl: data.mainImageUrl,
          address: data.address,
          contactNumber: data.contactNumber,
          academyName: data.academyName,
          academyId,
          addressDetail: data.addressDetail,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_INFO, academyId] });
          },
        },
      );
    }

    setIsEditing(false);
  };

  let mainImage;

  if (isEditing) {
    mainImage = (
      <>
        <label
          htmlFor="file"
          className="relative flex size-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-solid border-gray-200 bg-gray-50"
        >
          <div className="absolute bottom-[-5px] right-[-13px] w-fit rounded-full bg-gray-300 p-2 text-gray-500">
            <MdCameraAlt size={15} />
          </div>
          {filePreview ? (
            <Image src={filePreview} width={100} height={100} className="size-32 rounded-xl object-contain" alt="img" />
          ) : academyInfo?.result.academy.mainImageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${academyInfo?.result.academy.mainImageUrl}`}
              alt="image"
              width={100}
              height={100}
              className="size-32 rounded-xl object-contain"
            />
          ) : (
            <MdCameraAlt size={15} />
          )}
        </label>
        <input type="file" id="file" onChange={handleChangeFile} className="hidden" />
      </>
    );
  } else {
    mainImage = (
      <Image
        src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${academyInfo?.result.academy.mainImageUrl}`}
        alt="image"
        width={100}
        height={100}
        className="size-32 rounded-xl border-2 border-solid border-gray-100 object-contain"
      />
    );
  }

  return (
    <FramerScale className="flex w-full flex-col justify-start gap-5">
      <section className="relative flex flex-col gap-4">
        {!isEditing && (
          <Button
            disabled={isPending}
            variant="secondary"
            type="button"
            className="absolute right-[-10px] top-[-15px] w-fit rounded-full p-[10px] hover:bg-main-deep-pink hover:text-white"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <FaPencil size={15} />
          </Button>
        )}
        <BoxContainer className="flex w-full flex-col items-center gap-4 p-8 pb-14">
          {mainImage}
          <Flex rowColumn="center" className="w-full gap-3">
            {isEditing ? (
              <>
                <Flex rowColumn="center" className="gap-2">
                  <Input id="academyName" label="기관명" register={register} errors={errors} required />
                </Flex>
                <BoxContainer variant="border" className="w-full gap-2">
                  <PhoneInput id="contactNumber" label="대표자 번호" control={control} errors={errors} required />
                  <AddressSearch setValue={setValue} id="address" label="기관 주소" register={register} errors={errors} required />
                  <Input id="addressDetail" label="기관 상세 주소" register={register} errors={errors} required />
                </BoxContainer>
                <Flex row="end" className="w-full">
                  <Button type="button" className="w-fit px-2 py-1 text-sm font-medium text-white" onClick={handleSubmit(onSubmit)}>
                    수정하기
                  </Button>
                </Flex>
              </>
            ) : (
              <>
                <Flex rowColumn="center" className="gap-2">
                  <StateLabel
                    label={`${academyInfo?.result.academy.freemiumTier}`}
                    variant={getVariantByStatus(academyInfo?.result?.academy?.freemiumTier as FREEMIUM_TIRE)}
                    outline="square"
                  />
                  <Typography size="h5">{academyInfo?.result.academy.academyName}</Typography>
                </Flex>
                <BoxContainer variant="border" className="w-full gap-2">
                  <span className="flex items-center gap-1">
                    <IoCall /> {academyInfo?.result.academy.contactNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHouseChimney /> {academyInfo?.result.academy.address} | {academyInfo?.result.academy.addressDetail}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdEmail /> {academyInfo?.result.academy.email}
                  </span>
                </BoxContainer>
              </>
            )}

            <BoxContainer variant="border" className="w-full gap-4">
              <Flex column="start">
                <Typography size="h5" className="text-neutral-700">
                  현재 <strong className="font-extrabold text-main-deep-pink">{academyInfo?.result.academy.freemiumTier}</strong> 요금제를 선택중입니다
                </Typography>
                <Typography size="h7" className="font-normal opacity-60">
                  학원의 요금제를 변경하시려면 관리자에게 문의해주세요
                </Typography>
              </Flex>
              <Flex column="start">
                <Typography size="h6" className="font-normal">
                  학생 : {academyInfo?.result.academy.studentCount}명 • 관리자 : {academyInfo?.result.academy.instructorCount}명
                </Typography>
              </Flex>
            </BoxContainer>
          </Flex>
        </BoxContainer>
      </section>
    </FramerScale>
  );
}

export default AcademyEditForm;
