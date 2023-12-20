import { ListRenderItem } from 'react-native';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';

export type DashboardOperationsProps = {
  data?: TransactionType[];
};

export type RenderItem = ListRenderItem<TransactionType>;
