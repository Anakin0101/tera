import { PaymentAddressFieldItem } from 'components/modals/SelectTransferFieldModal/SelectTransferFieldModal.types';

export interface MoneyTransferDropDownFieldInputProps {
  name: string;
  selectedItem?: PaymentAddressFieldItem;
  onChangeText: (val?: PaymentAddressFieldItem) => void;
  fieldItems?: Array<PaymentAddressFieldItem>;
}
