import { TOptions } from 'i18next';
import { StyleProp, TextStyle } from 'react-native';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export type BlockedAmount = {
  blockedAmount: number;
  ccy: CurrencyEnum;
};

export interface DetailsItemProps {
  label: string;
  value?: string | BlockedAmount[] | React.ReactNode;
  icon?: React.ReactNode;
  card?: string;
  iban?: string;
  onPress?: () => void;
  translateProp?: TOptions;
  marginTop?: number;
  underline?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
}
