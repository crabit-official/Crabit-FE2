import { useRef, useState } from 'react';

function useStepProgress(maxSteps: number) {
  const [currentProgress, setCurrentProgress] = useState(1);
  const circle = useRef<HTMLDivElement | null>(null);
  const progressBar = useRef<HTMLSpanElement | null>(null);
  const progressArr = Array.from({ length: maxSteps - 1 }, (_, index) => index + 2);

  const updateProgressBar = (step: number) => {
    if (progressBar.current) {
      progressBar.current.style.width = `${(step - 1) * (100 / (maxSteps - 1))}%`;
    }
  };

  const minusSteps = () => {
    if (currentProgress > 1) {
      setCurrentProgress((prev) => {
        const newProgress = prev - 1;
        updateProgressBar(newProgress);
        return newProgress;
      });
    }
  };

  const addSteps = () => {
    if (currentProgress <= maxSteps) {
      setCurrentProgress((prev) => {
        const newProgress = prev + 1;
        updateProgressBar(newProgress);
        return newProgress;
      });
    }
  };

  return { minusSteps, addSteps, circle, progressArr, currentProgress, progressBar };
}
export default useStepProgress;
