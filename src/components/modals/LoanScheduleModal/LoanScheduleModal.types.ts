import { ListRenderItem } from 'react-native';
import { LoanHistory, LoanSchedule } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface LoanScheduleProps {
  creditId: number;
  showHistory?: boolean;
  currency: CurrencyEnum;
}

export interface ScheduleItemProps {
  item: LoanSchedule | LoanHistory;
  currency: CurrencyEnum;
  currentId?: number;
}

export interface HeaderProps {
  downloadPdf: () => void;
}

export type RenderItem = ListRenderItem<LoanSchedule | LoanHistory>;
