import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface LastTransactionProps {
  item: any;
  index: number;
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
}
