import type { Dispatch, SetStateAction } from 'react';

interface IStudentsProps {
  memberId: number;
  memberName: string;
  school: string;
  selectedStudentIdList: number[];
  setSelectedStudentIdList: Dispatch<SetStateAction<number[]>>;
}

function Students({ school, memberName, memberId, setSelectedStudentIdList, selectedStudentIdList }: IStudentsProps) {
  const isSelected = selectedStudentIdList.includes(memberId);

  const handleSelect = () => {
    if (isSelected) {
      setSelectedStudentIdList(selectedStudentIdList.filter((id) => id !== memberId));
    } else {
      setSelectedStudentIdList((prev) => [...prev, memberId]);
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={`h-fit cursor-pointer rounded-md p-2 hover:scale-95 ${isSelected ? 'bg-main-pink font-medium text-white' : 'bg-neutral-100 text-black'}`}
    >
      {school} | {memberName}
    </div>
  );
}

export default Students;
