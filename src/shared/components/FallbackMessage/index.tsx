'use client';

import React from 'react';
import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Typography from '@/shared/components/Typography';

interface IFallbackMessageProps {
  content?: string;
  imageUrl: string;
  title: string;
}

function FallbackMessage({ imageUrl, content, title }: IFallbackMessageProps) {
  return (
    <FramerScale className="flex flex-col items-center justify-center gap-4 py-10">
      <Image src={imageUrl} alt="icons" width={130} height={130} />
      <Flex rowColumn="center" className="gap-1">
        <Typography size="h3">{title}</Typography>
        <Typography size="h6" className="break-keep px-10 text-center font-normal opacity-60">
          {content}
        </Typography>
      </Flex>
    </FramerScale>
  );
}
export default FallbackMessage;
