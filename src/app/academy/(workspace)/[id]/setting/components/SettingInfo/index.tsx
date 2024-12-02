'use client';

import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { motion } from 'framer-motion';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function SettingInfo({ academyName }: { academyName: string }) {
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
          {academyName}
        </Typography>
      </Flex>
    </Flex>
  );
}
export default SettingInfo;
