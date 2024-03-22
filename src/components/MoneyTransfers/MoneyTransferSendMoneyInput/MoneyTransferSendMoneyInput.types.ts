import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface MoneyTransferSendMoneyInputProps {
  selectedSendCurrency: CurrencyEnum;
  setSelectedSendCurrency: React.Dispatch<React.SetStateAction<CurrencyEnum>>;
  selectedReceiveCurrency: CurrencyEnum;
  setSelectedReceiveCurrency: React.Dispatch<React.SetStateAction<CurrencyEnum>>;
  selectedSendCurrencyVal: string;
  setSelectedSendCurrencyVal: (val: string) => void;
  selectedReceiveCurrencyVal: string;
  setSelectedReceiveCurrencyVal: (val: string) => void;
  isLoading: boolean;
}

export interface MoneyTransferSendMoneyInputItemProps {
  selectedCurrency: CurrencyEnum;
  changeCurrencyOnPress: React.Dispatch<React.SetStateAction<CurrencyEnum>>;
  inputName: string;
  selectedCurrencyVal: string;
  setSelectedCurrencyVal: (val: string) => void;
  disabled?: boolean;
}
