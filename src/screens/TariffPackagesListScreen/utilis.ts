import { PackageService, PackageServiceCode } from 'services/apis/productsAPI/productsAPI.types';

type Commissions = {
  commissionMnth: string;
  commissionYr: string;
};

export const getCommissions = (packageServices: PackageService[]): Commissions => {
  let commissionMnth = '';
  let commissionYr = '';

  packageServices.forEach(service => {
    if (service.code === PackageServiceCode.Monthly) {
      commissionMnth = `${service.price}`;
    } else if (service.code === PackageServiceCode.Yearly) {
      commissionYr = `${service.price}`;
    }
  });

  return { commissionMnth, commissionYr };
};
