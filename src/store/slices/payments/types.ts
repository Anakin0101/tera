import { ProvidersGroup } from 'services/apis/paymentsAPI/paymentsAPI.types';

export type PaymentServiceStateProps = {
  providersGroups: Array<ProvidersGroup> | null;
};
