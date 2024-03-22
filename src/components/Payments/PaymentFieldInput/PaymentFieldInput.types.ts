import { Control, FieldErrors, UseControllerProps } from 'react-hook-form';
import { SubscriberFieldsValue } from 'screens/CheckPaymentProviderScreen/CheckPaymentProviderScreen.types';
import { DebtVerifyBasketResponse } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface PaymentFieldInputProps {
  item: DebtVerifyBasketResponse;
  value: string;
  onChangeText: (filedId: number, textValue: string, key: string) => void;
  control: Control<any>;
  errors: FieldErrors;
  subscriberFieldsValue: SubscriberFieldsValue;
}

export interface PaymentDropDownFieldInputProps extends UseControllerProps {
  item: DebtVerifyBasketResponse;
  value: string;
  onChangeText: (textValue: string, key: string) => void;
  subscriberFieldsValue: SubscriberFieldsValue;
  errors?: FieldErrors;
}
