export const formatRate = (value: number = 0) => {
  return value?.toLocaleString('en-US', {
    maximumFractionDigits: 4,
    minimumFractionDigits: 4,
  });
};
