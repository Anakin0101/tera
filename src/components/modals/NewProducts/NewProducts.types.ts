export interface Item {
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
