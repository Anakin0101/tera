import {
  useConvertAmountBuyQuery,
  useConvertAmountSellQuery,
} from 'services/apis/transfersAPI/transfersAPI';
import {
  convertAmountBuyRequestType,
  convertAmountSellRequestType,
} from 'services/apis/transfersAPI/transfersAPI.types';

export const useConvertAmount = (
  amountBuyParams: convertAmountBuyRequestType,
  amountSellParams?: convertAmountSellRequestType,
) => {
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
