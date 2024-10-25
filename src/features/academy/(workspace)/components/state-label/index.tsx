import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import Typography from '@/shared/components/Typography';
import cn from '@/shared/utils/style';

const StateLabelVariants = cva('rounded-2xl border border-solid  px-2 text-xs text-neutral-600', {
  variants: {
    variant: {
      blue: 'border-blue-500 bg-blue-500/20 text-blue-900',
      gray: 'border-gray-500 bg-gray-100 text-gray-800',
      red: 'border-red-500 bg-red-100 text-red-900',
      green: 'border-green-500 bg-green-100 text-green-700',
      yellow: 'border-yellow-500 bg-yellow-200/50 text-yellow-900',
      purple: 'border-purple-500 bg-purple-100 text-purple-900',
      cyan: 'border-cyan-500 bg-cyan-100 text-cyan-900',
      lime: 'border-lime-500 bg-lime-100 text-lime-900',
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
