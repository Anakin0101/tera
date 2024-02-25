import { ListRenderItem } from 'react-native';
import { LoanHistory, LoanSchedule } from 'services/apis/productsAPI/productsAPI.types';

export interface LoanScheduleProps {
  creditId: number;
  showHistory?: boolean;
  currency?: string;
}

export interface ScheduleItemProps {
  item: LoanSchedule | LoanHistory;
  currency?: string;
}

export interface HeaderProps {
  total: number;
  showHistory?: boolean;
  downloadPdf: () => void;
  currency?: string;
}

export type RenderItem = ListRenderItem<LoanSchedule | LoanHistory>;
