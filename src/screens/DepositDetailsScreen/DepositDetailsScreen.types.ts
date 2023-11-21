import { DepositType } from 'services/apis/productsAPI/productsAPI.types';

export interface DepositDetailsProps {
  deposit: DepositType;
  copyToClipboard: (text: string, message: string) => void;
}
