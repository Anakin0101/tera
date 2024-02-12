import { DebtVerifyBasketResponse } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface PaymentFieldInputProps {
  item: DebtVerifyBasketResponse;
  value: string;
  onChangeText: (filedId: number, textValue: string) => void;
}

export interface PaymentDropDownFieldInputProps {
  item: DebtVerifyBasketResponse;
  value: string;
  onChangeText: (textValue: string) => void;
}
