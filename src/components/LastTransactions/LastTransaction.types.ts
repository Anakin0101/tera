import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';

export interface LastTransactionProps {
  item: TransactionType;
  onPress: () => void;
  showUnderline?: boolean;
}

export interface ILastTransaction {
  title: string;
  value: string;
  amount: number;
  date: string;
}

export interface LastTransactionsProps {
  data?: any[];
  sectionTitle?: string;
  style?: StyleProp<ViewStyle>;
  headerContaienrStyle?: StyleProp<ViewStyle>;
  headerLabelStyle?: StyleProp<TextStyle>;
  showFooter?: boolean;
  accountNumber?: number;
}
