import { ListRenderItem } from 'react-native';
import { LoanHistory, LoanSchedule } from 'services/apis/productsAPI/productsAPI.types';

export interface LoanScheduleProps {
  creditId: number;
  showHistory?: boolean;
}

export interface ScheduleItemProps {
  item: LoanSchedule | LoanHistory;
}

export interface HeaderProps {
  total: number;
  showHistory?: boolean;
  downloadPdf: () => void;
}

export type RenderItem = ListRenderItem<LoanSchedule | LoanHistory>;
