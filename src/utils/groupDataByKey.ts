import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { CardType } from 'services/apis/productsAPI/productsAPI.types';

export const groupedDataByKey = (data: any[] = [], property: string): CardType[] => {
  return Object.values(
    data.reduce((result, currentObject) => {
      const key = currentObject[property];
      if (!result[key]) {
        result[key] = currentObject;
      }
      // result[key].push(currentObject);
      return result;
    }, {}),
  );
};

export const groupedDataArray = (data: any[] = [], propery: string): IGroupedAccountsByIban[] => {
  return Object.values(
    data.reduce((result, currentObject) => {
      const key = currentObject[propery];

      if (!result[key]) {
        result[key] = { iban: key, accounts: [], accountName: currentObject.accountName };
      }

      result[key].accounts.push(currentObject);

      return result;
    }, {}),
  );
};
