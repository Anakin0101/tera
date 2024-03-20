import { ListRenderItem, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TransactionItem } from 'screens/AllTransactionsScreen/AllTransactionsScreen.types';

export type LastTransactionProps = {
  item: TransactionItem;
  onPress: (item: TransactionItem) => void;
  showUnderline?: boolean;
  blockedTransactionsFilterActive?: boolean;
};

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

export interface FooterProps {
  onPress: () => void;
  showFooter: boolean;
}

export type RenderItem = ListRenderItem<TransactionItem>;
