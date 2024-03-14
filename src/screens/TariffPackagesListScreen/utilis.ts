import {
  PackageService,
  PackageServiceCode,
  PackageServiceNames,
} from 'services/apis/productsAPI/productsAPI.types';
import Images from 'theme/Images';
import { formatMoney } from 'utils/formatMoney';

type Commissions = {
  commissionMnth?: number;
  commissionYr?: number;
};
type Icons = {
  [key in PackageServiceNames]: string;
};

const icons: Icons = {
  [PackageServiceNames.classic]: Images().ClasicMedal,
  [PackageServiceNames.gold]: Images().GoldMedal,
  [PackageServiceNames.platinum]: Images().PlatinumMedal,
};
const defaultIcon: string = Images().PlatinumMedal;
export const getIcon = (packageServiceName: PackageServiceNames): string => {
  return icons[packageServiceName] || defaultIcon;
};

export const getCommissions = (packageServices: PackageService[]): Commissions => {
  let commissionMnth;
  let commissionYr;

  packageServices.forEach(service => {
    if (service.code === PackageServiceCode.Monthly) {
      commissionMnth = `${formatMoney(service.price)}`;
    } else if (service.code === PackageServiceCode.Yearly) {
      commissionYr = `${formatMoney(service.price)}`;
    }
  });

  return { commissionMnth, commissionYr };
};
