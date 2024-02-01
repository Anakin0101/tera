import { DebtVerifyBasketResponse } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface PaymentFieldInputProps {
  item: DebtVerifyBasketResponse;
  value: string;
  onChangeText: (filedId: number, textValue: string) => void;
}
