import type { Dispatch, SetStateAction } from 'react';

import Flex from '@/shared/components/Flex';

interface IStudentsProps {
  nickname: string;
  selectedStudentIdList: number[];
  setSelectedStudentIdList: Dispatch<SetStateAction<number[]>>;
  studentId: number;
}

function Students({ nickname, studentId, setSelectedStudentIdList, selectedStudentIdList }: IStudentsProps) {
  const isSelected = selectedStudentIdList.includes(studentId);

  const handleSelect = () => {
    if (isSelected) {
      setSelectedStudentIdList(selectedStudentIdList.filter((id) => id !== studentId));
    } else {
      setSelectedStudentIdList((prev) => [...prev, studentId]);
    }
  };

  return (
    <Flex
      onClick={handleSelect}
      className={`cursor-pointer rounded-md p-2 hover:scale-95 ${isSelected ? 'bg-main-pink font-medium text-white' : 'bg-neutral-100 text-black'}`}
    >
      {nickname}
    </Flex>
  );
}

export default Students;
