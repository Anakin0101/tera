export interface SelectTransferFieldModalProps {
  fieldItems: Array<PaymentAddressFieldItem>;
  confirm: (val?: PaymentAddressFieldItem) => void;
  selectedValue?: PaymentAddressFieldItem;
  name: string;
}

export interface PaymentAddressFieldItem {
  id: string;
  value: string;
  label: string;
  key: string;
}

export interface SelectTransferFieldItemProps {
  fieldItem: PaymentAddressFieldItem;
  onPress: (val: PaymentAddressFieldItem) => void;
  isSelected: boolean;
  isLast: boolean;
}
