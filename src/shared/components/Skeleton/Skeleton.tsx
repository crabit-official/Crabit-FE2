import cn from '@/shared/utils/style';

interface ISkeletonProps {
  className?: string;
  height: number;
  width?: number;
}

function Skeleton({ width, height, className }: ISkeletonProps) {
  return (
    <div
      style={{
        width: width ? `${width}px` : 'auto',
        height: `${height}px`,
      }}
      className={cn(`animate-opacity bg-slate-200`, className)}
    />
  );
}

export default Skeleton;
