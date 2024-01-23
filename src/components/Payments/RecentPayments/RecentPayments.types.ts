export interface RecentPaymentListItemProps {
  id: string;
  title: string;
  desc: string;
  value: string;
  date: string;
}

export interface RecentPaymentItemProps {
  isLast: boolean;
  item: RecentPaymentListItemProps;
}
