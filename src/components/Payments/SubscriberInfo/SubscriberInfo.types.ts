import { DebtVerifyResult, FeeRule } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface SubscriberInfoItemProps {
  name: string;
  value: string;
}

export interface SubscriberInfoProps {
  debtVerifyResults: Array<DebtVerifyResult>;
  payableMoney: string;
  setPayableMoney: React.Dispatch<React.SetStateAction<string>>;
  feeRules: Array<FeeRule>;
}
