import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import Typography from '@/shared/components/Typography';
import cn from '@/shared/utils/style';

const StateLabelVariants = cva('flex  items-center px-2 py-1 text-white font-bold  border border-solid border-gray-100 text-xs', {
  variants: {
    variant: {
      blue: 'bg-blue-400',
      gray: 'bg-gray-400',
      red: 'bg-main-deep-pink',
      green: 'bg-green-400',
      yellow: 'bg-[#FFF9DB] text-[#FAB007]',
      purple: 'bg-purple-400/50',
      cyan: 'bg-cyan-500',
      lime: 'bg-teal-400',
    },
    outline: {
      round: 'rounded-2xl',
      square: 'rounded-md',
    },
  },
  defaultVariants: {
    variant: 'gray',
    outline: 'round',
  },
});

interface IStateLabelProps extends VariantProps<typeof StateLabelVariants> {
  className?: string;
  label: string;
}

function StateLabel({ className, variant, label, outline }: IStateLabelProps) {
  return (
    <Typography size="h5" className={cn(StateLabelVariants({ variant, outline }), className)}>
      {label}
    </Typography>
  );
}
export default StateLabel;
