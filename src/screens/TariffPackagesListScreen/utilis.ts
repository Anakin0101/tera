import { PackageService } from 'services/apis/productsAPI/productsAPI.types';

type Commissions = {
  commissionMnth: string;
  commissionYr: string;
};

export const getCommissions = (packageServices: PackageService[]): Commissions => {
  let commissionMnth = '';
  let commissionYr = '';

  packageServices.forEach(service => {
    if (service.code === 'PackageServiceMonthly') {
      commissionMnth = `${service.price}`;
    } else if (service.code === 'PackageServiceYearly') {
      commissionYr = `${service.price}`;
    }
  });

  return { commissionMnth, commissionYr };
};
