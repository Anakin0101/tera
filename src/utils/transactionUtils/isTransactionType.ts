import { TransactionItem } from 'screens/AllTransactionsScreen/AllTransactionsScreen.types';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';

export function isTransactionType(item: TransactionItem): item is TransactionType {
  return (item as TransactionType).senderIban !== undefined;
}
