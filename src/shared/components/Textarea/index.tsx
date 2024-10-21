'use client';

import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import cn from '@/shared/utils/style';

interface IInputProps {
  className?: string;
  disabled?: boolean;
  errors: FieldErrors;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  type?: string;
}

function TextArea({ id, label, disabled, required, register, errors, className }: IInputProps) {
  return (
    <div className={cn(`relative w-full`, className)}>
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`'pl-4' peer h-44 w-full rounded-md border-2 bg-main-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${errors[id] ? 'border-main-pink' : 'border-neutral-300'} ${errors[id] ? 'focus:border-main-pink' : 'focus:border-main-black'} resize-none overflow-y-auto`}
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
