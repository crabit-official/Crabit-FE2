import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import Typography from '@/shared/components/Typography';
import cn from '@/shared/utils/style';

const StateLabelVariants = cva('flex items-center text-white font-bold rounded-2xl border border-solid border-gray-100 px-2 text-xs', {
  variants: {
    variant: {
      blue: 'bg-blue-600/50',
      gray: 'bg-gray-400',
      red: 'bg-red-400',
      green: 'bg-green-400',
      yellow: ' bg-yellow-400',
      purple: 'bg-purple-400',
      cyan: 'bg-cyan-400',
      lime: 'bg-lime-400',
    },
  },
  defaultVariants: {
    variant: 'gray',
  },
});

interface IStateLabelProps extends VariantProps<typeof StateLabelVariants> {
  className?: string;
  label: string;
}

function StateLabel({ className, variant, label }: IStateLabelProps) {
  return (
    <Typography size="h5" className={cn(StateLabelVariants({ variant }), className)}>
      {label}
    </Typography>
  );
}
export default StateLabel;
