type DataItem = {
  [key: string]: any;
};

export const calculateSum = <T extends DataItem>(data: T[], property: keyof T): number => {
  return data?.reduce((total, item) => total + item[property], 0) || 0;
};
