type Item = {
  label: string;
  color?: string;
  onPress: () => void;
};

export type ActionSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
  actionItems: Item[];
  title?: string;
};

export type ItemProps = {
  item: Item;
  isFirst: boolean;
  isLast: boolean;
};
