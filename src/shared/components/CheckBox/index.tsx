import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { IoCheckmarkSharp } from 'react-icons/io5';

import Typography from '@/shared/components/Typography';

interface ICheckboxProps {
  disabled: boolean;
  errors: FieldErrors;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}

function CheckBox({ label, id, disabled, register, required, errors }: ICheckboxProps) {
  return (
    <label className="flex w-fit items-center gap-2 pl-1">
      <input id={id} disabled={disabled} type="checkbox" className="peer hidden" {...register(id, { required })} />
      <div className="flex size-5 cursor-pointer items-center justify-center rounded-md border-solid border-amber-100 bg-neutral-100 text-transparent peer-checked:bg-main-deep-pink peer-checked:text-white">
        <IoCheckmarkSharp />
      </div>
      <Typography size="h5" className={`font-normal ${errors[id] ? 'font-medium text-main-pink' : 'text-neutral-500'} `} as="p">
        {label}
      </Typography>
    </label>
  );
}

export default CheckBox;
