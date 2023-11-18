import { OverdraftType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { CardType } from 'services/apis/productsAPI/productsAPI.types';

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
  value: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export interface CardsProps {
  cards: CardType[];
  isCardAccount?: boolean;
  fromCardDetails?: boolean;
  iban?: string;
}

export interface DetailsProps {
  name: string;
  iban: string;
  blockedAmount?: number;
  displayDivider: boolean;
  borderRadius?: boolean;
}

export type RelatedOverdraft = OverdraftType | null;

export type ActiveOverdraftProps = {
  relatedOverdraft?: RelatedOverdraft;
};
