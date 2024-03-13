import { MoneyTransferList } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { TransferListTypeEnum } from './container';

export interface TransfersHistoryItemProps {
  isLast: boolean;
  item: MoneyTransferList;
  transferType: TransferListTypeEnum;
  onPress: () => void;
}

export interface TransfersHistoryProps {
  transferType: TransferListTypeEnum;
}
