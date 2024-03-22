import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface Term {
  name: string;
  limit: number;
  ccy: CurrencyEnum;
}

export interface InsurancePackage {
  id: number;
  name: string;
  commission: number;
  isSelected: boolean;
  commissionCcy: CurrencyEnum;
  terms: Term[];
}
import { ListRenderItem } from 'react-native';
import { CardInsuranceProducts, CardType } from 'services/apis/productsAPI/productsAPI.types';

export interface InsurancePackageItemProps {
  item: CardInsuranceProducts;
  iban?: string;
  activeCard: CardType;
}

export interface PackagesProps {
  iban?: string;
  activeCard: CardType;
  packages?: CardInsuranceProducts[];
}

export type RenderItem = ListRenderItem<CardInsuranceProducts>;

export type TermItemProps = {
  label: string;
  value: string;
  showDivider?: boolean;
};
