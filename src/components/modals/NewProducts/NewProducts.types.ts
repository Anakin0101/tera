import { ImageRequireSource } from 'react-native';

export interface Item {
  image: ImageRequireSource;
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
