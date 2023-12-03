import { useConvertAmountBuyQuery } from 'services/apis/transfersAPI/transfersAPI';

export const useConvertAmountBuy = (queryParams: {
  amountBuy: number;
  currencyBuy: string;
  currencySell: string;
}) => {
  const { data, isLoading, error, refetch } = useConvertAmountBuyQuery(queryParams);

  return {
    convertAmount: data,
    convertLoading: isLoading,
    convertError: error,
    convertRefetch: refetch,
  };
};
