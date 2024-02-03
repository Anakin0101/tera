import { SubscriberFieldsValue } from 'screens/CheckPaymentProviderScreen/CheckPaymentProviderScreen.types';
import {
  DebtVerifyBasketResponse,
  DebtVerifyResult,
  FeeRule,
} from 'services/apis/paymentsAPI/paymentsAPI.types';
import { Account } from 'services/apis/productsAPI/productsAPI.types';

export interface PaymentDetailsProps {
  debtVerifyResults: Array<DebtVerifyResult>;
  feeRules: Array<FeeRule>;
  subscriberFieldsValue: SubscriberFieldsValue;
  subscriberInputFieldsValue: SubscriberFieldsValue;
  selectedAccount: Account;
  debtVerifyBasketInfo?: Array<DebtVerifyBasketResponse>;
}
