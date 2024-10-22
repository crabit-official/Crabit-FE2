import { type FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { IChallengeValue } from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/index';
import Flex from '@/shared/components/Flex';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';

type InfoValues = Pick<IChallengeValue, 'challengeParticipationMethod' | 'studentIdList'>;

const challengeSchema = z.object({
  challengeParticipationMethod: z.enum(['ASSIGNED', 'SELF_PARTICIPATING']),
  studentIdList: z.array(z.number()).optional(),
});

const MethodCategories = [
  { value: 'ASSIGNED', label: '배정' },
  {
    value: 'SELF_PARTICIPATING',
    label: '개인 참여',
  },
];

interface IThirdProps {
  onNext: (values: InfoValues) => void;
}
function Third({ onNext }: IThirdProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      challengeParticipationMethod: 'ASSIGNED',
      studentIdList: [],
    },
  });

  const onSubmit = (data: FieldValues) => {
    onNext({
      challengeParticipationMethod: data.challengeParticipationMethod,
      studentIdList: data.studentIdList,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex size-full min-h-96 flex-col items-center justify-between gap-2">
      <Flex column="center" className="w-full gap-8">
        <Typography size="h4" className="text-center">
          챌린지 정보 입력하기
        </Typography>
        <SelectDropdown id="challengeCategory" label="챌린지 참여 방식" register={register} errors={errors} options={MethodCategories} />
      </Flex>

      <Spacing direction="vertical" size={20} />
      <button type="submit" className="w-full rounded-xl bg-main-pink p-4 font-medium text-white hover:opacity-90">
        챌린지 생성
      </button>
    </form>
  );
}

export default Third;
