import { Source } from 'react-native-fast-image';

export interface Item {
  image: Source;
  title: string;
  onPress: () => void;
}

export interface NewProductsProps {
  products: Item[];
}

export interface ListItemProps {
  item: Item;
  showUnderline: boolean;
}
