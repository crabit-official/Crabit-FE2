import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';

import cn from '@/shared/utils/style';

const AvatarVariants = cva('object-cover ', {
  variants: {
    variant: {
      round: 'rounded-full',
      squareRound: 'rounded-2xl',
      square: '',
    },
    size: {
      xs: 'size-5',
      sm: 'size-[30px]',
      md: 'size-10',
      lg: 'size-20',
    },
  },
  defaultVariants: {
    variant: 'round',
    size: 'sm',
  },
});

interface IAvatarProps extends VariantProps<typeof AvatarVariants> {
  className?: string;
}

function Avatar({ className, variant, size }: IAvatarProps) {
  return <Image height="60" width="60" alt="Index" src="/images/placeholder.jpg" className={cn(AvatarVariants({ variant, size }), className)} />;
}

export default Avatar;
