import { OverdraftType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { Account, CardType } from 'services/apis/productsAPI/productsAPI.types';

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
  value?: string;
  icon?: React.ReactNode;
  onPress: () => void;
}

export interface CardSliderItemProps {
  item: SliderData;
  iban?: string;
}

export interface CardsProps {
  cards: CardType[];
  isCardAccount?: boolean;
  fromCardDetails?: boolean;
  iban?: string;
}

export type ActionType = {
  title: string;
  icon: React.ReactNode;
  handlePress?: () => void;
};

export type ActionButtonProps = {
  actions: ActionType[];
};
export interface DetailsProps {
  name: string;
  iban: string;
  blockedAmount?: number;
  displayDivider: boolean;
  information?: boolean;
  cardHolder?: string;
}

export type RelatedOverdraft = OverdraftType | null;

export interface SliderData {
  card?: CardType;
  accounts: Account[];
}
export interface CardsSliderProps {
  iban: string;
  actions: ActionType[];
  data: SliderData[];
}
