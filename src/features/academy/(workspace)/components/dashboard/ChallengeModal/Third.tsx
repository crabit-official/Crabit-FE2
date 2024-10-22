import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import type { IChallengeValue } from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/index';
import Students from '@/features/academy/(workspace)/components/dashboard/Students';
import useGetStudents from '@/features/academy/(workspace)/hooks/challenges/use-get-students';
import Flex from '@/shared/components/Flex';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';
import { challengeSchema } from '@/shared/utils/schema';

type InfoValues = Pick<IChallengeValue, 'challengeParticipationMethod' | 'studentIdList'>;

const MethodCategories = [
  { value: 'ASSIGNED', label: '배정' },
  {
    value: 'SELF_PARTICIPATING',
    label: '개인 참여',
  },
];

interface IThirdProps {
  accessToken: string;
  id: string;
  onNext: (values: InfoValues) => void;
}
function Third({ onNext, id, accessToken }: IThirdProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      challengeParticipationMethod: 'ASSIGNED',
      studentIdList: [],
    },
  });
  const [selectedStudentIdList, setSelectedStudentIdList] = useState<number[]>([]);
  const watchCategroy = watch('challengeCategory');
  const { data: students } = useGetStudents({ id, accessToken });

  const onSubmit = (data: FieldValues) => {
    if (data.challengeParticipationMethod === 'ASSIGNED' && selectedStudentIdList.length === 0) {
      toast.error("챌린지 참여방식이 '배정'인 경우 최소 1명이상의 학생을 선택해야합니다.");
      return;
    }
    onNext({
      challengeParticipationMethod: data.challengeParticipationMethod,
      studentIdList: data.challengeParticipationMethod === 'ASSIGNED' ? selectedStudentIdList : [],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex size-full min-h-96 flex-col items-center justify-between gap-2">
      <Flex column="center" className="w-full gap-8">
        <Typography size="h4" className="text-center">
          챌린지 정보 입력하기
        </Typography>
        <SelectDropdown id="challengeCategory" label="챌린지 참여 방식" register={register} errors={errors} options={MethodCategories} />
        {watchCategroy === 'ASSIGNED' && (
          <Flex className="w-full flex-wrap gap-2">
            {students?.map((e) =>
              e.result?.studentList?.map((st) => (
                <Students selectedStudentIdList={selectedStudentIdList} setSelectedStudentIdList={setSelectedStudentIdList} {...st} key={st.studentId} />
              )),
            )}
          </Flex>
        )}
      </Flex>
      <Spacing direction="vertical" size={20} />
      <button type="submit" className="w-full rounded-xl bg-main-pink p-4 font-medium text-white hover:opacity-90">
        챌린지 생성
      </button>
    </form>
  );
}

export default Third;
