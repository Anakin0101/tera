import { Dispatch, SetStateAction } from 'react';
import { BuyCurrencyDetails } from 'screens/CheckMoneyTransferProviderScreen/CheckMoneyTransferProviderScreen.types';
import { FindTransferResponse } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface CurrencyConversionProps {
  transferResponse: FindTransferResponse;
  buyDetails?: BuyCurrencyDetails;
  setBuyDetails: Dispatch<SetStateAction<BuyCurrencyDetails | undefined>>;
}

export interface CurrencyConversionItemProps {
  currentCurrency: CurrencyEnum;
  transferResponse: FindTransferResponse;
  buyDetails?: BuyCurrencyDetails;
  setBuyDetails: Dispatch<SetStateAction<BuyCurrencyDetails | undefined>>;
  isFirst: boolean;
}
