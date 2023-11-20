import { OverdraftType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { CardType, Currency } from 'services/apis/productsAPI/productsAPI.types';

export interface CardItemProps {
  item: CardType;
  isLast: boolean;
  onPress?: () => void;
}

export interface BadgeProps {
  icon: React.ReactNode;
  label: string;
}

export interface DetailsItemProps {
  label: string;
  value?: string | BlockedAmount[];
  icon?: React.ReactNode;
  onPress?: () => void;
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
}

export type RelatedOverdraft = OverdraftType | null;

export type ActiveOverdraftProps = {
  relatedOverdraft?: RelatedOverdraft;
};
