import { MoneyTransferList } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { TransferListTypeEnum } from './container';

export interface TransfersHistoryItemProps {
  isLast: boolean;
  item: MoneyTransferList;
  transferType: TransferListTypeEnum;
}

export interface TransfersHistoryProps {
  transferType: TransferListTypeEnum;
}
