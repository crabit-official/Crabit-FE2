'use client';

import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { IoIosArrowDown } from 'react-icons/io';

import cn from '@/shared/utils/style';

interface ISelectProps {
  className?: string;
  disabled?: boolean;
  errors: FieldErrors;
  id: string;
  label: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}

function SelectDropdown({ id, label, disabled, required, register, errors, className, options }: ISelectProps) {
  return (
    <div className={cn(`relative w-full`, className)}>
      <div className="group relative">
        <select
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          className={`w-full appearance-none rounded-md border-2 bg-main-white p-4 pt-6 font-light outline-none transition focus:border-main-deep-pink disabled:cursor-not-allowed disabled:opacity-70 ${errors[id] ? 'border-main-pink' : 'border-neutral-300'} ${errors[id] ? 'focus:border-main-pink' : 'focus:border-main-black'} `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <IoIosArrowDown />
        </div>
      </div>
      <label
        className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-3 scale-75 text-h6 group-focus-within:text-main-deep-pink ${errors[id] ? 'text-main-pink' : 'text-zinc-400'} `}
      >
        {label}
      </label>
    </div>
  );
}

export default SelectDropdown;
