import type { ReactNode } from 'react';
import React from 'react';

interface IMultiStepProgressProps {
  children: ReactNode;
  circle: React.RefObject<HTMLDivElement>;
  currentProgress: number;
  progressArr: number[];
  progressBar: React.RefObject<HTMLSpanElement>;
}

function MultiStepProgress({ children, circle, progressArr, currentProgress, progressBar }: IMultiStepProgressProps) {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="relative flex w-full items-center justify-between" ref={circle}>
        <span
          className={`flex size-12 items-center justify-center rounded-full border-4 border-solid ${currentProgress >= 1 ? 'border-main-deep-pink text-main-deep-pink' : 'border-gray-100 text-gray-300'} bg-gray-50 text-lg font-medium transition-all duration-200`}
        >
          1
        </span>
        {progressArr.map((i: number) => (
          <span
            key={i}
            className={`flex size-12 items-center justify-center rounded-full border-4 border-solid ${currentProgress >= i ? 'border-main-deep-pink text-main-deep-pink' : 'border-gray-100 text-gray-300'} bg-gray-50 text-lg font-medium transition-all duration-200`}
          >
            {i}
          </span>
        ))}
        <div className="progress-bar absolute left-0 z-[-1] h-1 w-full bg-gray-50">
          <span ref={progressBar} className="indicator absolute left-0 z-[-2] h-1 w-0 bg-main-deep-pink transition-all duration-300" />
        </div>
      </div>
      {children}
    </div>
  );
}

export default MultiStepProgress;
