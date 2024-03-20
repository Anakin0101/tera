export interface ForeignCardItemProps {
  title: string | undefined;
  balance?: number | string;
  onPress?: () => void;
  reverse?: boolean;
  ccy: string;
  fromBudget?: boolean;
}
