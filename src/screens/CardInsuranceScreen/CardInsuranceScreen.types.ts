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

export interface InsurancePackageItemProps {
  item: InsurancePackage;
  onPress: (packageName: string, commission: number) => void;
}

export interface PackagesProps {
  cardId: number;
}
