import { LoanSchedule } from 'services/apis/productsAPI/productsAPI.types';

export interface LoanScheduleProps {
  creditId: number;
}

export interface ScheduleItemProps {
  item: LoanSchedule;
}

export interface HeaderProps {
  total: number;
}
