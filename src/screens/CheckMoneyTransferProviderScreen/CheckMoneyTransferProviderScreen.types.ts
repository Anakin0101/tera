import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

// Define the type for each item in the array
export type SubscriberFieldValue = {
  id: number;
  value: string;
};

// Define the type for the array
export type SubscriberFieldsValue = Array<SubscriberFieldValue>;

export interface BuyCurrencyDetails {
  buyAmount: number;
  buyCurrency: CurrencyEnum;
}
