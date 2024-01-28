import { ListRenderItem } from 'react-native';

export type Item = {
  title: string;
  user: string;
  amount: number;
  number: number;
};

export type RenderItem = ListRenderItem<Item>;

export type ItemProps = {
  item: Item;
  onPress: () => void;
};
