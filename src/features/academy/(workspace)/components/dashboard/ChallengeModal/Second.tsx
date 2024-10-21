import { type FieldValues, useForm } from 'react-hook-form';

import type { IChallengeValue } from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/index';
import Input from '@/shared/components/Input';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';

type InfoValues = Pick<IChallengeValue, 'challengeCategory' | 'challengeMarketVisibility' | 'points' | 'totalDays'>;

const challengeCategories = [
  { value: 'STUDYING', label: 'Studying' },
  { value: 'EXERCISE', label: 'Exercise' },
  { value: 'READING', label: 'Reading' },
  { value: 'NEWSPAPER', label: 'Newspaper' },
  { value: 'COPYING', label: 'Copying' },
  { value: 'DIARY_WRITING', label: 'Diary Writing' },
  { value: 'LIFESTYLE_HABITS', label: 'Lifestyle Habits' },
  { value: 'ETC', label: 'Etc' },
];

const visibilityCategoriesv = [
  { value: 'PUBLIC', label: 'Public' },
  {
    value: 'PROTECTED',
    label: 'Protected',
  },
];

interface ISecondProps {
  onNext: (values: InfoValues) => void;
}

function Second({ onNext }: ISecondProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      challengeCategory: '',
      challengeMarketVisibility: '',
      points: 0,
      totalDays: 0,
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
      <SelectDropdown id="challengeCategory" label="챌린지 종류" register={register} errors={errors} options={challengeCategories} />
      <SelectDropdown id="challengeMarketVisibility" label="챌린지 마켓 업로드 여부" register={register} errors={errors} options={visibilityCategoriesv} />
      <Input id="points" type="number" label="포인트" register={register} errors={errors} required />
      <Input id="totalDays" type="number" label="totalDays" register={register} errors={errors} required />
      <Spacing direction="vertical" size={20} />
      <button type="submit" className="w-full rounded-xl bg-main-pink p-4 text-white hover:opacity-90">
        다음
      </button>
    </form>
  );
}

export default Second;
