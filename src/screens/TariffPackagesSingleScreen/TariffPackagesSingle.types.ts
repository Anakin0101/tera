import { CustomerPackages } from 'services/apis/productsAPI/productsAPI.types';

export type TariffPackagesSingleFormData = {
  agree: string;
};

export type PackagesOptionType = Pick<CustomerPackages, 'packageServices' | 'name' | 'id'>;
