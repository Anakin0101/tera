import { TOptions } from 'i18next';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';

export type BlockedAmount = {
  blockedAmount: number;
  ccy: Currency;
};

export interface DetailsItemProps {
  label: string;
  value?: string | BlockedAmount[];
  icon?: React.ReactNode;
  card?: string;
  iban?: string;
  onPress?: () => void;
  translateProp?: TOptions;
  marginTop?: number;
  underline?: boolean;
}
