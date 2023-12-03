// useConvertAmountSell.ts

import { useConvertAmountSellQuery } from 'services/apis/transfersAPI/transfersAPI';

export const useConvertAmountSell = (queryParams: any) => {
  const { amountSell, ...rest } = queryParams;

  const { data, isLoading, error, refetch } = useConvertAmountSellQuery(
    amountSell !== undefined && amountSell !== null ? queryParams : rest,
  );

  return {
    convertAmount: data,
    convertLoading: isLoading,
    convertError: error,
    convertRefetch: refetch,
  };
};
