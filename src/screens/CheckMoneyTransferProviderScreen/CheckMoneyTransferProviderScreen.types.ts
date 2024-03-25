import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface BuyCurrencyDetails {
  buyAmount: number;
  buyCurrency: CurrencyEnum;
}
