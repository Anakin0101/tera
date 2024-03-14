import { MoneyTransferList } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { TransferListTypeEnum } from './container';
import { TransactionFilters } from 'screens/AllTransactionsScreen/AllTransactionsScreen.types';

export interface TransfersHistoryItemProps {
  isLast: boolean;
  item: MoneyTransferList;
  transferType: TransferListTypeEnum;
  onPress: () => void;
}

export interface TransfersHistoryProps {
  transferType: TransferListTypeEnum;
  filters: TransactionFilters;
}
