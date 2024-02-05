import { FieldItem } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface SelectPaymentFieldModalProps {
  fieldItems: Array<FieldItem> | null;
  confirm: (val: string) => void;
  selectedValue: string;
}

export interface SelectPaymentFieldItemProps {
  fieldItem: FieldItem;
  onPress: (val: string) => void;
  isSelected: boolean;
  isLast: boolean;
}
