import { Currency } from 'services/apis/productsAPI/productsAPI.types';

export type TeraWalletStateProps = {
  accountId: number | null;
  amountId: number | null;
  currency: Currency;
};

export interface WalletDataPayload {
  payload: TeraWalletStateProps;
}
