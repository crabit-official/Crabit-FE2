import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import Typography from '@/shared/components/Typography';
import cn from '@/shared/utils/style';

const StateLabelVariants = cva('rounded-2xl border border-solid  px-2 text-xs text-neutral-600', {
  variants: {
    variant: {
      blue: 'border-blue-500 bg-blue-100',
      gray: 'border-gray-500 bg-gray-100',
      red: 'border-red-500 bg-red-100',
      green: 'border-green-500 bg-green-100',
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
