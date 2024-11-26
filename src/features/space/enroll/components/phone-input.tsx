import React from 'react';
import { Controller } from 'react-hook-form';
import { BiWon } from 'react-icons/bi';

import cn from '@/shared/utils/style';

// Auto format phone number with hyphens
const autoHypenPhone = (str: string): string => {
  const cleanedStr = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (cleanedStr.length < 4) {
    return cleanedStr;
  }
  if (cleanedStr.length < 7) {
    tmp += cleanedStr.substr(0, 3);
    tmp += '-';
    tmp += cleanedStr.substr(3);
    return tmp;
  }
  if (cleanedStr.length < 11) {
    tmp += cleanedStr.substr(0, 3);
    tmp += '-';
    tmp += cleanedStr.substr(3, 3);
    tmp += '-';
    tmp += cleanedStr.substr(6);
    return tmp;
  }
  tmp += cleanedStr.substr(0, 3);
  tmp += '-';
  tmp += cleanedStr.substr(3, 4);
  tmp += '-';
  tmp += cleanedStr.substr(7);
  return tmp;
};

interface IPhoneInputProps {
  className?: string;
  control: any;
  disabled?: boolean;
  errors: any;
  formatPrice?: boolean;
  id: string;
  label: string; // Use control from react-hook-form
  required?: boolean;
  type?: string;
}

function PhoneInput({ className, disabled, errors, formatPrice, id, label, control, required, type = 'text' }: IPhoneInputProps) {
  return (
    <div className={cn('relative w-full', className)}>
      {formatPrice && <BiWon size={24} className="absolute left-2 top-5 text-neutral-700" />}
      <div>
        <Controller
          control={control}
          name={id}
          rules={{ required }}
          render={({ field }) => (
            <input
              id={id}
              maxLength={13}
              disabled={disabled}
              {...field}
              placeholder=" "
              type={type}
              onChange={(e) => {
                // Automatically format the phone number on change
                field.onChange(autoHypenPhone(e.target.value));
              }}
              className={`peer w-full rounded-md border-2 bg-main-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${formatPrice ? 'pl-9' : 'pl-4'} ${errors[id] ? 'border-main-pink' : 'border-neutral-300'} ${errors[id] ? 'focus:border-main-pink' : 'focus:border-main-black'}`}
            />
          )}
        />
      </div>
      <label
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 text-h6 duration-150 ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${errors[id] ? 'text-main-pink' : 'text-zinc-400'}`}
      >
        {label}
      </label>
    </div>
  );
}

export default PhoneInput;
