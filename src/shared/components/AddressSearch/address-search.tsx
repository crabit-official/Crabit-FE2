import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode/lib/loadPostcode';
import type { FieldErrors, FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';

interface IAddressProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  required: boolean;
  setValue: UseFormSetValue<T>;
}

function AddressSearch<T extends FieldValues>({ register, errors, setValue, id, label, required }: IAddressProps<T>) {
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
    setValue(id, fullAddress as PathValue<T, Path<T>>);
  };

  return (
    <>
      <Flex className="w-full">
        <Input<T> errors={errors} id={id} label={label} register={register} disabled required={required} />
        <Button className="ml-4 w-[150px] font-bold text-white" onClick={() => setIsOpen((prev) => !prev)}>
          주소 검색
        </Button>
      </Flex>
      {isOpen && (
        <div className="w-full rounded-md border border-gray-300 p-2">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}

export default AddressSearch;
