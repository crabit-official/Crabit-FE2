'use client';

import React, { useState } from 'react';
import { FaHouseChimney, FaPencil } from 'react-icons/fa6';
import { IoCall } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Typography from '@/shared/components/Typography';
import type { FREEMIUM_TIRE } from '@/shared/enums/academy';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';

interface IAcademyEditFormProps {
  academyId: number;
}

function AcademyEditForm({ academyId }: IAcademyEditFormProps) {
  const { useGetAcademyInfo } = useManageAcademy();
  const { data: academyInfo } = useGetAcademyInfo({ academyId });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // const {
  //   register,
  //   formState: { errors },
  // } = useForm<FieldValues>({
  //   defaultValues: {
  //     academyName: isEditing ? academyInfo?.result.academy.academyName : '',
  //     address: isEditing ? academyInfo?.result.academy.address : '',
  //     addressDetail: isEditing ? academyInfo?.result.academy.addressDetail : '',
  //     mainImageUrl: isEditing ? academyInfo?.result.academy.mainImageUrl : '',
  //     contactNumber: isEditing ? academyInfo?.result.academy.contactNumber : '',
  //   },
  // });

  return (
    <FramerScale className="flex w-full flex-col justify-start gap-5">
      <section className="relative flex flex-col gap-4">
        {!isEditing && (
          <Button
            variant="secondary"
            type="button"
            className="absolute right-[-10px] top-[-15px] w-fit rounded-full p-[10px] hover:bg-main-deep-pink hover:text-white"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <FaPencil size={15} />
          </Button>
        )}
        <BoxContainer className="flex w-full flex-col items-center gap-4 p-8 pb-14">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${academyInfo?.result.academy.mainImageUrl}`}
            alt="image"
            width={100}
            height={100}
            className="size-32 rounded-xl border-2 border-solid border-gray-100 object-contain"
          />
          <Flex rowColumn="center" className="w-full gap-3">
            <Flex rowColumn="center" className="gap-2">
              <StateLabel
                label={`${academyInfo?.result.academy.freemiumTier}`}
                variant={getVariantByStatus(academyInfo?.result?.academy?.freemiumTier as FREEMIUM_TIRE)}
                outline="square"
              />
              <Typography size="h5">{academyInfo?.result.academy.academyName}</Typography>
            </Flex>
            <BoxContainer variant="border" className="w-full gap-4">
              <Typography size="h5">{academyInfo?.result.academy.academyName} 정보</Typography>
              <Flex column="start" className="gap-2">
                <span className="flex items-center gap-1">
                  <IoCall /> {academyInfo?.result.academy.contactNumber}
                </span>
                <span className="flex items-center gap-1">
                  <FaHouseChimney /> {academyInfo?.result.academy.address} | {academyInfo?.result.academy.addressDetail}
                </span>
                <span className="flex items-center gap-1">
                  <MdEmail /> {academyInfo?.result.academy.email}
                </span>
              </Flex>
            </BoxContainer>
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
