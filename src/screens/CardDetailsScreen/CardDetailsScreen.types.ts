import { BlockedAmount } from 'components/DetailsItem/DetailsItem.types';
import { CardType } from 'services/apis/productsAPI/productsAPI.types';

export type CardSliderItemProps = {
  item: CardType;
};

export type CardInformationProps = {
  name: string;
  cardHolder: string;
  insurance?: string;
  blockedAmounts?: BlockedAmount[];
};
