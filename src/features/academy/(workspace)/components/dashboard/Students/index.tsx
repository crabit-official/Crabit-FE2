import type { Dispatch, SetStateAction } from 'react';

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
    <div
      onClick={handleSelect}
      className={`h-fit cursor-pointer rounded-md p-2 hover:scale-95 ${isSelected ? 'bg-main-pink font-medium text-white' : 'bg-neutral-100 text-black'}`}
    >
      {nickname}
    </div>
  );
}

export default Students;
