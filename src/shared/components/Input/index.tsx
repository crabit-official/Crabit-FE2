'use client';

import React from 'react';
import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiWon } from 'react-icons/bi';

import Button from '../Button';

import cn from '@/shared/utils/style';

interface IInputProps {
  actionButton?: React.ReactNode;
  actionButtonLoading?: boolean;
  className?: string;
  disabled?: boolean;
  errors: FieldErrors;
  formatPrice?: boolean;
  id: string;
  label: string;
  onClickButton?: () => void;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  type?: string;
  valueAsNumber?: boolean;
}

function Input({
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
}: IInputProps) {
  return (
    <div className={cn(`relative w-full`, className)}>
      {formatPrice && <BiWon size={24} className="absolute left-2 top-5 text-neutral-700" />}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required, valueAsNumber })}
        placeholder=" "
        type={type}
        className={`peer w-full rounded-md border-2 bg-main-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${formatPrice ? 'pl-9' : 'pl-4'} ${errors[id] ? 'border-main-pink' : 'border-neutral-300'} ${errors[id] ? 'focus:border-main-pink' : 'focus:border-main-black'} `}
      />
      {actionButton && (
        <div className="transform-[50%] absolute right-[50px] top-1/2 -translate-y-1/2 translate-x-1/2">
          <Button onClick={onClickButton} type="button" size="sm" className="p-2 text-sm font-bold text-white" disabled={actionButtonLoading}>
            {actionButton}
          </Button>
        </div>
      )}
      <label
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 text-h6 duration-150 ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${errors[id] ? 'text-main-pink' : 'text-zinc-400'} `}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
