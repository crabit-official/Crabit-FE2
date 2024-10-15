import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import cn from '@/shared/utils/style';

const FlexVariants = cva('flex', {
  variants: {
    'row': {
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
      end: 'justify-end',
    },
    'column': {
      center: 'flex-col justify-center',
      between: 'flex-col justify-between',
      around: 'flex-col justify-around',
      evenly: 'flex-col justify-evenly',
      end: 'flex-col justify-end',
    },
    'row-column': {
      center: 'flex-col items-center justify-center',
      between: 'flex-col items-center justify-between',
      around: 'flex-col items-center justify-around',
      evenly: 'flex-col items-center justify-evenly',
      end: 'flex-col items-center justify-end',
    },
  },
  defaultVariants: {
    row: 'center',
  },
});

interface IFlexProps extends VariantProps<typeof FlexVariants> {
  children: React.ReactNode;
  className?: string;
}

function Flex({ children, row, column, className }: IFlexProps) {
  return <div className={cn(FlexVariants({ row, column }), className)}>{children}</div>;
}

export default Flex;
