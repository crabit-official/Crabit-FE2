import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode/lib/loadPostcode';
import type { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import Input from '@/shared/components/Input';
import type { Register } from '@/shared/type/register';

interface IAddressProps {
  disabled: boolean;
  errors: FieldErrors<Register>;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  setValue: UseFormSetValue<FieldValues>;
}

function AddressSearch({ register, errors, setValue, id, label, disabled, required }: IAddressProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setValue('academyAddress', fullAddress);
  };

  return (
    <>
      <div className="w-full" onClick={() => setIsOpen((prev) => !prev)}>
        <Input errors={errors} id={id} label={label} register={register} disabled={disabled} required={required} />
      </div>
      {isOpen && (
        <div className="w-full rounded-md border border-gray-300 p-2">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}

export default AddressSearch;
