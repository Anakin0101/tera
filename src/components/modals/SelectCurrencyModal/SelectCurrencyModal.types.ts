import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface SelectCurrencyModalProps {
  selectedCurrency: CurrencyEnum;
  setSelectedCurrency: (val: CurrencyEnum) => void;
}

export interface SelectCurrencyModalFieldItemProps {
  item: CurrencyEnum;
  setSelectedCurrency: (val: CurrencyEnum) => void;
  isSelected: boolean;
  isLast: boolean;
}
