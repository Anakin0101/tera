import { CustomerPackages } from 'services/apis/productsAPI/productsAPI.types';

export type FormData = {
  TariffPackagesSingleFormData: string;
};

export type PackagesOptionType = Pick<CustomerPackages, 'packageServices' | 'name' | 'id'>;
