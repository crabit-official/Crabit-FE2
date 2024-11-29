'use client';

import React from 'react';
import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { cva, type VariantProps } from 'class-variance-authority';

import cn from '@/shared/utils/style';

const TextAreaVariants = cva(
  'size-full peer rounded-md p-4 pt-6 outline-none transition disabled:cursor-not-allowed disabled:opacity-70 resize-none overflow-y-auto min-h-44',
  {
    variants: {
      variant: {
        main: 'border-2 bg-main-white border-neutral-300 focus:border-main-black',
        secondary: 'bg-gray-50 border border-solid border-gray-200 focus:border-gray-300',
      },
    },

    defaultVariants: {
      variant: 'main',
    },
  },
);

interface IInputProps extends VariantProps<typeof TextAreaVariants> {
  className?: string;
  disabled?: boolean;
  errors: FieldErrors;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  type?: string;
}

function TextArea({ id, label, disabled, required, register, errors, className, variant }: IInputProps) {
  return (
    <div className={cn(`relative w-full`, className)}>
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={cn(TextAreaVariants({ variant }), `${errors[id] && "focus:border-main-pink'} border-main-pink"} `)}
      />
      <label
        className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-3 text-h6 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${errors[id] ? 'text-main-pink' : 'text-zinc-400'} `}
      >
        {label}
      </label>
    </div>
  );
}

export default TextArea;
