export interface CalendarProps {
  minDate?: string;
  maxDate?: string;
  onDayPress: (date: string) => void;
}
