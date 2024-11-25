'use client';

import React from 'react';
import { BiWon } from 'react-icons/bi';

import Button from '../Button';

import cn from '@/shared/utils/style';

interface IInputProps {
  actionButton?: React.ReactNode;
  actionButtonLoading?: boolean;
  className?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton?: () => void;
  required?: boolean;
  type?: string;
  value: string;
}

function NonRegisterInput({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  required,
  className,
  actionButton,
  onClickButton,
  value,
  onChange,
  actionButtonLoading,
}: IInputProps) {
  return (
    <div className={cn(`relative w-full`, className)}>
      {formatPrice && <BiWon size={24} className="absolute left-2 top-5 text-neutral-700" />}
      <input
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder=" "
        type={type}
        required={required}
        className={`peer w-full rounded-md border-2 bg-main-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${
          formatPrice ? 'pl-9' : 'pl-4'
        } border-neutral-300 focus:border-main-black`}
      />
      {actionButton && (
        <div className="transform-[50%] absolute right-[50px] top-1/2 -translate-y-1/2 translate-x-1/2">
          <Button
            onClick={onClickButton}
            type="button"
            size="sm"
            className={`p-2 text-sm font-bold text-white ${actionButtonLoading ? 'bg-slate-400' : null}`}
            disabled={actionButtonLoading}
          >
            {actionButton}
          </Button>
        </div>
      )}
      <label
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 text-h6 duration-150 ${
          formatPrice ? 'left-9' : 'left-4'
        } text-zinc-400 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75`}
      >
        {label}
      </label>
    </div>
  );
}

export default NonRegisterInput;
