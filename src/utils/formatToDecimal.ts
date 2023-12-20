export const formatToTwoDecimalPlaces = (number: any) => {
  if (!isNaN(number)) {
    return parseFloat(number).toFixed(2);
  }
  return number;
};
