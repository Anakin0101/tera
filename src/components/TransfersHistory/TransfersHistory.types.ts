export interface TransfersHistoryListItemProps {
  id: string;
  title: string;
  desc: string;
  value: string;
  date: string;
}

export interface TransfersHistoryItemProps {
  isLast: boolean;
  item: TransfersHistoryListItemProps;
}
