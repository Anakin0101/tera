export const calculateSum = (data: Array<Record<string, any>>, property: string): number => {
  if (!data?.length) {
    return 0;
  }
  return data?.reduce((total, item) => total + item[property], 0);
};
