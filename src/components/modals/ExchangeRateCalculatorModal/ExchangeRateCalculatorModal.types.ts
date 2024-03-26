import { ListRenderItem } from 'react-native';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export type SelectCurrencyProps = {
  currency: CurrencyEnum;
  currencies: CurrencyEnum[];
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyEnum>>;
};

export type ExchangeRateCalculatorModalProps = {
  currencies: CurrencyEnum[];
  handleConversion: () => void;
};

export type RenderItem = ListRenderItem<CurrencyEnum>;

export type CurrencyItemProps = {
  item: CurrencyEnum;
  currency: CurrencyEnum;
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyEnum>>;
};
