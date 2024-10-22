import React from 'react';
import { MdError } from 'react-icons/md';
import Link from 'next/link';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import cn from '@/shared/utils/style';

interface IErrorProps {
  className?: string;
  label: string;
}

function Error({ label, className }: IErrorProps) {
  return (
    <Flex rowColumn="center" className={cn('gap-10', className)}>
      <Flex rowColumn="center" className="gap-2">
        <MdError size="30" />
        <Typography size="h4">{label}</Typography>
      </Flex>
      <Link href="/" className="cursor-pointer font-medium text-neutral-400 hover:text-main-pink">
        홈으로
      </Link>
    </Flex>
  );
}
export default Error;
