import { FlatList, ListRenderItem, TextInput } from 'react-native';
import { LmsProduct } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export type DataType = ArrayLike<string> | undefined | null;

export type RenderItemT = ListRenderItem<string>;

export type InputRef = React.RefObject<TextInput>;

export type FlatListRef = React.RefObject<FlatList>;

export type SelectedProduct = LmsProduct | null;

export type CurrenciesProps = {
  currencies: CurrencyEnum[];
  selectedCurrency: CurrencyEnum;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<CurrencyEnum>>;
};
