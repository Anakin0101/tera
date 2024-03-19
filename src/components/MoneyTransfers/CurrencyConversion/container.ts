import { useConvertAmountBuyQuery } from 'services/apis';
import { FindTransferResponse } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';

export const useCurrencyConversion = (
  transferResponse: FindTransferResponse,
  currentCurrency: string,
) => {
  const { data, isLoading } = useConvertAmountBuyQuery({
    amountBuy: transferResponse.amount,
    currencyBuy: transferResponse.currency,
    currencySell: currentCurrency,
  });

  return { data, isLoading };
};
