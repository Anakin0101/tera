import { ReceiverMtSystem } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';

export type MoneyTransferServiceStateProps = {
  mtSystem: Array<ReceiverMtSystem> | null;
};
