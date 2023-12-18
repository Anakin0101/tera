import {
  useConvertAmountBuyQuery,
  useConvertAmountSellQuery,
} from 'services/apis/transfersAPI/transfersAPI';

export const useConvertAmount = (
  amountBuyParams: any,
  amountSellParams?: any,
  shouldCallApi: boolean = true,
) => {
  const {
    data: buyAmount,
    isLoading: buyLoading,
    error: buyError,
    refetch: buyRefetch,
  } = useConvertAmountBuyQuery(amountBuyParams, { skip: !shouldCallApi });

  const {
    data: sellAmount,
    isLoading: sellLoading,
    error: sellError,
    refetch: sellRefetch,
  } = useConvertAmountSellQuery(
    amountSellParams && amountSellParams.amountSell !== undefined
      ? amountSellParams
      : { amountSell: 0, currencyBuy: '', currencySell: '' },
    {
      skip: !shouldCallApi,
    },
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
