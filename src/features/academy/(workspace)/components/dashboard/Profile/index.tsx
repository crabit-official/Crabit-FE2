import React from 'react';
import type { IconType } from 'react-icons';
import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

interface IProfileProps {
  icon?: IconType;
  size?: 'sm' | 'md';
}

function Index({ size, icon: Icon }: IProfileProps) {
  return (
    <Flex row="between" className="max-w-52 gap-4 rounded-md md:justify-center">
      <Flex className={Icon ? 'gap-2' : 'gap-4'}>
        <Flex rowColumn="center">
          <Image
            className={`rounded-full ${size === 'sm' ? 'size-[30px]' : 'size-[40px]'} `}
            height="40"
            width="40"
            alt="Index"
            src="/images/placeholder.jpg"
          />
        </Flex>
        <Flex column="center" className="gap-1">
          <Typography size="h5" className={`break-keep font-medium ${size === 'sm' ? 'text-xs' : 'text-sm md:text-base'}`}>
            테스트이름
          </Typography>
          <Typography size="h5" as="p" className={`${size === 'sm' ? 'text-[10px]' : 'text-xs'} text-neutral-500"`}>
            초딩 1
          </Typography>
        </Flex>
      </Flex>
      <Flex rowColumn="center">{Icon && <Icon />}</Flex>
    </Flex>
  );
}

export default Index;
