import { Currency } from 'services/apis/productsAPI/productsAPI.types';

export interface Term {
  name: string;
  limit: number;
  ccy: Currency;
}

export interface InsurancePackage {
  id: number;
  name: string;
  commission: number;
  isSelected: boolean;
  commissionCcy: Currency;
  terms: Term[];
}

export interface InsurancePackageItemProps {
  item: InsurancePackage;
}
