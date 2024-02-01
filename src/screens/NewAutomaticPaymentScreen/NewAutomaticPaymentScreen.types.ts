import { SelectedMethod } from 'components/modals/AutomaticPaymentMethodModal/AutomaticPaymentMethodModal.types';

export type FormData = {
  abonentNumber: string;
  paymentMethod: SelectedMethod;
  amount: string;
  title: string;
  startDate: string;
  activeAllTime: boolean;
  endDate: string;
  paymentDate: string;
  account: string;
};

export type AlertProps = {
  message: string;
};
