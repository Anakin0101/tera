import { SelectedMethod } from 'components/modals/AutomaticPaymentMethodModal/AutomaticPaymentMethodModal.types';
import { Account } from 'services/apis/productsAPI/productsAPI.types';

export type AutomaticPaymentForm = {
  abonentNumber: string;
  paymentMethod: SelectedMethod;
  amount: string;
  title: string;
  startDate: string;
  activeAllTime: boolean;
  endDate: string;
  paymentDate: number;
  account?: Account;
  agreed: boolean;
};

export type AlertProps = {
  message: string;
};
