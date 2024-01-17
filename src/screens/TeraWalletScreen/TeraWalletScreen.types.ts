import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { WalletAmount } from 'services/apis/productsAPI/productsAPI.types';

export type DataType = ArrayLike<WalletAmount> | undefined | null;

export type FlatlistRef = React.RefObject<FlatList>;

export type ScrollViewRef = React.RefObject<ScrollView>;
