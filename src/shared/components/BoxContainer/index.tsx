import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import Flex from '@/shared/components/Flex';
import cn from '@/shared/utils/style';

const BoxContainerVariants = cva('rounded-xl p-5', {
  variants: {
    variant: {
      border: 'border border-solid border-gray-100 bg-gray-50/50 gap-2',
      shadow: 'gap-4 border border-solid border-gray-100  shadow-custom',
    },
  },
  defaultVariants: {
    variant: 'shadow',
  },
});

interface IInputBoxProps extends VariantProps<typeof BoxContainerVariants> {
  children: React.ReactNode;
  className?: string;
}

function BoxContainer({ children, className, variant }: IInputBoxProps) {
  return (
    <Flex column="start" className={cn(BoxContainerVariants({ variant }), className)}>
      {children}
    </Flex>
  );
}
export default BoxContainer;
