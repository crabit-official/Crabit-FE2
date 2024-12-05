'use client';

import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdCameraAlt } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import type { z } from 'zod';

import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import PhoneInput from '@/features/space/enroll/components/phone-input';
import AddressSearch from '@/shared/components/AddressSearch/address-search';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Input from '@/shared/components/Input';
import { queryKeys } from '@/shared/constants/query-keys';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import { institutionSchema } from '@/shared/utils/schema';

type FormValues = z.infer<typeof institutionSchema>;

interface IEditFormProps {
  academyName: string;
  address: string;
  addressDetail: string;
  contactNumber: string;
  mainImageUrl: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

function EditForm({ academyName, mainImageUrl, address, addressDetail, contactNumber, setIsEditing }: IEditFormProps) {
  const { updateAcademyInfo } = useManageAcademy();
  const { filePreview, handleChangeFile, file, handleImageUpload } = useImage();
  const { data: image, isSuccess } = useGetPresignedUrl(file?.name as string);
  const queryClient = useQueryClient();
  const params = useParams();
  const academyId = Number(params.id);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      academyName: academyName || '',
      address: address || '',
      addressDetail: addressDetail || '',
      mainImageUrl: mainImageUrl || '',
      contactNumber: contactNumber || '',
    },
    resolver: zodResolver(institutionSchema),
  });

  const updateAcademy = (data: FormValues, imageKeyName?: string) => {
    updateAcademyInfo.mutate(
      {
        mainImageUrl: imageKeyName || data.mainImageUrl,
        address: data.address,
        contactNumber: data.contactNumber,
        academyName: data.academyName,
        academyId,
        addressDetail: data.addressDetail,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_INFO, academyId] });
          queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_LIST] });
        },
        onSettled: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const onSubmit = async (data: FormValues) => {
    if (image && isSuccess) {
      const uploadSuccess = await handleImageUpload(image.result.url, file as File);
      if (uploadSuccess) {
        updateAcademy(data, image.result.keyName);
      }
    } else {
      updateAcademy(data);
    }
  };

  return (
    <FramerScale className="flex w-full flex-col justify-start gap-5">
      <section className="relative flex flex-col gap-4">
        <BoxContainer className="flex w-full flex-col items-center gap-4 break-keep p-8 pb-14">
          <label
            htmlFor="file"
            className="relative flex size-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-solid border-gray-200 bg-gray-50"
          >
            <div className="absolute bottom-[-5px] right-[-13px] w-fit rounded-full bg-gray-300 p-2 text-gray-500">
              <MdCameraAlt size={15} />
            </div>
            {filePreview ? (
              <Image src={filePreview} width={100} height={100} className="size-32 rounded-xl object-cover" alt="img" />
            ) : mainImageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${mainImageUrl}`}
                alt="image"
                width={100}
                height={100}
                className="size-32 rounded-xl object-cover"
              />
            ) : (
              <MdCameraAlt size={15} />
            )}
          </label>
          <input type="file" id="file" onChange={handleChangeFile} className="hidden" />
          <Flex rowColumn="center" className="w-full gap-3">
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
          </Flex>
        </BoxContainer>
      </section>
    </FramerScale>
  );
}

export default EditForm;
