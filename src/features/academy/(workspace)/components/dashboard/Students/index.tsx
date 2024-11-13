import type { Dispatch, SetStateAction } from 'react';

import type { IAcademyStudentListDTO } from '@/shared/types/acadmy';

interface IStudentsProps extends IAcademyStudentListDTO {
  selectedStudentIdList: number[];
  setSelectedStudentIdList: Dispatch<SetStateAction<number[]>>;
}

function Students({ school, memberName, academyMemberId, selectedStudentIdList, setSelectedStudentIdList }: IStudentsProps) {
  const isSelected = selectedStudentIdList.includes(academyMemberId);

  const handleSelect = () => {
    if (isSelected) {
      setSelectedStudentIdList(selectedStudentIdList.filter((id) => id !== academyMemberId));
    } else {
      setSelectedStudentIdList((prev) => [...prev, academyMemberId]);
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={`h-fit cursor-pointer rounded-md p-2 hover:opacity-80 ${isSelected ? 'bg-main-pink font-medium text-white' : 'bg-neutral-100 text-black'}`}
    >
      {school} | {memberName}
    </div>
  );
}

export default Students;
