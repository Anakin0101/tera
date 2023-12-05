import {
  useConvertAmountBuyQuery,
  useConvertAmountSellQuery,
} from 'services/apis/transfersAPI/transfersAPI';

export const useConvertAmount = (amountBuyParams?: any, amountSellParams?: any) => {
  const {
    data: buyAmount,
    isLoading: buyLoading,
    error: buyError,
    refetch: buyRefetch,
  } = useConvertAmountBuyQuery(amountBuyParams);

  const {
    data: sellAmount,
    isLoading: sellLoading,
    error: sellError,
    refetch: sellRefetch,
  } = useConvertAmountSellQuery(
    amountSellParams && amountSellParams.amountSell !== undefined
      ? amountSellParams
      : { amountSell: 0, currencyBuy: '', currencySell: '' },
  );

  return {
    buyAmount,
    buyLoading,
    buyError,
    buyRefetch,
    sellAmount,
    sellLoading,
    sellError,
    sellRefetch,
  };
};
