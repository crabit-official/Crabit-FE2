import type { IconType } from 'react-icons';
import { useRouter } from 'next/navigation';

import Button from '@/shared/components/Button';
import cn from '@/shared/utils/style';

interface ITabButtonProps {
  icon: IconType;
  isActive: boolean;
  label: string;
  path: string;
}

export function TabButton({ icon: Icon, label, isActive, path }: ITabButtonProps) {
  const router = useRouter();

  return (
    <div className={cn('flex flex-1 cursor-pointer items-center justify-center')} onClick={() => router.push(path)}>
      <div className="flex items-center justify-center">
        <Button className={cn('group-hover:bg-accent/20 size-9 p-2', isActive && 'bg-accent/20')} variant="link">
          <Icon className={cn('size-5 text-slate-500 transition-all group-hover:scale-110', isActive && 'size-6 text-black')} />
        </Button>
        <span className={cn('hidden text-[17px] text-slate-500 md:block', isActive && 'font-bold text-black')}>{label}</span>
      </div>
    </div>
  );
}