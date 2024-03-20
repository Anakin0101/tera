import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export type TeraWalletStateProps = {
  accountId: number | null;
  amountId: number | null;
  currency: CurrencyEnum;
};

export interface WalletDataPayload {
  payload: TeraWalletStateProps;
}
