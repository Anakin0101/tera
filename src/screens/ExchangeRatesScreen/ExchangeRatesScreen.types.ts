import { ListRenderItem } from 'react-native';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export type Rate = {
  buy: number;
  sell: number;
};

export type ExchageRateType = {
  currency: CurrencyEnum;
  special?: Rate;
  standard?: Rate;
  official?: Rate;
};

export type RenderItem = ListRenderItem<ExchageRateType>;

export type ListItemProps = {
  item: ExchageRateType;
};

export type OfficialRateSignProps = {
  buy: number;
};
