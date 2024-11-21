import { useState } from 'react';

import useStepProgress from '@/shared/hooks/use-step-progress';

function useHandleStepChallenge<T extends Record<string, any>>(maxStep: number, initialValues: T) {
  const step = useStepProgress(maxStep - 1);
  const [values, setValues] = useState<T>(initialValues);

  const handleInfoChange = (infoValues: Partial<T>) => {
    setValues((prev) => ({
      ...prev,
      ...infoValues,
    }));
  };

  const handleNext = (currentData: Partial<T>) => {
    handleInfoChange(currentData);
    step.addSteps();
  };

  const handleBack = () => {
    step.minusSteps();
  };

  return { values, handleNext, handleBack, step };
}

export default useHandleStepChallenge;
