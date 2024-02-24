import {
  BasketItem,
  PaymentFieldValue,
  ProvidersGroup,
} from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface CartPaymentItemProps {
  item: BasketItem;
  index: number;
  providersGroups: Array<ProvidersGroup>;
  value: string;
  onChangeText: (filedId: string, textValue: string) => void;
  unSelectCartOnPress: (id: string) => void;
  selectCartOnPress: (id: string) => void;
  selectedCartItemIds: Array<string>;
  addToSelectedItemFee: (id: number, fee: number) => void;
  addServiceFieldsByid: (id: number, fields: Array<PaymentFieldValue>) => void;
  deleteBasketService: (id: string) => void;
}
