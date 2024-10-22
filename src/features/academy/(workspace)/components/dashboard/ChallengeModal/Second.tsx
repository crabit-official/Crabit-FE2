import { type FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { IChallengeValue } from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/index';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_CATEGORIES, VISIBILITY_CATEGORIES } from '@/shared/constants/challenge-cataegrories';
import { challengeTwoSchema } from '@/shared/utils/schema';

type InfoValues = Pick<IChallengeValue, 'challengeCategory' | 'challengeMarketVisibility' | 'points' | 'totalDays'>;

interface ISecondProps {
  onBack: () => void;
  onNext: (values: InfoValues) => void;
}

function Second({ onNext, onBack }: ISecondProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(challengeTwoSchema),
    defaultValues: {
      challengeCategory: 'STUDYING',
      challengeMarketVisibility: 'PUBLIC',
      points: 0,
      totalDays: 3,
    },
  });

  const onSubmit = (data: FieldValues) => {
    onNext({
      challengeCategory: data.challengeCategory,
      challengeMarketVisibility: data.challengeMarketVisibility,
      points: data.points,
      totalDays: data.totalDays,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex size-full flex-col items-center justify-center gap-2">
      <Typography size="h4">챌린지 정보 입력하기</Typography>
      <Spacing direction="vertical" size={20} />
      <SelectDropdown id="challengeCategory" label="챌린지 종류" register={register} errors={errors} options={CHALLENGE_CATEGORIES} />
      <SelectDropdown id="challengeMarketVisibility" label="챌린지 마켓 업로드 여부" register={register} errors={errors} options={VISIBILITY_CATEGORIES} />
      <Input id="points" type="number" label="포인트" register={register} errors={errors} required valueAsNumber />
      <Input id="totalDays" type="number" label="totalDays" register={register} errors={errors} required valueAsNumber />

      <Typography className="w-full pl-1 text-start text-xs font-medium text-neutral-300" size="h5">
        챌린지 진행 기간은 최소 3일에서 최대 31일까지 설정할 수 있습니다.
      </Typography>

      <Spacing direction="vertical" size={20} />
      <Flex className="w-full gap-2">
        <button type="button" className="w-full rounded-xl bg-neutral-100 p-4 text-neutral-400 hover:bg-gray-300" onClick={onBack}>
          이전
        </button>
        <button type="submit" className="w-full rounded-xl bg-main-pink p-4 text-white hover:opacity-90">
          다음
        </button>
      </Flex>
    </form>
  );
}

export default Second;
