'use client';

import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';

function SettingInfo() {
  const { useGetAcademyInfo } = useManageAcademy();
  const params = useParams();
  const { data: academyInfo, isPending: infoLoading } = useGetAcademyInfo({ academyId: Number(params.id) });

  if (infoLoading) {
    return (
      <Flex row="start" className="w-full items-center gap-4 lg:px-10">
        <Skeleton height={65} width={65} className="rounded-xl" />
        <Flex column="start" className="gap-2">
          <Skeleton height={18} width={90} className="rounded-md" />
          <Skeleton height={36} width={200} className="rounded-md" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex row="start" className="items-center gap-4 lg:px-10">
      <motion.div whileInView={{ rotate: 270 }} transition={{ ease: 'easeOut', duration: 0.8 }} initial={{ rotate: 0 }} viewport={{ once: true }}>
        <IoMdSettings size={65} className="opacity-60" />
      </motion.div>
      <Flex column="start">
        <Typography size="h6" className="gap-1 font-normal opacity-60">
          설정 페이지
        </Typography>
        <Typography size="h1" className="break-keep text-3xl font-bold">
          {academyInfo?.result.academy.academyName}
        </Typography>
      </Flex>
    </Flex>
  );
}
export default SettingInfo;
