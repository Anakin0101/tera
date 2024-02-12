import { NameByLang } from 'services/apis/paymentsAPI/paymentsAPI.types';

export type HeaderProps = {
  name: NameByLang;
  imageId: string;
  amount: number;
  lang?: string;
};
