import { TOptions } from 'i18next';
import { OverdraftType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { Account, CardType, Currency } from 'services/apis/productsAPI/productsAPI.types';

export interface CardItemProps {
  item: CardType;
  isLast: boolean;
  onPress?: () => void;
}

export interface DetailsItemProps {
  label: string;
  value?: string | BlockedAmount[];
  icon?: React.ReactNode;
  onPress?: () => void;
  translateProp?: TOptions;
}

export interface CardsProps {
  cards: CardType[];
  isCardAccount?: boolean;
  fromCardDetails?: boolean;
  iban?: string;
}

export type BlockedAmount = {
  blockedAmount: number;
  ccy: Currency;
};

export interface DetailsProps {
  name: string;
  iban?: string;
  blockedAmounts?: BlockedAmount[];
  displayDivider: boolean;
  borderRadius?: boolean;
  information?: boolean;
  cardHolder?: string;
  insure?: string;
}

export type RelatedOverdraft = OverdraftType | null;

export type ActiveOverdraftProps = {
  relatedOverdraft?: RelatedOverdraft;
};

export interface AccountsSliderData {
  accounts: Account[];
}

export type AccountSliderItemProps = {
  item: AccountsSliderData;
};
