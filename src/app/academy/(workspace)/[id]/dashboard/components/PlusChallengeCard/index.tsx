import React from 'react';
import { BsFillPatchPlusFill } from 'react-icons/bs';

import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';

interface IPlusChallengeCardProps {
  content: string;
  onClick: () => void;
}

export default function PlusChallengeCard({ onClick, content }: IPlusChallengeCardProps) {
  return (
    <Framer
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      className="flex min-h-80 w-64 cursor-pointer flex-col justify-center gap-20 overflow-hidden rounded-lg border border-solid border-gray-100 bg-main-gradient px-6 shadow-custom transition-shadow duration-300 hover:shadow-hover-custom"
    >
      <Typography size="h2" className="whitespace-pre-wrap break-keep text-white">
        {content}
      </Typography>
      <Flex rowColumn="center">
        <BsFillPatchPlusFill size={50} className="text-white opacity-80" />
      </Flex>
    </Framer>
  );
}
