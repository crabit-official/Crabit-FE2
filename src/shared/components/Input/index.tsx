'use client';

import React from 'react';
import type { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { BiWon } from 'react-icons/bi';
import { cva, type VariantProps } from 'class-variance-authority';

import Button from '../Button';

import cn from '@/shared/utils/style';

const InputVariants = cva(
  'focus:border-main-pink peer w-full rounded-md p-4 pt-7 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70',
  {
    variants: {
      variant: {
        main: 'border-2 bg-main-white border-neutral-300',
        secondary: 'bg-gray-50 border border-solid border-gray-200 ',
      },
    },

    defaultVariants: {
      variant: 'main',
    },
  },
);

interface IInputProps<T extends FieldValues> extends VariantProps<typeof InputVariants> {
  actionButton?: React.ReactNode;
  actionButtonLoading?: boolean;
  className?: string;
  disabled?: boolean;
  errors: FieldErrors<T>;
  formatPrice?: boolean;
  id: Path<T>;
  label: string;
  onClickButton?: () => void;
  register: UseFormRegister<T>;
  required?: boolean;
  type?: string;
  valueAsNumber?: boolean;
}

function Input<T extends FieldValues>({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  className,
  valueAsNumber,
  actionButton,
  onClickButton,
  actionButtonLoading,
  variant,
}: IInputProps<T>) {
  return (
    <div className={cn(`relative w-full`, className)}>
      {formatPrice && <BiWon size={24} className="absolute left-2 top-5 text-neutral-700" />}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required, valueAsNumber })}
        placeholder=" "
        type={type}
        className={cn(InputVariants({ variant }), ` ${formatPrice ? 'pl-9' : 'pl-4'} ${errors[id] && 'border-main-pink focus:border-main-pink'} `)}
      />
      {actionButton && (
        <div className="transform-[50%] absolute right-[50px] top-1/2 -translate-y-1/2 translate-x-1/2">
          <Button onClick={onClickButton} type="button" size="sm" className="p-2 text-sm font-bold text-white" disabled={actionButtonLoading}>
            {actionButton}
          </Button>
        </div>
      )}
      <label
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 text-h6 duration-150 ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-main-deep-pink ${errors[id] ? 'text-main-deep-pink' : 'text-zinc-400'} `}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
