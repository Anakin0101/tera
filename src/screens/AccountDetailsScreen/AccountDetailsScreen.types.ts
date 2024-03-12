import {
  Account,
  CardType,
  Currency,
  OverdraftType,
} from 'services/apis/productsAPI/productsAPI.types';

export interface CardItemProps {
  item: CardType;
  isLast: boolean;
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
  index?: number;
  activeCardIndex?: number;
  setActiveAccountIndex?: React.Dispatch<React.SetStateAction<number>>;
};
