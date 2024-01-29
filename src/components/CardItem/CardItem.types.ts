export interface CardItemProps {
  title: string;
  value: string | number;
  iconSource: string;
  isSecure?: boolean;
  currency: string;
  fromPension?: boolean;
  onPress?: () => void;
}
