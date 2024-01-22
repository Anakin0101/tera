export interface CartListItemProps {
  id: string;
  title: string;
  desc: string;
}

export interface CartItemProps {
  isLast: boolean;
  item: CartListItemProps;
}
