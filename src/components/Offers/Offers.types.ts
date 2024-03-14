import { OfferType } from 'services/apis/productsAPI/productsAPI.types';

export interface OffersProps {
  data: any;
  showAll?: boolean;
}

export type CreditDisbursementProps = {
  item: OfferType;
};
