import {
  PackageService,
  PackageServiceCode,
  PackageServiceNames,
} from 'services/apis/productsAPI/productsAPI.types';
import Images from 'theme/Images';

type Commissions = {
  commissionMnth: string;
  commissionYr: string;
};
type Icons = {
  [key in PackageServiceNames]: string;
};

const icons: Icons = {
  [PackageServiceNames.classic]: Images().ClasicMedal,
  [PackageServiceNames.gold]: Images().GoldMedal,
  [PackageServiceNames.platinum]: Images().PlatinumMedal,
};
export const getIcon = (packageServiceName: PackageServiceNames): string => {
  return icons[packageServiceName];
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
