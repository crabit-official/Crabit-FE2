const calculateChallengeDay = (startedAt: string | Date): number => {
  const startDate = new Date(startedAt);

  const now = new Date();
  const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOnlyDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

  const timeDifference = currentDate.getTime() - startOnlyDate.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
};

export default calculateChallengeDay;
