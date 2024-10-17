'use client';

import cn from '@/shared/utils/style';

interface IHeadingProps {
  center?: boolean;
  className?: string;
  isWhite?: boolean;
  subTitle?: string;
  title: string;
}

function Heading({ title, subTitle, center, isWhite = false, className }: IHeadingProps) {
  return (
    <div className={cn(`${center ? 'text-center' : 'text-start'}`, className)}>
      <div className={cn(`text-2xl font-bold ${isWhite && 'text-white'}`)}>{title}</div>
      <div className={cn(`mt-2 font-light text-neutral-500 ${isWhite && 'font-bold text-gray-400'}`)}>{subTitle}</div>
    </div>
  );
}

export default Heading;
