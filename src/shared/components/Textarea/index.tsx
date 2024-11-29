'use client';

import React from 'react';
import type { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { cva, type VariantProps } from 'class-variance-authority';

import cn from '@/shared/utils/style';

const TextAreaVariants = cva(
  'size-full peer rounded-md p-4 pt-7 outline-none transition font-light disabled:cursor-not-allowed disabled:opacity-70 resize-none overflow-y-auto min-h-44',
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

interface ITextAreaProps<T extends FieldValues> extends VariantProps<typeof TextAreaVariants>, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  disabled?: boolean;
  errors: FieldErrors<T>;
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  required?: boolean;
}

function TextArea<T extends FieldValues>({ id, label, disabled, required, register, errors, className, variant, ...props }: ITextAreaProps<T>) {
  return (
    <div className={cn(`relative w-full`, className)}>
      <textarea
        id={id as string} // 타입 강제 변환
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={cn(TextAreaVariants({ variant }), `${errors[id] && 'border-main-pink focus:border-main-pink'}`)}
        {...props}
      />
      <label
        className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-3 text-h6 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${
          errors[id] ? 'text-main-pink' : 'text-zinc-400'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default TextArea;
